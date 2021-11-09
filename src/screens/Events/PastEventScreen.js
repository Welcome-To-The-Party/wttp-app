//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Share, ImageBackground, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'

import { ImageSlider, Button, MiniNav, BackButton } from '@components'
import { colors } from '@styles'
import { pop } from '../../providers/navigationService';
import PastMiniNav from '../../components/Events/PastMiniNav';

const background = require("@assets/images/Search/party.png");
const tax = 0.2;

// create a component
const PastEventScreen = ({route}) => {

  const {event} = route.params
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      {/* <AlertSucces 
          message={messageParticipate} 
          isVisible={messageParticipate != ''? true: false}
          onClose = {onCloseModal}
      /> */}
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
          <PastMiniNav data = {event} />
        </ScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    backgroundColor: "#fff",
    padding: 20
  },
  backgroundImg: {
    width: "100%",
    height: '100%'
  },
  row: {
    flexDirection: "row",
    alignItems: 'center',
    marginLeft: 5,
  },
  header: {
    color: '#4f4f4f',
    fontSize: 20,
    fontWeight: 'bold',
  },
  para: {
    color: '#4f4f4f',
    fontSize: 20,
    fontWeight: '200',
  },
  title: {
    // width: "65%",
  },
  titleIcon: {
    marginHorizontal: 10,
  },
  padding: {
    marginTop: 10,
  },
  btn: {
    backgroundColor: colors.PRIMARY,
    width: 150,
    borderRadius: 10
  },
  title_event: {
    marginVertical: 20,
    color: '#4f4f4f',
    fontSize: 20,
    fontWeight: '200',
  },
  back_btn: {
    width: 50,
    height: 50,
    position: 'absolute',
    zIndex: 2,
    top: 0,
    left: 0
  }
});

//make this component available to the app
export default PastEventScreen;
