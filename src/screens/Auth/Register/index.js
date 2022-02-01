//import liraries
import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, Platform, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux'

import { 
    CreateAccount, 
    FacebookButton, 
    AppleButton,
    GoogleButton,
    BackButton 
} from '@components'
import { styles } from '../style'

const background_img = require('@assets/images/register_background.jpg');
const icon = require('@assets/icons/icon.png');

const social_login = async (social_type) => {
       
}

// create a component
const RegisterScreen = ({navigation}) => {

    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <ImageBackground 
                source={background_img}
                style={styles.back_images_container}
            >
                <BackButton onPress = {() => navigation.goBack()} />
                <View style={styles.miniContainer}>
                    <Image source={icon} style={styles.icon} />
                    <Text style={styles.header}>Votre soirée,</Text>
                    <Text style={styles.header}>Quand vous voulez.</Text>
                </View>
                <ScrollView 
                    style={styles.createContainer} 
                    contentContainerStyle = {{paddingBottom: 40}}
                    keyboardShouldPersistTaps = 'always'
                >
                    <CreateAccount />
                    <FacebookButton 
                        onPress = {social_login('facebook')}
                    />
                    <GoogleButton
                        onPress = {social_login('google')}
                    />
                    { Platform.OS === 'ios' ? <AppleButton /> : null}
                </ScrollView>
            </ImageBackground>
        </View>
    );
};

//make this component available to the app
export default RegisterScreen;
