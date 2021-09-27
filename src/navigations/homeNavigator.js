import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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

const HomeNavigator = () => {
    return (
        <Tab.Navigator 
            screenOptions={{ tabBarActiveTintColor: '#6C2BA1', headerShown: false }}
            tabBar={(props) => <BottomTabBar {...props} />}
        >
            <Tab.Screen 
                name="Search"
                component = {SearchScreen}
                options = {{unmountOnBlur: true}}
            />
            <Tab.Screen 
                name="Map" 
                component = {MapScreen}
                options = {{unmountOnBlur: true}}
            />
            <Tab.Screen 
                name="Notifications" 
                component = {NotificationNavigator}
                options = {{unmountOnBlur: true}} 
            />  
            <Tab.Screen 
                name="Favorites"
                component = {FavoriteScreen}
                options = {{unmountOnBlur: true}}
            />
            <Tab.Screen 
                name="Profil" 
                component = {UserNavigator}
                options = {{unmountOnBlur: true}}
            />
            <Tab.Screen 
                name="CreateEvent"
                component = {CreateEventNavigator}
                options = {{unmountOnBlur: true}}
            />
            <Tab.Screen 
                name="Event"
                component = {EventScreen}
                options = {{unmountOnBlur: true}}
            />
            <Tab.Screen 
                name="User"
                component = {PublicProfil}
                options = {{unmountOnBlur: true}}
            />
        </Tab.Navigator>
    );
}

export default HomeNavigator;
