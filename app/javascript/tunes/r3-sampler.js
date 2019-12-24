import Tone from 'tone'

function sampler() {
  return new Tone.Sampler({
    C3: 'http://localhost:3000/samples/Bird1.wav',
    D3: 'http://localhost:3000/samples/Bird2.wav',
    E3: 'http://localhost:3000/samples/Bird3.wav',
    F3: 'http://localhost:3000/samples/Bird4.wav'
  })
}

function reverb() {
  return new Tone.JCReverb({
    roomSize: 0.5
  })
}

function bitCrusher() {
  return new Tone.BitCrusher({
    bits: 4
  })
}

function distortion() {
  return new Tone.Distortion({
    distortion: 0.025,
    oversample: 'none'
  })
}

function randomNote(octave) {
  let note = octave[Math.floor(Math.random() * octave.length)]

  return note
}

function part(sampler) {
  let octave = ['C3', 'D3', 'E3', 'F3']

  const part = new Tone.Part(
    function(time, note) {
      sampler.triggerAttackRelease(
        randomNote(octave),
        note.duration,
        time,
        note.velocity
      )
    },
    [
      {
        time: '0:0:0',
        noteName: 'C1',
        velocity: 0.5,
        duration: '2'
      },
      {
        time: '2:0:0',
        noteName: 'D1',
        velocity: 0.5,
        duration: '2'
      },
      {
        time: '4:0:0',
        noteName: 'E1',
        velocity: 0.5,
        duration: '2'
      },
      {
        time: '6:0:0',
        noteName: 'F1',
        velocity: 0.5,
        duration: '2'
      }
    ]
  )

  // const part = new Tone.Sequence(
  //   function(time, note) {},
  //   ['C3', 'D3', 'E3', 'F3'],
  //   '1m'
  // )

  part.loop = true
  part.loopEnd = '8m'

  return part
}

export { sampler, reverb, bitCrusher, distortion, part }
