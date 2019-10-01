import Tone from 'tone'

export default function tune2() {
  let autoFilter = new Tone.AutoFilter({
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
  }).toMaster()

  let autoPanner = new Tone.AutoPanner({
    frequency: 1,
    type: 'sine',
    depth: 1
  }).toMaster()

  let autoWah = new Tone.AutoWah({
    baseFrequency: 100,
    octaves: 6,
    sensitivity: 0,
    Q: 2,
    gain: 2,
    follower: {
      attack: 0.3,
      release: 0.5
    }
  }).toMaster()

  let bitCrusher = new Tone.BitCrusher({
    bits: 4
  }).toMaster()

  let chebyshev = new Tone.Chebyshev({
    order: 50,
    oversample: 'none'
  }).toMaster()

  let chorus = new Tone.Chorus({
    frequency: 1.5,
    delayTime: 3.5,
    depth: 0.7,
    type: 'sine',
    spread: 180
  }).toMaster()

  let convolver = new Tone.Convolver({
    onload: Tone.noOp,
    normalize: true
  }).toMaster()

  let distortion = new Tone.Distortion({
    distortion: 0.4,
    oversample: 'none'
  }).toMaster()

  let effect = new Tone.Effect({
    wet: 1
  }).toMaster()

  var feedbackDelay = new Tone.FeedbackDelay({
    delayTime: '4n',
    maxDelay: 0.8
  }).toMaster()

  var feedbackEffect = new Tone.FeedbackEffect({
    feedback: 0.125
  }).toMaster()

  var freeverb = new Tone.Freeverb({
    roomSize: 0.7,
    dampening: 3000
  }).toMaster()

  var jcReverb = new Tone.JCReverb({
    roomSize: 0.5
  }).toMaster()

  // MidSideEffect ???

  let phaser = new Tone.Phaser({
    frequency: 0.5,
    octaves: 3,
    stages: 10,
    Q: 10,
    baseFrequency: 350
  }).toMaster()

  let pingPongDelay = new Tone.PingPongDelay({
    delayTime: 0.25,
    maxDelayTime: 1
  }).toMaster()

  let pitchShift = new Tone.PitchShift({
    pitch: 0,
    windowSize: 0.1,
    delayTime: 0,
    feedback: 0
  }).toMaster()

  let reverb = new Tone.Reverb({
    decay: 1.5,
    preDelay: 0.01
  }).toMaster()

  // StereoEffect ???
  // StereoFeedbackEffect ???

  let stereoWidener = new Tone.StereoWidener({
    width: 0.5
  }).toMaster()

  // StereoXFeedbackEffect ???

  let tremolo = new Tone.Tremolo({
    frequency: 10,
    type: 'sine',
    depth: 0.5,
    spread: 180
  }).toMaster()

  let vibrato = new Tone.Vibrato({
    maxDelay: 0.005,
    frequency: 5,
    depth: 0.1,
    type: 'sine'
  }).toMaster()
}
