import { Plane, shaderMaterial } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { suspend } from 'suspend-react'
import { fragmentShader, vertexShader } from '../components/planeshader'
import { createAudio } from '../soundanalyser'

export const WavePlane = () => {
    const ref = useRef()
    // suspend-react is the library that r3f uses internally for useLoader. It caches promises and
    // integrates them with React suspense. You can use it as-is with or without r3f.
    const { gain, context, update, data } = suspend(() => createAudio(), [])
    useEffect(() => {
        // Connect the gain node, which plays the audio
        gain.connect(context.destination)
        // Disconnect it on unmount
        return () => gain.disconnect()
    }, [gain, context])

    useFrame((state) => {
        let avg = update()
    })

    const ColorShiftMaterial = shaderMaterial(
        {
            u_time: {
                type: 'f',
                value: 1.0,
            },
            u_amplitude: {
                type: 'f',
                value: 3.0,
            },
            u_data_arr: {
                type: 'float[64]',
                value: data,
            },
        },
        vertexShader,
        fragmentShader
    )

    extend({ ColorShiftMaterial })
    return (
        <mesh>
            <colorShiftMaterial />
        </mesh>
    )
}
