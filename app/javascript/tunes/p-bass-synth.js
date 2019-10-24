import Tone from 'tone'

// function part(synth) {
//   const v = 1
//
//   const part = new Tone.Part(
//     function(time, note) {
//       synth.triggerAttackRelease(
//         note.noteName,
//         note.duration,
//         time,
//         note.velocity
//       )
//     },
//     [
//       // F: F A C
//       {
//         time: '0:0:0',
//         noteName: 'F1',
//         velocity: v,
//         duration: '1n'
//       },
//       // Am: A C E
//       {
//         time: '1:0:0',
//         noteName: 'A1',
//         velocity: v,
//         duration: '1n'
//       },
//       // C: C E G
//       {
//         time: '2:0:0',
//         noteName: 'C1',
//         velocity: v,
//         duration: '1n'
//       },
//       // Em: E G B
//       {
//         time: '3:0:0',
//         noteName: 'E1',
//         velocity: v,
//         duration: '1n'
//       }
//     ]
//   )
//
//   part.loop = true
//   part.loopEnd = '4m'
//
//   return part
// }

function part(synth) {
  let part = new Tone.Sequence(
    function(time, note) {
      synth.triggerAttackRelease(note, '1n', time)
    },
    ['F1', 'A1', 'C2', 'E1'],
    '1n'
  )

  return part
}

function distortion() {
  return new Tone.Distortion({
    distortion: 0.025,
    oversample: 'none'
  })
}

function bass() {
  let b = new Tone.Synth()
  b.oscillator.type = 'sawtooth'
  b.oscillator.partials = [0.5, 0.5, 0.5]
  b.oscillator.phase = 100
  b.envelope.attack = 0.0
  b.envelope.decay = 0.8
  b.envelope.sustain = 0.75
  b.envelope.release = 1
  b.volume.value = 2

  return b
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
// bass.chain(bassdistort, Tone.Master)

export { bass, distortion, part, autoFilter }
