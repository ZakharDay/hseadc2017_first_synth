import Tone from 'tone'

function synth() {
  return new Tone.PolySynth(3, Tone.Synth, {
    oscillator: {
      type: 'fatsawtooth',
      count: 3,
      spread: 30,
      phase: 3,
      fadeIn: 0.3
    },
    envelope: {
      attack: 0.3,
      decay: 0.8,
      sustain: 0.8,
      release: 5,
      attackCurve: 'exponential'
    }
  })
}

function distortion() {
  return new Tone.Distortion({
    distortion: 0.025,
    oversample: 'none'
  })
}

function autoFilter() {
  let f = new Tone.AutoFilter({
    frequency: 1,
    type: 'sine',
    depth: 1,
    baseFrequency: 200,
    octaves: 2.6,
    filter: {
      type: 'lowpass',
      rolloff: -12,
      Q: 1
    }
  })

  // f.wet.value = 0

  return f
}

function part(synth) {
  const part = new Tone.Part(
    function(time, note) {
      synth.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    },
    [
      {
        time: '0:0:0',
        noteName: 'C4',
        velocity: 0.4,
        duration: '2m'
      },
      {
        time: '1:0:0',
        noteName: 'G4',
        velocity: 0.6,
        duration: '2m'
      },
      {
        time: '2:0:0',
        noteName: 'B4',
        velocity: 0.4,
        duration: '2m'
      }
    ]
  )

  part.loop = true
  part.loopEnd = '3m'

  return part
}

export { synth, distortion, part, autoFilter }
