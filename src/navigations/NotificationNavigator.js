/*
 * Create Event Step Navigator
 */
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import equal from 'fast-deep-equal'
import { StyleSheet } from 'react-native';

import NotificationTopTabBar from './NotificationTopTabBar.js';

import ParticipationScreen from '../screens/Notifications/ParticipationScreen.js';
import GeneralScreen from '../screens/Notifications/GeneralScreen.js';
import { View, Text } from 'react-native';

const Tab = createMaterialTopTabNavigator();

export default class NotificationNavigator extends React.Component{

  render () {
    return (
      <View style = {{flex: 1, paddingTop: 40, backgroundColor: '#fff'}}>
        <Text style = {styles.title}>Notifications</Text>
        <Tab.Navigator 
          screenOptions={{ activeTintColor: '#6C2BA1' }}
          tabBar={(props) => <NotificationTopTabBar {...props} />}
        >
          <Tab.Screen 
            name="general" 
            component = {GeneralScreen}
          />
          <Tab.Screen 
            name="participations" 
            component = {ParticipationScreen} 
          />
        </Tab.Navigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 20
  }
});
