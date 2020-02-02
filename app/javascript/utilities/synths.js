import Tone from 'tone'

function toneSynth(props) {
  return new Tone.Synth(props)
}

function polySynth(props) {
  return new Tone.PolySynth(1, Tone.Synth, props)
}

export { toneSynth, polySynth }
