//import liraries
import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { colors } from '@styles'
import ToComeScreen from '../../Events/ToComeScreen';
import PastScreen from '../../Events/PastScreen';
import { useDispatch, useSelector } from 'react-redux';
import { get_organisations } from '@store/events/actionEvents';

const Tab = createMaterialTopTabNavigator();

// create a component
const OrganizedScreen = () => {

  const dispatch = useDispatch()
  const organisations = useSelector(state => state.events.organisations.data)

  console.log("------------------ organisations -------------", organisations)

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
        children = {() => <PastScreen data = {organisations.passed_organisation} />}
        options = {{title: "PASSÉS"}}
      />
    </Tab.Navigator>
  );
};

//make this component available to the app
export default OrganizedScreen;
