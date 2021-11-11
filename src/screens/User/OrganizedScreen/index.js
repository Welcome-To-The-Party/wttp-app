//import liraries
import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { colors } from '@styles'
import ToComeScreen from '../../Events/ToComeScreen';
import PastScreen from '../../Events/PastScreen';
import PastEventScreen from '../../Events/PastEventScreen';
import { useDispatch, useSelector } from 'react-redux';
import { get_organisations } from '@store/events/actionEvents';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const PastEventStack = ({data}) => {
  return(
    <Stack.Navigator 
      screenOptions={{ 
        activeTintColor: '#6C2BA1',
        tabBarIndicatorStyle: {
          backgroundColor: colors.PRIMARY
        },
        tabBarLabelStyle: {textTransform: 'capitalize', fontSize: 16}
      }}
    >
      <Stack.Screen 
        name="PastScreen" 
        children = {() => <PastScreen data = {data} />}
        options = {{headerShown: false}}
      />
      <Stack.Screen 
        name="PastEventScreen" 
        component = {PastEventScreen}
        options = {{headerShown: false}}
      />
    </Stack.Navigator>
  )
}

// create a component
const OrganizedScreen = () => {

  const dispatch = useDispatch()
  const organisations = useSelector(state => state.events.organisations.data)

  useEffect(() => {
    dispatch(get_organisations())
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
        name="tocome" 
        children = {() => <ToComeScreen data = {organisations.upcomming_organisation} />}
        options = {{title: "À VENIR"}}
      />
      <Tab.Screen 
        name="past" 
        children = {() => <PastEventStack data = {organisations.passed_organisation} />}
        options = {{title: "PASSÉS"}}
      />
    </Tab.Navigator>
  );
};

//make this component available to the app
export default OrganizedScreen;
