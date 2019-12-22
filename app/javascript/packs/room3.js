import React from 'react'
import ReactDOM from 'react-dom'

import Room3 from '../containers/Room3'

document.addEventListener('DOMContentLoaded', () => {
  const data = {} //JSON.parse(document.getElementById('room3').dataset.props)

  ReactDOM.render(
    <Room3 {...data} />,
    document.getElementById('root').appendChild(document.createElement('div'))
  )
})
