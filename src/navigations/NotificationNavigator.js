/*
 * Create Event Step Navigator
 */
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet } from 'react-native';

import NotificationTopTabBar from './NotificationTopTabBar.js';

import ParticipationScreen from '../screens/Notifications/ParticipationScreen.js';
import GeneralScreen from '../screens/Notifications/GeneralScreen.js';
import { View, Text } from 'react-native';

const Tab = createMaterialTopTabNavigator();

const NotificationNavigator = () => {
  return(
    <View style = {{flex: 1, paddingTop: 40, backgroundColor: '#fff'}}>
        <Text style = {styles.title}>Notifications</Text>
        <View style = {{flex: 1}}>
          <Tab.Navigator 
            screenOptions={{ 
              activeTintColor: '#6C2BA1', 
              tabBarIndicatorStyle: {backgroundColor: '#6C2BA1'},
              tabBarLabelStyle: {textTransform: 'capitalize'} 
            }}
          >
            <Tab.Screen 
              name="general" 
              component = {GeneralScreen}
              options = {{title: 'Général'}}
            />
            <Tab.Screen 
              name="participations" 
              component = {ParticipationScreen}
              options = {{title: 'Participations'}}
            />
          </Tab.Navigator>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 20
  }
});

export default NotificationNavigator;
