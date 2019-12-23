import Tone from 'tone'

// prettier-ignore
function kick(kickDrum) {
  return new Tone.Sequence(
    function(time, note) {
      kickDrum.triggerAttackRelease(note, '16n', time)
    },
    [
      'G0', null, null, null
    ],
    '4n'
  )
}

// prettier-ignore
function snare(snareHit, snareMembrane) {
  return new Tone.Sequence(
    function(time, note) {
      snareHit.triggerAttackRelease('16n', time, 1)
      snareMembrane.triggerAttackRelease('E1', '16n', time, 1)
    },
    [
      null, null, null, null
    ],
    '4n'
  )
}

// prettier-ignore
function hat(snareHit) {
  return new Tone.Sequence(
    function(time, note) {
      snareHit.triggerAttackRelease('16n', time, 1)
    },
    [
        51, null, null, null
    ],
    '4n'
  )
}

export { kick, snare, hat }
