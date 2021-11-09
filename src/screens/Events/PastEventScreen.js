//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Share, ImageBackground, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'

import { ImageSlider, Button, MiniNav, BackButton } from '@components'
import { colors } from '@styles'
import { pop } from '../../providers/navigationService';

const background = require("@assets/images/Search/party.png");
const tax = 0.2;

// create a component
const PastEventScreen = ({route}) => {

  const {event} = route.params
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <AlertSucces 
          message={messageParticipate} 
          isVisible={messageParticipate != ''? true: false}
          onClose = {onCloseModal}
      />
      <ImageBackground 
        source={background} 
        style={styles.backgroundImg} 
      >
        <BackButton onPress = {() => pop()} />
        <ScrollView 
          style={styles.mapContainer}
          contentContainerStyle = {{paddingBottom: 150}}
        >
          <View>
            <View style={styles.row}>
              <View style={[styles.row, {flex: 1}]} >
                <Text style={styles.header}>
                  {((event?.price) +((event?.price) * tax)).toFixed(2)}
                  EUR
                </Text>
                <Text style={styles.para}>/place</Text>
              </View>
            </View>
          </View>
          <View style={styles.padding}>
            <Text style={styles.title_event}>{event?.title}</Text>
          </View>
          <ImageSlider data={event?.pictures} />
          <MiniNav data = {event} />
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default PastEventScreen;
