import React from 'react'
import ReactDOM from 'react-dom'

import Test from '../containers/Test'

document.addEventListener('DOMContentLoaded', () => {
  const data = JSON.parse(document.getElementById('data').dataset.props)

  ReactDOM.render(
    <Test {...data} />,
    document.body.appendChild(document.createElement('div'))
  )
})
