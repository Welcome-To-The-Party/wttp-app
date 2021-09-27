import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux'

import UserTopTabBar from './UserTopTabBar.js';
import EHandlerNavigator from './EHandlerNavigator.js';
import PHandlerNavigator from './PHandlerNavigator.js';

import MainScreen from '../screens/User/MainScreen.js';
import EditProfil from '../screens/User/Profile/EditProfil.js';
import OrganizedScreen from '../screens/User/OrganizedScreen';
import EmailEdit from '../screens/User/EmailEdit.js';
import DelAcc from '../screens/User/DelAcc.js';
import NotifEdit from '../screens/User/NotifEdit.js';
import PublicProfil from '../screens/User/Profile/PublicProfil.js';
import SettingsScreen from '../screens/User/SettingsScreen.js';
import StripeScreen from '../screens/User/StripeScreen.js';
import SocialScreen from '../screens/User/SocialScreen.js';

const Stack = createNativeStackNavigator();
const navbarHeight = 65;

// create a component
const UserNavigator = () => {

  const user = useSelector(state => state.user.user.data)

  return (
    <Stack.Navigator initialRouteName="UserHome">
        <Stack.Screen 
          name="UserHome"
          component = {MainScreen}
          options={{ 
              headerStyle: {
                height: navbarHeight 
              },
              title: '', 
              headerTransparent: true 
            }}
          />
        <Stack.Screen 
          name="Public"
          component = {PublicProfil}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="Edit"
          component = {EditProfil}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="Organized"
          component = {OrganizedScreen} 
          options={{header: (props) => <UserTopTabBar
          {...props} userData={user}/>, headerTransparent: true,
          headerTitle:"Mes événements"}}
        />
        <Stack.Screen 
          name="EventHandler"
          component = {EHandlerNavigator} 
          options={{header: (props) => <UserTopTabBar
          {...props} userData={user}/>, headerTransparent: true,
          headerTitle:"Mes événements"}}
        />
        <Stack.Screen 
          name="ParticipateHandler"
          component = {PHandlerNavigator}
          options={{header: (props) => <UserTopTabBar
          {...props} userData={user}/>, headerTransparent: true,
          headerTitle:"Mes participations"}}
        />
        <Stack.Screen 
          name="Email"
          component = {EmailEdit}
          options={{header: (props) => <UserTopTabBar
          {...props} userData={user}/>, headerTransparent: true,
          headerTitle:"Modification de profil"}}
        />
        <Stack.Screen 
          name="Social"
          component = {SocialScreen}
          options={{header: (props) => <UserTopTabBar
          {...props} userData={user}/>, headerTransparent: true,
          headerTitle:"Nos Réseaux"}}
        />
        <Stack.Screen 
          name="Notif"
          component = {NotifEdit}
          options={{header: (props) => <UserTopTabBar
          {...props} userData={user}/>, headerTransparent: true,
          headerTitle:"Paramètre de votre compte"}} 
        />
        <Stack.Screen 
          name="Delete"
          component = {DelAcc}
          options={{header: (props) => <UserTopTabBar
          {...props} userData={user}/>, headerTransparent: true,
          headerTitle:"Paramètre de votre compte"}} 
        />
        <Stack.Screen 
          name="Stripe"
          component = {StripeScreen}
          options={{header: (props) => <UserTopTabBar
          {...props} userData={user}/>, headerTransparent: true,
          headerTitle:"Paramètre de votre compte"}} />
        <Stack.Screen 
          name="Settings" 
          component = {SettingsScreen}
          options={{header: (props) => <UserTopTabBar
          {...props} userData={user}/>, headerTransparent: true,
          headerTitle:"Paramètre de votre compte"}} />
      </Stack.Navigator>
  );
};

//make this component available to the app
export default UserNavigator;

