const userMediaPromise = new Promise((resolve, reject) => {
    navigator.getUserMedia({ video: false, audio: true }, resolve, reject)
})

export async function createAudio() {
    // Fetch audio data and create a buffer source
    const context = new (window.AudioContext || window.webkitAudioContext)()

    const source = context.createMediaStreamSource(await userMediaPromise)

    const analyser = context.createAnalyser({ stereo: false, audible: false })
    const gain = context.createGain()
    analyser.fftSize = 128

    const bufferLength = analyser.frequencyBinCount

    source.connect(analyser)
    source.connect(gain)

    // The data array receive the audio frequencies
    const data = new Uint8Array(analyser.frequencyBinCount)
    analyser.getByteTimeDomainData(data)
    return {
        context,
        gain,
        data,
        // This function gets called every frame per audio source
        update: () => {
            analyser.getByteFrequencyData(data)
            // Calculate a frequency average
            return (data.avg = data.reduce((prev, cur) => prev + cur / data.length, 0))
        },
    }
}
