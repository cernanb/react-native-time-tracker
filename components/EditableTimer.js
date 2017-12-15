import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Timer from './Timer'
import TimerForm from './TimerForm'

export default class EditableTmer extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    project: PropTypes.string.isRequired,
    elapsed: PropTypes.number.isRequired,
    isRunning: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    onRemovePress: PropTypes.func.isRequired,
    onStartPress: PropTypes.func.isRequired,
    onStopPress: PropTypes.func.isRequired
  }
  state = { editFormOpen: false }

  toggleEdit = () => {
    this.setState({
      editFormOpen: !this.state.editFormOpen
    })
  }

  handleSubmit = timer => {
    const { onFormSubmit } = this.props

    onFormSubmit(timer)
    this.toggleEdit()
  }
  render() {
    const {
      id,
      title,
      project,
      elapsed,
      isRunning,
      onRemovePress,
      onStartPress,
      onStopPress
    } = this.props
    const { editFormOpen } = this.state
    if (editFormOpen) {
      return (
        <TimerForm
          id={id}
          title={title}
          project={project}
          onFormClose={this.toggleEdit}
          onFormSubmit={this.handleSubmit}
        />
      )
    }
    return (
      <Timer
        id={id}
        title={title}
        elapsed={elapsed}
        project={project}
        isRunning={isRunning}
        onEditPress={this.toggleEdit}
        onRemovePress={onRemovePress}
        onStopPress={onStopPress}
        onStartPress={onStartPress}
      />
    )
  }
}
