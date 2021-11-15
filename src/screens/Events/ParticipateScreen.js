//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { ParticipateSwipe, Loading } from '@components'
import { useDispatch, useSelector } from 'react-redux';
import QRcodeView from '../../components/QRcodeView';
import { GET_TICKET } from '../../store/ticket/type';

// create a component
const ParticipateScreen = ({data}) => {

  const dispatch = useDispatch()
  const dataTicker = useSelector(state => state.ticket.data.data)

  const onCloseModal = () => {
    dispatch({type: `${GET_TICKET}_SUCCESS`, payload: {
      data: {}
    }})
  }

  console.log('ticket', dataTicker)

  return (
    <View style={styles.container}>
      <QRcodeView 
        data = {dataTicker}
        isVisible = {dataTicker?.cypher? true: false}
        onClose = {onCloseModal}
      />
      {
        data?.length == 0?
        <View style = {styles.content}>
          <Text style = {styles.infos}>Aucun évènement confirmé </Text>
        </View>:
        <Carousel
          data={data}
          loop
          layout = {Platform.OS == 'ios'?'stack': 'default'}
          renderItem={({item}) => <ParticipateSwipe item={item} />}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width - 120}
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
export default ParticipateScreen;
