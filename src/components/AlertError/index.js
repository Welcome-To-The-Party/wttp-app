//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal'
import { Icon } from 'react-native-elements'

import { colors } from '@styles'
import Button from '../Buttons/Button';

// create a component
const AlertError = ({isVisible, message, onClose}) => {
    return (
        <Modal
            isVisible = {isVisible}
            animationIn = 'zoomIn'
            animationOut = 'zoomOut'
            backdropOpacity = {0.3}
            onBackButtonPress = {onClose}
            onBackdropPress = {onClose}
        >
            <View style = {styles.content_modal}>
                <Icon 
                    name = "ios-alert-circle-outline" 
                    type = "ionicon" 
                    color = {colors.ALERT}
                    iconStyle = {styles.iconStyle}
                />
                <Text style = {styles.textError}>{message}</Text>
                <Button
                    text = "OK"
                    style = {styles.btn}
                    textColor = {colors.WHITE}
                    onPress = {onClose}
                />
            </View>
        </Modal>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    content_modal: {
        minHeight: 250,
        width: '100%',
        borderRadius: 10,
        paddingHorizontal: 40,
        backgroundColor: colors.WHITE,
        paddingBottom: 20
    },
    iconStyle: {
        fontSize: 70,
        marginTop: 20
    },
    btn: {
        backgroundColor: colors.ALERT,
        marginTop: 40
    },
    textError: {
        textAlign: 'center',
        marginTop: 20
    }
});

//make this component available to the app
export default AlertError;
