import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'

import TimerForm from './TimerForm'
import TimerButton from './TimerButton'

export default class ToggleableTimerForm extends Component {
  state = {
    isOpen: false
  }

  toggleForm = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  handleFormSubmit = timer => {
    this.props.onFormSubmit(timer)
    this.toggleForm()
  }
  render() {
    const { isOpen } = this.state
    return (
      <View style={[styles.container, !isOpen && styles.buttonPadding]}>
        {isOpen ? (
          <TimerForm
            onFormClose={this.toggleForm}
            onFormSubmit={this.handleFormSubmit}
          />
        ) : (
          <TimerButton onPress={this.toggleForm} title="+" color="black" />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10
  },
  buttonPadding: {
    paddingHorizontal: 15
  }
})
