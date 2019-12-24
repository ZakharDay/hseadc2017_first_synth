import Tone from 'tone'

function snareHit() {
  return new Tone.NoiseSynth({
    noise: {
      type: 'pink'
    },
    envelope: {
      attack: 0.001,
      decay: 0.1,
      sustain: 0.5,
      release: 1.75
    }
  })
}

function snareMembrane() {
  return new Tone.MembraneSynth()
}

function snareEQ() {
  return new Tone.EQ3(-10, 0, -10)
}

function bitCrusher() {
  let f = new Tone.BitCrusher({
    bits: 4
  })

  f.wet.value = 0.6

  return f
}

function chebyshev() {
  let f = new Tone.Chebyshev({
    order: 50,
    oversample: '4x'
  })

  f.wet.value = 0.9950284090909092

  return f
}

function chorus() {
  let f = new Tone.Chorus({
    frequency: 96.9775883838384,
    delayTime: 0.008637152777777777,
    depth: 0.8435132575757577,
    type: 'square',
    spread: 360
  })

  f.wet.value = 0.9647253787878789

  return f
}

function tremolo() {
  let f = new Tone.Tremolo({
    frequency: 81.82607323232324,
    type: 'square',
    depth: 0.015230429292929294,
    spread: 180
  })

  f.wet.value = 0.979876893939394

  return f
}

function vibrato() {
  let f = new Tone.Vibrato({
    maxDelay: 0.06068497474747475,
    frequency: 984.927398989899,
    depth: 0.005129419191919192,
    type: 'sawtooth'
  })

  f.wet.value = 0.9647253787878789

  return f
}

export {
  snareHit,
  snareMembrane,
  snareEQ,
  bitCrusher,
  chebyshev,
  chorus,
  tremolo,
  vibrato
}
