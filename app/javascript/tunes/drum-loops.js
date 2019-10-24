import Tone from 'tone'

// prettier-ignore
function kick1(kickDrum, callback) {
  return new Tone.Sequence(
    function(time, note) {
      kickDrum.triggerAttackRelease(note, '16n', time)
      callback()
    },
    [
      'G0', 'G0', null, null, null, null, null, null,
      'G0', null, null, null, null, 'G0', null, null,
      'G0', 'G0', null, null, null, null, null, null,
      'G0', null, null, null, null, null, null, null,
      'G0', 'G0', null, null, null, null, null, null,
      'G0', null, null, null, null, null, null, null,
      'G0', 'G0', null, null, null, null, null, null,
      'G0', null, null, null, null, null, null, 'G0'
    ],
    '16n'
  )
}

// prettier-ignore
function snare1(snareHit, snareMembrane, callback) {
// function snare1(snareHit, snareDrum, snareMembrane) {
  return new Tone.Sequence(
    function(time, note) {
      // // snareDrum.frequency.setValueAtTime(note, time)
      // snareDrum.triggerAttack(time, Math.random() * 0.5 + 0.5)
      // // hitsnare.triggerAttackRelease('16n', time, 1)
      // snareMembrane.triggerAttackRelease('E1', '16n', time, 1)
      // snareDrum.frequency.setValueAtTime(note, time)
      // snareDrum.triggerAttack(time, Math.random() * 0.5 + 0.5)
      snareHit.triggerAttackRelease('16n', time, 1)
      snareMembrane.triggerAttackRelease('E1', '16n', time, 1)
      callback()
    },
    [
      null, null, null, null, 51, null, null, null,
      null, null, null, null, 51, null, null, null,
      null, null, null, null, 51, null, null, 51,
      null, null, null, null, 51, null, null, null,
      null, null, null, null, 51, 51, null, null,
      null, null, null, null, 51, null, null, null,
      null, null, null, null, 51, null, null, null,
      null, null, null, null, 51, null, null, null
    ],
    '16n'
  )
}

// prettier-ignore
function kick2(kickDrum) {
  return new Tone.Sequence(
    function(time, note) {
      kickDrum.triggerAttackRelease(note, '16n', time)
    },
    [
      null, 'G0', null, null,
      null, null, null, null,
      null, null, null, null,
      null, null, null, null,
      'G0', null, null, null,
      null, null, null, null,
      null, null, null, null,
      null, null, null, null,
      null, 'G0', null, null,
      null, null, null, null,
      null, null, null, null,
      null, null, null, null,
      'G0', null, null, null,
      null, null, null, null,
      null, null, null, null,
      null, null, null, null
    ],
    '16n'
  )
}

// prettier-ignore
function snare2(snareHit, snareDrum, snareMembrane) {
  return new Tone.Sequence(
    function(time, note) {
      // // snareDrum.frequency.setValueAtTime(note, time)
      // snareDrum.triggerAttack(time, Math.random() * 0.5 + 0.5)
      // // hitsnare.triggerAttackRelease('16n', time, 1)
      // snareMembrane.triggerAttackRelease('E1', '16n', time, 1)
      snareDrum.frequency.setValueAtTime(note, time)
      snareDrum.triggerAttack(time, Math.random() * 0.5 + 0.5)
      snareHit.triggerAttackRelease('16n', time, 1)
      snareMembrane.triggerAttackRelease('E1', '16n', time, 1)
    },
    [
      null, null, null, null,
      null, null, null, null,
        51, null, null, null,
      null, null, null, null,
      null, null, null, null,
      null, null, null, null,
        51, null, null, null,
      null, null, null, null,
      null, null, null, null,
      null, null, null, null,
        51, null, null, null,
      null, null, null, null,
      null, null, null, null,
      null, null, null, null,
        51, null, null, null,
      null, null, null, null,
    ],
    '16n'
  )
}

// prettier-ignore
function snare3(snareHit, snareDrum, snareMembrane) {
  return new Tone.Sequence(
    function(time, note) {
      snareHit.triggerAttackRelease('16n', time, 1)
    },
    [
        51, null, null, null,
        51, null, null, null,
        51, null, null, null,
        51, null, null, null
    ],
    '16n'
  )
}

export { kick1, snare1, kick2, snare2, snare3 }
