import Tone from 'tone'

function toneSynth() {
  return new Tone.Synth({
    oscillator: {
      type: 'sawtooth'
    },
    envelope: {
      attack: 0.006,
      decay: 0.1,
      sustain: 0.006,
      release: 0.006
    }
  })
}

function autoFilter() {
  let f = new Tone.AutoFilter({
    frequency: 6,
    type: 'sawtooth',
    depth: 0.7,
    baseFrequency: 200,
    octaves: 4,
    filter: {
      type: 'lowpass',
      rolloff: -12,
      Q: 0.3
    }
  })

  f.wet.value = 0.6

  return f
}

function chorus() {
  let f = new Tone.Chorus({
    frequency: 1,
    delayTime: 2,
    depth: 1,
    type: 'triangle',
    spread: 360
  })

  f.wet.value = 0.3

  return f
}

function jcReverb() {
  let f = new Tone.JCReverb({
    roomSize: 0.84
  })

  f.wet.value = 0.3

  return f
}

function part(synth) {
  const v = 0.4

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
        noteName: 'F4',
        duration: '2n',
        velocity: v
      },
      {
        time: '0:0:2',
        noteName: 'A4',
        duration: '2n',
        velocity: v
      },
      {
        time: '0:1:0',
        noteName: 'C5',
        duration: '2n',
        velocity: v
      },
      {
        time: '0:1:2',
        noteName: 'D5',
        duration: '1n',
        velocity: v
      },
      {
        time: '0:2:2',
        noteName: 'C5',
        duration: '2n',
        velocity: v
      },
      {
        time: '0:3:0',
        noteName: 'D5',
        duration: '1n',
        velocity: v
      },
      {
        time: '1:0:0',
        noteName: 'C4',
        duration: '0.5m',
        velocity: 0.6
      },
      {
        time: '1:2:0',
        noteName: 'E4',
        duration: '1n',
        velocity: v
      },
      {
        time: '1:3:0',
        noteName: 'A4',
        duration: '1n',
        velocity: v
      },
      {
        time: '2:0:0',
        noteName: 'C5',
        duration: '1n',
        velocity: v
      },
      {
        time: '2:2:0',
        noteName: 'C4',
        duration: '1n',
        velocity: v
      },
      {
        time: '2:3:0',
        noteName: 'A4',
        duration: '1n',
        velocity: v
      },
      {
        time: '3:0:0',
        noteName: 'G4',
        duration: '1n',
        velocity: v
      },
      {
        time: '3:3:0',
        noteName: 'C5',
        duration: '2n',
        velocity: v
      },
      {
        time: '3:3:2',
        noteName: 'A4',
        duration: '2n',
        velocity: v
      }
    ]
  )

  part.loop = true
  part.loopEnd = '4m'

  return part
}

export { part, toneSynth, autoFilter, chorus, jcReverb }
