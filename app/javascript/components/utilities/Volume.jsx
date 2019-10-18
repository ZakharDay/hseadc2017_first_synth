import React from 'react'

import Slider from '../controls/Slider'

export default class Volume extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { volume, changeVolumeValue } = this.props

    return (
      <div className="Effect">
        <div className="controlsContainer">
          <div className="controlsRow">
            <h2>Volume {volume}</h2>
            <Slider
              name="volume"
              property="volume"
              min="0"
              max="100"
              value={volume}
              handleValueChange={changeVolumeValue}
            />
          </div>
        </div>
      </div>
    )
  }
}
