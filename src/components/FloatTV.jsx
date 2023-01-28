import * as THREE from 'three'
import { useRef, useState } from 'react'

export const FloatTV = ({ videoRef }) => {
    const ref = useRef()
    const [video] = useState(() => {
        const vid = document.createElement('video')
        vid.src = videoRef
        vid.loop = true
        vid.muted = true
        vid.play()
        return vid
    })

    return (
        <group rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} scale={[0.3, 0.3, 0.3]}>
            <mesh rotation={[0, 0, 0]} ref={ref}>
                <planeGeometry args={[3.2, 1.9, 32, 32]} />
                <meshStandardMaterial emissive={'white'} side={THREE.DoubleSide}>
                    <videoTexture attach="map" args={[video]} />
                    <videoTexture attach="emissiveMap" args={[video]} />
                </meshStandardMaterial>
            </mesh>
        </group>
    )
}
