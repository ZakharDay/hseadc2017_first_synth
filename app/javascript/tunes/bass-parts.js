import Tone from 'tone'

function part1(synth) {
  let velocity = 0.6

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
        noteName: 'C2',
        velocity: velocity,
        duration: '1m'
      },
      {
        time: '1:0:0',
        noteName: 'E2',
        velocity: velocity,
        duration: '1m'
      },
      {
        time: '2:0:0',
        noteName: 'A1',
        velocity: velocity,
        duration: '1m'
      },
      {
        time: '3:0:0',
        noteName: 'G1',
        velocity: velocity,
        duration: '1m'
      },
      {
        time: '4:0:0',
        noteName: 'E1',
        velocity: velocity,
        duration: '1m'
      },
      {
        time: '5:0:0',
        noteName: 'F1',
        velocity: velocity,
        duration: '1m'
      },
      {
        time: '6:0:0',
        noteName: 'A1',
        velocity: velocity,
        duration: '1m'
      },
      {
        time: '7:0:0',
        noteName: 'D2',
        velocity: velocity,
        duration: '1m'
      }
    ]
  )

  part.loop = true
  part.loopEnd = '8m'

  return part
}

export { part1 }
