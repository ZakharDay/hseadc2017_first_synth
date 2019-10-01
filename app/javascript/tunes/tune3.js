import Tone from 'tone'

export default function tune3() {
  let reverb = new Tone.Reverb({
    decay: 1.5,
    preDelay: 0.01
  }).toMaster()

  let panner = new Tone.AutoPanner({
    frequency: 4,
    depth: 1
  }).toMaster()

  let filter = new Tone.AutoFilter({
    frequency: 2,
    depth: 0.6
  }).toMaster()

  let tremolo = new Tone.Tremolo({
    frequency: 3,
    depth: 2
  }).toMaster()

  var feedbackDelay = new Tone.FeedbackDelay('4n', 0.8).toMaster()
  let dist = new Tone.Distortion({
    distortion: 1,
    oversample: '4x'
  }).toMaster()

  let cheby = new Tone.Chebyshev(50)

  let crusher = new Tone.BitCrusher(8).toMaster()

  let phaser = new Tone.Phaser({
    frequency: 15,
    octaves: 5,
    baseFrequency: 1000
  }).toMaster()

  let synth = new Tone.PolySynth(1, Tone.Synth, {
    oscillator: {
      // fatsawtooth
      type: 'fatsawtooth',
      count: 1
      // spread: 30,
      // phase: 10
      // fadeIn: 4
    }
    // envelope: {
    //   attack: 1,
    //   decay: 1,
    //   sustain: 1,
    //   release: 5,
    //   attackCurve: 'exponential'
    // }
  }).toMaster()

  // synth.connect(panner)
  // synth.connect(filter)
  // synth.connect(cheby)
  // // synth.connect(crusher)
  // synth.connect(dist)
  // synth.connect(feedbackDelay)
  // synth.connect(tremolo)
  // synth.connect(phaser)
  // synth.connect(reverb)

  let synth2 = new Tone.PolySynth(1, Tone.Synth, {
    oscillator: {
      // fatsawtooth
      type: 'sine'
      // count: 1,
      // spread: 30
      // phase: 10
      // fadeIn: 4
    },
    envelope: {
      attack: 0.3,
      decay: 1,
      sustain: 1,
      release: 5,
      attackCurve: 'exponential'
    }
  }).toMaster()

  synth2.connect(panner)
  synth2.connect(filter)
  // synth2.connect(cheby)
  // synth.connect(crusher)
  synth2.connect(dist)
  synth2.connect(feedbackDelay)
  // synth2.connect(tremolo)
  // synth2.connect(phaser)
  synth2.connect(reverb)

  let synth3 = new Tone.PolySynth(1, Tone.Synth, {
    oscillator: {
      // fatsawtooth
      type: 'square'
      // count: 1,
      // spread: 30
      // phase: 10
      // fadeIn: 4
    },
    envelope: {
      attack: 0.3,
      decay: 0.1,
      sustain: 0.3,
      release: 1,
      attackCurve: 'exponential'
    }
  }).toMaster()

  synth3.connect(panner)
  synth3.connect(filter)
  // synth2.connect(cheby)
  // synth.connect(crusher)
  synth3.connect(dist)
  synth3.connect(feedbackDelay)
  // synth2.connect(tremolo)
  // synth2.connect(phaser)
  synth3.connect(reverb)

  let part = new Tone.Part(
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
        noteName: 'C3',
        velocity: 1,
        duration: '4n'
      },
      {
        time: '1:0:0',
        noteName: 'E3',
        velocity: 1,
        duration: '4n'
      },
      {
        time: '2:0:0',
        noteName: 'A2',
        velocity: 1,
        duration: '4n'
      },
      {
        time: '3:0:0',
        noteName: 'G2',
        velocity: 1,
        duration: '4n'
      },
      {
        time: '4:0:0',
        noteName: 'E2',
        velocity: 1,
        duration: '4n'
      },
      {
        time: '5:0:0',
        noteName: 'F2',
        velocity: 1,
        duration: '4n'
      },
      {
        time: '6:0:0',
        noteName: 'A2',
        velocity: 1,
        duration: '4n'
      },
      {
        time: '7:0:0',
        noteName: 'D3',
        velocity: 1,
        duration: '4n'
      }
    ]
  ) //.start(0)

  // part.loop = true
  // part.loopEnd = '8m'

  let part2 = new Tone.Part(
    function(time, note) {
      synth2.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    },
    [
      {
        time: '0:0:0',
        noteName: 'C3',
        velocity: 1,
        duration: '32n'
      },
      {
        time: '0:1:0',
        noteName: 'E3',
        velocity: 1,
        duration: '32n'
      },
      {
        time: '0:2:0',
        noteName: 'A2',
        velocity: 1,
        duration: '32n'
      },
      {
        time: '0:3:0',
        noteName: 'G2',
        velocity: 1,
        duration: '32n'
      },
      {
        time: '1:0:0',
        noteName: 'E2',
        velocity: 1,
        duration: '32n'
      },
      {
        time: '1:1:0',
        noteName: 'F2',
        velocity: 1,
        duration: '32n'
      },
      {
        time: '1:2:0',
        noteName: 'A2',
        velocity: 1,
        duration: '32n'
      },
      {
        time: '1:3:0',
        noteName: 'D3',
        velocity: 1,
        duration: '32n'
      }
    ]
  ) //.start(0)

  // part2.loop = true
  // part2.loopEnd = '2m'

  let part3 = new Tone.Part(
    function(time, note) {
      synth3.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    },
    [
      {
        time: '0:0:0',
        noteName: 'C5',
        velocity: 0.3,
        duration: '32n'
      },
      {
        time: '0:1:3',
        noteName: 'E5',
        velocity: 0.3,
        duration: '32n'
      },
      {
        time: '1:2:2',
        noteName: 'A5',
        velocity: 0.3,
        duration: '32n'
      }
      // {
      //   time: '0:3:0',
      //   noteName: 'G5',
      //   velocity: 1,
      //   duration: '32n'
      // },
      // {
      //   time: '1:0:0',
      //   noteName: 'E4',
      //   velocity: 1,
      //   duration: '32n'
      // },
      // {
      //   time: '1:1:0',
      //   noteName: 'F4',
      //   velocity: 1,
      //   duration: '32n'
      // },
      // {
      //   time: '1:2:0',
      //   noteName: 'A5',
      //   velocity: 1,
      //   duration: '32n'
      // },
      // {
      //   time: '1:3:0',
      //   noteName: 'D5',
      //   velocity: 1,
      //   duration: '32n'
      // }
    ]
  ).start(0)

  part3.loop = true
  part3.loopEnd = '2m'

  // Tone.Transport.bpm.value = 132
  Tone.Transport.bpm.value = 60
  Tone.Transport.start()
}
