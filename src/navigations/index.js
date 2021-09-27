import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux'

import {
    WelcomeScreen
} from '@screens'
import AuthNavigator from './authNavigator';
import HomeNavigator from './homeNavigator';
import { navigationRef } from '../providers/navigationService';

const Stack = createNativeStackNavigator();

const Router = () => {

  const token = useSelector(state => state.auth.login.token)
  
  return (
    <NavigationContainer
      ref={navigationRef}
    >
      <Stack.Navigator 
        initialRouteName = {token != ''?"Home":"Welcome"} 
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen 
            name="Welcome" 
            component={WelcomeScreen}
        />
        <Stack.Screen 
            name="Auth" 
            component={AuthNavigator}
        />
        <Stack.Screen 
            name="Home" 
            component={HomeNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;