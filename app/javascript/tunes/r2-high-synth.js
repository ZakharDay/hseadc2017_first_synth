import Tone from 'tone'

function metalSynth() {
  return new Tone.Synth({
    frequency: 200,
    envelope: {
      attack: 0.001,
      decay: 0.0657354797979798,
      sustain: 0.20714962121212124,
      release: 0.0657354797979798
    },
    harmonicity: 5.1,
    modulationIndex: 32,
    resonance: 4000,
    octaves: 1.5
  })
}

function tremolo() {
  let f = new Tone.Tremolo({
    frequency: 10,
    type: 'sine',
    depth: 0.5,
    spread: 180
  })

  f.wet.value = 1

  return f
}

function vibrato() {
  let f = new Tone.Vibrato({
    maxDelay: 0.005129419191919192,
    frequency: 0.07891414141414141,
    depth: 0.7576546717171718,
    type: 'sawtooth'
  })

  f.wet.value = 1

  return f
}

// StereoEffect ???
// StereoFeedbackEffect ???

function stereoWidener() {
  let f = new Tone.StereoWidener({
    width: 0.5
  })

  f.wet.value = 1

  return f
}

function jcReverb() {
  let f = new Tone.JCReverb({
    roomSize: 0.05
  })

  // f.wet.value = 0

  return f
}

function distortion() {
  let f = new Tone.Distortion({
    distortion: 5.456123737373737,
    oversample: '4x'
  })

  f.wet.value = 1

  return f
}

function pingPongDelay() {
  let f = new Tone.PingPongDelay({
    delayTime: 0.5960385101010102,
    maxDelayTime: 0.46472537878787884
  })

  f.wet.value = 0.9

  return f
}

