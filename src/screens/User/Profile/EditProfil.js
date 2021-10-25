//import liraries
import React, { useState } from 'react';
import { View, Text, ImageBackground, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

import { styles } from './style'
import { TextInputPro, SocialEdit, Button, AlertSucces, Loading, BackButton} from '@components'
import { update_profil } from '@store/user/actionUser';
import { UPDATE_PROFIL } from '@store/user/type';

const background_img = require('@assets/images/User/public_back.png');
const facebook_icon = require('@assets/images/User/facebook.png');
const insta_icon = require('@assets/images/User/insta.png');
const twitter_icon = require('@assets/images/User/twitter.png');
const tiktok_icon = require('@assets/images/User/tiktok.png');

// create a component
const EditProfil = ({navigation}) => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user.data)
  const {isLoading, message} = useSelector(state => state.user.update)
  const [picture, setPicture] = useState(user?.picture)
  const [facebook_link, setFacebook_link] = useState(user.facebook_link)
  const [twitter_link, setTwitter_link] = useState(user.twitter_link)
  const [instagram_link, setInstagram_link] = useState(user.instagram_link)
  const [tiktok_link, setTiktok_link] = useState(user.tiktok_link)
  const [name, setName] = useState(user.name)
  const [description, setDescription] = useState(user.description)

  const handleUpdate = () => {
    const data = new FormData()
    data.append("name", name)
    data.append("description",description)
    data.append("facebook_link", facebook_link)
    data.append("instagram_link", instagram_link)
    data.append("twitter_link", twitter_link?twitter_link:"")
    data.append("tiktok_link", tiktok_link)
    data.append("picture", {
      uri: picture,
      type: 'image/jpeg',
      name: "avatar.jpg"
    })
    // const data = {
    //   user: {name,description, picture,facebook_link, instagram_link, twitter_link: twitter_link?twitter_link:"", tiktok_link}
    // }
    console.log("data", data)
    dispatch(update_profil(data))
  }

  const get_img = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.cancelled) {
      const manipResult = await ImageManipulator.manipulateAsync(
        result.uri,
        [{ resize: {width: result.width/3, height: result.height/3} }],
        { compress: 1}
      );
      setPicture(manipResult.uri);
    }
  }

  console.log("message", message)

  const onCloseModal = () => {
    dispatch({type: `${UPDATE_PROFIL}_SUCCESS`, payload: ""})
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={background_img} style={styles.background_img}>
        <BackButton />
        <View style={styles.headerCont}>
          <TouchableOpacity onPress={get_img} style={styles.content_avatar}>
            <Image 
              source={{uri: picture}} 
              style={styles.icon}
              resizeMode = 'cover'
            />
            <View style={styles.pictureCircle}>
              <FontAwesomeIcon size={20} color={'#361979'} icon={ faEdit }/>
              <Text style={{textAlign: 'center', color: '#fff'}}>MODIFIER</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.dataContainer}>
          {isLoading && <Loading />}
          <AlertSucces 
            isVisible = {message?true:false}
            message = {message}
            onClose = {onCloseModal}
          />
          <ScrollView style={styles.content_edit}>
            
            <View style={styles.infoCont}>
              <View style={{width: '30%'}}>
                <Text style={styles.infoHeader}>VOS INFOS</Text>
              </View>
              <TextInputPro text={'NOM'} desc={name} run={setName} />
              <TextInputPro text={'BIO'} desc={description} run={setDescription} />
            </View>
            <View style={styles.infoCont}>
              <View style={{width: '50%'}}>
                <Text style={styles.infoHeader}>VOS LIENS SOCIAUX</Text>
              </View>
              <SocialEdit 
                icon={facebook_icon} 
                text={facebook_link}  
                type={"FACEBOOK"}  
                run = {setFacebook_link}
              />
              <SocialEdit 
                icon={insta_icon} 
                text={instagram_link}  
                type={"INSTAGRAM"}
                run = {setInstagram_link}  
              />
              <SocialEdit 
                icon={tiktok_icon} 
                text={tiktok_link}  
                type={"TIKTOK"}
                run = {setTiktok_link}
              />
              <SocialEdit 
                icon={twitter_icon} 
                text={twitter_link}  
                type={"TWITTER"}
                run = {setTwitter_link} 
              />
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
