//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { UserSwipe, Loading } from '@components'
import { useDispatch, useSelector } from 'react-redux';
import { AlertSucces } from '../../components';
import { ACCEPT_PARTICIPATION } from '../../store/events/type';

// create a component
const ValidationScreen = ({data, eventid}) => {

  const dispatch = useDispatch()
  const { isLoading, message } = useSelector(state => state.events.accpet_participation)

  const onCloseModal = () => {
    dispatch({type: `${ACCEPT_PARTICIPATION}_SUCCESS`, payload: ''})
  }

  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      <AlertSucces
        isVisible = {message?true:false}
        message = {message}
        onClose = {onCloseModal}
      />
      {
        data?.length ==0?
        <View style = {styles.content}>
          <Text style = {styles.infos}>Aucune personne en attente </Text>
        </View>:
        <Carousel
          data={data}
          loop
          renderItem={({item}) => <UserSwipe eventid = {eventid} item={item} />}
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
export default ValidationScreen;
