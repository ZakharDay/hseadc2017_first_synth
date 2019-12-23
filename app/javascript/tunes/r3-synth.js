import Tone from 'tone'

function synth() {
  return new Tone.PolySynth(3, Tone.Synth, {
    oscillator: {
      type: 'sine',
      count: 3,
      spread: 30,
      phase: 3,
      fadeIn: 0.3
    },
    envelope: {
      attack: 0.07,
      decay: 0.09,
      sustain: 0.09,
      release: 0.9,
      attackCurve: 'linear'
    }
  })
}

// function synth() {
//   return new Tone.MetalSynth({
//     frequency: 100,
//     envelope: {
//       attack: 0.001,
//       decay: 0.5,
//       release: 0.2
//     },
//     harmonicity: 3.1,
//     modulationIndex: 32,
//     resonance: 4000,
//     octaves: 1.5
//   })
// }

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

function bitCrusher() {
  return new Tone.BitCrusher({
    bits: 4
  })
}

function vibrato() {
  return new Tone.Vibrato({
    maxDelay: 0.005,
    frequency: 5,
    depth: 0.1,
    type: 'sine'
  })
}

function reverb() {
  return new Tone.JCReverb({
    roomSize: 0.5
  })
}

function randomNote(octave) {
  let note = octave[Math.floor(Math.random() * octave.length)]

  return note
}

function part(synth) {
  // let octave = ['C5', 'D5', 'D#5', 'F5', 'G5', 'G#5', 'B5']
  let octave = ['D6']

  const part = new Tone.Part(
    function(time, note) {
      synth.triggerAttackRelease(
        randomNote(octave),
        note.duration,
        time,
        note.velocity
      )
    },
    [
      {
        time: '0:0:0',
        noteName: 'C6',
        velocity: 0.5,
        duration: '16t'
      },
      {
        time: '0:0:1',
        noteName: 'G6',
        velocity: 0.5,
        duration: '16t'
      },
      {
        time: '0:0:2',
        noteName: 'B6',
        velocity: 0.5,
        duration: '16t'
      },
      {
        time: '0:0:3',
        noteName: 'B6',
        velocity: 0.5,
        duration: '16t'
      }
    ]
  )

  // const part = new Tone.Sequence(
  //   function(time, note) {},
  //   ['C6', 'E4', 'G4', 'A4'],
  //   '4n'
  // )

  part.loop = true
  part.loopEnd = '4n'

  return part
}

export { synth, distortion, bitCrusher, part, autoFilter, vibrato, reverb }
