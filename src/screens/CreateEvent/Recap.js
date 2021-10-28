//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'

import { music_types, party_types } from '@constant'
import { PreviewerText, PreviewerPlaces, PreviewerSelect, Button } from '@components'
import { navigate } from '../../providers/navigationService';
import { colors } from '@styles'
import { Loading } from '../../components';
import { create_event } from '../../store/events/actionEvents';
import AlertSucces from '../../components/AlertSucces';
import { CREATE_EVENT } from '../../store/events/type';

const background = require('@assets/images/CreateEvent/blob.png');

// create a component
const Recap = ({route}) => {

  const data  = route.params?.data
  const dispatch = useDispatch()
  const { message, isLoading } = useSelector(state => state.events.create)
  const {stripeAccountID, completedStripeAccount} = useSelector(state => state.user.user.data)

  console.log("stripeAccountID", stripeAccountID)
  
  const onClose = () => {
    dispatch({type: `${CREATE_EVENT}_FAIL`, payload: ''})
  }

  const handleCreateEvent = () => {
    if (
        stripeAccountID != undefined && 
        stripeAccountID.length > 0 && 
        completedStripeAccount
    ) dispatch(create_event(data))
    else navigate("card")
  }

  return (
    <View style={styles.container}>
      <AlertSucces 
        message = {message}
        isVisible = {message? true: false}
        onClose = {onClose}
      />
      <View style={styles.padding}>
          <Text style={styles.header}>INFOS</Text>
      </View>
      <ImageBackground source={background} style={styles.background}>
        {isLoading && <Loading />}
        <ScrollView>
          <PreviewerText 
            title={"TITRE"} 
            description={data?.title}
            // run={()=> navigate('first')} 
          />
          <PreviewerText 
            title={"DESCRIPTION"} 
            description={data?.description}
            // run={()=> navigate('first')} 
          />
          <PreviewerText 
            title={"ADDRESSE DE L’ÉVÉNEMENT"} 
            description={data?.address}
            // run={()=> navigate('first')} 
          />

          <PreviewerSelect 
            types={music_types} 
            selected={data?.musicType}
            title={"TYPE DE MUSIQUE"} 
            // run={()=> navigate('second')} 
          />
          <PreviewerSelect 
            types={party_types} 
            selected={data?.type}
            title={"TYPE DE SOIREE"} 
            // run={()=> navigate('second')} 
          />

          <PreviewerPlaces 
            types={party_types} 
            selected={data?.placeType}
            title={"TYPE DE SOIREE"} 
            // run={()=> navigate('third')} 
          />
          <Button 
            text={"VALIDER L’ÉVÉNEMENT"}
            textColor = {colors.WHITE}
            style = {styles.btn}
            onPress={handleCreateEvent} 
          />
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: "column",
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#fff',
  },
  header: {
    marginLeft: 10,
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: 'Roboto',
    fontStyle: 'italic',
    fontWeight: "700",
    fontSize: 20,
    color: '#4F4F4F',
  },
  background: {
    width: '100%',
    height: '95%',
  },
  padding: {
    marginTop: 10,
    marginBottom: 5,
  },
  btn: {
    backgroundColor: colors.PRIMARY,
    marginHorizontal: 20,
    marginBottom: 30
  }
});

//make this component available to the app
export default Recap;
