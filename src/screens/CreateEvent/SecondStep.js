//import liraries
import React, { useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';

import { styles } from './style'
import { colors } from '@styles'
import { Button, Places, Select } from '@components'

const banner = require('@assets/images/CreateEvent/party4.png');
const music_types = [ 'RAP US', 'POP', 'ROCK', 'ELECTRO', 'RNB', 'HIP HOP', 'DANCEHALL', 'ZOUK', 'TECHNO', 'DEEP HOUSE',
  'SOUL', 'JAZZ', 'FUNK', 'DUBSTEP', 'REGGAE' ];
const party_types = [ 'POSÉE', 'BRINGUE' ];

// create a component
const SecondStep = ({
  setActiveStep,
  setMusicType,
  setPlaceType,
  setType,
  type,
  musicType,
  placeType
}) => {

  return (
    <View style={styles.container}>
      <ScrollView>
          <View style={styles.padding}>
            <Image source={banner} style={styles.banner} />
          </View>
          <View style={styles.padding}>
            <Text style={styles.header}>Champs obligatoires</Text>
            <Text style={styles.header2}>TYPE DE MUSIQUE</Text>
            <Select 
              selected={musicType} 
              set={(data) => setMusicType(data)} 
              types={music_types} 
            />
            <Text style={styles.header2}>TYPE DE SOIRÉE</Text>
            <Select 
              selected={type} 
              set={(data) => setType(data)} 
              types={party_types} 
            />
            <Text style={styles.header2}>STYLE DE LIEU</Text>
            <Places 
              selected={placeType} 
              set={(data) => setPlaceType(data)} 
            />
            <Button 
              text={"PASSER À L’ÉTAPE 3"}
              textColor = {colors.WHITE}
              style = {styles.btnNextStep}
              onPress = {() => setActiveStep(2)}
           />
          </View>
        </ScrollView>
    </View>
  );
};

//make this component available to the app
export default SecondStep;

