import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { suspend } from 'suspend-react'
import { createAudio } from '../soundanalyser'
import { LineGeometry } from 'three-stdlib'

export const LineTest = () => {
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
        }),
        []
    )

    const vertexShader = `
        uniform float u_time;

        varying vec2 vUv;

        void main() {
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            modelPosition.y += sin(modelPosition.x * 4.0 + u_time * 2.0) * 0.2;
            
            // Uncomment the code and hit the refresh button below for a more complex effect 🪄
            // modelPosition.y += sin(modelPosition.z * 6.0 + u_time * 2.0) * 0.1;

            vec4 viewPosition = viewMatrix * modelPosition;
            vec4 projectedPosition = projectionMatrix * viewPosition;

            gl_Position = projectedPosition;
        }
    `

    const fragmentShader = `
        varying vec2 vUv;

        vec3 colorA = vec3(0.912,0.191,0.652);
        vec3 colorB = vec3(1.000,0.777,0.052);

        void main() {
            vec3 color = mix(colorA, colorB, vUv.x);

            gl_FragColor = vec4(color,1.0);
        }
    `

    return (
        <line ref={ref} rotation={[Math.PI / 2, 0, 0]}>
            <LineGeometry args={[1, 1, 32, 32]} />
            <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={uniforms} wireframe />
        </line>
    )
}
