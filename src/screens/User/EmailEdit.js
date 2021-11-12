//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

import { Input, Button } from '@components';
import { colors } from '@styles'

const background_img = require('@assets/images/User/public_back.png');

// create a component
const EmailEdit = () => {

  const [ email, setEmail ] = useState()

  return (
    <View style={styles.container}>
      <View style={styles.infoCont}>
            <View style={{width: '80%'}}>
              <Text style={styles.infoHeader}>Modification d'adresse mail</Text>
            </View>
      </View>
      <View style={styles.infoCont}>
        <Input 
          placeholder="Adresse mail"
          onChangeText = {setEmail}
          keyboardType = "email_address"
        />
        <Button 
          text={"Valider"}
          style = {styles.btn}
          textColor = "#fff" 
          onPress={() => alert('oui')} 
        />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoCont: {
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
    left: 0
  },
  infoHeader: {
   
    fontStyle: 'normal',
    fontWeight: "500",
    fontSize: 16,
    color: '#4f4f4f',
  },
  btn: {
    backgroundColor: colors.PRIMARY
  },
});

//make this component available to the app
export default EmailEdit;
