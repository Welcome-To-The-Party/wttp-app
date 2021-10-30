import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default class PreviewerText extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      callback_url: undefined,
      showModal: false
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: "column",
    width: "100%",
    height: 50,
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 15,
    paddingLeft: 15,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
  },
  header: {
    marginLeft: 10,
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 15,
    color: '#4F4F4F',
  }
});
