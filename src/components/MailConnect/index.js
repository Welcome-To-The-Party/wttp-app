//import liraries
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import Button from '../Buttons/Button'
// import {navigation} from '../../providers/navigationService'

const icon = require("@assets/icons/icon.png")

// create a component
const MailConnect = ({navigation}) => {

    // const navigate = (route, params) => {
    //     navigation.navigate(route, params);
    // };

    return (
        <View style={styles.container}>
            <Button 
                text = "SE CONNECTER PAR MAIL" 
                style = {styles.btn}
                textColor = "#fff"
                onPress = {() => navigation.navigate("Auth",{screen: "Login"})}
            />
            <View style={{marginTop: 30, alignItems: 'center'}}>
                <Text style={styles.text}>PAS ENCORE DE COMPTE ?</Text>
            </View>
            <TouchableOpacity onPress = {() => navigation.navigate("Auth",{screen: "Register"})}>
                <View style={styles.loginButton}>
                    <Image source={icon} style={styles.icon} />
                    <Text style={styles.buttonText}>S'INSCRIRE</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingTop: 25,
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 20
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    loginButton: {
        marginTop: 20,
        marginBottom: 50,
        flexDirection: "row",
        width:'100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontFamily: 'Roboto',
        fontStyle: 'italic',
        fontWeight: "700",
        fontSize: 20,
    },
    text: {
        fontFamily: 'Roboto',
        fontStyle: 'italic',
        fontWeight: "300",
        fontSize: 16,
    },
    btn: {
        backgroundColor: '#361979',
        borderRadius: 25
    }
});

//make this component available to the app
export default MailConnect;
