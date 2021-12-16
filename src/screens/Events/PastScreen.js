//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import EmptyEvent from '../../components/Events/EmptyEvent';
import PartySelect from '../../components/Events/PartySelect';
import { navigate } from '../../providers/navigationService';
import { finish_event } from '../../store/events/actionEvents';
import AlertSucces from '../../components/AlertSucces'
import { FINISH_EVENT } from '../../store/events/type';
import { Loading } from '@components'

// create a component
const PastScreen = ({data}) => {

  const dispatch = useDispatch()
  const {isLoading, message} = useSelector(state => state.events.finish_event)

  const handleFinishEvent = (idEvent) => {
    dispatch(finish_event(idEvent))
  }

  const onClose = () => {
    dispatch({
      type: `${FINISH_EVENT}_SUCCESS`,
      payload: ''
    })
  }

  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      <AlertSucces 
        message = {message}
        isVisible = {message?true:false}
        onClose = {onClose}
      />
      <FlatList
        data = {data}
        keyExtractor = {(item) => String(item.title)}
        renderItem = {({item}) => (
          <PartySelect 
            isComing = {false} 
            item = {item}
            finishEvent = {handleFinishEvent}
            onPress = {() => navigate("PastEventScreen", {event: item})} 
          />
        )}
        ListEmptyComponent = {EmptyEvent}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  },
});

//make this component available to the app
export default PastScreen;
