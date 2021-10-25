//import liraries
import React, { Component } from 'react';
import { View, Text, ImageBackground, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { styles } from './style'
import { colors } from '@styles'

const background_img = require('@assets/images/User/public_back.png');
const facebook_icon = require('@assets/images/User/facebook.png');
const insta_icon = require('@assets/images/User/insta.png');
const twitter_icon = require('@assets/images/User/twitter.png');
const tiktok_icon = require('@assets/images/User/tiktok.png');

// create a component
const PublicProfil = ({navigation}) => {

  const user = useSelector(state => state.user.user.data)

  const openLink = async (link) => {
    const supported = await Linking.canOpenURL(link);

    if (supported) {
      await Linking.openURL(link);
    } else {
      alert("Cannot open url");
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={background_img} style={styles.background_img}>
          <TouchableOpacity 
            style = {styles.btn_back}
            onPress = {() => navigation.goBack()}
          >
            <Ionicons
              name = "chevron-back"
              size = {25}
            />
          </TouchableOpacity>
          <View style={styles.headerCont}>
              <Image 
                source={{uri: user?.picture}} 
                style={styles.icon}
                resizeMode = 'cover'
              />
              <Text style={styles.header}>{user?.name}</Text>
              <View style={styles.gradeCont}>
                <FontAwesomeIcon size={15} icon={ faStar } color={"#6C2BA1"} />
                <Text>{user?.averageGrade}/5</Text>
              </View>
          </View>
          <View style={styles.dataContainer}>
            <View style={styles.statCont}>
              <View style={styles.statDat}>
                <Text style={styles.statNum}>{user?.acceptedEvents?.length}</Text>
                <Text style={styles.statDesc}>PARTICIPATIONS</Text>
              </View>
              <View style={styles.statDat}>
                <Text style={styles.statNum}>{user?.createdEvents.length}</Text>
                <Text style={styles.statDesc}>ORGANISATIONS</Text>
              </View>
              <View style={styles.statDat}>
                <Text style={styles.statNum}>{user?.rates?.length}</Text>
                <Text style={styles.statDesc}>ÉVALUATIONS</Text>
              </View>
            </View>
            <View style={styles.infoCont}>
              { (user?.facebook_link || user?.instagram_link ||
                user?.twitter_link || user?.tiktok_link) ?
                  <View style={{width: '40%'}}>
                    <Text style={styles.infoHeader}>LIENS SOCIAUX</Text>
                  </View>
              : <View></View> }
              <View style={{flexDirection: 'row'}}>
                { (user.facebook_link) ?
                  <TouchableOpacity onPress={() => openLink(user?.facebook_link)}>
                    <Image source={facebook_icon} style={styles.icon_social} />
                  </TouchableOpacity>
                : <View></View>}
                { (user.instagram_link) ?
                  <TouchableOpacity onPress={() => openLink(user?.instagram_link)}>
                    <Image source={insta_icon} style={styles.icon_social} />
                  </TouchableOpacity>
                : <View></View>}
                { (user.twitter_link) ?
                  <TouchableOpacity onPress={() => openLink(user?.twitter_link)}>
                    <Image source={twitter_icon} style={styles.icon_social} />
                  </TouchableOpacity>
                : <View></View>}
                { (user.tiktok_link) ?
                  <TouchableOpacity onPress={() => openLink(user?.tiktok_link)}>
                    <Image source={tiktok_icon} style={styles.icon_social} />
                  </TouchableOpacity>
                : <View></View>}
              </View>
            </View>
            <View style={styles.infoCont}>
              <View style={{width: '40%'}}>
                <Text style={styles.infoHeader}>BIOGRAPHIE</Text>
              </View>
              <ScrollView>
                <Text style={styles.infoDesc}>{user?.description}</Text>
              </ScrollView>
            </View>
          </View>
        </ImageBackground>
    </View>
  );
};

//make this component available to the app
export default PublicProfil;
