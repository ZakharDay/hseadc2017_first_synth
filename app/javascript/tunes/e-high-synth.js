import Tone from 'tone'

function metalSynth() {
  return new Tone.Synth({
    frequency: 200,
    envelope: {
      attack: 0.001,
      decay: 0.2,
      sustain: 0.4,
      release: 0.2
    },
    harmonicity: 5.1,
    modulationIndex: 32,
    resonance: 4000,
    octaves: 1.5
  })
}

function tremolo() {
  let f = new Tone.Tremolo({
    frequency: 10,
    type: 'sine',
    depth: 0.5,
    spread: 180
  })

  // f.wet.value = 0

  return f
}

function vibrato() {
  let f = new Tone.Vibrato({
    maxDelay: 0.005,
    frequency: 5,
    depth: 0.1,
    type: 'sine'
  })

  // f.wet.value = 0

  return f
}

// StereoEffect ???
// StereoFeedbackEffect ???

function stereoWidener() {
  let f = new Tone.StereoWidener({
    width: 0.5
  })

  // f.wet.value = 0

  return f
}

function jcReverb() {
  let f = new Tone.JCReverb({
    roomSize: 0.05
  })

  // f.wet.value = 0

  return f
}

function distortion() {
  let f = new Tone.Distortion({
    distortion: 1,
    oversample: '4x'
  })

  // f.wet.value = 0

  return f
}

function feedbackDelay() {
  let f = new Tone.FeedbackDelay({
    delayTime: '4n',
    maxDelay: 0.8
  })

  f.wet.value = 0

  return f
}

function feedbackEffect() {
  let f = new Tone.FeedbackEffect({
    feedback: 0.125
  })

  f.wet.value = 0

  return f
}

function freeverb() {
  let f = new Tone.Freeverb({
    roomSize: 0.7,
    dampening: 3000
  })

  f.wet.value = 0

  return f
}

function phaser() {
  let f = new Tone.Phaser({
    frequency: 0.5,
    octaves: 3,
    stages: 10,
    Q: 10,
    baseFrequency: 350
  })

  f.wet.value = 0

  return f
}

function pingPongDelay() {
  let f = new Tone.PingPongDelay({
    delayTime: 0.25,
    maxDelayTime: 1
  })

  f.wet.value = 0

  return f
}

