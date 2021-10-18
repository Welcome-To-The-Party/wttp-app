//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { get_events } from '@store/events/actionEvents';

// create a component
const CardEventItem = ({item}) => {

    const dispatch = useDispatch();
  const [eventid, setEventid] = useState(item.eventid)
  const eventData = useSelector(state => state.events.event.data)
  var startDate = new Date(eventData[item.eventid]?.start);

  useEffect(() => {
    dispatch(get_events(eventid))
  }, [eventid])

    console.log("data", eventData[item.eventid].price)
    return (
        <View style={styles.container}>
            <Image 
                source = {{uri: eventData[item.eventid]?.pictures[0]}} 
                style = {styles.imageStyle}
            />
            <View style = {styles.col}>
                <Text>Soirée {eventData[item.eventid]?.type}: {eventData[item.eventid]?.placeType}</Text>
                <Text style = {styles.description} numberOfLines = {3}>{eventData[item.eventid]?.description}</Text>
            </View>
            <View style = {styles.col2}>
                <Text style = {styles.price}>{eventData[item.eventid].price} €/place</Text>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        height: 100,
        flexDirection: 'row',
        width: Dimensions.get('screen').width - 60,
        marginHorizontal: 10,
        paddingRight: 10,
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    imageStyle: {
        width: 100,
        height: 100,
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
    },
    description: {
        marginTop: 20
    },
    price: {
        fontWeight: 'bold'
    }
});

//make this component available to the app
export default CardEventItem;
