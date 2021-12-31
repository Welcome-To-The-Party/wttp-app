//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, FlatList, ImageBackground, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import * as Location from 'expo-location';

import { TopSearchBar, Button, Loading, FilterSearch } from '@components'
import { styles } from './style'
import { colors } from '@styles'
import { find_current_events, find_events } from '../../store/events/actionEvents';
import EventDisplay from '../../components/Events/EventDisplay';
import { navigate } from '../../providers/navigationService';
import LatestEvent from '../../components/Events/LatestEvent';
import { PLACE_STYLES, THEME_ILLUSTRATION, TOP_CITIES } from '../../constant';
import Card from '../../components/Card';
import { useNavigation } from '@react-navigation/native';
import { SETADDRESS } from '../../store/adresse/type';
import { set_adress } from '../../store/adresse/ActionAdresse';
var _ = require('lodash'); 

const headerImage = require('@assets/images/Search/Party.jpg')
const paiementImage = "https://drive.google.com/uc?export=download&id=12pzGQdgQ_akB-6nMcNQDrZw3hPtEJbci"

// create a component
const SearchScreen = () => {

  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [eventsType, setEventsType] = useState(null)
  const [ manualValidation, setManualValidation ] = useState(null)
  const [lng, setLng] = useState()
  const [lat, setLat] = useState()
  const [isInit, setIsInit] = useState(true)
  const [ showModal, setShowModal ] = useState(false)
  const time = moment(new Date()).format("MM/DD/yyyy")
  const [filters, setFilters] = useState({
    poseSelect: true,
    bringueSelect: true,
    distance: 20
  })
  const {data, isLoading} = useSelector(state => state.events.find_events)
  const currents_events = useSelector(state => state.events.currents_events.data)
  const [ listEvents, setListEvents ] = useState()


  const setPosition = (details) => {
      const { lat, lng } = details.geometry.location
      setLat(lat)
      setLng(lng)
      loadEvents(lat, lng)
  }

  const loadEvents = (latitude, longitude) => {
      const data = {
        latitude,
        longitude,
        time,
        range: filters.distance
      }
      dispatch(find_events(data))
  }

  const Header = ({title}) => {
    return(
      <ImageBackground 
        source = {headerImage}
        style = {styles.headerImg}
        imageStyle = {styles.header_radius_img}
      >
        <View style = {styles.header_content}>
          <Text style={styles.bigHeader}>{title}</Text>
          <Text style={styles.subTitle}>Qu'est ce que tu attends pour t'amuser et empocher</Text>
          <Button 
            text="Crée ton propre évènement"
            textColor = {colors.WHITE}
            textStyle = {styles.btn_textStyle}
            style = {styles.btn}
            onPress={() => navigate("CreateEvent")}
          />
        </View>
      </ImageBackground>
    )
  }

  const handleFilter = () => {
    const events = _.filter(currents_events,eventsType != null && manualValidation != null?
      {type: eventsType, manualValidation: manualValidation}:
      eventsType != null?{type: eventsType}:
      manualValidation !=null?{manualValidation: manualValidation}:null)
    setListEvents(events)
    toggleModal()
  }

  const handleResetFilter = ()=> {
    setEventsType("")
    setManualValidation(null)
    setListEvents(data)
    toggleModal()
  }

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const openMap = (item) => {
    dispatch({
      type: SETADDRESS,
      payload: item.title
    })
    navigation.navigate('Map')
  }

  const init = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("Permission to access location was denied")
        return;
      }
      let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High});
      const { latitude, longitude } = location.coords
      loadEvents(latitude, longitude)
      setIsInit(false)
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      init()
    });
    
    if(isInit){
      init()
    }
    dispatch(find_current_events())
    setListEvents(currents_events)
    return unsubscribe;
  }, [lat, lng, data, navigation])

  return (
    <View style={styles.container}>
      <TopSearchBar
        toggleModal = {toggleModal}
        setDetails = {setPosition}
      />
      <FilterSearch 
        isVisible = {showModal}
        toggle = {toggleModal}
        setEventsType = {setEventsType}
        setManualValidation = {setManualValidation}
        eventsType = {eventsType}
        manualValidation = {manualValidation}
        onFilter = {handleFilter}
        resetFilter = {handleResetFilter}
      />
      <ScrollView 
        style = {styles.content_wrapper}
        contentContainerStyle = {{paddingBottom: 20}}
        showsVerticalScrollIndicator = {false}
      >
          {isLoading && <Loading />}
          <Header
            title = {currents_events.length == 0?
              "Oups! aucun événement autour de toi!"
              :
              "Tu aimes recevoir, t'amuser et partager"
            }
          />
          {
            currents_events.length != 0?
            <View>
              <Text style = {styles.title}>Ajouté récemment</Text>
              <FlatList
                data = {listEvents}
                horizontal = {true}
                keyExtractor = {((item) => String(item.eventid))}
                renderItem = {({item}) => 
                  <EventDisplay 
                    item={item}
                  />
                }
              />
              <Text style = {styles.title}>Atour de toi</Text>
              <FlatList
                data = {data}
                keyExtractor = {((item) => String(item.eventid))}
                renderItem = {({item}) => 
                  <LatestEvent item = {item} />
                }
              />
              
            </View>:
            <View>
                <View style = {styles.section_wrapper}>
                  <Text style = {styles.section_title}>Style de lieux</Text>
                  <Text style = {styles.section_subTitle}>Laisser vous inspirer, recever vos convives parmis un de ces lieux</Text>
                  <ScrollView style = {styles.section_content} horizontal = {true}>
                    {
                      PLACE_STYLES.map((item, index) => (
                        <Card 
                          key = {index} 
                          item = {item}
                          imageStyle = {styles.card_image}
                        />
                      ))
                    }
                  </ScrollView>
                </View>

                <View style = {styles.section_wrapper}>
                  <Text style = {styles.section_title}>Top 5 des villes</Text>
                  <Text style = {styles.section_subTitle}>Apparemment c'est ici que l'on retrouve plus de bringue</Text>
                  <ScrollView style = {styles.section_content} horizontal = {true}>
                    {
                      TOP_CITIES.map((item, index) => (
                        <Card 
                          key = {index} 
                          item = {item}
                          imageStyle = {styles.card_image}
                          onPress = {() => openMap(item)}
                        />
                      ))
                    }
                  </ScrollView>
                </View>
                  
                <View style = {styles.section_wrapper}>
                  <Text style = {styles.section_title}>Reçois de l'argent</Text>
                  <View style = {styles.card}>
                    {/* <View style = {styles.card_header}>
                      
                    </View> */}
                    <View style = {styles.card_body}>
                      <ImageBackground
                        style = {styles.card_body_image}
                        source={{uri: paiementImage}}
                        imageStyle = {{borderRadius: 10}}
                      >
                        <Text style = {styles.card_header_title}>WTTP s'associe à Stripe a fin de vous assurer des paiements sécurisés. Avant d'encaisser des paiements, il est nécessaire de renseigner son compte</Text>
                        <Button
                          text = "Recevoir des paiements"
                          style = {styles.card_header_btn}
                          textColor = {colors.PRIMARY}
                          onPress = {() => navigation.navigate('Profil', {screen: 'Stripe'})}
                        />
                      </ImageBackground>
                    </View>
                  </View>
                </View>

                <View style = {styles.section_wrapper}>
                  <Text style = {styles.section_title}>Thèmes illustrés</Text>
                  <Text style = {styles.section_subTitle}>Tout simplement parce que faire la fête est art</Text>
                  <ScrollView style = {styles.section_content} horizontal = {true}>
                    {
                      THEME_ILLUSTRATION.map((item, index) => (
                        <Card 
                          key = {index} 
                          item = {item}
                          imageStyle = {styles.card_image}
                        />
                      ))
                    }
                  </ScrollView>
                </View>

            </View>
          }
      </ScrollView>
    </View>
  );
};

//make this component available to the app
export default SearchScreen;
