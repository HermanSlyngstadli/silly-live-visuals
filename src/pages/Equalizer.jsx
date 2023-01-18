import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { createAudio } from '../soundanalyser'
import { suspend } from 'suspend-react'

export const Equalizer = ({
    y = 2500,
    space = 1.4,
    width = 0.005,
    height = 0.05,
    obj = new THREE.Object3D(),
    position = [0, 0, 0],
    ...props
}) => {
    const ref = useRef()
    const groupRef = useRef()
    // suspend-react is the library that r3f uses internally for useLoader. It caches promises and
    // integrates them with React suspense. You can use it as-is with or without r3f.
    const { gain, context, update, data } = suspend(() => createAudio(), [])
    const { camera } = useThree()

    useEffect(() => {
        // Disconnect it on unmount
        return () => gain.disconnect()
    }, [gain, context])

    useFrame((state) => {
        let avg = update()
        // Distribute the instanced planes according to the frequency daza
        for (let i = 0; i < data.length; i++) {
            obj.position.set(i * width * space, (data[i] / y) * 1.5, 0)
            obj.scale.set(1, (data[i] / y) * 60, 1)
            obj.updateMatrix()
            ref.current.setMatrixAt(i, obj.matrix)
        }
        // Set the hue according to the frequency average
        ref.current.material.color.setHSL(avg / 500, 0.75, 0.75)
        ref.current.instanceMatrix.needsUpdate = true
    })
    return (
        <group position={position} scale={[0.4, 0.4, 0.4]}>
            <group ref={groupRef}>
                <instancedMesh ref={ref} args={[null, null, data.length]} {...props}>
                    <planeGeometry args={[width, height]} />
                    <meshBasicMaterial toneMapped={false} transparent opacity={0.9} />
                </instancedMesh>
            </group>
        </group>
    )
}
