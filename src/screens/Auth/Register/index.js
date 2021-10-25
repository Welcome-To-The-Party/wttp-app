//import liraries
import React, { Component } from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import { useDispatch } from 'react-redux'

import { 
    CreateAccount, 
    FacebookButton, 
    GoogleButton,
    BackButton 
} from '@components'
import { styles } from '../style'
import { login_facebook, login_google } from '@store/auth/actionAuth';

const background_img = require('@assets/images/register_background.jpg');
const icon = require('@assets/icons/icon.png');

// create a component
const RegisterScreen = () => {

    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <ImageBackground 
                source={background_img}
                style={styles.back_images_container}
            >
                <BackButton />
                <View style={styles.miniContainer}>
                    <Image source={icon} style={styles.icon} />
                    <Text style={styles.header}>Votre soirée,</Text>
                    <Text style={styles.header}>Quand vous voulez.</Text>
                </View>
                <View style={styles.createContainer}>
                    <CreateAccount />
                    <FacebookButton 
                        onPress = {() => dispatch(login_facebook())}
                    />
                    <GoogleButton
                        onPress = {() => dispatch(login_google())}
                    />
                </View>
            </ImageBackground>
        </View>
    );
};

//make this component available to the app
export default RegisterScreen;
