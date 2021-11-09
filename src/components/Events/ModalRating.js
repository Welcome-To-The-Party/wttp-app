//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Rating } from 'react-native-ratings';

import Button from '../Buttons/Button';
import { colors } from "@styles"

// create a component
const ModalRating = ({setRate, toggle, handleRating, isVisible, rate}) => {
    console.log('rate', rate)
    return (
        <Modal 
            style={styles.container}
            isVisible = {isVisible}
            animationIn = "zoomIn"
            animationOut = "zoomOut"
        >
            <View style = {styles.content}>
                <TouchableOpacity onPress = {toggle} style = {styles.btnClose}>
                    <Ionicons 
                        name = "close"
                        size = {30}
                        color = {colors.PRIMARY}
                    />
                </TouchableOpacity>
                <Text style={styles.para}>NOTER VOS INVITÉS VOUS PERMET À VOUS ET AUX AUTRES ORGANISATEURS DE SAVOIR SI VOS CONVIVES SONT À INVITER OU NON</Text>
                <Rating
                  ratingCount={5}
                  imageSize={40}
                  onStartRating = {setRate}
                  startingValue = {0}
                  style = {{marginTop: 25}}
                />
                <Button
                    text = "Evaluer"
                    textColor = {colors.WHITE}
                    style = {{
                        backgroundColor: rate != undefined?colors.PRIMARY: "gray",
                        marginTop: 30
                    }}
                    onPress = {rate != undefined?handleRating:null}
                /> 
            </View>
        </Modal>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 0,
        paddingHorizontal: 20
    },
    btnClose: {
        height: 40,
        width: 40,
        alignSelf: 'flex-end',
        marginVertical: 20,
        right: -10
    },
    content: {
        height: 350,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        borderRadius: 10
    },
    btn: {
        backgroundColor: colors.PRIMARY,
        marginTop: 30
    }
});

//make this component available to the app
export default ModalRating;
