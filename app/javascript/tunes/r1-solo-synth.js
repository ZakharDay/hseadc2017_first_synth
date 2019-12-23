import Tone from 'tone'

function toneSynth() {
  return new Tone.Synth({
    oscillator: {
      type: 'sawtooth'
    },
    envelope: {
      attack: 0.006,
      decay: 0.03,
      sustain: 0.18,
      release: 0.04
    }
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

function autoFilter() {
  let f = new Tone.AutoFilter({
    frequency: 2.53,
    type: 'sawtooth',
    depth: 0.99,
    baseFrequency: 200,
    octaves: 4,
    filter: {
      type: 'lowpass',
      rolloff: -12,
      Q: 0.3
    }
  })

  f.wet.value = 0.99

  return f
}

function chorus() {
  let f = new Tone.Chorus({
    frequency: 84,
    delayTime: 0.008889678030303029,
    depth: 0.005129419191919192,
    type: 'sawtooth',
    spread: 360
  })

  f.wet.value = 0.98

  return f
}

function jcReverb() {
  let f = new Tone.JCReverb({
    roomSize: 0.84
  })

  f.wet.value = 0.97

  return f
}

function pingPongDelay() {
  let f = new Tone.PingPongDelay({
    delayTime: 0.25,
    maxDelayTime: 1
  })

  f.wet.value = 0.9

  return f
}

function part1(synth) {
  let part = new Tone.Sequence(
    function(time, note) {
      synth.triggerAttackRelease(note, '2n.', time)
    },
    ['F5', 'A4', 'C6', 'E5'],
    '32t'
  )

  return part
}

function part2(synth) {
  let part = new Tone.Sequence(
    function(time, note) {
      synth.triggerAttackRelease(note, '2n.', time)
    },
    ['F6', 'A6', 'C5', 'E4'],
    '32t'
  )

  return part
}

function part3(synth) {
  let part = new Tone.Sequence(
    function(time, note) {
      synth.triggerAttackRelease(note, '2n.', time)
    },
    ['F6', 'E6', 'C5', 'A4'],
    '32t'
  )

  return part
}

// function part2(synth) {
//   const v = 0.4
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
//         duration: '2n',
//         velocity: v
//       },
//       {
//         time: '0:0:2',
//         noteName: 'A4',
//         duration: '2n',
//         velocity: v
//       },
//       {
//         time: '0:1:0',
//         noteName: 'C5',
//         duration: '2n',
//         velocity: v
//       },
//       {
//         time: '0:1:2',
//         noteName: 'D5',
//         duration: '1n',
//         velocity: v
//       },
//       {
//         time: '0:2:2',
//         noteName: 'C5',
//         duration: '2n',
//         velocity: v
//       },
//       {
//         time: '0:3:0',
//         noteName: 'D5',
//         duration: '1n',
//         velocity: v
//       },
//       {
//         time: '1:0:0',
//         noteName: 'C4',
//         duration: '0.5m',
//         velocity: 0.6
//       },
//       {
//         time: '1:2:0',
//         noteName: 'E4',
//         duration: '1n',
//         velocity: v
//       },
//       {
//         time: '1:3:0',
//         noteName: 'A4',
//         duration: '1n',
//         velocity: v
//       },
//       {
//         time: '2:0:0',
//         noteName: 'C5',
//         duration: '1n',
//         velocity: v
//       },
//       {
//         time: '2:2:0',
//         noteName: 'C4',
//         duration: '1n',
//         velocity: v
//       },
//       {
//         time: '2:3:0',
//         noteName: 'A4',
//         duration: '1n',
//         velocity: v
//       },
//       {
//         time: '3:0:0',
//         noteName: 'G4',
//         duration: '1n',
//         velocity: v
//       },
//       {
//         time: '3:3:0',
//         noteName: 'C5',
//         duration: '2n',
//         velocity: v
//       },
//       {
//         time: '3:3:2',
//         noteName: 'A4',
//         duration: '2n',
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
  part2,
  part3,
  toneSynth,
  autoFilter,
  chorus,
  jcReverb,
  tremolo,
  vibrato,
  pingPongDelay
}
