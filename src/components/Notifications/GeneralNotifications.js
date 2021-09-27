import * as React from 'react';
import { StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native';

const logo_icon = "../../assets/images/w_logo.png";

export default class GeneralNotifications extends React.Component
{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.icon} source={require(logo_icon)} />
        <View style={styles.column}>
          <Text style={styles.para}>{this.props.text}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 120,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginBottom: 10,
  },
  column: {
    flexDirection: 'column',
  },
  para: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 17,
    color: '#4f4f4f',
    paddingRight: 110,
    marginTop: 10,
    marginBottom: 10,
  },
});