function part(synth) {
  const v = 1

  const part = new Tone.Part(
    function(time, note) {
      synth.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    },
    [
      {
        time: '0:0:0',
        noteName: 'F4',
        duration: '1n',
        velocity: v
      },
      {
        time: '0:0:1',
        noteName: 'A4',
        duration: '1n',
        velocity: v
      },
      {
        time: '0:0:3',
        noteName: 'G4',
        duration: '1n',
        velocity: v
      },
      {
        time: '0:1:0',
        noteName: 'B4',
        duration: '1n',
        // 0.5
        velocity: v
      },
      {
        time: '0:1:0.5',
        noteName: 'C5',
        // noteName: 'C#5',
        duration: '1n',
        // 0.5
        velocity: v
      },
      {
        time: '0:1:1',
        noteName: 'E4',
        duration: '1n',
        velocity: v
      },
      {
        time: '0:1:2',
        noteName: 'G4',
        duration: '1n',
        velocity: v
      },
      {
        time: '0:1:3',
        noteName: 'A4',
        duration: '1n',
        velocity: v
      },
      {
        time: '0:2:0',
        noteName: 'F4',
        // noteName: 'F#4',
        duration: '1n',
        // 0.5
        velocity: v
      },
      {
        time: '0:2:0.5',
        noteName: 'E4',
        duration: '1n',
        // 0.5
        velocity: v
      },
      {
        time: '0:2:1',
        noteName: 'G4',
        duration: '1n',
        velocity: v
      },
      {
        time: '0:2:3',
        noteName: 'D4',
        // noteName: 'D#4',
        duration: '1n',
        velocity: v
      },
      {
        time: '0:3:1',
        noteName: 'A4',
        duration: '1n',
        // 0.5
        velocity: v
      },
      {
        time: '0:3:1.5',
        noteName: 'B4',
        duration: '1n',
        // 0.5
        velocity: v
      },
      {
        time: '0:3:2',
        noteName: 'A4',
        duration: '1n',
        // 0.5
        velocity: v
      },
      {
        time: '0:3:2.5',
        noteName: 'B4',
        duration: '1n',
        // 0.5
        velocity: v
      },
      {
        time: '1:0:0',
        noteName: 'G4',
        duration: '1n',
        velocity: v
      },
      {
        time: '1:0:1',
        noteName: 'G4',
        duration: '1n',
        velocity: v
      },
      {
        time: '1:0:2',
        noteName: 'G4',
        duration: '1n',
        velocity: v
      },
      {
        time: '1:0:3',
        noteName: 'A4',
        duration: '1n',
        velocity: v
      },
      {
        time: '1:1:0',
        noteName: 'B4',
        duration: '1n',
        velocity: v
      },
      {
        time: '1:1:1',
        noteName: 'B4',
        duration: '1n',
        velocity: v
      },
      {
        time: '1:1:2',
        noteName: 'B4',
        duration: '1n',
        velocity: v
      },
      {
        time: '1:1:3',
        noteName: 'A4',
        duration: '1n',
        velocity: v
      },
      {
        time: '1:2:0',
        noteName: 'G4',
        duration: '1n',
        // 0.5
        velocity: v
      },
      {
        time: '1:2:0.5',
        noteName: 'A4',
        duration: '1n',
        // 0.5
        velocity: v
      },
      {
        time: '1:2:1',
        noteName: 'G4',
        duration: '1n',
        // 0.5
        velocity: v
      },
      {
        time: '1:2:1.5',
        noteName: 'A4',
        duration: '1n',
        // 0.5
        velocity: v
      },
      {
        time: '1:3:1',
        noteName: 'F4',
        duration: '1n',
        velocity: v
      },
      {
        time: '1:3:2',
        noteName: 'G4',
        duration: '1n',
        velocity: v
      },
      {
        time: '2:0:0',
        noteName: 'A4',
        duration: '1n',
        // 0.5
        velocity: v
      },
      {
        time: '2:0:0.5',
        noteName: 'G4',
        duration: '1n',
        // 0.5
        velocity: v
      },
      {
        time: '2:0:1',
        noteName: 'A4',
        duration: '1n',
        // 0.5
        velocity: v
      },
      {
        time: '2:0:1.5',
        noteName: 'G4',
        duration: '1n',
        // 0.5
        velocity: v
      },
      {
        time: '2:0:2',
        noteName: 'B4',
        duration: '1n',
        // 0.5
        velocity: v
      },
      {
        time: '2:0:3',
        noteName: 'C5',
        duration: '1n',
        // 0.5
        velocity: v
      },
      {
        time: '2:1:0',
        noteName: 'C5',
        duration: '1n',
        velocity: v
      },
      {
        time: '2:1:1',
        noteName: 'C5',
        duration: '1n',
        velocity: v
      },
      {
        time: '2:1:2',
        noteName: 'C5',
        duration: '1n',
        velocity: v
      },
      {
        time: '2:2:1',
        noteName: 'A4',
        duration: '1n',
        velocity: v
      },
      {
        time: '2:2:3',
        noteName: 'G4',
        duration: '1n',
        velocity: v
      },
      {
        time: '2:3:1',
        noteName: 'E4',
        duration: '1n',
        velocity: v
      },
      {
        time: '2:3:3',
        noteName: 'D4',
        duration: '1n',
        velocity: v
      },
      {
        time: '3:0:1',
        noteName: 'C4',
        duration: '1n',
        velocity: v
      }
    ]
  )

  part.loop = true
  part.loopEnd = '4m'

  return part
}

export {
  part,
  metalSynth,
  tremolo,
  vibrato,
  distortion,
  stereoWidener,
  jcReverb,
  feedbackDelay,
  feedbackEffect,
  phaser,
  pingPongDelay,
  freeverb
}