function part1(synth) {
  let part = new Tone.Sequence(
    function(time, note) {
      synth.triggerAttackRelease(note, '4m', time)
    },
    // ['A8', 'E6', 'A5', 'F7'],
    ['A4', 'E3', 'A4', 'F5'],
    '4t'
  )

  return part
}

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
//       {
//         time: '0:0:0',
//         noteName: 'F4',
//         duration: '4n',
//         velocity: v
//       },
//       {
//         time: '0:0:1',
//         noteName: 'A4',
//         duration: '1n',
//         velocity: v
//       },
//       {
//         time: '0:0:3',
//         noteName: 'G4',
//         duration: '2n',
//         velocity: v
//       },
//       {
//         time: '0:1:0',
//         noteName: 'B4',
//         duration: '2n',
//         // 0.5
//         velocity: v
//       },
//       {
//         time: '0:1:0.5',
//         noteName: 'C5',
//         // noteName: 'C#5',
//         duration: '4n',
//         // 0.5
//         velocity: v
//       },
//       {
//         time: '0:1:1',
//         noteName: 'E4',
//         duration: '4n',
//         velocity: v
//       },
//       {
//         time: '0:1:2',
//         noteName: 'G4',
//         duration: '4n',
//         velocity: v
//       },
//       {
//         time: '0:1:3',
//         noteName: 'A4',
//         duration: '2n',
//         velocity: v
//       },
//       {
//         time: '0:2:0',
//         noteName: 'F4',
//         // noteName: 'F#4',
//         duration: '2n',
//         // 0.5
//         velocity: v
//       },
//       {
//         time: '0:2:0.5',
//         noteName: 'E4',
//         duration: '1n',
//         // 0.5
//         velocity: v
//       },
//       {
//         time: '0:2:1',
//         noteName: 'G4',
//         duration: '4n',
//         velocity: v
//       },
//       {
//         time: '0:2:3',
//         noteName: 'D4',
//         // noteName: 'D#4',
//         duration: '4n',
//         velocity: v
//       },
//       {
//         time: '0:3:1',
//         noteName: 'A4',
//         duration: '2n',
//         // 0.5
//         velocity: v
//       },
//       {
//         time: '0:3:1.5',
//         noteName: 'B4',
//         duration: '2n',
//         // 0.5
//         velocity: v
//       },
//       {
//         time: '0:3:2',
//         noteName: 'A4',
//         duration: '2n',
//         // 0.5
//         velocity: v
//       },
//       {
//         time: '0:3:2.5',
//         noteName: 'B4',
//         duration: '1n',
//         // 0.5
//         velocity: v
//       },
//       {
//         time: '1:0:0',
//         noteName: 'G4',
//         duration: '1n',
//         velocity: v
//       },
//       {
//         time: '1:0:1',
//         noteName: 'G4',
//         duration: '4n',
//         velocity: v
//       },
//       {
//         time: '1:0:2',
//         noteName: 'G4',
//         duration: '2n',
//         velocity: v
//       },
//       {
//         time: '1:0:3',
//         noteName: 'A4',
//         duration: '2n',
//         velocity: v
//       },
//       {
//         time: '1:1:0',
//         noteName: 'B4',
//         duration: '1n',
//         velocity: v
//       },
//       {
//         time: '1:1:1',
//         noteName: 'B4',
//         duration: '2n',
//         velocity: v
//       },
//       {
//         time: '1:1:2',
//         noteName: 'B4',
//         duration: '2n',
//         velocity: v
//       },
//       {
//         time: '1:1:3',
//         noteName: 'A4',
//         duration: '4n',
//         velocity: v
//       },
//       {
//         time: '1:2:0',
//         noteName: 'G4',
//         duration: '1n',
//         // 0.5
//         velocity: v
//       },
//       {
//         time: '1:2:0.5',
//         noteName: 'A4',
//         duration: '2n',
//         // 0.5
//         velocity: v
//       },
//       {
//         time: '1:2:1',
//         noteName: 'G4',
//         duration: '4n',
//         // 0.5
//         velocity: v
//       },
//       {
//         time: '1:2:1.5',
//         noteName: 'A4',
//         duration: '2n',
//         // 0.5
//         velocity: v
//       },
//       {
//         time: '1:3:1',
//         noteName: 'F4',
//         duration: '4n',
//         velocity: v
//       },
//       {
//         time: '1:3:2',
//         noteName: 'G4',
//         duration: '1n',
//         velocity: v
//       },
//       {
//         time: '2:0:0',
//         noteName: 'A4',
//         duration: '1n',
//         // 0.5
//         velocity: v
//       },
//       {
//         time: '2:0:0.5',
//         noteName: 'G4',
//         duration: '4n',
//         // 0.5
//         velocity: v
//       },
//       {
//         time: '2:0:1',
//         noteName: 'A4',
//         duration: '4n',
//         // 0.5
//         velocity: v
//       },
//       {
//         time: '2:0:1.5',
//         noteName: 'G4',
//         duration: '4n',
//         // 0.5
//         velocity: v
//       },
//       {
//         time: '2:0:2',
//         noteName: 'B4',
//         duration: '2n',
//         // 0.5
//         velocity: v
//       },
//       {
//         time: '2:0:3',
//         noteName: 'C5',
//         duration: '2n',
//         // 0.5
//         velocity: v
//       },
//       {
//         time: '2:1:0',
//         noteName: 'C5',
//         duration: '4n',
//         velocity: v
//       },
//       {
//         time: '2:1:1',
//         noteName: 'C5',
//         duration: '2n',
//         velocity: v
//       },
//       {
//         time: '2:1:2',
//         noteName: 'C5',
//         duration: '1n',
//         velocity: v
//       },
//       {
//         time: '2:2:1',
//         noteName: 'A4',
//         duration: '4n',
//         velocity: v
//       },
//       {
//         time: '2:2:3',
//         noteName: 'G4',
//         duration: '2n',
//         velocity: v
//       },
//       {
//         time: '2:3:1',
//         noteName: 'E4',
//         duration: '4n',
//         velocity: v
//       },
//       {
//         time: '2:3:3',
//         noteName: 'D4',
//         duration: '2n',
//         velocity: v
//       },
//       {
//         time: '3:0:1',
//         noteName: 'C4',
//         duration: '1n',
//         velocity: v
//       }
//     ]
//   )
//
//   part.loop = true
//   part.loopEnd = '4m'
//
//   return part
// }

export {
  part1,
  metalSynth,
  tremolo,
  vibrato,
  distortion,
  stereoWidener,
  jcReverb,
  pingPongDelay
}
