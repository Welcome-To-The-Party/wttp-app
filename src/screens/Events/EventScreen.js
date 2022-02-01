//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Share, ImageBackground, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'
import WebView from 'react-native-webview';
import Modal from 'react-native-modal'
var _ = require('lodash')

import { get_events } from '@store/events/actionEvents';
import { ImageSlider, Button, MiniNav, BackButton, Loading } from '@components'
import { colors } from '@styles'
import AlertSucces from '@components/AlertSucces';
import { add_favorite, participate_event } from '@store/events/actionEvents';
import { PARTICIPE_EVENT } from '@store/events/type';
import { pop } from '../../providers/navigationService';
import { get_participations, pay_participation } from '../../store/events/actionEvents';
import { PAY_PARTICIPATION } from '../../store/events/type';

const background = require("@assets/images/Search/party.png");
const tax = 0.2;

// create a component
const EventScreen = ({route}) => {

  const {event} = route.params
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true)
  const { data, isLoading } = useSelector(state => state.events.pay_participation)
  const favorites = useSelector(state => state.user.user.data.favorites)
  const messageParticipate = useSelector(state => state.events.infos.message)

  console.log('event-------------------', event)

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
    if(!event.manualValidation){
      dispatch(pay_participation({eventid: event.eventid}))
    }
  }

  const onCloseModalPay = () => {
    dispatch({type: `${PAY_PARTICIPATION}_SUCCESS`, payload: {}})
    dispatch(get_participations())
  }

  return (
    <View style={styles.container}>
        <AlertSucces 
          message={messageParticipate} 
          isVisible={messageParticipate != ''? true: false}
          onClose = {onCloseModal}
        />
        <Modal
          style = {styles.contentModal}
          animationIn = 'zoomIn'
          isVisible={data?.url?true: false}
          onBackButtonPress = {onCloseModalPay}
        >
          <View style = {{flex: 1, backgroundColor: '#fff'}}>
            {loading && <Loading />}
            <TouchableOpacity 
              onPress = {onCloseModalPay}
              style = {styles.btnClose}
            >
              <Ionicons
                name = 'close'
                size = {30}
                color = {colors.PRIMARY}
              />
            </TouchableOpacity>
            <WebView 
              source={{ uri: data?.url}}
              onLoad = {() => {
                setTimeout(() => {
                  setLoading(false)
                }, 10000);
              }}
              useWebKit={true}
              startInLoadingState={true} 
            />
          </View>
        </Modal>
        <ImageBackground 
          source={background} 
          style={styles.backgroundImg} 
        >
          <BackButton onPress = {() => pop()} />
          <ScrollView 
            style={styles.mapContainer}
            contentContainerStyle = {{paddingBottom: 150}}
          >
            <View>
              <View style={styles.row}>
                <View style={[styles.row, {flex: 1}]} >
                  <Text style={styles.header}>
                    {((event?.price) +((event?.price) * tax)).toFixed(2)}
                    EUR
                  </Text>
                  <Text style={styles.para}>/place</Text>
                </View>
                <TouchableOpacity onPress = {() => dispatch(add_favorite({eventid: event.eventid?event.eventid:event._id}))} >
                  <Ionicons 
                    size={20} 
                    color={'#6C2BA1'} 
                    name={_.filter(favorites, {_id: event.eventid?event.eventid:event._id}).length != 0?'heart':'heart-outline' } 
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
                onPress={() => dispatch(participate_event({eventid: event.eventid?event.eventid:event._id}))}
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
