import _ from 'lodash'
import React from 'react'
import Tone from 'tone'

import * as effects from '../tunes/effects'
import * as parts from '../tunes/parts'
import * as synths from '../tunes/synths'

import AutoFilter from '../components/effects/AutoFilter'
import AutoPanner from '../components/effects/AutoPanner'
import AutoWah from '../components/effects/AutoWah'
import BitCrusher from '../components/effects/BitCrusher'
import Chebyshev from '../components/effects/Chebyshev'
import Chorus from '../components/effects/Chorus'
import Distortion from '../components/effects/Distortion'
import FeedbackDelay from '../components/effects/FeedbackDelay'
import FeedbackEffect from '../components/effects/FeedbackEffect'
import Freeverb from '../components/effects/Freeverb'
import JcReverb from '../components/effects/JcReverb'
import Phaser from '../components/effects/Phaser'
import PingPongDelay from '../components/effects/PingPongDelay'
import PitchShift from '../components/effects/PitchShift'
import Reverb from '../components/effects/Reverb'
import StereoWidener from '../components/effects/StereoWidener'
import Tremolo from '../components/effects/Tremolo'
import Vibrato from '../components/effects/Vibrato'

import ToneSynth from '../components/synths/ToneSynth'
import NoiseSynth from '../components/synths/NoiseSynth'
import PolySynth from '../components/synths/PolySynth'

export default class Synth extends React.Component {
  constructor(props) {
    super(props)

    const defaultWetValue = 0.8

    let ambientSynth = synths.toneSynth()
    let ambientAutoFilter = effects.autoFilter()
    let ambientChorus = effects.chorus()
    let ambientDistortion = effects.distortion()
    let ambientFeedbackDelay = effects.feedbackDelay()
    let ambientFreeverb = effects.freeverb()
    let ambientPhaser = effects.phaser()
    let ambientPingPongDelay = effects.pingPongDelay()

    let leadSynth = synths.polySynth()
    let leadAutoPanner = effects.autoPanner()
    let leadAutoWah = effects.autoWah()
    let leadBitCrusher = effects.bitCrusher()
    let leadChebyshev = effects.chebyshev()
    let leadDistortion = effects.distortion()
    let leadFeedbackEffect = effects.feedbackEffect()
    let leadJcReverb = effects.jcReverb()
    let leadPitchShift = effects.pitchShift()
    let leadReverb = effects.reverb()
    let leadStereoWidener = effects.stereoWidener()
    let leadTremolo = effects.tremolo()
    let leadVibrato = effects.vibrato()

    let loop1 = new Tone.Loop(function(time) {
      ambientSynth.triggerAttackRelease('C2', '8n', time)
    }, '4n')

    let loop3 = new Tone.Loop(function(time) {
      leadSynth.triggerAttackRelease('C4', '1m', time)
    }, '1m')

    ambientSynth.chain(
      ambientAutoFilter,
      ambientChorus,
      ambientDistortion,
      ambientFeedbackDelay,
      ambientFreeverb,
      ambientPhaser,
      ambientPingPongDelay,
      Tone.Master
    )
    ambientPingPongDelay.toMaster()

    leadSynth.chain(
      leadAutoPanner,
      leadAutoWah,
      leadBitCrusher,
      leadChebyshev,
      leadDistortion,
      leadFeedbackEffect,
      leadJcReverb,
      leadPitchShift,
      leadReverb,
      leadStereoWidener,
      leadTremolo,
      leadVibrato,
      Tone.Master
    )

    this.state = {
      ambientSynth,
      ambientAutoFilter: {
        name: 'ambientAutoFilter',
        effect: ambientAutoFilter,
        wet: defaultWetValue,
        on: false
      },
      ambientChorus: {
        name: 'ambientChorus',
        effect: ambientChorus,
        wet: defaultWetValue,
        on: false
      },
      ambientDistortion: {
        name: 'ambientDistortion',
        effect: ambientDistortion,
        wet: defaultWetValue,
        on: false
      },
      ambientFeedbackDelay: {
        name: 'ambientFeedbackDelay',
        effect: ambientFeedbackDelay,
        wet: defaultWetValue,
        on: false
      },
      ambientFreeverb: {
        name: 'ambientFreeverb',
        effect: ambientFreeverb,
        wet: defaultWetValue,
        on: false
      },
      ambientPhaser: {
        name: 'ambientPhaser',
        effect: ambientPhaser,
        wet: defaultWetValue,
        on: false
      },
      ambientPingPongDelay: {
        name: 'ambientPingPongDelay',
        effect: ambientPingPongDelay,
        wet: defaultWetValue,
        on: false
      },
      leadSynth,
      leadAutoPanner: {
        name: 'leadAutoPanner',
        effect: leadAutoPanner,
        wet: defaultWetValue,
        on: false
      },
      leadAutoWah: {
        name: 'leadAutoWah',
        effect: leadAutoWah,
        wet: defaultWetValue,
        on: false
      },
      leadBitCrusher: {
        name: 'leadBitCrusher',
        effect: leadBitCrusher,
        wet: defaultWetValue,
        on: false
      },
      leadChebyshev: {
        name: 'leadChebyshev',
        effect: leadChebyshev,
        wet: defaultWetValue,
        on: false
      },
      leadDistortion: {
        name: 'leadDistortion',
        effect: leadDistortion,
        wet: defaultWetValue,
        on: false
      },
      leadFeedbackEffect: {
        name: 'leadFeedbackEffect',
        effect: leadFeedbackEffect,
        wet: defaultWetValue,
        on: false
      },
      leadJcReverb: {
        name: 'leadJcReverb',
        effect: leadJcReverb,
        wet: defaultWetValue,
        on: false
      },
      leadPitchShift: {
        name: 'leadPitchShift',
        effect: leadPitchShift,
        wet: defaultWetValue,
        on: false
      },
      leadReverb: {
        name: 'leadReverb',
        effect: leadReverb,
        wet: defaultWetValue,
        on: false
      },
      leadStereoWidener: {
        name: 'leadStereoWidener',
        effect: leadStereoWidener,
        wet: defaultWetValue,
        on: false
      },
      leadTremolo: {
        name: 'leadTremolo',
        effect: leadTremolo,
        wet: defaultWetValue,
        on: false
      },
      leadVibrato: {
        name: 'leadVibrato',
        effect: leadVibrato,
        wet: defaultWetValue,
        on: false
      },
      loop1: {
        loop: loop1,
        on: false
      },
      loop3: {
        loop: loop3,
        on: false
      },
      part1: {
        part: parts.part1(leadSynth),
        on: false
      },
      lastChange: Date.now(),
      timeout: 100
    }

    _.bindAll(
      this,
      // 'getRandomArbitrary',
      // 'generateRandom',
      'toggleLoop',
      'togglePart',
      'changeSynthValue',
      'toggleEffect',
      'changeEffectWetValue',
      'changeEffectValue'
    )

    Tone.Transport.bpm.value = 130
    // Tone.Transport.bpm.value = 30
    Tone.Transport.start()
  }

