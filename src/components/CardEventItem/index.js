//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'

import { get_events } from '@store/events/actionEvents';
import { navigate } from '../../providers/navigationService';

// create a component
const CardEventItem = ({item}) => {

    const dispatch = useDispatch();
    const [eventid, setEventid] = useState(item?.eventid)
    const eventData = useSelector(state => state.events.event.data)

    useEffect(() => {
        dispatch(get_events(eventid))
    }, [eventid])

    return (
        <TouchableOpacity 
            style={styles.container}
            onPress = {() => navigate("Event",{event: item})}
        >
            <Image 
                source = {{uri: item?.pictures[0]}} 
                style = {styles.imageStyle}
            />
            <View style = {styles.row}>
                <View style = {styles.col}>
                    <Text>Soirée {item?.type}: {item?.placeType}</Text>
                    <Text style = {styles.description} numberOfLines = {2}>{item?.description.substring(0, 25)}...</Text>
                </View>
                <View style = {styles.col2}>
                    <Text style = {styles.price}>{item?.price} €/place</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        height: 110,
        flexDirection: 'row',
        width: Dimensions.get('screen').width - 60,
        // marginHorizontal: 20,
        // paddingRight: 10,
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    imageStyle: {
        width: 100,
        height: 110,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    col: {
        flex: 1,
        marginLeft: 10,
        paddingVertical: 10
    },
    col2: {
        marginTop: 10,
        paddingRight: 10
    },
    description: {
        marginTop: 10
    },
    price: {
        fontWeight: 'bold',
        textAlign: 'right'
    },
    row: {
        // fle
        flex: 1,
        paddingBottom: 10
    }
});

//make this component available to the app
export default CardEventItem;
