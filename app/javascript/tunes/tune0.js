import Tone from 'tone'

export default function tune0() {
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

  let synth = new Tone.PolySynth(3, Tone.Synth, {
    oscillator: {
      type: 'fatsawtooth',
      count: 3,
      spread: 30
    },
    envelope: {
      attack: 0.01,
      decay: 0.1,
      sustain: 0.5,
      release: 0.4,
      attackCurve: 'exponential'
    }
  }).toMaster()

  // Van Halen - Jump MIDI from http://www.midiworld.com/files/1121/
  // converted using

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
        time: '192i',
        noteName: 'G4',
        velocity: 0.8110236220472441,
        duration: '104i'
      },
      {
        time: '192i',
        noteName: 'B4',
        velocity: 0.7874015748031497,
        duration: '104i'
      },
      {
        time: '192i',
        noteName: 'D5',
        velocity: 0.8031496062992126,
        duration: '104i'
      },
      {
        time: '480i',
        noteName: 'G4',
        velocity: 0.7559055118110236,
        duration: '104i'
      },
      {
        time: '480i',
        noteName: 'C5',
        velocity: 0.6850393700787402,
        duration: '104i'
      },
      {
        time: '480i',
        noteName: 'E5',
        velocity: 0.6771653543307087,
        duration: '104i'
      },
      {
        time: '768i',
        noteName: 'F4',
        velocity: 0.8661417322834646,
        duration: '104i'
      },
      {
        time: '768i',
        noteName: 'A4',
        velocity: 0.8346456692913385,
        duration: '104i'
      },
      {
        time: '768i',
        noteName: 'C5',
        velocity: 0.8188976377952756,
        duration: '104i'
      },
      {
        time: '1056i',
        noteName: 'F4',
        velocity: 0.7007874015748031,
        duration: '104i'
      },
      {
        time: '1056i',
        noteName: 'A4',
        velocity: 0.6850393700787402,
        duration: '104i'
      },
      {
        time: '1056i',
        noteName: 'C5',
        velocity: 0.6614173228346457,
        duration: '104i'
      },
      {
        time: '1248i',
        noteName: 'G4',
        velocity: 0.6771653543307087,
        duration: '104i'
      },
      {
        time: '1248i',
        noteName: 'B4',
        velocity: 0.6771653543307087,
        duration: '104i'
      },
      {
        time: '1248i',
        noteName: 'D5',
        velocity: 0.7165354330708661,
        duration: '104i'
      },
      {
        time: '1440i',
        noteName: 'G4',
        velocity: 0.8818897637795275,
        duration: '248i'
      },
      {
        time: '1440i',
        noteName: 'B4',
        velocity: 0.84251968503937,
        duration: '248i'
      },
      {
        time: '1440i',
        noteName: 'D5',
        velocity: 0.8818897637795275,
        duration: '248i'
      },
      {
        time: '1728i',
        noteName: 'G4',
        velocity: 0.8267716535433071,
        duration: '104i'
      },
      {
        time: '1728i',
        noteName: 'C5',
        velocity: 0.8031496062992126,
        duration: '104i'
      },
      {
        time: '1728i',
        noteName: 'E5',
        velocity: 0.8188976377952756,
        duration: '104i'
      },
      {
        time: '2016i',
        noteName: 'F4',
        velocity: 0.7086614173228346,
        duration: '104i'
      },
      {
        time: '2016i',
        noteName: 'A4',
        velocity: 0.7244094488188977,
        duration: '104i'
      },
      {
        time: '2016i',
        noteName: 'C5',
        velocity: 0.7007874015748031,
        duration: '104i'
      },
      {
        time: '2208i',
        noteName: 'C4',
        velocity: 0.9921259842519685,
        duration: '296i'
      },
      {
        time: '2208i',
        noteName: 'F4',
        velocity: 0.968503937007874,
        duration: '200i'
      },
      {
        time: '2208i',
        noteName: 'A4',
        velocity: 0.9606299212598425,
        duration: '208i'
      },
      {
        time: '2400i',
        noteName: 'E4',
        velocity: 0.7559055118110236,
        duration: '104i'
      },
      {
        time: '2400i',
        noteName: 'G4',
        velocity: 0.7007874015748031,
        duration: '104i'
      },
      {
        time: '2592i',
        noteName: 'C4',
        velocity: 0.968503937007874,
        duration: '488i'
      },
      {
        time: '2592i',
        noteName: 'D4',
        velocity: 0.9448818897637795,
        duration: '488i'
      },
      {
        time: '2592i',
        noteName: 'G4',
        velocity: 0.937007874015748,
        duration: '488i'
      }
    ]
  ).start(0)

  part.loop = true
  part.loopEnd = '4m'

  Tone.Transport.bpm.value = 132
  Tone.Transport.start()

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
}
