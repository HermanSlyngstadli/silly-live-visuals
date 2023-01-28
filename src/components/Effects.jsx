import { useFrame } from '@react-three/fiber'
import { Bloom, EffectComposer, Glitch, Pixelation } from '@react-three/postprocessing'
import { useEffect, useRef } from 'react'
import { suspend } from 'suspend-react'
import { Vector2 } from 'three'
import { createAudio } from '../soundanalyser'

export const Effects = () => {
    const { gain, context, update, data } = suspend(() => createAudio(), [])
    const glitchRef = useRef()
    useEffect(() => {
        // Disconnect it on unmount
        return () => gain.disconnect()
    }, [gain, context])

    useFrame((state) => {
        let avg = update()
        glitchRef.current.strength = new Vector2(avg * avg * 0.0001, avg * avg * 0.0001)
        //glitchRef.current.chromaticAberrationOffset = new Vector2(avg * avg, avg * avg)
    })
    return (
        <EffectComposer>
            <Glitch
                ref={glitchRef}
                strength={new Vector2(6.0, 6.0)}
                chromaticAberrationOffset={new Vector2(200, 200)}
            />
            <Pixelation granularity={3} />
            <Bloom intensity={0.5} />
        </EffectComposer>
    )
}
