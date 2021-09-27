/*
 * Event Handler Top Tab Bar
 */
import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

export default class EHandlerTopTabBar extends React.Component
{
  constructor(props) {
    super(props);

    this.navigateFirst = this.navigateFirst.bind(this);
    this.navigateSecond = this.navigateSecond.bind(this);
    this.navigateThird = this.navigateThird.bind(this);
    this.navigateFourth = this.navigateFourth.bind(this);
  }

  navigateFirst() {
    this.props.navigation.navigate('confirm');
  }
  navigateSecond() {
    this.props.navigation.navigate('wait');
  }
  navigateThird() {
    this.props.navigation.navigate('tocome');
  }
  navigateFourth() {
    this.props.navigation.navigate('past');
  }

  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.navigateFirst} style={this.props.navigationState.index == 0 ? styles.btn_container_selected : styles.btn_container}>
          <Text style={styles.text}>CONFIRMÉS</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.navigateSecond} style={this.props.navigationState.index == 1 ? styles.btn_container_selected : styles.btn_container}>
          <Text style={styles.text}>EN ATTENTES</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.navigateThird} style={this.props.navigationState.index == 2 ? styles.btn_container_selected : styles.btn_container}>
          <Text style={styles.text}>À VENIR</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.navigateFourth} style={this.props.navigationState.index == 3 ? styles.btn_container_selected : styles.btn_container}>
          <Text style={styles.text}>PASSÉS</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

EHandlerTopTabBar.propTypes = {
  navigation: PropTypes.object,
  navigationState: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 70,
    justifyContent: 'space-around',
    flexDirection: 'row',
    borderBottomColor: '#f3f3f3',
    borderBottomWidth: 1,
  },
  text: {
    fontFamily: 'Roboto',
    fontWeight: "300",
    fontSize: 17,
    color: '#4F4F4F',
    textTransform: 'capitalize'
  },
  btn_container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_container_selected: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 4,
    borderColor: '#6C2BA1',
  },
});
