import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import PropTypes from 'prop-types';

export default class PartyNotifications extends React.Component
{
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <View style={styles.containerSelected}>
        </View>
    );
  }
}

PartyNotifications.propTypes = {
  text: PropTypes.string,
  run: PropTypes.func,
  status: PropTypes.bool
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    backgroundColor: 'red',
  },
});
