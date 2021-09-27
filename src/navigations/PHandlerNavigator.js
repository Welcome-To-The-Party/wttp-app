/*
 * Create Participate Step Navigator
 */
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ParticipateScreen from '../screens/Events/ParticipateScreen.js';
import CancelEventScreen from '../screens/Events/CancelEventScreen.js';
import ToRateScreen from '../screens/Events/ToRateScreen.js';
import { colors } from '@styles'

const Tab = createMaterialTopTabNavigator();

export default class PHandlerNavigator extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      event: undefined,
    };

    this.getEvent = this.getEvent.bind(this);
  }

  getEvent() {
    fetch(`https://welcome-ttp.com/events/get_event/${this.props.eid}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authentification: `Bearder ${this.props.token}`,
        'Content-Type': 'application/json'
      }
    }).then((reponse) => reponse.json()).then((repJSON) => {
      this.setState({event: repJSON});
    }).catch((error) => {
      //this.props.logout();
      console.error(error)
    });
  }

  componentDidMount() {
    this.getEvent();
  }

  componentDidUpdate(prevProps) {
    /*if (!equal(this.props.eid, prevProps.eid)) {
      this.getEvent();
    }*/
  }

  render () {
    return (
      <Tab.Navigator 
        screenOptions={{ 
          activeTintColor: '#6C2BA1',
          tabBarLabelStyle: {textTransform: 'capitalize',fontSize:16},
          tabBarIndicatorStyle: {backgroundColor: colors.PRIMARY}
        }} 
      >
        <Tab.Screen 
          name="confirm"
          component = {ParticipateScreen}
          options = {{title: "CONFIRMÉES"}}
        />
        <Tab.Screen 
          name="wait"
          component = {CancelEventScreen}
          options = {{title: "EN ATTENTES"}} 
        />
        <Tab.Screen 
          name="passed"
          component = {ToRateScreen}
          options = {{title: "PASSÉES"}} 
        />
      </Tab.Navigator>
    );
  }
}
