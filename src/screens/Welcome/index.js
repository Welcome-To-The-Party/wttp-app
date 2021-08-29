//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { styles } from './style'

// create a component
const WelcomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text>WelcomeScreen</Text>
        </View>
    );
};

//make this component available to the app
export default WelcomeScreen;
