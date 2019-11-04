import React from 'react'
import classnames from 'classnames'

export default class ToggleButton extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { text, on, handleClick } = this.props

    const classes = classnames({
      ToggleButton: true,
      on: on
    })

    return (
      <div className={classes} onClick={() => handleClick()}>
        {text}
      </div>
    )
  }
}
