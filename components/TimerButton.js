import React from 'react'
import { TouchableOpacity, Text, StyleSheet, ColorPropType } from 'react-native'
import PropTypes from 'prop-types'

const TimerButton = ({ color, title, small, onPress }) => (
  <TouchableOpacity
    style={[styles.button, { borderColor: color }]}
    onPress={onPress}
  >
    <Text
      style={[
        styles.buttonText,
        small ? styles.small : styles.large,
        { color }
      ]}
    >
      {title}
    </Text>
  </TouchableOpacity>
)

export default TimerButton

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    minWidth: 100,
    borderWidth: 2,
    borderRadius: 3
  },
  small: {
    fontSize: 14,
    padding: 5
  },
  large: {
    fontSize: 16,
    padding: 10
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  elapsedTime: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10
  }
})

TimerButton.propTypes = {
  color: ColorPropType.isRequired,
  title: PropTypes.string.isRequired,
  small: PropTypes.bool,
  onPress: PropTypes.func.isRequired
}

TimerButton.defaultProps = {
  small: false
}
