import { useFrame, useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { suspend } from 'suspend-react'
import { createAudio } from '../soundanalyser'

export const Zoom = () => {
    const { gain, context, update, data } = suspend(() => createAudio(), [])
    const { camera } = useThree()

    useEffect(() => {
        // Disconnect it on unmount
        return () => gain.disconnect()
    }, [gain, context])
    return useFrame((state) => {
        // Set the cameras field of view according to the frequency average
        state.camera.fov = 50 - (data.avg / 20) * 0.3
        state.camera.updateProjectionMatrix()
        console.log(50 - data.avg / 15)
    })
}
