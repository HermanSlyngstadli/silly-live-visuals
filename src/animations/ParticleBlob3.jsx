import React, { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Color } from 'three'
import { suspend } from 'suspend-react'
import { createAudio } from '../soundanalyser'
import vertex from '../glsl/particleblob.vert'
import fragment from '../glsl/particleblob.frag'

export const ParticleBlob3 = () => {
    const ref = useRef()

    const { gain, context, update, data } = suspend(() => createAudio(), [])

    const lerp = (x, y, a) => {
        const r = (1 - a) * x + a * y
        return Math.abs(x - y) < 0.001 ? y : r
    }

    const uniforms = useMemo(
        () => ({
            u_time: {
                value: 0.0,
            },
            u_color: { value: new Color('#ff86dd') },
            u_avgAudio: {
                value: 0.0,
            },
        }),
        []
    )

    useEffect(() => {
        // Disconnect it on unmount
        return () => gain.disconnect()
    }, [gain, context])

    useFrame((state) => {
        ref.current.material.uniforms.u_avgAudio.value = lerp(
            ref.current.material.uniforms.u_avgAudio.value,
            update(),
            0.1
        )

        const { clock } = state
        ref.current.material.uniforms.u_time.value = clock.getElapsedTime()
    })

    return (
        <points ref={ref} rotation={[Math.PI / 2, 0, 0]}>
            <icosahedronGeometry args={[0.4, 100]} />
            <shaderMaterial fragmentShader={fragment} vertexShader={vertex} uniforms={uniforms} wireframe={false} />
        </points>
    )
}
