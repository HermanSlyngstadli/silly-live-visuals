import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { suspend } from 'suspend-react'
import { createAudio } from './soundanalyser'

export const AudioTest = () => {
    const { gain, context, update, data } = suspend(() => createAudio(), [])
    useEffect(() => {
        // Disconnect it on unmount
        return () => gain.disconnect()
    }, [gain, context])

    useFrame(() => {
        let avg = update()
    })

    return <></>
}
