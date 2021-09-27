import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

export default class UserTopTabBar extends React.Component
{
  constructor(props) {
    super(props);

    this.navigateBack = this.navigateBack.bind(this);
  }

  navigateBack() {
    this.props.navigation.goBack();
  }

  render () {
    
    const title = this.props.options.headerTitle

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.btn} onPress={() => this.navigateBack()}>
          <FontAwesomeIcon size={20} icon={ faChevronLeft } color={"#4e4e4e"} />
          <Image source={{uri: this.props.userData.picture}} style={styles.icon} />
          <View style={styles.col}>
            <Text style={styles.header}>{this.props.userData.name}</Text>
            <Text style={styles.desc}>{title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

UserTopTabBar.propTypes = {
  navigation: PropTypes.object,
  scene: PropTypes.object,
  navigationState: PropTypes.object,
  userData: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    height: 115,
    backgroundColor: "#fff",
    flexDirection: 'row',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 30,
    paddingLeft: 10,
  },
  header: {
    fontFamily: 'Roboto',
    fontWeight: "300",
    fontSize: 15,
    marginLeft: 30,
    color: '#4F4F4F',
  },
  desc: {
    fontFamily: 'Roboto',
    fontWeight: "300",
    fontSize: 15,
    marginLeft: 30,
    color: '#4F4F4F',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  col: {
    flexDirection: 'column',
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 100
  }
});
