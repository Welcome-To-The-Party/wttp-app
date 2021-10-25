//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, Switch  } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { useDispatch, useSelector } from 'react-redux'

import { set_token_push } from '@store/notification/actionNotification';
import { registerForPushNotificationsAsync } from '@providers/notificationService';

const background_img = require('@assets/images/User/public_back.png');

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});


// create a component
const NotifEdit = () => {

  const dispatch = useDispatch()
  const { isNotif } = useSelector(state => state.notification.notificationPush)
  const [ isNotification, setIsNotification ] = useState(isNotif)

  const setNotif = async (value) => {
    setIsNotification(value)
    let token = await registerForPushNotificationsAsync();
    
    if(value){
      Notifications.addNotificationReceivedListener();
      Notifications.addNotificationResponseReceivedListener();
      dispatch(set_token_push({lastPushToken: token}))
    }
    else dispatch(set_token_push({token: {value: ""}}))
  }

  return (
    <View style={styles.container}>
        <View style={styles.infoCont}>
          <View style={{width: '90%'}}>
            <Text style={styles.infoHeader}>NOTIFICATIONS DE L'APPLICATION</Text>
          </View>
        </View>
        <View style={styles.infoCont}>
          <Text style={styles.subHeader}>Soyez le premier informé des activités</Text>
          <View style={styles.inLine}>
            <Text style={styles.para}>Activer les notifications push</Text>
            <Switch 
              trackColor={{ false: "#767577", true: "#6C2BA1" }} 
              value={isNotification}
              thumbColor="#fff" 
              onValueChange={(value) => setNotif(value)} 
            />
          </View>
        </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  icon: {
    width: 100,
    height: 100,
    borderRadius: 100
  },
  infoCont: {
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
    width: '100%',
  },
  infoHeader: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "500",
    fontSize: 20,
    color: '#4f4f4f',
  },
  subHeader: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "bold",
    fontSize: 15,
    color: '#4f4f4f',
    marginBottom: 10,
  },
  para: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "200",
    fontSize: 15,
    color: '#4f4f4f',
  },
  inLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#f3f3f3',
    borderBottomWidth: 1,
    paddingBottom: 10
  }
});

//make this component available to the app
export default NotifEdit;
