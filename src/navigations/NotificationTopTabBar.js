/*
 * Event Handler Top Tab Bar
 */
import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

import { mixins } from '@styles'

export default class NotificationTopTabBar extends React.Component
{
  constructor(props) {
    super(props);

    this.navigateFirst = this.navigateFirst.bind(this);
    this.navigateSecond = this.navigateSecond.bind(this);
  }

  navigateFirst() {
    this.props.navigation.navigate('general');
  }

  navigateSecond() {
    this.props.navigation.navigate('participations');
  }

  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.navigateFirst} style={this.props.navigationState.index == 0 ? styles.btn_container_selected : styles.btn_container}>
          <Text style={styles.text}>Générales</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.navigateSecond} style={this.props.navigationState.index == 1 ? styles.btn_container_selected : styles.btn_container}>
          <Text style={styles.text}>Participations</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 60,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    // borderBottomWidth: 3,
    // borderColor: '#4F4F4F',
    // borderBottomWidth: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    ...mixins.boxShadow("#777")
  },
  text: {
   
    fontWeight: "300",
    fontSize: 18,
    color: '#4F4F4F',
  },
  btn_container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_container_selected: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#6C2BA1',
    // marginBottom: 10,
  },
});
