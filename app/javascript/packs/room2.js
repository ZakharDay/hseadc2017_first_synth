import React from 'react'
import ReactDOM from 'react-dom'

import Room2 from '../containers/Room2'

document.addEventListener('DOMContentLoaded', () => {
  const data = {} //JSON.parse(document.getElementById('room2').dataset.props)

  ReactDOM.render(
    <Room2 {...data} />,
    document.getElementById('root').appendChild(document.createElement('div'))
  )
})
