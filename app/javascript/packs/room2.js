import React from 'react'
import ReactDOM from 'react-dom'

import Room2 from '../containers/Room2'

document.addEventListener('DOMContentLoaded', () => {
  const data = JSON.parse(document.getElementById('data').dataset.props)

  ReactDOM.render(
    <Room2 {...data} />,
    document.body.appendChild(document.createElement('div'))
  )
})
