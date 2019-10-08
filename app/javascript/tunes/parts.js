import Tone from 'tone'

function part1(synth) {
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
        duration: '2n'
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
  )

  return part
}

function part2(synth) {
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
  )

  return part
}

function part3(synth) {
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
  )

  return part
}

// part1.start(0)
// part1.loop = true
// part1.loopEnd = '8m'
//
// part2.start(0)
// part2.loop = true
// part2.loopEnd = '2m'
//
// part3.start(0)
// part3.loop = true
// part3.loopEnd = '2m'

export { part1, part2, part3 }
