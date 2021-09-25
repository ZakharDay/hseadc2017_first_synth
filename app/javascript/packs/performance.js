import React from 'react'
import ReactDOM from 'react-dom'

import Performance from '../containers/Performance'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Performance />,
    document.body.appendChild(document.createElement('div'))
  )
})
