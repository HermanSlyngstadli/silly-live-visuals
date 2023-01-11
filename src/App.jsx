import React, { Suspense } from 'react'
import { Vector2 } from 'three'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Glitch } from '@react-three/postprocessing'
import { OrbitControls, PerspectiveCamera, Sparkles } from '@react-three/drei'
import { VisualsRouter } from './components/VisualsRouter'
import { AudioTest } from './AudioTest'
import './App.css'

function App() {
    return (
        <Canvas style={{ background: '#071e22' }}>
            <AudioTest />
            <Suspense fallback={null}>
                <OrbitControls />
                <PerspectiveCamera makeDefault position={[0, 0, 1]} far={4000} />
                <VisualsRouter />
                <Sparkles color={'#302e2e'} speed={0.2} />

                <EffectComposer>
                    <Glitch strength={0.6} chromaticAberrationOffset={new Vector2(2, 2)} />
                </EffectComposer>
            </Suspense>
        </Canvas>
    )
}

export default App
