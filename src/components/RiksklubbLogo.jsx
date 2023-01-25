import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { Color } from 'three'

export const RiksklubbLogo = ({ ...props }) => {
    const { nodes } = useGLTF('./riksklubben-globe.glb')
    const ref = useRef()

    useFrame(() => {
        ref.current.rotation.y += 0.01
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
            gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        }
    `

    const fragmentShaderGlobe = `
        uniform vec3 u_colorA;
        uniform vec3 u_colorB;

        varying float vZ;
        varying vec3 v_Normal;

        void main() {
            gl_FragColor = vec4(0.1, 0.1, 0.1, 1.0);
        }
    `

    return (
        <group {...props} scale={[0.05, 0.05, -0.05]} ref={ref}>
            <mesh geometry={nodes.Sphere.geometry}>
                <shaderMaterial
                    fragmentShader={fragmentShaderGlobe}
                    vertexShader={vertexShader}
                    uniforms={uniforms}
                    wireframe={true}
                />
            </mesh>
            <mesh geometry={nodes.Text.geometry} position={nodes.Text.position}>
                <shaderMaterial
                    fragmentShader={fragmentShader}
                    vertexShader={vertexShader}
                    uniforms={uniforms}
                    wireframe={false}
                    side={THREE.BackSide}
                />
            </mesh>
        </group>
    )
}
