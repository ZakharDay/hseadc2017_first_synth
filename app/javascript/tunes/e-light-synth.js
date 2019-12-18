import Tone from 'tone'

function polySynth() {
  return new Tone.PolySynth(3, Tone.Synth, {
    oscillator: {
      type: 'fatsawtooth',
      count: 1,
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
    frequency: 1,
    type: 'sine',
    depth: 1,
    baseFrequency: 200,
    octaves: 2.6,
    filter: {
      type: 'lowpass',
      rolloff: -24,
      Q: 1
    }
  })

  // f.wet.value = 0

  return f
}

function chorus() {
  let f = new Tone.Chorus({
    frequency: 3,
    delayTime: 1.5,
    depth: 0.7,
    type: 'sine',
    spread: 360
  })

  f.wet.value = 0.3

  return f
}

function jcReverb() {
  let f = new Tone.JCReverb({
    roomSize: 0.5
  })

  // f.wet.value = 0

  return f
}

function introPart(synth) {
  const v = 0.2

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
        noteName: 'E1',
        velocity: v,
        duration: '1m'
      },
      // {
      //   time: '0:0:0',
      //   noteName: 'A4',
      //   velocity: v,
      //   duration: '4n'
      // },
      // {
      //   time: '0:0:0',
      //   noteName: 'C4',
      //   velocity: v,
      //   duration: '4n'
      // },
      {
        time: '1:0:0',
        noteName: 'G1',
        velocity: v,
        duration: '1m'
      },
      // {
      //   time: '1:0:0',
      //   noteName: 'C5',
      //   velocity: v,
      //   duration: '4n'
      // },
      // {
      //   time: '1:0:0',
      //   noteName: 'E4',
      //   velocity: v,
      //   duration: '4n'
      // },
      {
        time: '2:0:0',
        noteName: 'D1',
        velocity: v,
        duration: '1m'
      },
      // {
      //   time: '2:0:0',
      //   noteName: 'E4',
      //   velocity: v,
      //   duration: '4n'
      // },
      // {
      //   time: '2:0:0',
      //   noteName: 'G4',
      //   velocity: v,
      //   duration: '4n'
      // },
      {
        time: '3:0:0',
        noteName: 'B1',
        velocity: v,
        duration: '1m'
      }
      // {
      //   time: '3:0:0',
      //   noteName: 'G4',
      //   velocity: v,
      //   duration: '4n'
      // },
      // {
      //   time: '3:0:0',
      //   noteName: 'B4',
      //   velocity: v,
      //   duration: '4n'
      // }
    ]
  )

  part.loop = true
  part.loopEnd = '4m'

  return part
}

export { introPart, polySynth, autoFilter, chorus, jcReverb }
