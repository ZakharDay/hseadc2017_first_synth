import React from 'react'
import ReactDOM from 'react-dom'

import Room3 from '../containers/Room3'

document.addEventListener('DOMContentLoaded', () => {
  let data = JSON.parse(document.getElementById('root').getAttribute('props'))
  console.log('DATATATATTAATTATTA', data)

  ReactDOM.render(
    <Room3 {...data} />,
    document.getElementById('root').appendChild(document.createElement('div'))
  )
})
