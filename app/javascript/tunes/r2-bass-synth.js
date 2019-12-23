import Tone from 'tone'

function distortion() {
  return new Tone.Distortion({
    distortion: 0.025,
    oversample: 'none'
  })
}

function bass() {
  return new Tone.PolySynth(3, Tone.Synth, {
    oscillator: {
      type: 'square',
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

function autoFilter() {
  let f = new Tone.AutoFilter({
    frequency: 2,
    type: 'sawtooth',
    depth: 1,
    baseFrequency: 790,
    octaves: 5,
    filter: {
      type: 'lowpass',
      rolloff: -12,
      Q: 1
    }
  })

  f.wet.value = 0.8

  return f
}

function jcReverb() {
  let f = new Tone.JCReverb({
    roomSize: 0.9
  })

  f.wet.value = 0.1

  return f
}

function part(synth) {
  const v = 0.4
  const d = '4n'

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
      // F: F A C
      {
        time: '0:0:0',
        noteName: 'F1',
        velocity: v,
        duration: d
      },
      {
        time: '0:0:0',
        noteName: 'A1',
        velocity: v,
        duration: d
      },
      {
        time: '0:0:0',
        noteName: 'C1',
        velocity: v,
        duration: d
      },
      // Am: A C E
      {
        time: '0:1:0',
        noteName: 'A1',
        velocity: v,
        duration: d
      },
      {
        time: '0:1:0',
        noteName: 'C2',
        velocity: v,
        duration: d
      },
      {
        time: '0:1:0',
        noteName: 'E1',
        velocity: v,
        duration: d
      },
      // C: C E G
      {
        time: '0:2:0',
        noteName: 'C1',
        velocity: v,
        duration: d
      },
      {
        time: '0:2:0',
        noteName: 'E1',
        velocity: v,
        duration: d
      },
      {
        time: '0:2:0',
        noteName: 'G1',
        velocity: v,
        duration: d
      },
      // Em: E G B
      {
        time: '0:3:0',
        noteName: 'E1',
        velocity: v,
        duration: d
      },
      {
        time: '0:3:0',
        noteName: 'G1',
        velocity: v,
        duration: d
      },
      {
        time: '0:3:0',
        noteName: 'B1',
        velocity: v,
        duration: d
      }
    ]
  )

  part.loop = true
  part.loopEnd = '1m'

  return part
}

export { bass, distortion, part, autoFilter, jcReverb }
