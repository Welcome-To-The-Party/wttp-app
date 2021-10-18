//import liraries
import React, { Component } from 'react';
import { View, Text, ImageBackground, Image, FlatList } from 'react-native';
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import { styles } from './style'
import { Button } from '@components'
import PartySelect from '../../../components/Events/PartySelect';

const background_img = require('@assets/images/User/party_purple.png');
const cross_img = require('@assets/images/Events/cancel.png');
const error_img = require('@assets/images/Errors/OrganizedScreen.png');

// create a component
const OrganizedScreen = ({navigation}) => {

  const createdEvents = useSelector(state => state.user.user.data.createdEvents)

  const ListHeader = () => {
    return (
      <View style={styles.header_container}>
        <ImageBackground source={background_img} style={styles.background_img}>
          <Text style={styles.header}>Veuillez choisir la soirée</Text>
        </ImageBackground>
      </View>
    )
  }

  const renderItem = ({item}) => {
    return(
      <PartySelect 
        eid = {item} 
        onPress = {() => navigation.navigate("EventHandler", {item})} 
      />
    )
  }
  
  return (
    <FlatList
        data = {createdEvents}
        style = {styles.container}
        keyExtractor = {(item) => item.toString()}
        ListEmptyComponent = {EmptyEvent}
        ListHeaderComponent = {ListHeader}
        renderItem = {renderItem}
    />
  );
};

const EmptyEvent = () => {

  const navigation = useNavigation()

  return(
    <View style={styles.container}>
        <View style={styles.header_container}>
            <Text style={styles.headerError}>Aucun événement prévus</Text>
        </View>
        <ImageBackground source={error_img} style={styles.errorCont}>
          <View style={{flexDirection: 'row', alignItems: 'center',}}>
            <Image source={cross_img} style={styles.icon} />
            <Text style={styles.headerError2}>Oups! Il semblerait que
            vous n’ayez créer aucun événement pour l’instant</Text>
          </View>
          <Button 
            style = {styles.btn}
            text={"CRÉER UN ÉVÉNEMENT"} 
            onPress={() => navigation.navigate("CreateEvent")} 
          />
        </ImageBackground>
    </View>
  )
}

//make this component available to the app
export default OrganizedScreen;
