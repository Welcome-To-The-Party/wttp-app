import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


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
        <TouchableOpacity onPress={this.props.run}>
          <Text style={styles.header}>{this.props.title}</Text>
          <Text style={styles.desc}>{this.props.description}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: "row",
    width: "100%",
    paddingTop:10,
    paddingBottom: 10,
    paddingRight: 15,
    paddingLeft: 15,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  header: {
    marginLeft: 10,
    paddingLeft: 15,
    paddingRight: 15,
   
    fontStyle: 'normal',
    fontWeight: "700",
    fontSize: 15,
    color: '#4F4F4F',
  },
  desc: {
    marginLeft: 10,
    paddingLeft: 15,
    paddingRight: 15,
   
    fontWeight: "200",
    fontSize: 15,
    color: '#4F4F4F',
  }
});
