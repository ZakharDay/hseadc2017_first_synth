import React from 'react'
import ReactDOM from 'react-dom'

import App from '../containers/App'

document.addEventListener('DOMContentLoaded', () => {
  const props = {
    synths: {
      tone: {
        oscillator: {
          type: 'triangle'
        },
        envelope: {
          attack: 0.005,
          decay: 0.1,
          sustain: 0.3,
          release: 1
        }
      },
      poly: {
        oscillator: {
          type: 'fatsawtooth',
          count: 3,
          spread: 30,
          phase: 10,
          fadeIn: 1
        },
        envelope: {
          attack: 0.3,
          decay: 1,
          sustain: 1,
          release: 5,
          attackCurve: 'exponential'
        }
      }
    }
  }

  ReactDOM.render(
    <App {...props} />,
    document.body.appendChild(document.createElement('div'))
  )
})
