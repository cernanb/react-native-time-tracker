import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native'
import uuidv4 from 'uuid/v4'

import EditableTimer from './components/EditableTimer'
import ToggleableTimerForm from './components/ToggleableTimerForm'

import { newTimer } from './utils/TimerUtils'
import { setInterval } from 'core-js/library/web/timers'

export default class App extends React.Component {
  state = {
    timers: [
      {
        title: 'Mow the lawn',
        project: 'House Chores',
        id: uuidv4(),
        elapsed: 5456099,
        isRunning: true
      },
      {
        title: 'Bake squash',
        project: 'Kitchen Chores',
        id: uuidv4(),
        elapsed: 1273998,
        isRunning: false
      }
    ]
  }

  componentDidMount() {
    const TIME_INTERVAL = 1000

    this.intervalId = setInterval(() => {
      const { timers } = this.state

      this.setState({
        timers: timers.map(timer => {
          const { elapsed, isRunning } = timer

          return {
            ...timer,
            elapsed: isRunning ? elapsed + TIME_INTERVAL : elapsed
          }
        })
      })
    }, TIME_INTERVAL)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  handleEditTimer = attrs => {
    const { timers } = this.state
    this.setState({
      timers: timers.map(timer => {
        if (timer.id == attrs.id) {
          const { title, project } = attrs
          return {
            ...timer,
            title,
            project
          }
        }
        return timer
      })
    })
  }

  handleCreateFormSubmit = timer => {
    const { timers } = this.state

    this.setState({
      timers: [newTimer(timer), ...timers]
    })
  }

  remove = id => {
    const { timers } = this.state
    this.setState({
      timers: timers.filter(timer => timer.id !== id)
    })
  }

  toggleTimer = id => {
    this.setState({
      timers: this.state.timers.map(timer => {
        return timer.id === id
          ? Object.assign({}, timer, { isRunning: !timer.isRunning })
          : timer
      })
    })
  }

  render() {
    const { timers } = this.state
    return (
      <View style={styles.appContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Timers</Text>
        </View>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.timerListContainer}
        >
          <ScrollView style={styles.timerList}>
            <ToggleableTimerForm onFormSubmit={this.handleCreateFormSubmit} />
            {timers.map(timer => (
              <EditableTimer
                key={timer.id}
                {...timer}
                onFormSubmit={this.handleEditTimer}
                onRemovePress={this.remove}
                onStartPress={this.toggleTimer}
                onStopPress={this.toggleTimer}
              />
            ))}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  },
  titleContainer: {
    paddingTop: 35,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D7DA'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  timerList: {
    paddingBottom: 15
  },
  timerListContainer: {
    flex: 1
  }
})
