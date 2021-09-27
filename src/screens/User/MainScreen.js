//import liraries
import React, { Component } from 'react';
import { View, Text, ImageBackground, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'

import { styles } from './style'
import { UserImageButton, Button } from '@components'
import { colors } from '@styles'
import { log_out } from '../../store/user/actionUser'

const background_img = require('@assets/images/User/party.png');
const profil = require('@assets/images/User/profil.png');
const night = require('@assets/images/User/night.png');
const drink = require('@assets/images/User/drink.png');
const stripe = require('@assets/images/User/stripe.png');
const settings = require('@assets/images/User/settings.png');

// create a component
const MainScreen = ({navigation}) => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user.data)

  const logOut = () => {
    dispatch(log_out())
    navigation.navigate('Auth')
  }

  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <ImageBackground source={background_img} style={styles.background_img}>
          <TouchableOpacity onPress={() => navigation.navigate("Public")} style={{position: 'absolute'}}>
            <Image source={{uri: user.picture}} style={styles.pro_icon} />
            <View style={styles.pictureCircle}>
              <Text style={{textAlign: 'center', color: '#fff'}}>VOIR MON PROFIL</Text>
            </View>
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <ScrollView style = {styles.content}>
        <Text style={styles.header}>Mon compte</Text>
        <UserImageButton 
          text={"Modifier mon profil"} 
          desc={"Gérer mes informations personnelles"}
          onPress = {() => navigation.navigate("Edit")}
          image={profil} 
        />
        <UserImageButton 
          text={"Mes événements organisés"} 
          desc={"Gérer mes événements que j’ai organisés"}
          onPress = {() => navigation.navigate("Organized")}
          image={night} 
        />
        <UserImageButton 
          text={"Mes événements participés"} 
          desc={"Gérer mes événements auxquels j’ai participé"}
          onPress = {() => navigation.navigate("ParticipateHandler")}
          image={drink} 
        />
        <UserImageButton 
          text={"Mon compte Stripe"} 
          desc={"Gérer mes comptes de débits et crédits"}
          onPress = {() => navigation.navigate("Stripe")}
          image={stripe} 
        />
        <UserImageButton 
          text={"Paramètres de compte"} 
          desc={"Gérer mon compte personnel et informations"}
          onPress = {() => navigation.navigate("Settings")}
          image={settings} 
        />
        <Button 
          text={"Déconnexion"}
          textColor = {colors.WHITE}
          style = {styles.btn}
          onPress = {logOut} 
        />
      </ScrollView>
    </View>
  );
};

//make this component available to the app
export default MainScreen;
