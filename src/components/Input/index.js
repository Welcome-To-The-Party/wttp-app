//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Icon } from 'react-native-elements'
import { mixins, colors } from '@styles'

// create a component
const Input = ({
    placeholder, 
    style, 
    leftIcon, 
    rightIcon, 
    onPressIn, 
    placeholderTextColor, 
    secureTextEntry,
    onPressRight,
    onChangeText,
    defaultValue,
    keyboardType}) => {
    return (
        <View style={[styles.container, style]}>
            {leftIcon && 
                <Icon
                    name = {leftIcon}
                    type = "ionicon"
                    color = "#777"
                />
            }
            <TextInput 
                style = {styles.input}
                placeholderTextColor = {placeholderTextColor?placeholderTextColor:"#777"}
                placeholder = {placeholder}
                onPressIn = {onPressIn}
                onChangeText = {onChangeText}
                secureTextEntry = {secureTextEntry}
                keyboardType = {keyboardType}
                defaultValue = {defaultValue}
            />
            {rightIcon &&
                <Icon
                    name = {rightIcon}
                    type = "ionicon"
                    color = "#777"
                    onPress = {onPressRight}
                /> 
            }
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: colors.WHITE,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    input: {
        flex: 1,
        color: '#777'
    }
});

//make this component available to the app
export default Input;
