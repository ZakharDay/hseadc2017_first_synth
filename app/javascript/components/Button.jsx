import React from 'react'

export default class Button extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.handleClick('button')
  }

  render() {
    const { name, color } = this.props

    return (
      <div onClick={this.handleClick} style={{ color: color }}>
        Button {name} {color}
      </div>
    )
  }
}
