//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

// create a component
const Card = ({containerStyle, imageStyle, item, onPress}) => {
    return (
        <TouchableOpacity 
            style={[styles.container, containerStyle]}
            onPress={onPress}
        >
            <Image
                style = {[styles.image, imageStyle]}
                source = {{uri: item?.image}}
            />
            <Text style = {styles.title_card}>{item?.title}</Text>
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        width: 150,
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 5
    },
    image: {
        width: 150,
        height: 200
    },
    title_card: {
        color: '#777',
        textAlign: 'center'
    }
});

//make this component available to the app
export default Card;
