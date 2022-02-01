//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import ConfirmCancelEvent from '../../components/ConfirmCancelEvent';
import EmptyEvent from '../../components/Events/EmptyEvent';
import PartySelect from '../../components/Events/PartySelect';
import { navigate } from '../../providers/navigationService';
import { cancel_event } from '../../store/events/actionEvents';

// create a component
const ToComeScreen = ({data}) => {

  const [isVisible, setIsVisible] = useState(false)
  const [eventId, setEventId] = useState()
  const dispatch = useDispatch()

  const toggleModal = (eventId) => {
    if(eventId){
      setEventId(eventId)
      setIsVisible(!isVisible)
    }
    setIsVisible(!isVisible)
  }

  const handleCancelEvent = () => {
    console.log({id: eventId})
    dispatch(cancel_event({id: eventId}))
  }

  return (
    <View style={styles.container}>
      <ConfirmCancelEvent
        isVisible = {isVisible}
        toggle = {() => setIsVisible(false)}
        message = 'Êtes-vous sûr de vouloir annuler cette évènement ?'
        onSumit = {handleCancelEvent}
      />
      <FlatList
        data = {data}
        keyExtractor = {(item) => String(item.title)}
        renderItem = {({item}) => (
          <PartySelect
            isComing = {true}
            item = {item}
            toggleModal = {toggleModal}
            onPress = {() => navigate("EventHandler", {event: item})} 
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
export default ToComeScreen;
