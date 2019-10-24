import classnames from 'classnames'
import React from 'react'

import PlaySwitch from '../controls/PlaySwitch'
import ToggleSwitch from '../controls/ToggleSwitch'
import Slider from '../controls/Slider'
import Knob from '../controls/Knob'
import ButtonSet from '../controls/ButtonSet'

export default class Drum extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { name, on, part, parts, toggleDrum, changeDrumLoop } = this.props

    let pads = []

    parts.map((p, i) => {
      const classes = classnames({
        changeDrumLoop: true,
        on: i == part
      })

      pads.push(
        <div
          className={classes}
          onClick={() => changeDrumLoop(name, i)}
          key={i}
        />
      )
    })

    const classes = classnames({
      toggleDrum: true,
      on: on
    })

    return (
      <div className="Drum">
        <div className={classes} onClick={() => toggleDrum(name)}>
          {name}
        </div>

        <div className="controlsContainer">
          <div className="controlsRow">{pads}</div>
        </div>
      </div>
    )
  }
}
