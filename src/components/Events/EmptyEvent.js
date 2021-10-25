//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { Button } from '@components'
import { navigate } from '../../providers/navigationService';

const cross_img = require('@assets/images/Events/cancel.png');
const error_img = require('@assets/images/Errors/OrganizedScreen.png');

// create a component
const EmptyEvent = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header_container}>
                <Text style={styles.headerError}>Aucun événement prévus</Text>
            </View>
            <ImageBackground 
                source={error_img}
                imageStyle = {{borderRadius: 10}}
                style={styles.errorCont}
            >
                <View style={{ alignItems: 'center',}}>
                    <Image source={cross_img} style={styles.icon} />
                    <Text style={styles.headerError2}>Oups! Il semblerait que
                    vous n’ayez créer aucun événement pour l’instant</Text>
                </View>
                <Button 
                    style = {styles.btn}
                    text={"Créer un évènement"} 
                    onPress={() => navigate("CreateEvent")} 
                />
            </ImageBackground>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
    header_container: {
        width: '100%',
        height: 100,
        marginBottom: 20,
    },
    errorCont: {
        padding: 20,
        height: 300,
        borderRadius: 25,
    },
    icon: {
        width: 100,
        height: 100,
    },
    headerError2: {
        color: "#fff",
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    btn: {
        marginHorizontal: 20
    },
    headerError: {
        color: "#000",
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 50,
        width: '100%',
    },
});

//make this component available to the app
export default EmptyEvent;
