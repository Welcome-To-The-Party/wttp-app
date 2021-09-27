/*
 * Create Event Step Navigator
 */
import React from 'react';
import PropTypes from 'prop-types';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import CEStepTopTabBar from './CEStepTopTabBar.js';

import FirstStep from '../screens/CreateEvent/FirstStep.js';
import SecondStep from '../screens/CreateEvent/SecondStep.js';
import ThirdStep from '../screens/CreateEvent/ThirdStep.js';
import FourthStep from '../screens/CreateEvent/FourthStep.js';

const Tab = createMaterialTopTabNavigator();

export default class CEStepNavigator extends React.Component
{
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <Tab.Navigator screenOptions={{ activeTintColor: '#6C2BA1' }}
        tabBar={(props) => <CEStepTopTabBar {...props} />}>
        <Tab.Screen name="first">
          {props => <FirstStep {...props} logout={this.props.run}
          data={this.props.data}
            location={this.props.location} token={this.props.token}
            setTitle={this.props.setTitle}
            setDescription={this.props.setDescription}
            setAddress={this.props.setAddress} />}
        </Tab.Screen>
        <Tab.Screen name="second">
          {props => <SecondStep {...props} logout={this.props.run}
            data={this.props.data}
            location={this.props.location} token={this.props.token}
            setMusicType={this.props.setMusicType}
            setPartyType={this.props.setPartyType}
            setPlaceType={this.props.setPlaceType} />}
        </Tab.Screen>
        <Tab.Screen name="third">
          {props => <ThirdStep {...props} logout={this.props.run}
            data={this.props.data}
            location={this.props.location} token={this.props.token}
            setMaxAllowed={this.props.setMaxAllowed}
            setPrice={this.props.setPrice}
            setSmoke={this.props.setSmoke}
            setImages={this.props.setImages} />}
        </Tab.Screen>
        <Tab.Screen name="fourth">
          {props => <FourthStep {...props} logout={this.props.run}
            data={this.props.data}
            location={this.props.location} token={this.props.token}
            setValidation={this.props.setValidation}
            setTime={this.props.setTime} setPhone={this.props.setPhone}
            setInfo={this.props.setInfo} />}
        </Tab.Screen>
      </Tab.Navigator>
    );
  }
}

CEStepNavigator.propTypes = {
  run: PropTypes.function,
  location: PropTypes.object,
  token: PropTypes.string,
  setTitle: PropTypes.function,
  setDescription: PropTypes.function,
  setAddress: PropTypes.function,
  setMusicType: PropTypes.function,
  setPartyType: PropTypes.function,
  setPlaceType: PropTypes.function,
  setMaxAllowed: PropTypes.function,
  setPrice: PropTypes.function,
  setSmoke: PropTypes.function,
  setImages: PropTypes.function,
  setValidation: PropTypes.function,
  setTime: PropTypes.function,
  setPhone: PropTypes.function,
  setInfo: PropTypes.function,
}
