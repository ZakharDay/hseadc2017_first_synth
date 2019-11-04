import React from 'react'

// import Slider from '../controls/Slider'
import Slider from 'rc-slider/lib/Slider'
import Knob from '../controls/Knob'
import ToggleButton from '../controls/ToggleButton'
import 'rc-slider/assets/index.css'

export default class Channel extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      name,
      pan,
      volume,
      mute,
      solo,
      changeChannelValue,
      toggleChannelValue
    } = this.props

    console.log(volume)

    return (
      <div className="Effect">
        <ToggleButton
          text="Channel"
          on={!mute}
          handleClick={() => toggleChannelValue(name, 'mute')}
        />

        <div className="controlsContainer">
          <div className="controlsRow">
            <h2>Volume {volume}</h2>
            <Slider
              min={-80}
              max={6}
              marks={{ 0: '0' }}
              defaultValue={volume}
              handle={data => changeChannelValue(name, 'volume', data.value)}
            />

            <h2>Pan</h2>
            <Knob
              name={name}
              property="pan"
              min="-1"
              max="1"
              value={pan.value}
              handleValueChange={changeChannelValue}
            />

            <ToggleButton
              text="Solo"
              on={solo}
              handleClick={() => toggleChannelValue(name, 'solo')}
            />
          </div>
        </div>
      </div>
    )
  }
}
