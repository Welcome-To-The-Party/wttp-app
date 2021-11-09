import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default class PreviewerSelect extends React.Component
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
      <View style={styles.main_container}>
        <Text style={styles.header}>{this.props.title}</Text>
        <View style={styles.container}>
          {this.props.types.map((item, key) => {
            if (this.props.selected == item) {
              return (
                <View key={key} style={styles.btn_containerSelected}>
                  <Text style={styles.textSelected}>{item}</Text>
                </View>
              );
            } else {
              return (
                <View key={key} style={styles.btn_container}>
                  <Text style={styles.text}>{item}</Text>
                </View>
              );
            }
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: "row",
    flexWrap: 'wrap',
    width: "100%",
    alignItems: 'center',
  },
  main_container: {
    paddingRight: 15,
    paddingBottom: 30,
    paddingLeft: 15,
    paddingTop:30,
    marginTop: 15,
    backgroundColor: '#f0f0f0',
  },
  header: {
    marginLeft: 10,
    marginBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "700",
    fontSize: 15,
    color: '#4F4F4F',
  },
  btn_container: {
    width: 130,
    height: 45,
    borderColor: "#6C2BA1",
    borderWidth: 1,
    borderRadius: 50,
    marginRight: 5,
    marginVertical: 5,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_containerSelected: {
    width: 130,
    height: 45,
    backgroundColor: "#6C2BA1",
    borderColor: "#6C2BA1",
    borderWidth: 1,
    borderRadius: 50,
    marginRight: 5,
    marginBottom: 5,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "300",
    fontSize: 15,
    color: "#6C2BA1",
  },
  textSelected: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "300",
    fontSize: 15,
    color: "#fff",
  }
});
