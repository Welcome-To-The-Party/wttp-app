import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import TopTabBar from './TopTabBar.js';
import Card from '../screens/CreateEvent/Card.js';
import Recap from '../screens/CreateEvent/Recap.js';
import CreatEventScreen from '../screens/CreateEvent/index.js';

const Tab = createMaterialTopTabNavigator();

// create a component
const CreateEventNavigator = () => {
  return (
    <Tab.Navigator 
        screenOptions={{ activeTintColor: '#6C2BA1' }}
      >
        <Tab.Screen 
          name="steps" 
          component = {CreatEventScreen}
          options = {{
            title: 'Informations'
          }} 
        />
        <Tab.Screen 
          name="recap" 
          component = {Recap} 
          options = {{
            title: 'Récapitulatif'
          }} 
        />
        <Tab.Screen 
          name="card" 
          component = {Card}
          options = {{
            title: 'Ma carte'
          }}  
        />
      </Tab.Navigator>
  );
};

//make this component available to the app
export default CreateEventNavigator;

