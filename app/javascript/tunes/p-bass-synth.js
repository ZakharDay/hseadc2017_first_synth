import Tone from 'tone'

function distortion() {
  return new Tone.Distortion({
    distortion: 0.025,
    oversample: 'none'
  })
}

function bass() {
  let b = new Tone.Synth()
  b.oscillator.type = 'sawtooth'
  b.oscillator.partials = [0.5, 0.5, 0.5]
  b.oscillator.phase = 100
  b.envelope.attack = 0.0
  b.envelope.decay = 0.1
  b.envelope.sustain = 0.9
  b.envelope.release = 0.9

  return b
}

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

  // f.wet.value = 0

  return f
}

function part(synth) {
  let part = new Tone.Sequence(
    function(time, note) {
      synth.triggerAttackRelease(note, '2n.', time)
    },
    ['F1', 'A1', 'C2', 'E1'],
    '1n'
  )

  return part
}

export { bass, distortion, part, autoFilter }
