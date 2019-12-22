import Tone from 'tone'

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

  f.wet.value = 0

  return f
}

function autoPanner() {
  let f = new Tone.AutoPanner({
    frequency: 1,
    type: 'sine',
    depth: 1
  })

  f.wet.value = 0

  return f
}

function autoWah() {
  let f = new Tone.AutoWah({
    baseFrequency: 100,
    octaves: 6,
    sensitivity: 0,
    Q: 2,
    gain: 2,
    follower: {
      attack: 0.3,
      release: 0.5
    }
  })

  f.wet.value = 0

  return f
}

function bitCrusher() {
  let f = new Tone.BitCrusher({
    bits: 4
  })

  f.wet.value = 0

  return f
}

function chebyshev() {
  let f = new Tone.Chebyshev({
    order: 50,
    oversample: 'none'
  })

  f.wet.value = 0

  return f
}

function chorus() {
  let f = new Tone.Chorus({
    frequency: 1.5,
    delayTime: 3.5,
    depth: 0.7,
    type: 'sine',
    spread: 180
  })

  f.wet.value = 0

  return f
}

// function convolver() {
//   let f = new Tone.Convolver({
//     onload: Tone.noOp,
//     normalize: true
//   })
//
//   f.wet.value = 0
//
//   return f
// }

function distortion() {
  let f = new Tone.Distortion({
    distortion: 0,
    oversample: '4x'
  })

  f.wet.value = 0

  return f
}

// let effect = new Tone.Effect({
//   wet: 1
// })

function feedbackDelay() {
  let f = new Tone.FeedbackDelay({
    delayTime: '4n',
    maxDelay: 0.8
  })

  f.wet.value = 0

  return f
}

function feedbackEffect() {
  let f = new Tone.FeedbackEffect({
    feedback: 0.125
  })

  f.wet.value = 0

  return f
}

function freeverb() {
  let f = new Tone.Freeverb({
    roomSize: 0.7,
    dampening: 3000
  })

  f.wet.value = 0

  return f
}

function jcReverb() {
  let f = new Tone.JCReverb({
    roomSize: 0.5
  })

  f.wet.value = 0

  return f
}

// MidSideEffect ???

function phaser() {
  let f = new Tone.Phaser({
    frequency: 0.5,
    octaves: 3,
    stages: 10,
    Q: 10,
    baseFrequency: 350
  })

  f.wet.value = 0

  return f
}

function pingPongDelay() {
  let f = new Tone.PingPongDelay({
    delayTime: 0.25,
    maxDelayTime: 1
  })

  f.wet.value = 0

  return f
}

function pitchShift() {
  let f = new Tone.PitchShift({
    pitch: 0,
    windowSize: 0.1,
    delayTime: 0,
    feedback: 0
  })

  f.wet.value = 0

  return f
}

function reverb() {
  let f = new Tone.Reverb({
    decay: 1.5,
    preDelay: 0.01
  })

  f.wet.value = 0

  return f
}

// StereoEffect ???
// StereoFeedbackEffect ???

function stereoWidener() {
  let f = new Tone.StereoWidener({
    width: 0.5
  })

  f.wet.value = 0

  return f
}

// StereoXFeedbackEffect ???

function tremolo() {
  let f = new Tone.Tremolo({
    frequency: 10,
    type: 'sine',
    depth: 0.5,
    spread: 180
  })

  f.wet.value = 0

  return f
}

function vibrato() {
  let f = new Tone.Vibrato({
    maxDelay: 0.005,
    frequency: 5,
    depth: 0.1,
    type: 'sine'
  })

  f.wet.value = 0

  return f
}

export {
  autoFilter,
  autoPanner,
  autoWah,
  bitCrusher,
  chebyshev,
  chorus,
  distortion,
  feedbackDelay,
  feedbackEffect,
  freeverb,
  jcReverb,
  phaser,
  pingPongDelay,
  pitchShift,
  reverb,
  stereoWidener,
  tremolo,
  vibrato
}
