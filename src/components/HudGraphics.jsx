import { useFrame } from '@react-three/fiber'
import { useState } from 'react'

export const HudGraphics = () => {
    const [currentArtist, setCurrentArtist] = useState(null)
    const [currentTime, setCurrentTime] = useState({ hours: new Date().getHours(), mintues: new Date().getMinutes() })
    const artist = {
        rytme: {
            name: 'Døgnrytmer',
        },
        bukk: {
            name: 'Smørbukk',
        },
        james: {
            name: 'William James',
        },
        berg: {
            name: 'Bård Berg',
        },
    }

    const getCurrentArtist = () => {
        const date = new Date()
        const counter = 14
        if (date.getHours() <= counter) {
            return artist.rytme.name
        } else if (date.getHours() === counter + 1) {
            return artist.bukk.name
        } else if (date.getHours() === counter + 2) {
            return artist.james.name
        } else if (date.getHours() >= counter + 3) {
            return artist.berg.name
        }
    }

    const checkArtist = () => {
        if (currentArtist != getCurrentArtist()) setCurrentArtist(getCurrentArtist())
        if (currentTime.minutes != new Date().getMinutes())
            setCurrentTime({ hours: new Date().getHours(), mintues: new Date().getMinutes() })
        setTimeout(() => checkArtist(), 1000 * 60)
        console.log(getCurrentArtist())
    }

    if (!currentArtist) {
        checkArtist()
    }

    return (
        <>
            <div
                style={{
                    position: 'fixed',
                    left: '0',
                    top: '0',
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                }}
            >
                <span style={{ color: 'white', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
                    <span style={{ color: '#bbb', fontSize: '0.75rem' }}>Now playing:</span>
                    <span>{currentArtist}</span>
                </span>
                <span style={{ color: 'white', padding: '1rem', fontSize: '0.75rem' }}>
                    {currentTime.hours + ':' + currentTime.mintues}
                </span>
                <span style={{ color: 'white', padding: '1rem', width: '6rem' }}>&nbsp;</span>
            </div>
            <div
                style={{
                    position: 'fixed',
                    left: '0',
                    bottom: '0',
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                }}
            >
                <div style={{ padding: '1rem' }}>&nbsp;</div>
                <span style={{ color: 'white', padding: '1rem' }}>Kulturhuset</span>
            </div>
        </>
    )
}
