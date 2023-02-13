import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { suspend } from 'suspend-react'
import { createAudio } from '../soundanalyser'
import { Color } from 'three'

export const WavePlane5 = () => {
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
            u_colorA: { value: new Color('#2a4439') },
            u_colorB: { value: new Color('#FEB3D9') },
        }),
        []
    )

    const vertexShader = `
        uniform float u_time;

        varying float vZ;
        varying vec2 vUv;

        void main() {
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            modelPosition.y += sin(modelPosition.x * 2.0 + u_time * 2.0) * 0.2;
            modelPosition.y += sin(modelPosition.z * 5.0 + u_time * 0.3 + modelPosition.x * 1.2) * 0.2;
            modelPosition.y += cos(modelPosition.z * 15.0 + u_time * 0.1 + modelPosition.x * 14.0) * 0.01;

            vZ = modelPosition.y;

            vec4 viewPosition = viewMatrix * modelPosition;
            vec4 projectedPosition = projectionMatrix * viewPosition;

            gl_Position = projectedPosition;
            gl_PointSize = 2.0;
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
        <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
            <planeGeometry args={[3, 3, 128, 128]} />
            <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={uniforms} wireframe />
        </mesh>
    )
}
