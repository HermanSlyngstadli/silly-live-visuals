import { useFrame } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import { TwirlBall } from '../pages/TwirlBall'
import { TwirlBall2 } from '../pages/TwirlBall2'
import { WavePlane } from '../pages/WavePlane'
import { WavePlane2 } from '../pages/WavePlane2'
import { WavePlane3 } from '../pages/WavePlane3'
import { WavePlane4 } from '../pages/WavePlane4'
import { WavePlane5 } from '../pages/WavePlane5'
import { WavePoints } from '../pages/WavePoints'
import { WavePoints2 } from '../pages/WavePoints2'
import { WavePoints3 } from '../pages/WavePoints3'
import { WavePoints4 } from '../pages/WavePoints4'
import { WavePoints5 } from '../pages/WavePoints5'
import { WavePoints6 } from '../pages/WavePoints6'
import { GlobeRiksklubben } from '../pages/GlobeRiksklubben'
import { LoadingRiksklubben } from '../pages/LoadingRiksklubben'
import { Dodeca } from '../pages/Dodeca'
import { Dodeca2 } from '../pages/Dodeca2'

export const VisualsRouter = () => {
    /* ideer
        - Masse "høyde"-grafer i et landskap (som kart liksom). Støy med gradient maps
     */
    const visualGroupRef = useRef()
    const [currentVisual, setCurrentVisual] = useState(0)
    const visuals = [
        GlobeRiksklubben,
        TwirlBall2,
        WavePlane,
        WavePlane2,
        WavePoints5,
        WavePlane3,
        Dodeca2,
        WavePoints4,
        LoadingRiksklubben,
        WavePoints6,
        WavePlane5,
        WavePoints,
        TwirlBall,
        WavePoints2,
        WavePoints3,
        WavePlane4,
        Dodeca,
    ]
    //const visuals = [WavePoints6]

    const getRandomTimeToNextVisual = () => {
        return 30 + Math.random() * 10 - Math.random() * 10
    }
    let timeToNextVisual = getRandomTimeToNextVisual()

    const switchVisual = () => {
        if (currentVisual >= visuals.length - 1) {
            setCurrentVisual(0)
        } else {
            setCurrentVisual(currentVisual + 1)
        }

        timeToNextVisual = getRandomTimeToNextVisual()
    }

    useFrame((state, delta) => {
        if (timeToNextVisual - delta >= 0) {
            timeToNextVisual -= delta
        } else {
            switchVisual()
        }
    })

    return <group ref={visualGroupRef}>{React.createElement(visuals[currentVisual], {})}</group>
}
