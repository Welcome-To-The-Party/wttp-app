import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux'

import { mixins } from '@styles'

const fb_icon = require("@assets/icons/facebook.png")

// create a component
const FacebookButton = ({onPress}) => {

  const isLoading = useSelector(state => state.auth.login_facebook.isLoading)

  console.log("loading", isLoading)

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
    >
      <Image 
        source = {fb_icon}
        style={styles.icon}
      />
      <Text style={styles.buttonText}>Continuer avec Facebook</Text>
      {
        isLoading && 
        <ActivityIndicator color = "#fff" size = 'large' />
      }
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: "#3B5998",
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,
    paddingRight: 20,
    ...mixins.boxShadow("#777")
  },
  buttonText: {
    flex: 1,
    paddingLeft: 25,
    paddingRight: 15,
    color: "#fff",
    fontSize: 18,
  },
  icon: {
    marginLeft: 20,
    width: 25,
    height: 25,
  }
});

//make this component available to the app
export default FacebookButton;
