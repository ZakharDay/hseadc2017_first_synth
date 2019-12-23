import React from 'react'
import ReactDOM from 'react-dom'

import Master from '../containers/Master'

document.addEventListener('DOMContentLoaded', () => {
  const data = {} //JSON.parse(document.getElementById('room1').dataset.props)

  ReactDOM.render(
    <Master {...data} />,
    document.body.appendChild(document.createElement('div'))
  )
})