  // componentDidMount() {
  //   this.generateRandom()
  // }

  // getRandomArbitrary(min, max) {
  //   return Math.floor(Math.random() * (max - min)) + min
  // }

  // generateRandom() {
  //   const { lastChange, timeout } = this.state
  //
  //   if (Date.now() - lastChange >= timeout) {
  //     const random = this.getRandomArbitrary(100, 3000)
  //
  //     this.setState({
  //       lastChange: Date.now(),
  //       timeout: random
  //     })
  //
  //     this.changeDistortionValue('distortion', random / 30)
  //   }
  //
  //   setTimeout(() => this.generateRandom(), timeout)
  // }

  toggleLoop(loopName) {
    let { loop, on } = this.state[loopName]

    on == true ? loop.stop() : loop.start('0m')

    this.setState({
      [`${loopName}`]: {
        loop: loop,
        on: !on
      }
    })
  }

  togglePart(partName) {
    let { part, on } = this.state[partName]

    if (on == true) {
      part.stop()
    } else {
      console.log('yo')
      part.at('1m')
      part.start(0)
      part.loop = true
      part.loopEnd = '8m'
    }

    this.setState({
      [`${partName}`]: {
        part: part,
        on: !on
      }
    })
  }

  changeSynthValue(synthName, effectName, value) {
    let synth = this.state[synthName]
    let envelope = synth.instrument.envelope
    envelope[effectName] = value

    this.setState({
      [`${effectName}`]: {
        oscillator: synth.instrument.oscillator,
        envelope: envelope
      }
    })
  }

  toggleEffect(effectName) {
    let { name, effect, wet, on } = this.state[effectName]

    effect.wet.value = on == true ? 0 : wet
    on = !on

    this.setState({
      [`${effectName}`]: {
        name,
        effect,
        wet,
        on
      }
    })
  }

