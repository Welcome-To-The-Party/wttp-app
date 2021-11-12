/*
 * Create Event Step Top Tab Bar
 */
import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

export default class CEStepTopTabBar extends React.Component
{
  constructor(props) {
    super(props);

    this.navigateFirst = this.navigateFirst.bind(this);
    this.navigateSecond = this.navigateSecond.bind(this);
    this.navigateThird = this.navigateThird.bind(this);
    this.navigateFourth = this.navigateFourth.bind(this);
  }

  navigateFirst() {
    this.props.navigation.navigate('first');
  }
  navigateSecond() {
    this.props.navigation.navigate('second');
  }
  navigateThird() {
    this.props.navigation.navigate('third');
  }
  navigateFourth() {
    this.props.navigation.navigate('fourth');
  }

  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.navigateFirst} style={this.props.navigationState.index == 0 ? styles.btn_container_selected : styles.btn_container}>
          <Text style={styles.text}>ÉTAPE 1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.navigateSecond} style={this.props.navigationState.index == 1 ? styles.btn_container_selected : styles.btn_container}>
          <Text style={styles.text}>ÉTAPE 2</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.navigateThird} style={this.props.navigationState.index == 2 ? styles.btn_container_selected : styles.btn_container}>
          <Text style={styles.text}>ÉTAPE 3</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.navigateFourth} style={this.props.navigationState.index == 3 ? styles.btn_container_selected : styles.btn_container}>
          <Text style={styles.text}>ÉTAPE 4</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

CEStepTopTabBar.propTypes = {
  navigation: PropTypes.object,
  navigationState: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    justifyContent: 'space-around',
    flexDirection: 'row',
    borderBottomWidth: 3,
    borderColor: '#4F4F4F',
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    marginTop: 30,
  },
  text: {
   
    fontWeight: "300",
    fontSize: 20,
    color: '#4F4F4F',
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
    marginBottom: 10,
  },
});
