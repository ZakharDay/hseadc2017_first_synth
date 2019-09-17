import React from 'react'
import Menubar from '../components/Menubar'

export default class Hello extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      avatar: {
        color: 'red'
      },
      button: {
        color: 'red'
      }
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(elementName) {
    if (elementName == 'avatar') {
      const avatarColor = this.state.avatar.color == 'red' ? 'blue' : 'red'

      this.setState({
        avatar: {
          color: avatarColor
        }
      })
    } else if (elementName == 'button') {
      const buttonColor = this.state.button.color == 'red' ? 'blue' : 'red'

      this.setState({
        button: {
          color: buttonColor
        }
      })
    }
  }

  render() {
    const { name } = this.props
    const { avatar, button } = this.state

    return (
      <div>
        Hello {name}!
        <Menubar
          name={name}
          avatar={avatar}
          button={button}
          handleClick={this.handleClick}
        />
      </div>
    )
  }
}
