//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Input from '../Input'
import Button from '../Buttons/Button'
import { styles } from './style'
import { colors } from '@styles'
import { useSelector } from 'react-redux';

// create a component
const ForgotAccount = ({handleResetPassword, setEmail}) => {

  const {isLoading} = useSelector(state => state.auth.reset_password)

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mot de passe</Text>
      <Text style={styles.header}>oublié ?</Text>
      <Input 
          placeholder = "Email"
          style={styles.textInputLine}
          onChangeText = {setEmail}
          keyboardType = "email-address"
      />
      <Button 
          text="Récupérer mon mot de passe" 
          textColor = {colors.WHITE}
          style = {styles.btn}
          onPress = {handleResetPassword}
          isLoading = {isLoading}
      />
    </View>
  );
};

//make this component available to the app
export default ForgotAccount;
