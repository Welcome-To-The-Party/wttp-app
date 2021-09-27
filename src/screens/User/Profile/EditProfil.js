//import liraries
import React, { useState } from 'react';
import { View, Text, ImageBackground, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Ionicons from 'react-native-vector-icons/Ionicons'

import { styles } from './style'
import { TextInputPro, SocialEdit, Button} from '@components'

const background_img = require('@assets/images/User/public_back.png');
const facebook_icon = require('@assets/images/User/facebook.png');
const insta_icon = require('@assets/images/User/insta.png');
const twitter_icon = require('@assets/images/User/twitter.png');
const tiktok_icon = require('@assets/images/User/tiktok.png');

// create a component
const EditProfil = ({navigation}) => {

  const user = useSelector(state => state.user.user.data)
  const isLoading = useSelector(state => state.user.user.isLoading)
  const [image, setImage] = useState(user.picture)
  const [facebook_link, setFacebook_link] = useState(user.facebook_link)
  const [twitter_link, setTwitter_link] = useState(user.twitter_link)
  const [instagram_link, setInstagram_link] = useState(user.instagram_link)
  const [tiktok_link, setTiktok_link] = useState(user.tiktok_link)
  const [name, setName] = useState()
  const [desc, setDesc] = useState()

  const handleUpdate = () => {

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
        <View style={styles.dataContainer}>
          {isLoading && <Loading />}
          <View style={styles.headerCont}>
            <TouchableOpacity onPress={() => get_img()} style={{width: '100%', position: 'relative'}}>
              <Image source={{uri: image}} style={styles.icon} />
              <View style={styles.pictureCircle}>
                <FontAwesomeIcon size={20} color={'#361979'} icon={ faEdit }/>
                <Text style={{textAlign: 'center', color: '#fff'}}>MODIFIER</Text>
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.content_edit}>
            
            <View style={styles.infoCont}>
              <View style={{width: '30%'}}>
                <Text style={styles.infoHeader}>VOS INFOS</Text>
              </View>
              <TextInputPro text={'NOM'} desc={user.name} run={(dat) => setName(dat)} />
              <TextInputPro text={'BIO'} desc={user.description} run={(dat) => setDesc(dat)} />
            </View>
            <View style={styles.infoCont}>
              <View style={{width: '50%'}}>
                <Text style={styles.infoHeader}>VOS LIENS SOCIAUX</Text>
              </View>
              <SocialEdit icon={facebook_icon} text={facebook_link}  type={"FACEBOOK"}  />
              <SocialEdit icon={insta_icon} text={instagram_link}  type={"INSTAGRAM"}  />
              <SocialEdit icon={tiktok_icon} text={tiktok_link}  type={"TIKTOK"} />
              <SocialEdit icon={twitter_icon} text={twitter_link}  type={"TWITTER"} />
              <Button 
                textColor = "#fff"
                style = {styles.btn_edit}
                text="Sauvegarder" 
                onPress={handleUpdate} 
              />
            </View>
          </ScrollView>
        </View>
        {/* <Alert message={this.state.message} open={this.state.showModal} /> */}
      </ImageBackground>
    </View>
  );
};

//make this component available to the app
export default EditProfil;
