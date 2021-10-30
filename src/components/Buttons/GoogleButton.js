import React, { useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Modal, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { mixins } from '@styles'
import SocialLogin from '../SocialLogin';
import { social_login } from '@store/auth/actionAuth'
import { IOS_CLIENT_ID, ANDROID_CLIENT_ID } from '@env'
import * as Google from "expo-google-app-auth";

const fb_icon = require('@assets/icons/google.png');

// create a component
const GoogleButton = ({onPress}) => {

  const dispatch = useDispatch();

  const {isLoading } = useSelector(state => state.auth.social_login.googleLoading)

  const social_auth = (data) => {
    dispatch(social_login({social_type: 'google', ...data}))
  }
  
  const google_login = async () => {
    try {
      const { type, user } = await Google.logInAsync({
        iosClientId: IOS_CLIENT_ID,
        androidClientId: ANDROID_CLIENT_ID,
        scopes: ['profile', 'email'],
      });

      if (type === "success") {
        // Then we can use the Google REST API
        dispatch(social_auth(user))
      } else {
        console.log('cancelled');
      }
    } catch ({ message }) {
      alert(`Google Login Error: ${message}`);
    }
  };

  return (
      <View style = {{width: '100%'}}>
        <SocialLogin
          url = {false}
          network = "google"
        />
        <TouchableOpacity style={styles.container} 
          onPress={() => google_login()}>
          <Image source={fb_icon} style={styles.icon} />
          <Text style={styles.buttonText}>Continuer avec Google</Text>
          {
            isLoading && 
            <ActivityIndicator color = "#000" size = 'large' />
          }
        </TouchableOpacity>
      </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,
    paddingRight: 20,
    ...mixins.boxShadow("#777")
  },
  buttonText: {
    paddingLeft: 25,
    paddingRight: 15,
    flex: 1,
    color: "#555",
    fontSize: 18,
  },
  icon: {
    marginLeft: 20,
    width: 25,
    height: 25,
  }
});

//make this component available to the app
export default GoogleButton;