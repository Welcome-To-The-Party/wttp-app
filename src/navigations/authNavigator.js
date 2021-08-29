// In App.js in a new project

import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import {
    LoginScreen
} from '@screens'

function AuthNavigator() {
  return (
      <Stack.Navigator>
        <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
        />
      </Stack.Navigator>
  );
}

export default AuthNavigator;