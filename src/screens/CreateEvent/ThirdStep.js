//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

import { styles } from './style'
import { colors } from '@styles'
import { Button, Smoke} from '@components'

const banner = require('@assets/images/CreateEvent/party5.png');
const add_img = require('@assets/images/CreateEvent/add_img.png');
const tax = 0.1;

// create a component
const ThirdStep = ({
  setActiveStep,
  setPrice,
  setSmoke,
  setPictures,
  setMaxAllowed,
  price,
  smoke,
  pictures,
  maxAllowed
}) => {

  const get_img = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.cancelled) {
      const manipResult = await ImageManipulator.manipulateAsync(
        result.uri,
        [{ resize: {width: result.width/3, height: result.height/3} }],
        { compress: 1, base64: true}
      );
      setPictures([...pictures, manipResult.uri]);
    }
  }

  const remove_img = (key) => {
    
    let newImages = [...pictures]
    let index = newImages.findIndex((item, index) => index == key);
    console.log('images', index)
    if (index !== -1) {
      newImages.splice(index, 1);
      setPictures(newImages);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.padding}>
          <Image source={banner} style={styles.banner} />
        </View>
          <View style={styles.padding}>
            <Text style={styles.header}>Champs obligatoires</Text>
            <Text style={styles.header2}>NOMBRE DE PARTICIPANTS MAXIMUM</Text>
            <Slider 
              style={{width: '100%', height: 40}} 
              minimumValue={2} 
              step={1}
              maximumValue={120} 
              minimumTrackTintColor="#007AFF" 
              value={maxAllowed}
              maximumTrackTintColor="#000000" 
              onValueChange={setMaxAllowed} 
            />
            <Text style={styles.header2}>Votre lieu est en capacité d’accepter: {maxAllowed} invités</Text>
            <Text style={styles.header2}>TARIF UNITAIRE D’UNE PLACE</Text>
            <Slider 
              style={{width: '100%', height: 40}} 
              minimumValue={2} 
              step={1}
              maximumValue={120} 
              minimumTrackTintColor="#007AFF" 
              value={Number(price)}
              maximumTrackTintColor="#000000" 
              onValueChange={setPrice} 
            />
            <Text style={styles.header2}>Tarif unitaire d’une réservation: {price}.00 EUR</Text>
            <Text style={styles.header2}>Frais de mise en relation: {Number(Number(price) * tax).toFixed(2)} EUR</Text>
            <Text style={styles.header2}>Tu recevras exactement: {Number(price) - Number(Number(price) * tax).toFixed(2)} EUR</Text>
            <Text style={styles.header2}>ESPACES FUMEURS</Text>
            <Smoke selected={smoke} set={(data) => setSmoke(data)} />
            <Text style={styles.header2}>PHOTOS DU LIEU DE L’ÉVÉNEMENT</Text>
            <ScrollView horizontal={true}>
              { pictures.map((data, key) => {
                return (
                  <TouchableOpacity key={key} onPress={() => remove_img(key)} >
                    <Image key={key} source={{ uri: data }} style={{ width: 150, height: 150, marginRight: 10, borderRadius: 10 }} />
                  </TouchableOpacity>
                );
              })}
              <TouchableOpacity onPress={get_img} >
                <Image source={add_img} style={{ width: 150, height: 150, marginRight: 10, borderRadius: 10 }} />
              </TouchableOpacity>
            </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

//make this component available to the app
export default ThirdStep;
