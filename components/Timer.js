import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'

import { millisecondsToHumans, millisecondsToHuman } from '../utils/TimerUtils'
import TimerButton from './TimerButton'

class Timer extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    project: PropTypes.string.isRequired,
    elapsed: PropTypes.number.isRequired,
    isRunning: PropTypes.bool.isRequired,
    onEditPress: PropTypes.func.isRequired,
    onRemovePress: PropTypes.func.isRequired,
    onStartPress: PropTypes.func.isRequired,
    onStopPress: PropTypes.func.isRequired
  }

  handleRemovePress = () => {
    const { onRemovePress, id } = this.props
    onRemovePress(id)
  }

  handleStartPress = () => {
    const { id, onStartPress } = this.props

    onStartPress(id)
  }

  handleStopPress = () => {
    const { id, onStopPress } = this.props

    onStopPress(id)
  }

  renderActionButton() {
    const { isRunning } = this.props
    return isRunning ? (
      <TimerButton
        color="#DB2828"
        title="Stop"
        onPress={this.handleStopPress}
      />
    ) : (
      <TimerButton
        color="#21BA45"
        title="Start"
        onPress={this.handleStartPress}
      />
    )
  }

  render() {
    const {
      title,
      project,
      elapsed,
      onEditPress,
      isRunning,
      stopTimer
    } = this.props
    const elapsedString = millisecondsToHuman(elapsed)

    return (
      <View style={styles.timerContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.elapsedTime}>{elapsedString}</Text>
        <View style={styles.buttonGroup}>
          <TimerButton color="blue" small title="Edit" onPress={onEditPress} />
          <TimerButton
            color="blue"
            small
            title="Remove"
            onPress={this.handleRemovePress}
          />
        </View>
        {this.renderActionButton()}
      </View>
    )
  }
}

export default Timer

const styles = StyleSheet.create({
  timerContainer: {
    backgroundColor: 'white',
    borderColor: '#d6d7da',
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    margin: 15,
    marginBottom: 0
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  elapsedTime: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 15
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
