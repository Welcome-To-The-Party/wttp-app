import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Modal, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux'
import { mixins } from '@styles'

const fb_icon = require('@assets/icons/google.png');

// create a component
const GoogleButton = ({onPress}) => {

  const isLoading = useSelector(state => state.auth.login_google.isLoading)
  
  return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Image source={fb_icon} style={styles.icon} />
        <Text style={styles.buttonText}>Continuer avec Google</Text>
        {
          isLoading && 
          <ActivityIndicator color = "#000" size = 'large' />
        }
      </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,
    paddingRight: 20,
    ...mixins.boxShadow("#777")
  },
  buttonText: {
    paddingLeft: 25,
    paddingRight: 15,
    flex: 1,
    color: "#555",
    fontSize: 18,
  },
  icon: {
    marginLeft: 20,
    width: 25,
    height: 25,
  }
});

//make this component available to the app
export default GoogleButton;