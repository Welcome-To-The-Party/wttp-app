//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Linking, TouchableOpacity } from 'react-native';


const background_img = require("@assets/images/SocialScreen/background.png");
const tw_icon = require('@assets/icons/twitter.png');
const in_icon = require('@assets/icons/instagram.png');
const kk_icon = require('@assets/icons/tiktok.png');
const url_tw = "https://twitter.com/wttp_app?s=09";
const url_in = "https://www.instagram.com/p/CIYgs49j-t5/?utm_medium=copy_link";
const url_kk = "https://vm.tiktok.com/ZMeESnDGP/";

// create a component
const SocialScreen = () => {

  const openURL = (link) => {
    Linking.openURL(link);
  }

  return (
    <View style={styles.container}>
        <Image source={background_img} style={styles.background} />
        <View style={styles.miniCont}>
          <View style={styles.containerImg}>
            <TouchableOpacity style={styles.opacity} onPress={() => openURL(url_tw)}>
              <Image source={tw_icon} style={styles.icon} />
            </TouchableOpacity>
          </View>
          <View style={styles.containerImg}>
            <TouchableOpacity style={styles.opacity} onPress={() => openURL(url_in)}>
              <Image source={in_icon} style={styles.icon} />
            </TouchableOpacity>
          </View>
          <View style={styles.containerImg}>
            <TouchableOpacity style={styles.opacity} onPress={() => openURL(url_kk)}>
              <Image source={kk_icon} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#fff',
  },
  containerImg: {
    flex: 1,
    width: 60,
    height: 60,
    marginTop: 5,
    marginLeft: '9%',
    marginRight: '9%',
    marginBottom: 5,
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 15
  },
  background: {
    width: "100%",
    height: 300,
  },
  miniCont: {
    marginTop: 50,
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'center',
  }
});

//make this component available to the app
export default SocialScreen;
