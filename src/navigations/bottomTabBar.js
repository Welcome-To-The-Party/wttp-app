import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { CommonActions } from '@react-navigation/native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faBell, faHeart, faUserCircle } from '@fortawesome/free-solid-svg-icons'

const background_img = require('@assets/images/back.png');
const logo = require('@assets/images/NavBar/logo.png');
const iconSize = 25;

const BottomTabBar = ({navigation}) => {

  const openPage = (page) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: page },
        ],
      })
    );
  }

  return(
    <View style={styles.container}>
        <ImageBackground source={background_img}
          style={styles.back_images_container}>
          <View style={styles.button_container}>
            <TouchableOpacity 
              onPress={() => openPage("Map")} 
              style={styles.btn_container}
            >
              <FontAwesomeIcon 
                size={iconSize} 
                style={styles.icons} 
                icon={ faSearch }
              />
              <Text style={styles.text}>Recherche</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => openPage("Notifications")} 
              style={styles.btn_container}
            >
              <FontAwesomeIcon 
                size={iconSize} 
                style={styles.icons} 
                icon={ faBell }
              />
              <Text style={styles.text}>Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => openPage("Search")} 
              style={styles.btn_container_img}
            >
              <Image 
                source={logo} 
                style={styles.logo} 
              />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => openPage("Favorites")} 
              style={styles.btn_container}
            >
              <FontAwesomeIcon 
                size={iconSize} 
                style={styles.icons} 
                icon={ faHeart }
              />
              <Text style={styles.text}>Favoris</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => openPage("Profil")} 
              style={styles.btn_container}
            >
              <FontAwesomeIcon 
                size={iconSize} 
                style={styles.icons} 
                icon={ faUserCircle }
              />
              <Text style={styles.text}>Mon Compte</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '10%',
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: '#230E52',
  },
  button_container: {
    backgroundColor: '#230E52',
    width: '90%',
    height: '80%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
  },
  back_images_container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  text: {
    fontFamily: 'Roboto',
    fontWeight: "200",
    fontSize: 10,
    color: '#fff',
  },
  icons: {
    color: '#fff',
  },
  btn_container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_container_img: {
    bottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default BottomTabBar;