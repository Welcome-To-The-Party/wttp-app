/*
 * Create Event Step Navigator
 */
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import equal from 'fast-deep-equal'

import PastEventScreen from '../screens/Events/PastEventScreen.js';
import ConfirmedScreen from '../screens/Events/ConfirmedScreen.js';
import ValidationScreen from '../screens/Events/ValidationScreen.js';
import { colors } from '@styles'

const Tab = createMaterialTopTabNavigator();

export default class EHandlerNavigator extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      event: undefined,
      pastEvent: undefined,
    };

    this.getEvent = this.getEvent.bind(this);
    this.openPastEvent = this.openPastEvent.bind(this);
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

  openPastEvent(data) {
    this.setState({pastEvent: data});
    this.props.navigation.navigate('PastEvent');
  }

  componentDidUpdate(prevProps) {
    if (!equal(this.props.eid, prevProps.eid)) {
      this.getEvent();
    }
  }
  render () {

    return (
      <Tab.Navigator 
        screenOptions={{ 
          activeTintColor: '#6C2BA1',
          tabBarIndicatorStyle: {
            backgroundColor: colors.PRIMARY
          },
          tabBarLabelStyle: {textTransform: 'capitalize', fontSize: 16}
        }}
      >
        <Tab.Screen 
          name="confirm"
          component = {ConfirmedScreen}
          options = {{title: "Confirmé"}}
        />
        <Tab.Screen 
          name="wait" 
          component = {ValidationScreen}
          options = {{title: "En attente"}}
        />
        {/* <Tab.Screen 
          name="PastEvent" 
          component = {PastEventScreen}
          options = {{title: "En attente"}}
        /> */}
      </Tab.Navigator>
    );
  }
}
