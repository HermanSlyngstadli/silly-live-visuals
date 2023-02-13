import { useFrame } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import { TwirlBall } from '../animations/TwirlBall'
import { TwirlBall2 } from '../animations/TwirlBall2'
import { WavePlane } from '../animations/WavePlane'
import { WavePlane2 } from '../animations/WavePlane2'
import { WavePlane3 } from '../animations/WavePlane3'
import { WavePlane4 } from '../animations/WavePlane4'
import { WavePlane5 } from '../animations/WavePlane5'
import { WavePoints } from '../animations/WavePoints'
import { WavePoints2 } from '../animations/WavePoints2'
import { WavePoints3 } from '../animations/WavePoints3'
import { WavePoints4 } from '../animations/WavePoints4'
import { WavePoints5 } from '../animations/WavePoints5'
import { WavePoints6 } from '../animations/WavePoints6'
import { Dodeca } from '../animations/Dodeca'
import { Dodeca2 } from '../animations/Dodeca2'

export const VisualsRouter = () => {
    /* ideer
        - Masse "høyde"-grafer i et landskap (som kart liksom). Støy med gradient maps
        - Diffloosion? haha
     */
    const visualGroupRef = useRef()
    const [currentVisual, setCurrentVisual] = useState(0)
    const visuals = [
        TwirlBall2,
        WavePlane,
        WavePlane2,
        WavePoints5,
        WavePlane3,
        Dodeca2,
        WavePoints4,
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

    const averageTimePerVisual = 10
    const timeVariancePerVisual = 5

    const getRandomTimeToNextVisual = () => {
        return averageTimePerVisual + Math.random() * timeVariancePerVisual - Math.random() * timeVariancePerVisual
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
