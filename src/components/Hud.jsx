import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import { Equalizer } from '../pages/Equalizer'
import { RiksklubbLogo } from './RiksklubbLogo'

export const Hud = () => {
    const { camera, viewport } = useThree()
    const groupRef = useRef()

    useFrame(() => {
        groupRef.current.position.x = camera.position.x
        groupRef.current.position.y = camera.position.y
        groupRef.current.position.z = camera.position.z

        groupRef.current.rotation.x = camera.rotation.x
        groupRef.current.rotation.y = camera.rotation.y
        groupRef.current.rotation.z = camera.rotation.z
    })

    return (
        <group ref={groupRef}>
            <group position={[0, 0, -1]}>
                <Equalizer position={[-viewport.width * 0.35 + 0.01, -viewport.height * 0.35 + 0.01, 0]} />
                <RiksklubbLogo position={[viewport.width * 0.35 - 0.07, viewport.height * 0.35 - 0.07, 0]} />
            </group>
        </group>
    )
}

/*
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
                </mesh>*/
