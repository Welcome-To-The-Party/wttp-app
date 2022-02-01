//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useSelector, useDispatch } from 'react-redux';

import { ParticipationSwipe, Loading, AlertSucces } from '@components'
import { CANCEL_PARTICIPATION } from '../../store/events/type';

// create a component
const CancelEventScreen = ({data}) => {

  const dispatch = useDispatch()
  const { isLoading, message } = useSelector(state => state.events.cancel_participation)

  const onCloseModal = () => {
      dispatch({type: `${CANCEL_PARTICIPATION}_SUCCESS`, payload: ''})
  }

  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      <AlertSucces
        message = {message}
        isVisible = {message?true:false}
        onClose = {onCloseModal}
      />
      {
        data?.length == 0?
        <View style = {styles.content}>
          <Text style = {styles.infos}>Aucun évènement en attente </Text>
        </View>:
        <Carousel
          data={data}
          loop
          layout = {Platform.OS == 'ios'?'stack': 'default'}
          renderItem={({item}) => <ParticipationSwipe item={item} />}
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
    paddingVertical: 40
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
export default CancelEventScreen;
