import React from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const images = [ require('../../assets/images/CreateEvent/house.png'),
require('../../assets/images/CreateEvent/appartement.png'),
require('../../assets/images/CreateEvent/rooftop.png'),
require('../../assets/images/CreateEvent/maison.png'),
require('../../assets/images/CreateEvent/terrasse.png'),
require('../../assets/images/CreateEvent/jardin.png'),
require('../../assets/images/CreateEvent/reception.png'),
require('../../assets/images/CreateEvent/peniche.png'),
require('../../assets/images/CreateEvent/loft.png'),
require('../../assets/images/CreateEvent/piscine.png'),
require('../../assets/images/CreateEvent/autre.png') ];

export default class PreviewerPlaces extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      types: [ "VILLA", "APPARTEMENT", "ROOFTOP", "MAISON", "TERRASSE", "JARDIN",
      "SALLE DE RÉCEPTION", "PÉNICHE", "LOFT", "PISCINE", "AUTRE" ],
    };
  }

  render() {
    return (
      <View style={styles.main_container}>
        <Text style={styles.header_main}>STYLE DE LIEU</Text>
        <View style={styles.container}>
          {this.state.types.map((item, key) => {
            if (this.props.selected == item) {
              return (
                <View key={key} style={styles.btn_containerSelected}>
                    <Image style={styles.imgSelected} source={images[key]} />
                  <Text style={styles.header}>{item}</Text>
                </View>
              );
            } else {
              return (
                <View key={key} style={styles.btn_container}>
                    <Image style={styles.img} source={images[key]} />
                  <Text style={styles.header}>{item}</Text>
                </View>
              );
            }
          })}
        </View>
      </View>
    );
  }
}

PreviewerPlaces.propTypes = {
  selected: PropTypes.string,
};

const styles = StyleSheet.create({
  main_container: {
    paddingRight: 15,
    paddingBottom: 30,
    paddingLeft: 15,
    paddingTop:30,
    marginTop: 15,
    backgroundColor: '#f0f0f0',
    flex:1,
    flexDirection: "column",
    flexWrap: 'wrap',
    width: "100%",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: 'wrap',
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
  header_main: {
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
  header: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "300",
    fontSize: 10,
    color: '#4F4F4F',
    textAlign: 'center',
  },
});
