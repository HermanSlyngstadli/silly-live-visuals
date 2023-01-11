import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { createAudio } from '../soundanalyser'
import { suspend } from 'suspend-react'

export const Track = ({
    y = 2500,
    space = 1.8,
    width = 0.005,
    height = 0.05,
    obj = new THREE.Object3D(),
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
            obj.position.set(i * width * space - (data.length * width * space) / 2, data[i] / y, 0)
            obj.updateMatrix()
            ref.current.setMatrixAt(i, obj.matrix)
        }
        // Set the hue according to the frequency average
        ref.current.material.color.setHSL(avg / 500, 0.75, 0.75)
        ref.current.instanceMatrix.needsUpdate = true

        groupRef.current.rotation.z = camera.rotation.z
        groupRef.current.rotation.y = camera.rotation.y
        groupRef.current.rotation.x = camera.rotation.x
    })
    return (
        <group position={[0, 0, 0]} scale={[2, 2, 2]} ref={groupRef}>
            <instancedMesh ref={ref} args={[null, null, data.length]} {...props}>
                <planeGeometry args={[width, height]} />
                <meshBasicMaterial toneMapped={false} />
            </instancedMesh>
        </group>
    )
}
