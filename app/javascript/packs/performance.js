import React from 'react'
import ReactDOM from 'react-dom'

import Performance from '../containers/Performance'

document.addEventListener('DOMContentLoaded', () => {
  const data = JSON.parse(document.getElementById('data').dataset.props)

  ReactDOM.render(
    <Performance {...data} />,
    document.body.appendChild(document.createElement('div'))
  )
})
