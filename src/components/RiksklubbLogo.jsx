import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { suspend } from 'suspend-react'

export const RiksklubbLogo = ({ ...props }) => {
    const { scene } = useGLTF('./riksklubb_x_globe_toon_shader.gltf')
    const ref = useRef()

    const { gain, context, update, data } = suspend(() => createAudio(), [])
    useEffect(() => {
        // Connect the gain node, which plays the audio
        gain.connect(context.destination)
        // Disconnect it on unmount
        return () => gain.disconnect()
    }, [gain, context])

    useFrame((state, delta) => {
        let avg = update()
        console.log(data.avg)
        ref.current.rotation.y += delta
        ref.current.scale.x = 0.2 + data.avg * 0.0001
        ref.current.scale.y = 0.2 + data.avg * 0.0001
        ref.current.scale.z = 0.2 + data.avg * 0.0001
    })

    return <primitive {...props} scale={[0.1, 0.1, 0.1]} position={[0, -0.2, 0]} object={scene} ref={ref} />
}
