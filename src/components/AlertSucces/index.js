//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal'
import { Icon } from 'react-native-elements'

import { colors } from '@styles'
import Button from '../Buttons/Button';

// create a component
const AlertSucces = ({isVisible, message, onClose}) => {
    return (
        <Modal
            isVisible = {isVisible}
            animationIn = 'zoomIn'
            animationOut = 'zoomOut'
            backdropOpacity = {0.3}
        >
            <View style = {styles.content_modal}>
                <View style = {styles.header}>
                    <Text style = {styles.title}>Alert</Text>
                </View>
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
        minHeight: 200,
        width: '100%',
        borderRadius: 10,
        backgroundColor: colors.WHITE,
        paddingBottom: 20
    },
    iconStyle: {
        fontSize: 70,
        marginTop: 20
    },
    btn: {
        backgroundColor: colors.PRIMARY,
        marginTop: 40,
        marginHorizontal: 20
    },
    textError: {
        textAlign: 'center',
        marginTop: 20,
        paddingHorizontal: 20
    },
    header: {
        height: 60,
        backgroundColor: colors.PRIMARY,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        justifyContent: 'center',
        paddingLeft: 20,
    },
    title: {
        color: colors.WHITE,
        fontSize: 20,
        fontWeight: 'bold'
    }
});

//make this component available to the app
export default AlertSucces;
