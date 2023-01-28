import { useFrame } from '@react-three/fiber'
import { useState } from 'react'

export const HudGraphics = () => {
    const getDisplayTime = () => {
        const date = new Date()
        let h = date.getHours()
        let m = date.getMinutes()
        h = h < 10 ? '0' + h : h
        m = m < 10 ? '0' + m : m

        return h + ':' + m
    }
    const [currentArtist, setCurrentArtist] = useState(null)
    const [currentTime, setCurrentTime] = useState({
        hours: new Date().getHours(),
        mintues: new Date().getMinutes(),
        displayTime: getDisplayTime(),
    })
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
        if (date.getHours() > 2) {
            return artist.rytme.name
        } else if (date.getHours() === 0) {
            return artist.bukk.name
        } else if (date.getHours() === 1) {
            return artist.james.name
        } else if (date.getHours() === 2) {
            return artist.berg.name
        }
    }

    const checkArtist = () => {
        if (currentArtist != getCurrentArtist()) setCurrentArtist(getCurrentArtist())
        if (currentTime.minutes != new Date().getMinutes())
            setCurrentTime({
                hours: new Date().getHours(),
                mintues: new Date().getMinutes(),
                displayTime: getDisplayTime(),
            })
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
