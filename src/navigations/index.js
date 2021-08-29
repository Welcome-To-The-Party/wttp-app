import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
    WelcomeScreen
} from '@screens'
import AuthNavigator from './authNavigator';

const Stack = createNativeStackNavigator();

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
            name="Welcome" 
            component={WelcomeScreen}
        />
        <Stack.Screen 
            name="Auth" 
            component={AuthNavigator} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;