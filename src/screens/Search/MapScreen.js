//import liraries
import React, { useEffect, useState, createRef, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MapView, {Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import moment from 'moment'
import * as Location from 'expo-location';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Carousel from 'react-native-snap-carousel';
var _ = require('lodash'); 

import { TopSearchBar, Loading, CardEventItem, FilterSearch } from '@components'
import { find_events } from '@store/events/actionEvents';
import { navigate } from '../../providers/navigationService';
import { colors } from '@styles'
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const background = require("@assets/images/Search/party.png");
const tax = 0.2;

// create a component
const MapScreen = ({route}) => {

  const navigation = useNavigation()
  const mapRef = createRef()
  const dispatch = useDispatch()
  const [lng, setLng] = useState()
  const [lat, setLat] = useState()
  const [selectedEvent, setSelectedEvent] = useState()
  const [showEvent, setShowEvent] = useState(false)
  const [latitudeDelta, setLatitudeDelta] = useState(0.2)
  const [longitudeDelta, setLongitudeDelta] = useState(0.2)
  const [eventsType, setEventsType] = useState(null)
  const [ manualValidation, setManualValidation ] = useState(null)
  const [ showModal, setShowModal ] = useState(false)
  const [isInit, setIsInit] = useState(true)
  const { data, isLoading } = useSelector(state => state.events.find_events)
  const { city } = useSelector(state => state.address)
  const [adress, _setAdress] = useState()
  const adressRef = useRef()
  const [ listEvents, setListEvents ] = useState([])
  const time = moment(new Date()).format("MM/DD/yyyy")
  const [filters, setFilters] = useState({
    poseSelect: true,
    bringueSelect: true,
    distance: 20
  })

  const loadEvents = (latitude, longitude) => {
    const data = {
      latitude,
      longitude,
      time,
      range: filters.distance
    }
    dispatch(find_events(data))
  }

  const setAdress = (city) => {
    adressRef.current = city
    _setAdress(city)
  }

  const setPosition = (details) => {
      const { lat, lng } = details.geometry.location
      setLat(lat)
      setLng(lng)
      loadEvents(lat, lng)
  }

  const refreshEvents = () => {
    loadEvents(lat, lng)
  }

  const handleFilter = () => {
    const events = _.filter(data,eventsType != null && manualValidation != null?
      {type: eventsType, manualValidation: manualValidation}:
      eventsType != null?{type: eventsType}:
      manualValidation != null?{manualValidation: manualValidation}:null)
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

  const handleShowEvent = (item) => {
    setSelectedEvent(item)
    setShowEvent(true)
  }

  const init = async() => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log("Permission to access location was denied")
      return;
    }
    adressRef.current = city
    if(adressRef.current){
      let location = await Location.geocodeAsync(adressRef.current, {})
      setLat(location[0].latitude)
      setLng(location[0].longitude)
      loadEvents(location[0].latitude, location[0].longitude)
    }
    else{
      let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High});
      const { latitude, longitude } = location.coords
      setLat(latitude)
      setLng(longitude)
      loadEvents(latitude, longitude)
    }
    setIsInit(false)
  }

  const onFocus = () => {
    setAdress(city)
    console.log('city', adressRef.current)
    // init()
  }

  console.log('location', city)

  useEffect(() => {
    // if(city){
    //   let location = await Location.geocodeAsync(city, {})
    //   // setLat(location[0].latitude)
    //   // setLng(location[0].longitude)
    //   loadEvents(location[0].latitude, location[0].longitude)
    //   // setIsInit(false)
    // }
    // init()
    setAdress(city)
    // console.log('city', adressRef.current)
    navigation.addListener('focus', onFocus);
    // if(isInit){
    //   init()
    // }
    setListEvents(data)
    return () => {
      navigation.removeListener('focus', onFocus)
    };
  }, [lat, lng, navigation, adress])

  return (
    <View style={styles.container}>
        <Image source={background} style={styles.backgroundImg} />
        <View style = {styles.searchBar}>
          {isLoading && <Loading />}
          <TopSearchBar 
            setDetails = {setPosition}
            showbtn = {false}
            toggleModal = {toggleModal}
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
          <View style = {styles.btn_group}>
            <TouchableOpacity 
              onPress = {() => navigate("CreateEvent")} 
              style = {styles.btn_add}
            >
              <Ionicons 
                name = "md-add"
                color = {colors.WHITE}
                size = {30}
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style = {styles.btn_refresh}
              onPress = {refreshEvents}
            >
              <Ionicons 
                name = "sync-outline"
                color = "#777"
                size = {20}
              />
              <Text style = {styles.text_btn_refresh}>Rechecher dans cette zone</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.mapContainer}>
          {
            lat && lng?
            <MapView
              ref = {mapRef}
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              showsUserLocation={true}
              followsUserLocation={true}
              showsMyLocationButton={false}
              toolbarEnabled={false}
              onPress = {() => setShowEvent(false)}
              maxZoomLevel={14}
              region = {{
                latitude: parseFloat(lat),
                longitude: parseFloat(lng),
                latitudeDelta,
                longitudeDelta
              }}
              onRegionChangeComplete = {(region) => {
                setLat(region.latitude)
                setLng(region.longitude)
                setLatitudeDelta(region.latitudeDelta)
                setLongitudeDelta(region.longitudeDelta)
              }}
            >
              {(listEvents) ? listEvents.map((event, key) => {
                return (
                  <Marker 
                    key={key} 
                    onPress={() => navigate("Event",{event})}
                    coordinate={{ 
                      latitude: parseFloat(event.latitude.$numberDecimal),
                      longitude: parseFloat(event.longitude.$numberDecimal) 
                    }} 
                    pinColor={event.type == "BRINGUE"?"#6C2BA1":"#FE1F14"} 
                  />
                );
              }) : <View></View>}
            </MapView>: <View></View>
          }
          <View style = {styles.footer}>
            <Carousel
              data={listEvents}
              loop
              renderItem={({item}) => <CardEventItem item = {item} />}
              sliderWidth={Dimensions.get('window').width}
              itemWidth={Dimensions.get('window').width - 70}
            />
          </View>
        </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  backgroundImg: {
    width: '100%',
    top: 0,
    position: 'absolute',
  },
  mapContainer: {
    position: 'absolute',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    overflow: 'hidden',
    width: '100%',
    height: '90%',
    bottom: 0,
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  searchBar: {
    // flex: 1,
    width: '100%',
    top: 100,
    zIndex: 2,
    paddingHorizontal: 20,
  },
  btn_group: {
    flexDirection: 'row',
    zIndex: 2,
    alignItems: 'center',
  },
  btn_add: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },
  btn_refresh: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 20,
    marginLeft: 10,
    alignSelf: 'flex-start',
    backgroundColor: colors.WHITE
  },
  text_btn_refresh: {
    color: '#777',
    marginLeft: 10
  },
  footer: {
    width: '100%',
    height: 120,
    position: 'absolute',
    bottom: 10,
    elevation: 5
  }
});

//make this component available to the app
export default MapScreen;
