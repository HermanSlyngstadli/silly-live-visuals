import { Hud, OrthographicCamera } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { RiksklubbLogo } from './RiksklubbLogo'

export const TvOverlay = () => {
    const { size } = useThree()
    return (
        <Hud renderPriority={1}>
            <OrthographicCamera makeDefault position={[0, 0, 10]} />
            <RiksklubbLogo />
            <ambientLight intensity={1} />
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.5, 0.5, 0.5]} attach="material" />
                <meshStandardMaterial color={'white'} />
            </mesh>
        </Hud>
    )
}
