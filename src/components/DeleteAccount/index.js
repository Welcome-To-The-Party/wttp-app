//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal'

import Button  from '../Buttons/Button'
import { colors } from '@styles'

const trash = require("@assets/icons/trash.png")

// create a component
const DeleteAccount = ({toggle, isVisible, onDelete}) => {
    return (
        <Modal 
            style={styles.container}
            isVisible = {isVisible}
            onBackButtonPress = {toggle}
            onBackdropPress = {toggle}
            animationIn = 'zoomIn'
            animationOut = 'zoomOut'
        >
            <View style = {styles.content}>
                <Image 
                    source = {trash}
                    style={styles.images}
                />
                <View style = {styles.contentText}>
                    <Text style = {styles.title}>SUPPRESSION DE MON COMPTE</Text>
                    <Text style = {styles.subTitle}>Cette action est irréversible et supprime votre historique utilisateur</Text>
                </View>
                <View style = {styles.row}>
                    <Button 
                        text = "Annuler"
                        textColor = {colors.PRIMARY}
                        style = {styles.btn_cancel}
                        onPress = {toggle}
                    />
                    <Button 
                        text = "Supprimer"
                        textColor = {colors.WHITE}
                        style = {styles.btn_delete}
                        onPress = {onDelete}
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        height: 280,
        width: "100%",
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 15
    },
    images: {
        height: 100,
        width: 100,
        alignSelf: 'center'
    },
    contentText: {
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold'
    },
    subTitle: {
        textAlign: 'center',
        color: '#777',
        marginTop: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btn_cancel: {
        width: 130,
        backgroundColor: '#f3f3f3'
    },
    btn_delete: {
        width: 130,
        backgroundColor: colors.PRIMARY
    }
});

//make this component available to the app
export default DeleteAccount;
