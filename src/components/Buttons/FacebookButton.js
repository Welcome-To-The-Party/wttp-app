import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ActivityIndicator, Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import * as Facebook from 'expo-facebook';
import { mixins } from '@styles'
import SocialLogin from '../SocialLogin';
import { social_login } from '@store/auth/actionAuth'
import { FACEBOOK_ID } from '@env'


const fb_icon = require("@assets/icons/facebook.png")

// create a component
const FacebookButton = ({onPress}) => {

  const dispatch = useDispatch();

  const {isLoading } = false // useSelector(state => state.auth.social_login.googleLoading)

  const social_auth = (data) => {
    dispatch(social_login({social_type: 'facebook', ...data}))
  }

  async function facebook_login() {
    try {
      await Facebook.initializeAsync({
        appId: FACEBOOK_ID,
      });
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
        .then(response => response.json())
        .then(data => {
          dispatch(social_auth(data))
        })
        .catch(e => console.log(e))
      } else {
        console.log('cancelled');
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  return (
    <View style = {{width: '100%'}}>
      <SocialLogin 
        url = {false}
        network = "facebook"  
      />
      <TouchableOpacity 
        style={styles.container} 
        onPress={() => facebook_login()}
      >
        <Image 
          source = {fb_icon}
          style={styles.icon}
        />
        <Text style={styles.buttonText}>Continuer avec Facebook</Text>
        {
          isLoading && 
          <ActivityIndicator color = "#fff" size = 'large' />
        }
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: "#3B5998",
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,
    paddingRight: 20,
    ...mixins.boxShadow("#777")
  },
  buttonText: {
    flex: 1,
    paddingLeft: 25,
    paddingRight: 15,
    color: "#fff",
    fontSize: 18,
  },
  icon: {
    marginLeft: 20,
    width: 25,
    height: 25,
  }
});

//make this component available to the app
export default FacebookButton;
