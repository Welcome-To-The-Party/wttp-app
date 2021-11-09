//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { Button, Input } from '@components'
import { styles } from './style'
import { colors } from '@styles'

const banner = require('@assets/images/CreateEvent/party3.png');
const inputGoogle = {
  container: {
    flex: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderBottomColor: colors.PRIMARY,
    borderBottomWidth: 1,
  },
  textInputContainer: {
    paddingRight: 8,
    paddingLeft: 8,
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 15,
  },
  textInput: {
    backgroundColor: '#fff',
  },
  row: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 13,
    height: 44,
    flexDirection: 'row',
  }
}

// create a component
const FirstStep = ({
  setActiveStep, 
  setTitle, 
  setDescription, 
  setAddress,
  title,
  description,
  address
}) => {
  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <View style={styles.padding}>
          <Image source={banner} style={styles.banner} />
        </View>
        <View style={styles.padding}>
          <Text style={styles.header}>Champs obligatoires</Text>
          {/* <Text style={styles.header2}>TITRE</Text> */}
          <Input 
            onChangeText={setTitle}
            style={styles.input} 
            placeholder={"Titre de votre événement"} 
            maxLength={30}
            defaultValue = {title}
          />
          {/* <Text style={styles.header2}>DESCRIPTION</Text> */}
          <Input 
            onChangeText={setDescription}
            style={styles.input} 
            placeholder={"Décrivez brièvement votre événement"}
            defaultValue = {description}
            multiline = {true}
          />
          {/* <Text style={styles.header2}>ADRESSE DE L’ÉVÉNEMENT (privée)</Text> */}
          <GooglePlacesAutocomplete
            placeholder='Lieu de votre événement'
            onPress={async (data, details = null) => {
              console.log("text", details)
              // await this.props.setAddress(details.formatted_address, details.geometry.location.lat, details.geometry.location.lng);
              setAddress({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                address: details.formatted_address
              });
            }}
            query={{
              key: 'AIzaSyAZTZx2-gwcOimkU1UoSlLr5rxfLpI7EAE',
              language: 'en',
            }}
            fetchDetails={true}
            styles={inputGoogle}
            currentLocation={false}
            keyboardShouldPersistTaps={"always"}
            currentLocationLabel='Position Actuelle'
          />
          <Button 
            text={"PASSER À L’ÉTAPE 2"}
            textColor = {colors.WHITE}
            style = {styles.btnNextStep}
            onPress = {() => setActiveStep(1)}
          />
        </View>
      </ScrollView>
    </View>
  );
};

//make this component available to the app
export default FirstStep;
