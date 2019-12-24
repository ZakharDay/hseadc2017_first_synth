import Tone from 'tone'

function hatDrum() {
  return new Tone.NoiseSynth({
    noise: {
      type: 'pink'
    },
    envelope: {
      attack: 0.001,
      decay: 0.1,
      sustain: 0.5,
      release: 0.1
    },
    volume: -6
  })
}

function autoFilter() {
  let f = new Tone.AutoFilter({
    frequency: 2,
    type: 'sawtooth',
    depth: 1,
    baseFrequency: 790,
    octaves: 5,
    filter: {
      type: 'lowpass',
      rolloff: -12,
      Q: 1
    }
  })

  f.wet.value = 0.8

  return f
}

function freeverb() {
  let f = new Tone.Freeverb({
    roomSize: 0.4293718434343435,
    dampening: 3131.707702020202
  })

  f.wet.value = 0.6

  return f
}

function feedbackDelay() {
  let f = new Tone.FeedbackDelay({
    // delayTime: 6.57354797979798,
    // maxDelay: 40.41193181818182
  })

  f.wet.value = 0

  return f
}

export { hatDrum, autoFilter, freeverb, feedbackDelay }
