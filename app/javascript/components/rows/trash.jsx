<div>{distortion.distortion}</div>

<div onClick={this.copyAll}>COPY ALL</div>

<div className="effectsBoard">
  <Speed bpm={bpm} changeBpmValue={changeBpmValue} />
  <Volume volume={volume} changeVolumeValue={changeVolumeValue} />
</div>

<div onClick={() => toggleDrum('drumLoop1')}>DRUM LOOP 1</div>
<div onClick={() => toggleDrum('drumLoop2')}>DRUM LOOP 2</div>
<div onClick={() => togglePart('drumLoop3Snare')}>DRUM LOOP 3</div>

<div className="effectsBoard">
  <MembraneSynth
    synth="kickDrum"
    instrument={kickDrum}
    on={drumLoop1Kick.on}
    togglePlay={() => toggleDrum('drumLoop1')}
    changeSynthValue={this.changeSynthValue}
  />
  <AutoFilter
    {...kickAutoFilter}
    toggleEffect={() => toggleEffect('kickAutoFilter')}
    changeEffectWetValue={changeEffectWetValue}
    changeEffectValue={changeEffectValue}
  />
  <Freeverb
    {...kickFreeverb}
    toggleEffect={() => toggleEffect('kickFreeverb')}
    changeEffectWetValue={changeEffectWetValue}
    changeEffectValue={changeEffectValue}
  />
  <Chebyshev
    {...kickChebyshev}
    toggleEffect={() => toggleEffect('kickChebyshev')}
    changeEffectWetValue={changeEffectWetValue}
    changeEffectValue={changeEffectValue}
  />
</div>

<div className="effectsBoard">
  <NoiseSynth
    synth="snareDrum"
    instrument={snareDrum}
    on={drumLoop1Snare.on}
    togglePlay={() => toggleDrum('drumLoop1')}
    changeSynthValue={this.changeSynthValue}
  />
  <AutoFilter
    {...snareAutoFilter}
    toggleEffect={() => toggleEffect('snareAutoFilter')}
    changeEffectWetValue={changeEffectWetValue}
    changeEffectValue={changeEffectValue}
  />
  <PitchShift
    {...snarePitchShift}
    toggleEffect={() => toggleEffect('snarePitchShift')}
    changeEffectWetValue={changeEffectWetValue}
    changeEffectValue={changeEffectValue}
  />
  <Freeverb
    {...snareFreeverb}
    toggleEffect={() => toggleEffect('snareFreeverb')}
    changeEffectWetValue={changeEffectWetValue}
    changeEffectValue={changeEffectValue}
  />
</div>

<div className="effectsBoard">
  <PolySynth
    synth="bassSynth"
    instrument={bassSynth}
    on={bassPart1.on}
    togglePlay={() => togglePart('bassPart1')}
    changeSynthValue={changeSynthValue}
  />
  <Freeverb
    {...bassFreeverb}
    toggleEffect={() => toggleEffect('bassFreeverb')}
    changeEffectWetValue={changeEffectWetValue}
    changeEffectValue={changeEffectValue}
  />
  <Phaser
    {...bassPhaser}
    toggleEffect={() => toggleEffect('bassPhaser')}
    changeEffectWetValue={changeEffectWetValue}
    changeEffectValue={changeEffectValue}
  />
</div>

<div className="effectsBoard">
  <div className="PresetButton" onClick={() => loadPreset(1)}>
    Load 1
  </div>
  <div className="PresetButton" onClick={() => savePreset(1)}>
    Save 1
  </div>
  <div className="PresetButton" onClick={() => loadPreset(2)}>
    Load 2
  </div>
  <div className="PresetButton" onClick={() => savePreset(2)}>
    Save 2
  </div>

  <div onClick={() => togglePart('ambientPart1')}>Play Part 1</div>

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
    instrument={leadSynth}
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
