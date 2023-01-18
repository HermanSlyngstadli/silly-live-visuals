import React, { Suspense } from 'react'
import { Vector2 } from 'three'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Glitch } from '@react-three/postprocessing'
import { OrbitControls, PerspectiveCamera, Sparkles } from '@react-three/drei'
import { VisualsRouter } from './components/VisualsRouter'
import { AudioTest } from './AudioTest'
import './App.css'
import { HudGraphics } from './components/HudGraphics'
import { Hud } from './components/Hud'

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
                    <EffectComposer>
                        <Glitch strength={new Vector2(0.6, 0.6)} chromaticAberrationOffset={new Vector2(2, 2)} />
                    </EffectComposer>
                </Suspense>
            </Canvas>
            <HudGraphics />
        </>
    )
}

export default App
