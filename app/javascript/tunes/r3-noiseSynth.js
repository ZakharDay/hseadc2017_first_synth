import Tone from 'tone'

function synth() {
  return new Tone.NoiseSynth({
    noise: {
      type: 'white'
    },
    envelope: {
      attack: 0.005,
      decay: 0.1,
      sustain: 0
    }
  })
}

function randomNote(octave) {
  let note = octave[Math.floor(Math.random() * octave.length)]

  return note
}

function start(synth) {
  synth.triggerAttackRelease('8m')
}

export { synth, start }
