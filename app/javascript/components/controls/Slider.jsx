import _ from 'lodash'
import React from 'react'

export default class Slider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      mouseDown: false,
      thumbLeft: 0
    }

    this.slideArea = React.createRef()

    _.bindAll(
      this,
      'handleMouseMove',
      'handleMouseDown',
      'handleMouseUp',
      'moveThumb',
      'calculateLeft',
      'calculateValue'
    )
  }

  componentDidMount() {
    const { value } = this.props
    const { x, width } = this.slideArea.current.getBoundingClientRect()

    this.setState({
      thumbLeft: this.calculateLeft(width, value)
    })

    document.addEventListener('mouseup', this.handleMouseUp)
    document.addEventListener('mousemove', this.handleMouseMove)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { x, width } = this.slideArea.current.getBoundingClientRect()

    if (nextProps.value != this.props.value) {
      nextState.thumbLeft = this.calculateLeft(width, nextProps.value)
    }

    return true
  }

  handleDragOver(e) {
    e.preventDefault()
  }

  handleMouseDown(e) {
    e.preventDefault()

    this.setState({
      mouseDown: true
    })
  }

  handleMouseUp() {
    const { name, handleMouseUp } = this.props

    if (this.state.mouseDown) {
      // handleMouseUp(name)

      this.setState({
        mouseDown: false
      })
    }
  }

  handleMouseMove(e) {
    const { mouseDown } = this.state

    if (mouseDown) {
      this.moveThumb(e.screenX)
    }
  }

  moveThumb(screenX) {
    const { x, width } = this.slideArea.current.getBoundingClientRect()
    const { name, property, min, max, handleValueChange } = this.props
    const areaRight = this.calculateRight(x, width)
    const thumbLeft = screenX - x

    if (thumbLeft >= 0 && screenX <= areaRight) {
      const value = this.calculateValue(width, thumbLeft)
      handleValueChange(name, property, value)

      this.setState({
        thumbLeft
      })
    }
  }

  calculateRight(x, width) {
    return x + width
  }

  calculateLeft(width, value) {
    const { min, max } = this.props
    const range = max - min
    const coef = range / width
    const left = value / coef

    return left
  }

  calculateValue(width, thumbLeft) {
    const { min, max } = this.props
    const range = max - min
    const coef = range / width
    const value = thumbLeft * coef

    return value
  }

  render() {
    const { thumbLeft } = this.state

    const style = {
      transform: `translateX(${thumbLeft}px)`
    }

    return (
      <div
        className="Slider"
        ref={this.slideArea}
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}
      >
        <div
          className="thumb"
          style={style}
          onMouseDown={this.handleMouseDown}
        />
      </div>
    )
  }
}
