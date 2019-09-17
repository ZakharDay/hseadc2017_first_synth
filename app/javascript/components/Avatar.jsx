import React from 'react'

export default class Avatar extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.handleClick('avatar')
  }

  render() {
    const { name, color } = this.props

    return (
      <div onClick={this.handleClick} style={{ color: color }}>
        Avatar {name} {color}
      </div>
    )
  }
}
