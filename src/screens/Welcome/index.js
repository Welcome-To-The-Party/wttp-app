//import liraries
import React, { useEffect, useRef } from 'react';
import { View, Text, ImageBackground, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'

import { styles } from './style'
import { 
    GoogleButton, 
    Divided, 
    FacebookButton, 
    AppleButton,
    MailConnect 
} from '@components'
import { social_login, login_google } from '@store/auth/actionAuth';

const background_img = require('@assets/images/home_background.jpg');

// create a component
const WelcomeScreen = ({navigation}) => {

    const dispatch = useDispatch()
    const mounted = useRef();
    const url_social_login = useSelector(state => state.auth.social_login)
    const url_login_google = useSelector(state => state.auth.login_google)

    useEffect(() => {
        
    })

    

    return (
        <View style={styles.container}>
            <ImageBackground 
                source={background_img}
                style={styles.back_images_container} 
                imageStyle={styles.back_images}
            >
                <View style={styles.miniContainerTop}>
                    <View>
                        <Text style={styles.header}>
                            Le charme de votre maison, C'est eux.
                        </Text>
                    </View>
                </View>
                <View style={styles.miniContainer}>
                    <FacebookButton />
                    <GoogleButton  />
                    { Platform.OS === 'ios' ? <AppleButton /> : null}
                </View>
                <View style={styles.miniContainer}>
                    <Divided />
                </View>
                <View style={styles.miniContainer}>
                    <MailConnect navigation = {navigation} />
                </View>
            </ImageBackground>
        </View>
    );
};

//make this component available to the app
export default WelcomeScreen;