  changeEffectWetValue(effectName, effectProperty, value) {
    let { name, effect, wet, on } = this.state[effectName]

    effect[effectProperty].value = on == true ? value : 0
    wet = value

    this.setState({
      [`${effectName}`]: {
        name,
        effect,
        wet,
        on
      }
    })
  }

  changeEffectValue(effectName, effectProperty, value) {
    let { name, effect, wet, on } = this.state[effectName]

    if (effectProperty == 'order') {
      value = Math.round(value)
    }

    effect[effectProperty] = value

    this.setState({
      [`${effectName}`]: {
        name,
        effect,
        wet,
        on
      }
    })
  }

  render() {
    let {
      ambientSynth,
      ambientAutoFilter,
      ambientChorus,
      ambientDistortion,
      ambientFeedbackDelay,
      ambientFreeverb,
      ambientPhaser,
      ambientPingPongDelay,
      leadSynth,
      leadAutoPanner,
      leadAutoWah,
      leadBitCrusher,
      leadChebyshev,
      leadDistortion,
      leadFeedbackEffect,
      leadJcReverb,
      leadPitchShift,
      leadReverb,
      leadStereoWidener,
      leadTremolo,
      leadVibrato,
      loop1,
      part1
    } = this.state

    let {
      toggleEffect,
      toggleLoop,
      togglePart,
      changeSynthValue,
      changeEffectWetValue,
      changeEffectValue,
      changeEffectFilterValue
    } = this

    return (
      <div>
        <div className="effectsBoard">
          <ToneSynth
            synth="ambientSynth"
            instrument={ambientSynth}
            on={loop1.on}
            togglePlay={() => toggleLoop('loop1')}
            changeSynthValue={this.changeSynthValue}
          />
          <AutoFilter
            {...ambientAutoFilter}
            toggleEffect={() => toggleEffect('ambientAutoFilter')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
          <Chorus
            {...ambientChorus}
            toggleEffect={() => toggleEffect('ambientChorus')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
          <Distortion
            {...ambientDistortion}
            toggleEffect={() => toggleEffect('ambientDistortion')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
          <FeedbackDelay
            {...ambientFeedbackDelay}
            toggleEffect={() => toggleEffect('ambientFeedbackDelay')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
          <Freeverb
            {...ambientFreeverb}
            toggleEffect={() => toggleEffect('ambientFreeverb')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
          <Phaser
            {...ambientPhaser}
            toggleEffect={() => toggleEffect('ambientPhaser')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
          <PingPongDelay
            {...ambientPingPongDelay}
            toggleEffect={() => toggleEffect('ambientPingPongDelay')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
        </div>

        <div className="effectsBoard">
          <PolySynth
            synth="leadSynth"
            instrument={ambientSynth}
            on={part1.on}
            togglePlay={() => togglePart('part1')}
            changeSynthValue={changeSynthValue}
          />
          <AutoPanner
            {...leadAutoPanner}
            toggleEffect={() => toggleEffect('leadAutoPanner')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
          <AutoWah
            {...leadAutoWah}
            toggleEffect={() => toggleEffect('leadAutoWah')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
          <BitCrusher
            {...leadBitCrusher}
            toggleEffect={() => toggleEffect('leadBitCrusher')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
          <Chebyshev
            {...leadChebyshev}
            toggleEffect={() => toggleEffect('leadChebyshev')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
          <Distortion
            {...leadDistortion}
            toggleEffect={() => toggleEffect('leadDistortion')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
          <FeedbackEffect
            {...leadFeedbackEffect}
            toggleEffect={() => toggleEffect('leadFeedbackEffect')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
          <JcReverb
            {...leadJcReverb}
            toggleEffect={() => toggleEffect('leadJcReverb')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
          <PitchShift
            {...leadPitchShift}
            toggleEffect={() => toggleEffect('leadPitchShift')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
          <Reverb
            {...leadReverb}
            toggleEffect={() => toggleEffect('leadReverb')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
          <StereoWidener
            {...leadStereoWidener}
            toggleEffect={() => toggleEffect('leadStereoWidener')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
          <Tremolo
            {...leadTremolo}
            toggleEffect={() => toggleEffect('leadTremolo')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
          <Vibrato
            {...leadVibrato}
            toggleEffect={() => toggleEffect('leadVibrato')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
        </div>
      </div>
    )
  }
}
