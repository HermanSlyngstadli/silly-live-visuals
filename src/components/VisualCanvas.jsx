import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'

export const VisualCanvas = ({ children }) => {
    return (
        <Canvas style={{ background: '#000000' }}>
            <Suspense fallback={null}>{children}</Suspense>
        </Canvas>
    )
}
