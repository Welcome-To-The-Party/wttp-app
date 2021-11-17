import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native'


import TopTabBar from './TopTabBar.js';
import Card from '../screens/CreateEvent/Card.js';
import Recap from '../screens/CreateEvent/Recap.js';
import CreatEventScreen from '../screens/CreateEvent/index.js';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator()

// create a component
const CreateEventNavigator = () => {
  return (
    <View style = {{flex: 1}}>
      <Stack.Navigator 
        screenOptions={{ activeTintColor: '#6C2BA1' }}
      >
        <Stack.Screen 
          name="steps" 
          component = {CreatEventScreen}
          options = {{
            title: 'Informations', 
            headerShown: false
          }} 
        />
        <Stack.Screen 
          name="recap" 
          component = {Recap} 
          options = {{
            title: 'Récapitulatif'
          }} 
        />
        <Stack.Screen 
          name="card" 
          component = {Card}
          options = {{
            title: 'Ma carte'
          }}  
        />
      </Stack.Navigator>
    </View>
  );
};

//make this component available to the app
export default CreateEventNavigator;

