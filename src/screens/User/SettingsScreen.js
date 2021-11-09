//import liraries
import React, { useState } from 'react';
import { ScrollView, ImageBackground, StyleSheet, TouchableOpacity, Text, Image, View, Linking  } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { CommonActions } from '@react-navigation/native';

import { UserImageButton, Button, DeleteAccount } from '@components'
import { colors } from '@styles'
import { delete_account, log_out } from '@store/user/actionUser';

const background_img = require('@assets/images/User/party.png');
const star = require('@assets/images/User/star.png');
const bell = require('@assets/images/User/bell.png');
const mail = require('@assets/images/User/mail.png');
const ban = require('@assets/images/User/ban.png');

// create a component
const SettingsScreen = ({navigation}) => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user.data)
  const [ isVisible, setIsVisible ] = useState(false)

  const logOut = () => {
    dispatch(log_out())
    navigation.dispatch(
      CommonActions.reset({
          index: 1,
          routes: [{name: "Welcome"}]
      })
    )
  }

  const toggleModal = () => {
    setIsVisible(!isVisible)
  }

  const openApp = () => {

  }

  console.log("--- user ---", user)

  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <ImageBackground source={background_img} style={styles.background_img}>
          <TouchableOpacity onPress={() => navigation.navigate('Public', {user})} style={{position: 'absolute'}}>
            <Image source={{uri: user.picture}} style={styles.pro_icon} />
            <View style={styles.pictureCircle}>
              <Text style={{textAlign: 'center', color: '#fff'}}>VOIR MON PROFIL</Text>
            </View>
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <DeleteAccount
        isVisible = {isVisible}
        toggle = {toggleModal}
        onDelete = {() => dispatch(delete_account())}
      />
      <ScrollView style = {styles.content}>
        <UserImageButton 
          text={"Noter l'application"} 
          desc={"Tu aimes cette application? donne ton avis."}
          onPress={openApp} 
          image={star} 
        />
        <UserImageButton 
          text={"Notificaitons"} 
          desc={"Gérer les notifications de l’application"}
          onPress={() => navigation.navigate('Notif')} 
          image={bell} 
        />
        <UserImageButton 
          text={"Modifier l'adresse mail"} 
          desc={"Changer votre mail de connexion/contact"}
          onPress={() => navigation.navigate('Email')} 
          image={mail} 
        />
        <UserImageButton 
          text={"Supprimer mon compte"} 
          desc={"Me retirer de la plateforme"}
          onPress={toggleModal} 
          image={ban} 
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

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20
  },
  header_container: {
    width: '100%',
    height: '20%',
    marginBottom: 50,
  },
  pictureCircle: {
    backgroundColor: '#6f6f6f8f',
    width: 100,
    height: 100,
    borderRadius: 100,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background_img: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pro_icon: {
    width: 100,
    height: 100,
    borderRadius: 100,
    top: '50%',
  },
  header: {
    fontFamily: 'Roboto',
    fontStyle: 'italic',
    fontWeight: "700",
    fontSize: 20,
    color: '#4f4f4f',
    marginLeft: 30,
  },
  btn: {
    backgroundColor: colors.PRIMARY
  },
});

//make this component available to the app
export default SettingsScreen;
