//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'

import Button from '../Buttons/Button'
import Input from '../Input'
import { styles } from './style'
import { colors } from '@styles'
import { login } from '@store/auth/actionAuth'
import AlertError from '../AlertError';
import { LOGIN } from '@store/auth/type';

// create a component
const LoginAccount = ({navigation}) => {

  const {isLoading, error} = useSelector(state => state.auth.login)
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const auth = () => {
    dispatch(login({email, password}))
  }

  const onClose = () => {
    dispatch({type: `${LOGIN}_FAIL`, error: ""});
  }


  return (
    <View style={styles.container}>
        <Text style={styles.header}>Se connecter</Text>
        <Text style={styles.header}>à votre compte</Text>
        <View>
          <Input 
            placeholder = "Email"
            style={styles.textInputLine}
            onChangeText = {setEmail}
            keyboardType = "email-address"
          />
          <Input 
            placeholder = "Mot de passe"
            style={styles.textInputLine}
            onChangeText = {setPassword}
            secureTextEntry = {!show}
            rightIcon = {show? "ios-eye" : "ios-eye-off"}
            onPressRight = {() => setShow(!show)}
          />
        </View>
        <Button 
          text="SE CONNECTER" 
          textColor = {colors.WHITE}
          style = {styles.btn}
          onPress = {auth}
          isLoading = {isLoading}
        />
        <AlertError
          isVisible = {error? true: false}
          message = {error}
          onClose = {onClose}
        />
    </View>
  );
};

//make this component available to the app
export default LoginAccount;
