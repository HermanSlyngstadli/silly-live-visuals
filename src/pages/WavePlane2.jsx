import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { suspend } from 'suspend-react'
import { Color } from 'three'
import { createAudio } from '../soundanalyser'

export const WavePlane2 = () => {
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

        void main() {
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);

            modelPosition.y += sin(modelPosition.x * 5.0 + u_time * 3.0) * 0.1;
            modelPosition.y += sin(modelPosition.z * 6.0 + u_time * 2.0) * 0.1;

            vZ = modelPosition.y;

            vec4 viewPosition = viewMatrix * modelPosition;
            vec4 projectedPosition = projectionMatrix * viewPosition;

            gl_Position = projectedPosition;
        }
    `

    const fragmentShader = `
        uniform vec3 u_colorA;
        uniform vec3 u_colorB;
        varying float vZ;


        void main() {
            vec3 color = mix(u_colorA, u_colorB, vZ * 2.0 + 0.5); 
            gl_FragColor = vec4(color, 1.0);
        }
    `

    return (
        <mesh ref={ref} rotation={[-Math.PI / 2, 0, Math.PI * 0.75]}>
            <planeGeometry args={[1, 1, 32, 32]} />
            <shaderMaterial
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
                uniforms={uniforms}
                wireframe={false}
            />
        </mesh>
    )
}
