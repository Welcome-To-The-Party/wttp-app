//import liraries
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { navigation } from '../../providers/navigationService';

// create a component
const BackButton = () => {
    return (
        <TouchableOpacity 
            style = {styles.btn_back}
            onPress = {() => navigation.goBack()}
        >
            <Ionicons
              name = "chevron-back"
              size = {25}
            />
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    btn_back: {
        height: 40,
        width: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255, 0.3)',
        elevation: 20,
        marginTop: 40,
        marginLeft: 20
    }
});

//make this component available to the app
export default BackButton;
