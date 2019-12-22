import React from 'react'
import ReactDOM from 'react-dom'

import Room1 from '../containers/Room1'

document.addEventListener('DOMContentLoaded', () => {
  const data = {} //JSON.parse(document.getElementById('room1').dataset.props)

  ReactDOM.render(
    <Room1 {...data} />,
    document.getElementById('root').appendChild(document.createElement('div'))
  )
})
