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

function highhat() {
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

function snareDrum() {
  return new Tone.MetalSynth({
    harmonicity: 300, // 200 sounds like a timbali
    resonance: 200, // 200 is nice
    modulationIndex: 250,
    envelope: {
      decay: 0.25, // 0.2 gives some percusive snare sounds
      sustain: 0.0125,
      release: 0.05
    }
    // volume: -5
    // volume: 100
  })
}

function snareMembrane() {
  return new Tone.MembraneSynth()
}

export { kickDrum, snareHit, snareDrum, snareMembrane, highhat }
