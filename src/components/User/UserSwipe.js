import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Linking } from 'react-native';
import { mixins, colors } from '@styles'
import Button from '../Buttons/Button';
import { useDispatch } from 'react-redux';
import { accept_participation, refuse_participation } from '../../store/events/actionEvents';
import { navigate } from '../../providers/navigationService';

const facebook_icon = require('@assets/images/User/facebook.png');
const insta_icon = require('@assets/images/User/insta.png');
const twitter_icon = require('@assets/images/User/twitter.png');
const tiktok_icon = require('@assets/images/User/tiktok.png');


const UserSwipe = ({item, eventid}) => {

    const dispatch = useDispatch()
    const openLink = async (link) => {
      const supported = await Linking.canOpenURL(link);
  
      if (supported) {
        await Linking.openURL(link);
      } else {
        alert("Cannot open url");
      }
    }

    const handleAcceptPacticipation = () => {
      dispatch(accept_participation({
        eventid,
        email: item.email
      }))
    }

    const handleRefuseParticipation = () => {
      dispatch(refuse_participation({
        eventid,
        email: item.email
      }))
    }

    return (
      <View style={styles.container}>
        <Image source={{uri: item.picture}} style={styles.proIcon}/>
        <TouchableOpacity onPress={() => navigate("User", {user: item})}>
          <Text style={styles.header}>{item.name}</Text>
        </TouchableOpacity>
        <Text style={styles.para}>EN SAVOIR PLUS VIA LES RÉSEAUX</Text>
        <View style={{flexDirection: 'row'}}>
            {
              item?.facebook_link != ''?
              <TouchableOpacity onPress={() => openLink(item?.facebook_link)}>
                <Image source={facebook_icon} style={styles.icon_social} />
              </TouchableOpacity>
              :item?.instagram_link != ''?
              <TouchableOpacity onPress={() => openLink(item?.instagram_link)}>
                <Image source={insta_icon} style={styles.icon_social} />
              </TouchableOpacity>
              :item?.tiktok_link != ''?
              <TouchableOpacity onPress={() => openLink(item?.tiktok_link)}>
                <Image source={tiktok_icon} style={styles.icon_social} />
              </TouchableOpacity>:null
            }
        </View>
        <View style = {styles.row}>
            <Button
              text = "A éviter"
              textColor = {colors.PRIMARY}
              style = {styles.btn_outline}
              onPress = {handleRefuseParticipation}
            />
            <Button
              text = "A inviter"
              textColor = {colors.WHITE}
              style = {styles.btn}
              onPress = {handleAcceptPacticipation}
            />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingBottom: 20,
    marginVertical: 10,
    ...mixins.boxShadow('#777')
  },
  proIcon: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 20
  },
  row: {
    flexDirection: 'row',
    marginTop: 30,
    paddingHorizontal: 10
  },
  header: {
   
    fontStyle: 'normal',
    fontWeight: "200",
    fontSize: 25,
    color: '#4f4f4f',
  },
  para: {
   
    fontStyle: 'normal',
    fontWeight: "200",
    fontSize: 15,
    marginTop: 20,
    marginBottom: 10,
    color: '#4f4f4f',
  },
  bubble: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 5,
    paddingLeft: 5,
    borderWidth: 1,
    borderRadius: 50,
    marginRight: 10,
    borderColor: '#6C2BA1'
  },
  icon_social: {
    width: 50,
    height: 50,
  },
  bubbleText: {
    color: '#6C2BA1'
  },
  btn_outline: {
    flex: 1,
    borderWidth: 1,
    marginRight: 10,
    borderColor: colors.PRIMARY
  },
  btn: {
    flex: 1,
    backgroundColor: colors.PRIMARY
  }
});

export default UserSwipe

