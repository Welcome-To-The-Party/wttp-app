import React from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const images = [ require('../../assets/images/CreateEvent/smoke.png'),
require('../../assets/images/CreateEvent/no_smoke.png') ];

export default class Smoke extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      types: [ true, false ],
      selected: undefined,
    };

    this.setSelected = this.setSelected.bind(this);
  }

  setSelected(value) {
    this.setState({selected: value});
    this.props.set(value);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.types.map((item, key) => {
          if (this.props.selected == item) {
            return (
              <View key={key} style={styles.btn_containerSelected}>
                <TouchableOpacity style={styles.btn} onPress={()=> this.setSelected(item)}>
                  <Image style={styles.imgSelected} source={images[key]} />
                </TouchableOpacity>
                <Text style={styles.header}>{item}</Text>
              </View>
            );
          } else {
            return (
              <View key={key} style={styles.btn_container}>
                <TouchableOpacity style={styles.btn} onPress={()=> this.setSelected(item)}>
                  <Image style={styles.img} source={images[key]} />
                </TouchableOpacity>
                <Text style={styles.header}>{item}</Text>
              </View>
            );
          }
        })}

      </View>
    );
  }
}

Smoke.propTypes = {
  set: PropTypes.function,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  btn_container: {
    width: 60,
    borderColor: "#6C2BA1",
    borderRadius: 50,
    marginRight: 5,
    marginLeft: 5,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_containerSelected: {
    width: 60,
    borderRadius: 50,
    marginRight: 5,
    marginLeft: 5,
  },
  imgSelected: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: "#6C2BA1",
    borderWidth: 5,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  header: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "300",
    fontSize: 10,
    color: '#4F4F4F',
    textAlign: 'center',
  },
});
