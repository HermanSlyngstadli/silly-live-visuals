import * as THREE from 'three'
import { useState } from 'react'
import { createPortal, useFrame, useThree } from '@react-three/fiber'
import { RiksklubbLogo } from './RiksklubbLogo'

export const Hud = ({ children, ...props }) => {
    // Creates a portal into a local scene, which is rendered on top of the previous one
    const [scene] = useState(() => new THREE.Scene())
    const { camera, size } = useThree()
    useFrame(({ gl }) => void ((gl.autoClear = false), gl.clearDepth(), gl.render(scene, camera)), 10)
    return createPortal(
        <>
            <RiksklubbLogo position={[1, 1, 0]} />
        </>,
        scene
    )
}
