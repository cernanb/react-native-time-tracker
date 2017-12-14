import React, { Component } from 'react'

import Timer from './Timer'
import TimerForm from './TimerForm'

export default class EditableTmer extends Component {
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
    const { id, title, project, elapsed, isRunning, onRemovePress } = this.props
    console.warn(onRemovePress)
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
        onRemovePress={() => onRemovePress(id)}
      />
    )
  }
}
