//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, FlatList, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import * as Location from 'expo-location';

import { TopSearchBar } from '@components'
import { styles } from './style'
import { colors } from '@styles'
import { Banner, Button } from '../../components';
import { find_events } from '../../store/events/actionEvents';
import EventDisplay from '../../components/Events/EventDisplay';
import { navigate } from '../../providers/navigationService';
import LatestEvent from '../../components/Events/LatestEvent';
import { ListItem } from 'react-native-elements/dist/list/ListItem';

const headerImage = require('@assets/images/Search/Party.jpg')

// create a component
const SearchScreen = ({navigation}) => {

  const dispatch = useDispatch()
  const [eventsType, setEventsType] = useState({})
  const [lng, setLng] = useState()
  const [lat, setLat] = useState()
  const [isInit, setIsInit] = useState(true)
  const [address, setAddress] = useState()
  const time = moment(new Date()).format("MM/DD/yyyy")
  const [filters, setFilters] = useState({
    poseSelect: true,
    bringueSelect: true,
    distance: 20
  })
  const events = useSelector(state => state.events.find_events.data)

  // console.log('events', events)

  const set_events_type = (type) => {
    if(eventsType[type] == true )
      setEventsType({
        ...eventsType,
        [type]: false
      })
    else
      setEventsType({
        ...eventsType,
        [type]: true
      })
  }

  const setPosition = (details) => {
    console.log("detail")
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

  // const 

  useEffect(() => {
    if(isInit){
      (async() => {
        let location = await Location.getLastKnownPositionAsync({});
        const { latitude, longitude } = location.coords
        loadEvents(latitude, longitude)
        setIsInit(false)
      })()
    }
  }, [lat, lng])

  return (
    <View style={styles.container}>
      <TopSearchBar 
        setEventsType = {set_events_type}
        eventsType = {eventsType}
        setDetails = {setPosition}
      />
      <ScrollView 
        style = {styles.content_wrapper}
        contentContainerStyle = {{paddingBottom: 20}}
        showsVerticalScrollIndicator = {false}
      >
          <Header
            title = {events.length == 0?
              "Oups! aucun événement autour de toi!"
              :
              "Tu aimes recevour, t'amuser et partager"
            }
          />
          {
            events.length != 0?
            <View>
              <Text style = {styles.title}>Ajouté récemment</Text>
              <FlatList
                data = {events}
                horizontal = {true}
                keyExtractor = {((item) => String(item.eventid))}
                renderItem = {({item}) => 
                  <EventDisplay 
                    item={item}
                  />
                }
              />
              <Text style = {styles.title}>Atour de toi</Text>
              <LatestEvent item = {events[0]} />
            </View>:null
          }
      </ScrollView>
    </View>
  );
};

//make this component available to the app
export default SearchScreen;
