import Tone from 'tone'

function kickDrum() {
  return new Tone.MembraneSynth()
  //   {
  //   pitchDecay: 0.05,
  //   octaves: 10,
  //   oscillator: {
  //     type: 'sine'
  //   },
  //   envelope: {
  //     attack: 0.001,
  //     decay: 0.4,
  //     sustain: 0.01,
  //     release: 1,
  //     attackCurve: 'exponential'
  //   }
  // }
}

function snareDrum() {
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
// attack1: function(t) {
//   this.drum1.envelope.attack = t / 1e3;
// },
// decay1: function(t) {
//   this.drum1.envelope.decay = t / 10;
// },
// sustain1: function(t) {
//   this.drum1.envelope.sustain = t / 100;
// },
// release1: function(t) {
//   this.drum1.envelope.release = t;
// }

export { kickDrum, snareDrum }
