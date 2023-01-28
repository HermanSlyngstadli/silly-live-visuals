import React, { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Sparkles } from '@react-three/drei'
import { VisualsRouter } from './components/VisualsRouter'
import { AudioTest } from './AudioTest'
import './App.css'
import { HudGraphics } from './components/HudGraphics'
import { Hud } from './components/Hud'
import { Effects } from './components/Effects'

function App() {
    return (
        <>
            <Canvas style={{ background: '#071e22' }}>
                <AudioTest />
                <Suspense fallback={null}>
                    <OrbitControls autoRotate={true} autoRotateSpeed={0.5} />
                    <PerspectiveCamera makeDefault position={[0, 1, 1]} far={4000} />
                    <VisualsRouter />
                    <Sparkles color={'#302e2e'} speed={0.2} />
                    <Hud />
                    <Effects />
                </Suspense>
            </Canvas>
            <HudGraphics />
        </>
    )
}

export default App
