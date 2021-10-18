//import liraries
import React, { useState } from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';

import { ForgotAccount } from '@components'
import { styles } from '../style'
import { useDispatch, useSelector } from 'react-redux';
import { reset_password } from '@store/auth/actionAuth';
import { RESET_PASSWORD } from '@store/auth/type';
import { AlertSucces } from '../../../components';

const background_img = require('@assets/images/register_background.jpg');
const icon = require('@assets/icons/icon.png');

// create a component
const ForgotenScreen = () => {

    const dispatch = useDispatch()
    const [ email, setEmail ] = useState()
    const {isLoading, message} = useSelector(state => state.auth.reset_password)

    const handleResetPassword = ()=> {

    }

    const onClose = () => {
        dispatch({
            type: `${RESET_PASSWORD}_SUCCESS`, 
            payload: {data:{message: ''}}
        });
    }

    return (
        <View style={styles.container}>
            <ImageBackground 
                source={background_img}
                style={styles.back_images_container}
            >
                <AlertSucces
                    isVisible = {message? true: false}
                    message = {message}
                    onClose = {onClose}
                />
                <View style={styles.miniContainer}>
                    <Image source={icon} style={styles.icon} />
                    <Text style={styles.header}>Ouuups..</Text>
                    <Text style={styles.header}>Déjà le verre de trop?</Text>
                </View>
                <View style={styles.createContainer}>
                    <ForgotAccount 
                        setEmail = {setEmail}
                        handleResetPassword = {() => dispatch(reset_password({email}))}
                    />
                </View>
            </ImageBackground>
        </View>
    );
};

//make this component available to the app
export default ForgotenScreen;
