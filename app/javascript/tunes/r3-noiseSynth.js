import Tone from 'tone'

function synth() {
  return new Tone.Noise({
    type: 'white',
    playbackRate: 1
  })
}

export { synth }
