import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { suspend } from 'suspend-react'
import { createAudio } from '../soundanalyser'
import { Color } from 'three'

export const Dodeca = () => {
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
            u_color: { value: new Color('#ff86dd') },
        }),
        []
    )

    const vertexShader = `
        uniform float u_time;

        varying vec2 vUv;

        void main() {
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            modelPosition.y += sin(modelPosition.x * 4.0 + u_time * 2.0) * 0.1;

            vec4 viewPosition = viewMatrix * modelPosition;
            vec4 projectedPosition = projectionMatrix * viewPosition;

            gl_Position = projectedPosition;
        }
    `

    const fragmentShader = `
        uniform vec3 u_color;
        
        varying vec2 vUv;

        void main() {
            gl_FragColor = vec4(u_color, 1.0);
        }
    `

    return (
        <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
            <dodecahedronGeometry args={[0.4, 3]} />
            <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={uniforms} wireframe />
        </mesh>
    )
}
