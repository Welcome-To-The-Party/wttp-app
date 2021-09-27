//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements'
import { colors } from '@styles'

// create a component
const Button = ({onPress, text, style, textColor, icon, isLoading, textStyle}) => {
    return (
        <TouchableOpacity 
            style={[styles.container, style]}
            onPress = {onPress}
        >
            <Text style = {[styles.textBtn, textStyle, {color: textColor}]}>{text}</Text>
            {icon && 
                <Icon 
                    name = {icon} 
                    color = {colors.GRAY_DARK}
                    style = {styles.iconStyle} 
                />
            }
            {
                isLoading && 
                <ActivityIndicator color = "#fff" size = 'large' />
            }
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: colors.WHITE
    },
    textBtn: {
        textAlign: 'center',
        flex: 1,
        fontSize: 16
    },
    iconStyle: {
        marginRight: 20
    },
});

//make this component available to the app
export default Button;
