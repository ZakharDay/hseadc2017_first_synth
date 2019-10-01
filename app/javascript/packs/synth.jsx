import React from 'react'
import ReactDOM from 'react-dom'

import Synth from '../containers/Synth'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Synth />,
    document.body.appendChild(document.createElement('div'))
  )
})
