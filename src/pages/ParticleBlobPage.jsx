import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { ParticleBlob3 } from '../animations/ParticleBlob3'
import { VisualCanvas } from '../components/VisualCanvas'

export const ParticleBlobPage = () => {
    return (
        <VisualCanvas>
            <OrbitControls autoRotate={true} autoRotateSpeed={0.1} />
            <PerspectiveCamera makeDefault position={[0, 1, 1]} far={4000} />
            <ParticleBlob3 />
            <pointLight color={'#ffffff'} position={[-10, -10, -10]} intensity={10} />
        </VisualCanvas>
    )
}
