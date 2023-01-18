import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { Color } from 'three'
import { Equalizer } from '../pages/Equalizer'

export const Hud = () => {
    const { camera, viewport } = useThree()
    const groupRef = useRef()
    const logoRef = useRef()

    useFrame(() => {
        groupRef.current.position.x = camera.position.x
        groupRef.current.position.y = camera.position.y
        groupRef.current.position.z = camera.position.z

        groupRef.current.rotation.x = camera.rotation.x
        groupRef.current.rotation.y = camera.rotation.y
        groupRef.current.rotation.z = camera.rotation.z

        logoRef.current.rotation.y += 0.01
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

            vec4 viewPosition = viewMatrix * modelPosition;
            vec4 projectedPosition = projectionMatrix * viewPosition;
            
            gl_Position = projectedPosition;
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
        <group ref={groupRef}>
            <group position={[0, 0, -1]}>
                <Equalizer position={[-viewport.width * 0.36 + 0.03, -viewport.height * 0.36 + 0.03, 0]} />
                <mesh
                    position={[viewport.width * 0.36 - 0.1, viewport.height * 0.36 - 0.08, 0]}
                    scale={[0.05, 0.05, 0.05]}
                    ref={logoRef}
                >
                    <sphereGeometry args={[1, 16, 16]} />
                    <shaderMaterial
                        fragmentShader={fragmentShader}
                        vertexShader={vertexShader}
                        uniforms={uniforms}
                        wireframe={true}
                    />
                </mesh>
            </group>
        </group>
    )
}
