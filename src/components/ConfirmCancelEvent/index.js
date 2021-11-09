//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal'

import { Button } from '@components'
import { colors } from '@styles'

const event_decline = require("@assets/icons/event-declined.png")

// create a component
const ConfirmCancelEvent = ({isVisible, toggle, onSumit}) => {
    return (
        <Modal 
            style={styles.container}
            isVisible = {isVisible}
            backdropOpacity = {0.1}
            animationIn = 'zoomIn'
            animationOut = 'zoomOut'
        >
            <View style = {styles.content}>
                <Image 
                    source = {event_decline}
                    style = {styles.img_declined}
                />
                <Text style = {styles.text_wrapper}>Êtes-vous sûr de vouloir annuler votre demande de participation ?</Text>
                <View style = {styles.row}>
                    <Button
                        text = "Non"
                        style = {styles.btn_decline}
                        onPress = {toggle}
                    />
                    <Button
                        text = "Oui"
                        textColor = {colors.WHITE}
                        style = {styles.btn_confirm}
                        onPress = {onSumit}
                    />
                </View>
            </View>
        </Modal>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 0
    },
    content: {
        height: 300,
        marginHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        padding: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        paddingHorizontal: 30
    },
    btn_decline: {
        width: 100,
        marginRight: 10,
        borderColor: colors.PRIMARY,
        borderWidth: 1
    },
    btn_confirm: {
        width: 100,
        backgroundColor: colors.PRIMARY,
        marginLeft: 10
    },
    text_wrapper: {
        textAlign: 'center',
        fontSize: 16,
        color: '#777'
    }
});

//make this component available to the app
export default ConfirmCancelEvent;
