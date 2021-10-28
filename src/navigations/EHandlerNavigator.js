/*
 * Create Event Step Navigator
 */
import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Text, StyleSheet } from 'react-native';

import ConfirmedScreen from '../screens/Events/ConfirmedScreen.js';
import ValidationScreen from '../screens/Events/ValidationScreen.js';
import { colors } from '@styles'
import { useDispatch, useSelector } from 'react-redux';
import { get_events } from '../store/events/actionEvents.js';

const Tab = createMaterialTopTabNavigator();

const EHandlerNavigator = ({route}) => {

  const dispatch = useDispatch();
  const { event } = route.params
  const eventData = useSelector(state => state.events.event.data)

  console.log("---- event eventData ----", eventData)

  useEffect(() => {
    dispatch(get_events(event._id))
  }, [])

  return (
    <Tab.Navigator 
      screenOptions={{ 
        activeTintColor: '#6C2BA1',
        tabBarIndicatorStyle: {
          backgroundColor: colors.PRIMARY
        },
        tabBarLabelStyle: {textTransform: 'capitalize', fontSize: 16}
      }}
    >
      <Tab.Screen 
        name="confirm"
        children = {() => <ConfirmedScreen data = {eventData.participatingUsers} /> }
        options = {{
          title: "Confirmé", 
          tabBarBadge: () => <Text style = {styles.tabBadge}>{eventData?.participatingUsers?.length}</Text>,
        }}
      />
      <Tab.Screen 
        name="wait" 
        children = {() => <ValidationScreen data = {eventData.usersThatAsked} />}
        options = {{
          title: "En attente", 
          tabBarBadge: () => <Text style = {styles.tabBadge}>{eventData?.usersThatAsked?.length}</Text>
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBadge: {
    height: 30,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    borderColor: colors.PRIMARY,
    color: colors.PRIMARY,
    borderWidth: 1,
    left: -70,
    borderRadius: 15,
    textAlign: 'center',
    textAlignVertical: 'center',
    position: 'absolute'
  }
});

export default EHandlerNavigator
