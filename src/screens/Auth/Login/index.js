//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux'

import { 
    LoginAccount, 
    FacebookButton, 
    GoogleButton 
} from '@components'
import { styles } from '../style'
import { login_facebook, login_google } from '@store/auth/actionAuth';

const background_img = require('@assets/images/register_background.jpg');
const icon = require('@assets/icons/icon.png');

// create a component
const LoginScreen = ({navigation}) => {

    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <ImageBackground 
                source={background_img}
                style={styles.back_images_container}
            >
                <View style={styles.miniContainer}>
                    <Image source={icon} style={styles.icon} />
                    <Text style={styles.header}>Profitez ou organisez,</Text>
                    <Text style={styles.header}>C'est vous qui voyez..</Text>
                </View>
                <View style={styles.createContainer}>
                    <LoginAccount navigation = {navigation} />
                    <FacebookButton 
                        onPress = {() => dispatch(login_facebook())}
                    />
                    <GoogleButton
                        onPress = {() => dispatch(login_google())}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate("Forgoten")}>
                        <Text style={{color: 'black'}}>Mot de passe oublié ?</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
};

//make this component available to the app
export default LoginScreen;
