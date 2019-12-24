import Tone from 'tone'

function synth() {
  return new Tone.Synth({
    oscillator: {
      type: 'sine'
    },
    envelope: {
      attack: 0.27,
      decay: 0.13,
      sustain: 0.46,
      release: 1
    }
  })
}

function distortion() {
  let d = new Tone.Distortion({
    distortion: 6,
    oversample: '4x'
  })

  d.wet.value = 0.43

  return d
}
function bitCrusher() {
  let b = new Tone.BitCrusher({
    bits: 2.61
  })

  b.wet.value = 0.48

  return b
}

function reverb() {
  let r = new Tone.JCReverb({
    roomSize: 0.5
  })

  r.wet.value = 0.26

  return r
}

function randomNote(octave) {
  let note = octave[Math.floor(Math.random() * octave.length)]

  return note
}

function part(synth) {
  let octave = ['C1', 'G1', 'B1', 'D1']

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
        noteName: 'C1',
        velocity: 0.5,
        duration: '8t'
      },
      {
        time: '1:0:0',
        noteName: 'G2',
        velocity: 0.3,
        duration: '8t'
      },
      {
        time: '2:0:0',
        noteName: 'B1',
        velocity: 0.6,
        duration: '8t'
      },
      {
        time: '3:0:0',
        noteName: 'D1',
        velocity: 0.5,
        duration: '8t'
      }
    ]
  )

  part.loop = true
  part.loopEnd = '4m'

  return part
}

export { synth, distortion, bitCrusher, reverb, part }
