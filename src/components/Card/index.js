//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// create a component
const Card = ({containerStyle, imageStyle, item}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <Image
                style = {[styles.image, imageStyle]}
                source = {{uri: item?.image}}
            />
            <Text style = {styles.title_card}>{item?.title}</Text>
        </View>
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
