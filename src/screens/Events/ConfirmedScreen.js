//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import Carousel from 'react-native-snap-carousel';
var _ = require('lodash')

import { UserGrade } from '@components'

// create a component
const ConfirmedScreen = ({data, participatingUsers}) => {
  return (
    <View style={styles.container}>
      {
        data?.length == 0 && participatingUsers?.length == 0?
        <View style = {styles.content}>
          <Text style = {styles.infos}>Aucune personne n'a été confirmé </Text>
        </View>:
        <Carousel
          data={_.concat(participatingUsers, data)}
          loop
          layout = {Platform.OS == 'ios'?'stack': 'default'}
          renderItem={({item}) => <UserGrade usersThatPaid = {data} item={item} />}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width - 80}
        />
      }
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: '#fff'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infos: {
    fontSize: 18,
    color: '#777'
  }
});

//make this component available to the app
export default ConfirmedScreen;
