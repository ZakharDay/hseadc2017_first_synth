import React from 'react'
import ReactDOM from 'react-dom'

import Exhibition from '../containers/Exhibition'

document.addEventListener('DOMContentLoaded', () => {
  const data = JSON.parse(document.getElementById('data').dataset.props)

  ReactDOM.render(
    <Exhibition {...data} />,
    document.body.appendChild(document.createElement('div'))
  )
})
