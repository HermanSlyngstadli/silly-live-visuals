import { useFrame } from '@react-three/fiber'
import React, { useState } from 'react'
import { TwirlBall } from '../pages/TwirlBall'
import { WavePlane } from '../pages/WavePlane'
import { WavePlane2 } from '../pages/WavePlane2'
import { WavePlane3 } from '../pages/WavePlane3'
//import { WavePlane4 } from '../pages/WavePlane4'
import { WavePoints } from '../pages/WavePoints'
import { WavePoints2 } from '../pages/WavePoints2'
import { WavePoints3 } from '../pages/WavePoints3'
import { GlobeRiksklubben } from '../pages/GlobeRiksklubben'
import { LoadingRiksklubben } from '../pages/LoadingRiksklubben'

export const VisualsRouter = () => {
    /* ideer
        - Masse "høyde"-grafer i et landskap (som kart liksom). Støy med gradient maps
     */
    const [currentVisual, setCurrentVisual] = useState(0)
    const visuals = [
        GlobeRiksklubben,
        TwirlBall,
        WavePlane,
        WavePlane2,
        WavePlane3,
        LoadingRiksklubben,
        WavePoints,
        WavePoints2,
        WavePoints3,
    ]
    //const visuals = [WavePlane4]
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
