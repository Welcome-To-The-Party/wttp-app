import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class Select extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
    };

    this.setSelected = this.setSelected.bind(this);
  }

  setSelected(value) {
    // this.setState({selected: value});
    this.props.set(value);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          {this.props.types.map((item, key) => {
            if (this.props.selected == item) {
              return (
                <View key={key} style={styles.btn_containerSelected}>
                  <TouchableOpacity style={styles.btn} onPress={()=> this.props.set(item)}>
                    <Text style={styles.textSelected}>{item}</Text>
                  </TouchableOpacity>
                </View>
              );
            } else {
              return (
                <View key={key} style={styles.btn_container}>
                  <TouchableOpacity style={styles.btn} onPress={()=> this.props.set(item)}>
                    <Text style={styles.text}>{item}</Text>
                  </TouchableOpacity>
                </View>
              );
            }
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: 'wrap',
  },
  btn_container: {
    borderColor: "#6C2BA1",
    borderWidth: 1,
    borderRadius: 50,
    marginRight: 5,
    marginBottom: 5,
    marginLeft: 5,
    justifyContent: 'center'
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
    minWidth: 130,
    backgroundColor: "#6C2BA1",
    borderColor: "#6C2BA1",
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 50,
    marginRight: 5,
    marginBottom: 5,
    marginLeft: 5,
  },
  text: {
   
    fontStyle: 'normal',
    fontWeight: "300",
    fontSize: 15,
    color: "#6C2BA1",
  },
  textSelected: {
   
    fontStyle: 'normal',
    fontWeight: "300",
    fontSize: 15,
    color: "#fff",
  }
});
