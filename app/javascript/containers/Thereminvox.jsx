import React from 'react'
import Tone from 'tone'

export default class Thereminvox extends React.Component {
  constructor(props) {
    super(props)

    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)()
    let oscillator = audioContext.createOscillator()
    oscillator.type = 'sine'

    let analyser = audioContext.createAnalyser()
    analyser.fftSize = 2048
    oscillator.connect(analyser)

    this.state = {
      audioContext: audioContext,
      oscillator: oscillator,
      analyser: analyser,
      playing: false,
      x: 0,
      y: 0,
      fftData: []
    }

    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleStart = this.handleStart.bind(this)
    this.handleStop = this.handleStop.bind(this)
    this.handleStartOrStopClick = this.handleStartOrStopClick.bind(this)
    this.changeFrequency = this.changeFrequency.bind(this)
    this.changeDetune = this.changeDetune.bind(this)
    this.changeVisualization = this.changeVisualization.bind(this)
    this.handleSynthPlay = this.handleSynthPlay.bind(this)
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.handleMouseMove)
  }

  handleMouseMove(e) {
    this.setState({
      x: e.clientX,
      y: e.clientY
    })

    this.changeFrequency()
    this.changeDetune()
    this.changeVisualization()
  }

  handleStartOrStopClick() {
    let { playing } = this.state

    if (playing) {
      this.handleStop()
    } else {
      this.handleStart()
    }
  }

  handleSynthPlay() {
    // let synth = new Tone.Synth().toMaster()
    // synth.triggerAttackRelease('A4', '4n')

    // let pattern = new Tone.Pattern(
    //   function(time, note) {
    //     synth.triggerAttackRelease(note, '16n')
    //   },
    //   ['C4', 'D4', 'E4', 'G4', 'A4']
    // )
    //
    // pattern.start(0)

    // let loop = new Tone.Loop(function(time) {
    //   synth.triggerAttackRelease('C2', '8n', time)
    // }, '4n')
    //
    // loop.start('1m').stop('4m')

    // let synth = new Tone.Synth({
    //   oscillator: {
    //     type: 'pwm',
    //     modulationFrequency: 0.2
    //   },
    //   envelope: {
    //     attack: 0.02,
    //     decay: 0.1,
    //     sustain: 0.2,
    //     release: 0.1
    //   }
    // }).toMaster()
    //
    // synth.triggerAttack('D3', '1')

    // let polySynth = new Tone.PolySynth(4, Tone.Synth).toMaster()
    // polySynth.triggerAttackRelease(['C4', 'E4', 'G4', 'B4'], '2n')
    //
    // let distortion = new Tone.Distortion(0.4).toMaster()
    // polySynth.connect(distortion)

    // let pwm = new Tone.PWMOscillator('Bb3').toMaster().start()

    // let part = new Tone.Part(
    //   function(time, pitch) {
    //     synth.triggerAttackRelease(pitch, '8n', time)
    //   },
    //   [['0', 'C#3'], ['4n', 'G3'], [3 * Tone.Time('8n'), 'G#3'], ['2n', 'C3']]
    // )
    //
    // part.start('4m')

    // let env = new Tone.AmplitudeEnvelope({
    //   attack: 0.11,
    //   decay: 0.21,
    //   sustain: 0.5,
    //   release: 1.2
    // }).toMaster()
    //
    // let osc = new Tone.Oscillator({
    //   partials: [3, 2, 1],
    //   type: 'custom',
    //   frequency: 'C#4',
    //   volume: -8
    // })
    //   .connect(env)
    //   .start()
    //
    // env.triggerAttack()
    //
    // let noise = new Tone.Noise({
    //   volume: -10,
    //   type: 'brown'
    // }).toMaster()
    //
    // noise.start()

    // Tone.Transport.bpm.value = 220
    // Tone.Transport.start()

    // let note = new Tone.Event(function(time, pitch) {
    //   synth.triggerAttackRelease(pitch, '16n', time)
    // }, 'C2')
    //
    // note.set({
    //   loop: true,
    //   loopEnd: '2n'
    // })
    //
    // note.start(0)
    // note.stop('4m')

    // Tone.Transport.scheduleRepeat(
    //   function(time) {
    //     synth.triggerAttack(time)
    //   },
    //   '8n',
    //   '1m'
    // )

    // let synth = new Tone.Synth({
    //   oscillator: {
    //     type: 'amtriangle',
    //     harmonicity: 0.5,
    //     modulationType: 'sine'
    //   },
    //   envelope: {
    //     attackCurve: 'exponential',
    //     attack: 0.05,
    //     decay: 0.2,
    //     sustain: 0.2,
    //     release: 0.4
    //   },
    //   portamento: 0.05
    // }).toMaster()

    // FM Synth
    // let synth = new Tone.FMSynth({
    //   modulationIndex: 12.22,
    //   envelope: {
    //     attack: 0.01,
    //     decay: 0.2
    //   },
    //   modulation: {
    //     type: 'square'
    //   },
    //   modulationEnvelope: {
    //     attack: 0.2,
    //     decay: 0.01
    //   }
    // }).toMaster()

    // AM Synth
    // let synth = new Tone.AMSynth({
    //   harmonicity: 2.5,
    //   oscillator: {
    //     type: 'fatsawtooth'
    //   },
    //   envelope: {
    //     attack: 0.1,
    //     decay: 0.2,
    //     sustain: 0.2,
    //     release: 0.3
    //   },
    //   modulation: {
    //     type: 'square'
    //   },
    //   modulationEnvelope: {
    //     attack: 0.5,
    //     decay: 0.01
    //   }
    // }).toMaster()

    // synth.triggerAttackRelease('C4', synth.envelope.release)

    // PolySynth
    // let synth = new Tone.PolySynth(8, Tone.Synth, {
    //   oscillator: {
    //     partials: [0, 2, 3, 4]
    //   }
    // }).toMaster()

    // synth.triggerAttackRelease('C4', '8n')

    // let synth = new Tone.PolySynth(3, Tone.Synth, {
    //   oscillator: {
    //     type: 'fatsawtooth',
    //     count: 3,
    //     spread: 30
    //   },
    //   envelope: {
    //     attack: 0.01,
    //     decay: 0.1,
    //     sustain: 0.5,
    //     release: 0.4,
    //     attackCurve: 'exponential'
    //   }
    // }).toMaster()

    // Van Halen - Jump MIDI from http://www.midiworld.com/files/1121/
    // converted using

    // let part = new Tone.Part(
    //   function(time, note) {
    //     synth.triggerAttackRelease(
    //       note.noteName,
    //       note.duration,
    //       time,
    //       note.velocity
    //     )
    //   },
    //   [
    //     {
    //       time: '192i',
    //       noteName: 'G4',
    //       velocity: 0.8110236220472441,
    //       duration: '104i'
    //     },
    //     {
    //       time: '192i',
    //       noteName: 'B4',
    //       velocity: 0.7874015748031497,
    //       duration: '104i'
    //     },
    //     {
    //       time: '192i',
    //       noteName: 'D5',
    //       velocity: 0.8031496062992126,
    //       duration: '104i'
    //     },
    //     {
    //       time: '480i',
    //       noteName: 'G4',
    //       velocity: 0.7559055118110236,
    //       duration: '104i'
    //     },
    //     {
    //       time: '480i',
    //       noteName: 'C5',
    //       velocity: 0.6850393700787402,
    //       duration: '104i'
    //     },
    //     {
    //       time: '480i',
    //       noteName: 'E5',
    //       velocity: 0.6771653543307087,
    //       duration: '104i'
    //     },
    //     {
    //       time: '768i',
    //       noteName: 'F4',
    //       velocity: 0.8661417322834646,
    //       duration: '104i'
    //     },
    //     {
    //       time: '768i',
    //       noteName: 'A4',
    //       velocity: 0.8346456692913385,
    //       duration: '104i'
    //     },
    //     {
    //       time: '768i',
    //       noteName: 'C5',
    //       velocity: 0.8188976377952756,
    //       duration: '104i'
    //     },
    //     {
    //       time: '1056i',
    //       noteName: 'F4',
    //       velocity: 0.7007874015748031,
    //       duration: '104i'
    //     },
    //     {
    //       time: '1056i',
    //       noteName: 'A4',
    //       velocity: 0.6850393700787402,
    //       duration: '104i'
    //     },
    //     {
    //       time: '1056i',
    //       noteName: 'C5',
    //       velocity: 0.6614173228346457,
    //       duration: '104i'
    //     },
    //     {
    //       time: '1248i',
    //       noteName: 'G4',
    //       velocity: 0.6771653543307087,
    //       duration: '104i'
    //     },
    //     {
    //       time: '1248i',
    //       noteName: 'B4',
    //       velocity: 0.6771653543307087,
    //       duration: '104i'
    //     },
    //     {
    //       time: '1248i',
    //       noteName: 'D5',
    //       velocity: 0.7165354330708661,
    //       duration: '104i'
    //     },
    //     {
    //       time: '1440i',
    //       noteName: 'G4',
    //       velocity: 0.8818897637795275,
    //       duration: '248i'
    //     },
    //     {
    //       time: '1440i',
    //       noteName: 'B4',
    //       velocity: 0.84251968503937,
    //       duration: '248i'
    //     },
    //     {
    //       time: '1440i',
    //       noteName: 'D5',
    //       velocity: 0.8818897637795275,
    //       duration: '248i'
    //     },
    //     {
    //       time: '1728i',
    //       noteName: 'G4',
    //       velocity: 0.8267716535433071,
    //       duration: '104i'
    //     },
    //     {
    //       time: '1728i',
    //       noteName: 'C5',
    //       velocity: 0.8031496062992126,
    //       duration: '104i'
    //     },
    //     {
    //       time: '1728i',
    //       noteName: 'E5',
    //       velocity: 0.8188976377952756,
    //       duration: '104i'
    //     },
    //     {
    //       time: '2016i',
    //       noteName: 'F4',
    //       velocity: 0.7086614173228346,
    //       duration: '104i'
    //     },
    //     {
    //       time: '2016i',
    //       noteName: 'A4',
    //       velocity: 0.7244094488188977,
    //       duration: '104i'
    //     },
    //     {
    //       time: '2016i',
    //       noteName: 'C5',
    //       velocity: 0.7007874015748031,
    //       duration: '104i'
    //     },
    //     {
    //       time: '2208i',
    //       noteName: 'C4',
    //       velocity: 0.9921259842519685,
    //       duration: '296i'
    //     },
    //     {
    //       time: '2208i',
    //       noteName: 'F4',
    //       velocity: 0.968503937007874,
    //       duration: '200i'
    //     },
    //     {
    //       time: '2208i',
    //       noteName: 'A4',
    //       velocity: 0.9606299212598425,
    //       duration: '208i'
    //     },
    //     {
    //       time: '2400i',
    //       noteName: 'E4',
    //       velocity: 0.7559055118110236,
    //       duration: '104i'
    //     },
    //     {
    //       time: '2400i',
    //       noteName: 'G4',
    //       velocity: 0.7007874015748031,
    //       duration: '104i'
    //     },
    //     {
    //       time: '2592i',
    //       noteName: 'C4',
    //       velocity: 0.968503937007874,
    //       duration: '488i'
    //     },
    //     {
    //       time: '2592i',
    //       noteName: 'D4',
    //       velocity: 0.9448818897637795,
    //       duration: '488i'
    //     },
    //     {
    //       time: '2592i',
    //       noteName: 'G4',
    //       velocity: 0.937007874015748,
    //       duration: '488i'
    //     }
    //   ]
    // ).start(0)

    // part.loop = true
    // part.loopEnd = '4m'

    // Tone.Transport.bpm.value = 132
    // Tone.Transport.start()

    // let bell = new Tone.MetalSynth({
    //   harmonicity: 12,
    //   resonance: 800,
    //   modulationIndex: 20,
    //   envelope: {
    //     decay: 0.4
    //   },
    //   volume: -15
    // }).toMaster()
    //
    // let bellPart = new Tone.Sequence(
    //   function(time, freq) {
    //     bell.frequency.setValueAtTime(freq, time, Math.random() * 0.5 + 0.5)
    //     bell.triggerAttack(time)
    //   },
    //   [[300, null, 200], [null, 200, 200], [null, 200, null], [200, null, 200]],
    //   '4n'
    // ).start(0)
    //
    // // bellPart.loop = true;
    // // bellPart.loopEnd = "1m";
    //
    // let conga = new Tone.MembraneSynth({
    //   pitchDecay: 0.008,
    //   octaves: 2,
    //   envelope: {
    //     attack: 0.0006,
    //     decay: 0.5,
    //     sustain: 0
    //   }
    // }).toMaster()
    //
    // let congaPart = new Tone.Sequence(
    //   function(time, pitch) {
    //     conga.triggerAttack(pitch, time, Math.random() * 0.5 + 0.5)
    //   },
    //   ['G3', 'C4', 'C4', 'C4'],
    //   '4n'
    // ).start(0)
    //
    // // congaPart.loop = true;
    // // congaPart.loopEnd = "1m";
    //
    // Tone.Transport.bpm.value = 115
    // Tone.Transport.start()

    console.log('bla')

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
        count: 3,
        spread: 30,
        phase: 10
        // fadeIn: 4
      },
      envelope: {
        attack: 1,
        decay: 1,
        sustain: 1,
        release: 5,
        attackCurve: 'exponential'
      }
    }).toMaster()

    synth.connect(panner)
    synth.connect(filter)
    synth.connect(cheby)
    // synth.connect(crusher)
    synth.connect(dist)
    synth.connect(feedbackDelay)
    synth.connect(tremolo)
    synth.connect(phaser)
    synth.connect(reverb)

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
          duration: '32n'
        },
        {
          time: '0:1:0',
          noteName: 'D3',
          velocity: 1,
          duration: '32n'
        },
        {
          time: '0:2:0',
          noteName: 'E3',
          velocity: 1,
          duration: '32n'
        },
        {
          time: '0:3:0',
          noteName: 'F3',
          velocity: 1,
          duration: '32n'
        },
        {
          time: '1:0:0',
          noteName: 'G3',
          velocity: 1,
          duration: '32n'
        },
        {
          time: '1:1:0',
          noteName: 'A3',
          velocity: 1,
          duration: '32n'
        },
        {
          time: '1:2:0',
          noteName: 'B3',
          velocity: 1,
          duration: '32n'
        },
        {
          time: '1:3:0',
          noteName: 'C4',
          velocity: 1,
          duration: '32n'
        },
        {
          time: '2:0:0',
          noteName: 'D4',
          velocity: 1,
          duration: '32n'
        },
        {
          time: '2:1:0',
          noteName: 'E4',
          velocity: 1,
          duration: '32n'
        },
        {
          time: '2:2:0',
          noteName: 'F4',
          velocity: 1,
          duration: '32n'
        },
        {
          time: '2:3:0',
          noteName: 'G4',
          velocity: 1,
          duration: '32n'
        },
        {
          time: '3:0:0',
          noteName: 'A4',
          velocity: 1,
          duration: '32n'
        },
        {
          time: '3:1:0',
          noteName: 'B4',
          velocity: 1,
          duration: '32n'
        },
        {
          time: '3:2:0',
          noteName: 'C5',
          velocity: 1,
          duration: '32n'
        },
        {
          time: '3:3:0',
          noteName: 'D5',
          velocity: 1,
          duration: '32n'
        }
      ]
    ).start(0)

    part.loop = true
    part.loopEnd = '4m'

    // Tone.Transport.bpm.value = 132
    Tone.Transport.bpm.value = 10
    Tone.Transport.start()
  }

  handleStart() {
    let { audioContext, oscillator, analyser, x, y } = this.state

    oscillator = audioContext.createOscillator()
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(x, audioContext.currentTime)
    oscillator.connect(audioContext.destination)
    oscillator.start()

    analyser = audioContext.createAnalyser()
    analyser.fftSize = 2048
    oscillator.connect(analyser)

    this.setState({
      oscillator: oscillator,
      analyser: analyser,
      playing: true
    })
  }

  handleStop() {
    let { oscillator } = this.state
    oscillator.stop()

    this.setState({
      oscillator: oscillator,
      playing: false
    })
  }

  changeFrequency() {
    let { audioContext, oscillator, x, y } = this.state
    oscillator.frequency.setValueAtTime(x, audioContext.currentTime)
  }

  changeDetune() {
    let { audioContext, oscillator, x, y } = this.state
    oscillator.detune.setValueAtTime(y, audioContext.currentTime)
  }

  changeVisualization() {
    const { analyser, playing } = this.state

    if (playing) {
      const bufferLength = analyser.frequencyBinCount
      let dataArray = new Uint8Array(bufferLength)
      analyser.getByteTimeDomainData(dataArray)

      this.setState({
        fftData: dataArray
      })
    }
  }

  render() {
    const { playing, analyser, fftData } = this.state
    let button = 'Start'

    if (playing) {
      button = 'Stop'
    }

    let elements = []

    if (fftData != undefined) {
      fftData.map(function(fftParam, i) {
        elements.push(
          <div
            key={i}
            className="analyserCol"
            style={{ height: fftParam + 'px' }}
          />
        )
      })
    }

    return (
      <div>
        <div onClick={this.handleSynthPlay}>Synth</div>
        <div onClick={this.handleStartOrStopClick}>{button}</div>
        <div className="analyser">{elements}</div>
      </div>
    )
  }
}
