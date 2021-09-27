import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

const add_img = require('@assets/images/Search/add.png');

// create a component
const Banner = ({navigation}) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('CreateEvent')}>
          <Image source={add_img} style={styles.bannerStyle} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  bannerStyle: {
    width: '100%',
    height: 100,
    borderRadius: 10
  }
});

//make this component available to the app
export default Banner;
