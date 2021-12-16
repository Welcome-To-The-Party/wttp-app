import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabBar from './bottomTabBar.js';

// V2
import SearchScreen from '../screens/Search/SearchScreen.js';
import EventScreen from '../screens/Events/EventScreen';
import UserNavigator from './userNavigator.js';
import CreateEventNavigator from './CreateEventNavigator.js';
import PublicProfil from '../screens/User/Profile/PublicProfil';
import NotificationNavigator from './NotificationNavigator';

// V1
import MapScreen from '../screens/Search/MapScreen.js';
import FavoriteScreen from '../screens/Favorites/index.js';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const FavoriteStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="FavoriteScreen"
                component = {FavoriteScreen}
                options = {{headerShown: false}}
            />
            <Stack.Screen 
                name="Event"
                component = {EventScreen}
                options = {{headerShown: false}}
            />
        </Stack.Navigator>
    )
}

const MapStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="MapScreen" 
                component = {MapScreen}
                options = {{headerShown: false}}
            />
            <Stack.Screen 
                name="Event"
                component = {EventScreen}
                options = {{headerShown: false}}
            />
        </Stack.Navigator>
    )
}

const HomeNavigator = () => {
    return (
        <Tab.Navigator 
            screenOptions={{ tabBarActiveTintColor: '#6C2BA1', headerShown: false }}
            initialRouteName = "Search"
            tabBar={(props) => <BottomTabBar {...props} />}
        >
            <Tab.Screen 
                name="Search"
                component = {SearchScreen}
            />
            <Tab.Screen 
                name="Map" 
                component = {MapStack}
            />
            <Tab.Screen 
                name="Notifications" 
                component = {NotificationNavigator}
            />  
            <Tab.Screen 
                name="Favorites"
                component = {FavoriteStack}
            />
            <Tab.Screen 
                name="Profil" 
                component = {UserNavigator}
            />
            <Tab.Screen 
                name="CreateEvent"
                component = {CreateEventNavigator}
            />
            <Tab.Screen 
                name="Event"
                component = {EventScreen}
            />
            <Tab.Screen 
                name="User"
                component = {PublicProfil}
            />
        </Tab.Navigator>
    );
}

export default HomeNavigator;
