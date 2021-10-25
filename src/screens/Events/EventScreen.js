//import liraries
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Share, ImageBackground, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faShareAlt } from '@fortawesome/free-solid-svg-icons'
import Ionicons from 'react-native-vector-icons/Ionicons'
var _ = require('lodash')

import { get_events } from '@store/events/actionEvents';
import { ImageSlider, Button, MiniNav, BackButton } from '@components'
import { colors } from '@styles'
import AlertSucces from '@components/AlertSucces';
import { add_favorite, participate_event } from '@store/events/actionEvents';
import { PARTICIPE_EVENT } from '@store/events/type';

const background = require("@assets/images/Search/party.png");
const tax = 0.2;

// create a component
const EventScreen = ({route}) => {

  const {event} = route.params
  const dispatch = useDispatch();
  const eventData = useSelector(state => state.events.event.data)
  const favorites = useSelector(state => state.user.user.data.favorites)
  const messageParticipate = useSelector(state => state.events.infos.message)

  const shareEvent = async () => {
    try {
      const result = await Share.share({
        message:
          "✌ je t'invite à participer à la soirée" + event.title + " sur #WTTP" + "\n\n" +
          "Télécharge l'application et voyons voir si tu sera à inviter ou à éviter." + "\n\n" + "https://welcome-ttp.com" ,
      });
    } catch (error) {
      alert(error.message);
    }
  }

  const onCloseModal = () => {
    dispatch({type: `${PARTICIPE_EVENT}_FAIL`, payload: ""})
  }

  return (
    <View style={styles.container}>
        {/* <View style = {styles.back_btn}>
          
        </View> */}
        <AlertSucces 
          message={messageParticipate} 
          isVisible={messageParticipate != ''? true: false}
          onClose = {onCloseModal}
        />
        <ImageBackground 
          source={background} 
          style={styles.backgroundImg} 
        >
          <BackButton />
          <ScrollView 
            style={styles.mapContainer}
            contentContainerStyle = {{paddingBottom: 150}}
          >
            <View>
              <View style={styles.row}>
                <View style={[styles.row, {flex: 1}]} >
                  <Text style={styles.header}>
                    {Number(
                      Number(event?.price) +
                        Number(Number(event?.price) * tax)
                    ).toFixed(2)}
                    EUR
                  </Text>
                  <Text style={styles.para}>/place</Text>
                </View>
                <TouchableOpacity onPress = {() => dispatch(add_favorite({eventid: event.eventid}))} >
                  <Ionicons 
                    size={20} 
                    color={'#6C2BA1'} 
                    name={_.filter(favorites, {_id: event.eventid}).length != 0?'heart':'heart-outline' } 
                    style={styles.titleIcon} 
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress = {shareEvent}>
                  <Ionicons 
                    size={20} 
                    color={'#6C2BA1'} 
                    name={ 'share-social-outline' } 
                    style={styles.titleIcon} 
                  />
                </TouchableOpacity>
              </View>
              <Button
                text={"RÉSERVER"}
                textColor = {colors.WHITE}
                style = {styles.btn}
                onPress={() => dispatch(participate_event({eventid: event.eventid}))}
              />
            </View>
            <View style={styles.padding}>
              <Text style={styles.title_event}>{event?.title}</Text>
            </View>
            <ImageSlider data={event?.pictures} />
            <MiniNav data = {event} />
          </ScrollView>
        </ImageBackground>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  mapContainer: {
    marginTop: 20,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: "#fff",
    width: "100%",
    paddingLeft: 20,
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backgroundImg: {
    width: "100%",
    height: '100%'
  },
  row: {
    flexDirection: "row",
    alignItems: 'center',
    marginLeft: 5,
  },
  header: {
    color: '#4f4f4f',
    fontSize: 20,
    fontWeight: 'bold',
  },
  para: {
    color: '#4f4f4f',
    fontSize: 20,
    fontWeight: '200',
  },
  title: {
    // width: "65%",
  },
  titleIcon: {
    marginHorizontal: 10,
  },
  padding: {
    marginTop: 10,
  },
  btn: {
    backgroundColor: colors.PRIMARY,
    width: 150,
    borderRadius: 10
  },
  title_event: {
    marginVertical: 20,
    color: '#4f4f4f',
    fontSize: 20,
    fontWeight: '200',
  },
  back_btn: {
    width: 50,
    height: 50,
    position: 'absolute',
    zIndex: 2,
    top: 0,
    left: 0
  }
});

//make this component available to the app
export default EventScreen;
