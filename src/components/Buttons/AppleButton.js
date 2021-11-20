import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ActivityIndicator, Modal } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import { useSelector, useDispatch } from 'react-redux'
import { social_login } from '@store/auth/actionAuth'
import { mixins } from '@styles'
import SocialLogin from '../SocialLogin';
const apple_icon = require('@assets/icons/apple.png');

const AppleButton = ({onPress}) => {

  const dispatch = useDispatch();

  const {isLoading } = useSelector(state => state.auth.social_login.googleLoading)

  const social_auth = (data) => {
    dispatch(social_login({social_type: 'apple', ...data}))
  }

  return (
    <View style = {{width: '100%'}}>
      <SocialLogin
          url = {false}
          network = "apple"
      />
    <TouchableOpacity 
      style={styles.container} 
      onPress={async () => {
        try {
          const credential = await AppleAuthentication.signInAsync({
            requestedScopes: [
              AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
              AppleAuthentication.AppleAuthenticationScope.EMAIL,
            ],
          });
          // signed in
          console.log('credential', credential)
          social_auth(credential)
        } catch (e) {
          if (e.code === 'ERR_CANCELED') {
            // handle that the user canceled the sign-in flow
            console.log('cancelled');
          } else {
            alert(`Apple Login Error: ${e.message}`);
          }
        }
      }}
    >
    <Image source={apple_icon} style={styles.icon} />
    <Text style={styles.buttonText}>Continuer avec Apple</Text>
    </TouchableOpacity>
  </View>
  );
}

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
    width: 30,
    height: 30,
  }
});

export default AppleButton;
