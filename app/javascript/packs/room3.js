import React from 'react'
import ReactDOM from 'react-dom'

import Room3 from '../containers/Room3'

document.addEventListener('DOMContentLoaded', () => {
  const data = JSON.parse(document.getElementById('data').dataset.props)

  ReactDOM.render(
    <Room3 {...data} />,
    document.body.appendChild(document.createElement('div'))
  )
})
