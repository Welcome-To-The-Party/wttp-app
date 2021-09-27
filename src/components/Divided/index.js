//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const Divided = () => {
    return (
        <View style={styles.container}>
            <View style={styles.line} />
            <Text style={styles.separatorText}>OU</Text>
            <View style={styles.line} />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
    },
    separatorText: {
        fontWeight: "300",
        fontSize: 20,
        color: '#fff',
        marginHorizontal: 10,
    },
    line: {
        borderColor: '#fff',
        flex: 1,
        borderWidth: 0.5,
    }
});

//make this component available to the app
export default Divided;
