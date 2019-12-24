import Tone from 'tone'

function kickDrum() {
  return new Tone.MembraneSynth()
  // {
  //   pitchDecay: 0.05,
  //   octaves: 10,
  //   oscillator: {
  //     type: 'sine'
  //   },
  //   envelope: {
  //     attack: 0.001,
  //     decay: 0.4,
  //     sustain: 0.02,
  //     release: 1,
  //     attackCurve: 'exponential'
  //   }
  // }
}

function pingPongDelay() {
  let f = new Tone.PingPongDelay({
    delayTime: 0.2627051767676768,
    maxDelayTime: 1
  })

  f.wet.value = 1

  return f
}

function distortion() {
  let f = new Tone.Distortion({
    distortion: 5.456123737373737,
    oversample: '4x'
  })

  f.wet.value = 0

  return f
}

function vibrato() {
  let f = new Tone.Vibrato({
    maxDelay: 0.005129419191919192,
    frequency: 0.07891414141414141,
    depth: 0.7576546717171718,
    type: 'sawtooth'
  })

  f.wet.value = 0

  return f
}

export { kickDrum, pingPongDelay, distortion, vibrato }
