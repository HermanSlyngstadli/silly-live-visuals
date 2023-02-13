import { OrbitControls, PerspectiveCamera, Sparkles } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { AudioTest } from '../AudioTest'
import { Effects } from '../components/Effects'
import { Hud } from '../components/Hud'
import { HudGraphics } from '../components/HudGraphics'
import { VisualsRouter } from '../components/VisualsRouter'

export const Partycles = () => {
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
