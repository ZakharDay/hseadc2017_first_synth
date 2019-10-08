import classnames from 'classnames'
import React from 'react'

export default class Button extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { name, property, option, current, handleClick } = this.props

    const classes = classnames({
      Button: true,
      on: option == current
    })

    return (
      <div
        className={classes}
        onClick={() => handleClick(name, property, option)}
      >
        {option}
      </div>
    )
  }
}
