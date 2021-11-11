//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import Button from '../Buttons/Button';
import { colors } from '@styles'
import ModalRating from './ModalRating';
import { useDispatch } from 'react-redux';
import { rating_user } from '../../store/user/actionUser';

// create a component
const UserEvaluation = ({item, eventid}) => {

    const dispatch = useDispatch()
    const [isVisible, setIsVisible] = useState(false)
    const [rate, setRate] = useState()

    const handleRating = () => {
        dispatch(rating_user({
            email: item.email,
            eventid,
            rate
        }))
        setRate()
        setIsVisible(false)
    }

    return (
        <View style={styles.container}>
            <ModalRating
                isVisible = {isVisible}
                toggle = {() => setIsVisible(!isVisible)}
                setRate = {setRate}
                rate = {rate}
                handleRating = {handleRating}
            />
            <Image source={{uri: item?.picture}} style={styles.partIcon} />
            <View style={styles.column}>
                <Text style={styles.para}>{item?.name}</Text>
                <Button
                    text = "Evaluer"
                    textColor = {colors.WHITE}
                    style = {styles.btn}
                    onPress = {() => setIsVisible(!isVisible)}
                />
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#f3f3f3',
        borderBottomWidth: 1,
        paddingBottom: 10,
        marginVertical: 5
    },
    partIcon: {
        height: 60,
        width: 60,
        borderRadius: 30
    },
    btn: {
        width: 100,
        height: 30,
        marginTop: 5,
        backgroundColor: colors.PRIMARY
    },
    column: {
        flex: 1,
        marginLeft: 10
    }
});

//make this component available to the app
export default UserEvaluation;
