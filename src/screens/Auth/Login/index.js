//import liraries
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, Linking } from 'react-native';

import { 
    LoginAccount, 
    FacebookButton, 
    GoogleButton,
    BackButton
} from '@components'
import { styles } from '../style'

const background_img = require('@assets/images/register_background.jpg');
const icon = require('@assets/icons/icon.png');

// create a component
const LoginScreen = ({navigation}) => {

    const login_facebook = async () => {
       
    }

    const login_google = () => {
        
    }

    return (
        <View style={styles.container}>
            <ImageBackground 
                source={background_img}
                style={styles.back_images_container}
            >
                <BackButton />
                <View style={styles.miniContainer}>
                    <Image source={icon} style={styles.icon} />
                    <Text style={styles.header}>Profitez ou organisez,</Text>
                    <Text style={styles.header}>C'est vous qui voyez..</Text>
                </View>
                <View style={styles.createContainer}>
                    <LoginAccount navigation = {navigation} />
                    <FacebookButton 
                        onPress = {login_facebook}
                    />
                    <GoogleButton
                        onPress = {login_google}
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
