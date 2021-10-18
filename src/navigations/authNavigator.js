// In App.js in a new project

import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import {
    LoginScreen,
    RegisterScreen,
    ForgotenScreen
} from '@screens'

function AuthNavigator() {
  return (
      <Stack.Navigator>
        <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options = {{headerShown: false}}
        />
        <Stack.Screen 
            name="Register" 
            component={RegisterScreen}
            options = {{headerShown: false}}
        />
        <Stack.Screen 
            name="Forgoten" 
            component={ForgotenScreen}
            options = {{headerShown: false}}
        />
      </Stack.Navigator>
  );
}

export default AuthNavigator;