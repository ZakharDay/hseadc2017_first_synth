import Tone from 'tone'

function distortion() {
  return new Tone.Distortion({
    distortion: 0.025,
    oversample: 'none'
  })
}

function bass() {
  return new Tone.PolySynth(3, Tone.Synth, {
    oscillator: {
      type: 'fatsawtooth',
      count: 3,
      spread: 30,
      phase: 3,
      fadeIn: 0.3
    },
    envelope: {
      attack: 0.3,
      decay: 0.8,
      sustain: 0.8,
      release: 5,
      attackCurve: 'exponential'
    }
  })
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
