import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { suspend } from 'suspend-react'
import { Color } from 'three'
import { createAudio } from '../soundanalyser'

export const TwirlBall = () => {
    const ref = useRef()
    // suspend-react is the library that r3f uses internally for useLoader. It caches promises and
    // integrates them with React suspense. You can use it as-is with or without r3f.
    const { gain, context, update, data } = suspend(() => createAudio(), [])
    useEffect(() => {
        // Disconnect it on unmount
        return () => gain.disconnect()
    }, [gain, context])

    useFrame((state) => {
        let avg = update()

        const { clock } = state
        ref.current.material.uniforms.u_time.value = clock.getElapsedTime()
    })

    const uniforms = useMemo(
        () => ({
            u_time: {
                value: 0.0,
            },
            u_colorA: { value: new Color('#FFE486') },
            u_colorB: { value: new Color('#FEB3D9') },
        }),
        []
    )

    const vertexShader = `
        uniform float u_time;

        varying float vZ;
        varying vec3 v_Normal;

        void main() {
            v_Normal = normal;

            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            vZ = modelPosition.y;

            modelPosition.x = modelPosition.x + normal.x * sin(modelPosition.x + u_time);
            modelPosition.y = modelPosition.y + normal.x * sin(modelPosition.y * 4.0 + u_time);
            modelPosition.z = modelPosition.z + 2.0 * normal.z * sin(modelPosition.z + u_time * 1.0);

            vec4 viewPosition = viewMatrix * modelPosition;
            vec4 projectedPosition = projectionMatrix * viewPosition;
            
            gl_Position = projectedPosition;
            gl_PointSize = 5.0;
        }
    `

    const fragmentShader = `
        uniform vec3 u_colorA;
        uniform vec3 u_colorB;

        varying float vZ;
        varying vec3 v_Normal;

        void main() {
            vec3 color = mix(u_colorA, u_colorB, vZ * 2.0 + 0.5); 
            gl_FragColor = vec4(v_Normal, 1.0);
        }
    `

    return (
        <points ref={ref}>
            <icosahedronGeometry args={[1, 15]} />
            <shaderMaterial
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
                uniforms={uniforms}
                wireframe={true}
            />
        </points>
    )
}
