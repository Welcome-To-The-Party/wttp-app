//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'

import Button from '../Buttons/Button'
import Input from '../Input'
import { styles } from './style'
import { colors } from '@styles'
import { REGISTER } from '@store/auth/type';
import { register } from '@store/auth/actionAuth';
import AlertError from '../AlertError';
import AlertSucces from '../AlertSucces';
import { navigate } from '../../providers/navigationService';

// create a component
const CreateAccount = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [passwordRepeat, setPasswordRepeat] = useState()
    const [show, setShow] = useState(false);
    const [showRepeatPass, setShowRepeatPass] = useState(false);
    const {isLoading, error, message} = useSelector(state => state.auth.register)
    const dispatch = useDispatch();

    const handleRegister = () => {
        dispatch(register({
            email,
            password,
            name,
            passwordRepeat
        }))
    }

    console.log('isLoading', isLoading)

    const onClose = () => {
        dispatch({type: `${REGISTER}_FAIL`, error: ""});
    }

    const onCloseSucces = () => {
        dispatch({type: `${REGISTER}_SUCCESS`, payload: ""});
        navigate("Login")
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Créer votre compte</Text>
            <Input 
                placeholder = "Votre nom"
                style={styles.textInputLine}
                onChangeText = {setName}
            />
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
            <Input 
                placeholder = "Confirmer le mot de passe"
                style={styles.textInputLine}
                onChangeText = {setPasswordRepeat}
                secureTextEntry = {!showRepeatPass}
                rightIcon = {showRepeatPass? "ios-eye" : "ios-eye-off"}
                onPressRight = {() => setShowRepeatPass(!showRepeatPass)}
            />
            <Button 
                text="INSCRIPTION"
                textColor = {colors.WHITE}
                style = {styles.btn}
                onPress = {handleRegister}
                isLoading = {isLoading}
            />
            <AlertError
                isVisible = {error? true: false}
                message = {error}
                onClose = {onClose}
            />
            <AlertSucces
                isVisible = {message? true: false}
                message = {message}
                onClose = {onCloseSucces} 
            />
        </View>
    );
};

//make this component available to the app
export default CreateAccount;
