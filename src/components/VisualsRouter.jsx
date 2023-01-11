import { useFrame } from '@react-three/fiber'
import React, { useState } from 'react'
import { Track } from '../pages/Track'
import { RiksklubbLogo } from './RiksklubbLogo'

export const VisualsRouter = () => {
    const [currentVisual, setCurrentVisual] = useState(0)
    const visuals = [Track, RiksklubbLogo, Track]
    let timeToNextVisual = 4 + Math.random() * 4 - Math.random() * 4

    const switchVisual = () => {
        if (currentVisual >= visuals.length - 1) {
            setCurrentVisual(0)
        } else {
            setCurrentVisual(currentVisual + 1)
        }

        timeToNextVisual = 4 + Math.random() * 4 - Math.random() * 4
    }

    useFrame((state, delta) => {
        if (timeToNextVisual - delta >= 0) {
            timeToNextVisual -= delta
        } else {
            switchVisual()
        }
    })

    return <>{React.createElement(visuals[currentVisual], {})}</>
}
