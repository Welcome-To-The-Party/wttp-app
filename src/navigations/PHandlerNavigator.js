/*
 * Create Participate Step Navigator
 */
import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ParticipateScreen from '../screens/Events/ParticipateScreen.js';
import CancelEventScreen from '../screens/Events/CancelEventScreen.js';
import ToRateScreen from '../screens/Events/ToRateScreen.js';
import { colors } from '@styles'
import { useDispatch, useSelector } from 'react-redux';
import { get_participations } from '../store/events/actionEvents.js';

const Tab = createMaterialTopTabNavigator();

const PHandlerNavigator = () => {

    const dispatch = useDispatch()
    const { data } = useSelector(state => state.events.participations)

    console.log("participations", data)

    useEffect(() => {
        dispatch(get_participations())
    }, [])
    return (
      <Tab.Navigator 
        screenOptions={{ 
          activeTintColor: '#6C2BA1',
          tabBarLabelStyle: {textTransform: 'capitalize',fontSize:16},
          tabBarIndicatorStyle: {backgroundColor: colors.PRIMARY}
        }}
      >
        <Tab.Screen 
          name="confirm"
          component = {ParticipateScreen}
          options = {{title: "CONFIRMÉES"}}
        />
        <Tab.Screen 
          name="wait"
          component = {CancelEventScreen}
          options = {{title: "EN ATTENTES"}} 
        />
        <Tab.Screen 
          name="passed"
          component = {ToRateScreen}
          options = {{title: "PASSÉES"}} 
        />
      </Tab.Navigator>
    );
}

export default PHandlerNavigator
