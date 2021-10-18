//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MapView, {Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import moment from 'moment'
import * as Location from 'expo-location';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Carousel from 'react-native-snap-carousel';

import { TopSearchBar, Loading, CardEventItem } from '@components'
import { find_events } from '@store/events/actionEvents';
import { navigate } from '../../providers/navigationService';
import { colors } from '@styles'

const background = require("@assets/images/Search/party.png");

// create a component
const MapScreen = () => {

  const dispatch = useDispatch()
  const [lng, setLng] = useState()
  const [lat, setLat] = useState()
  const [isInit, setIsInit] = useState(true)
  const { data, isLoading } = useSelector(state => state.events.find_events)
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

  const setPosition = (details) => {
      const { lat, lng } = details.geometry.location
      setLat(lat)
      setLng(lng)
      loadEvents(lat, lng)
  }

  const refreshEvents = async () => {
    let location = await Location.getLastKnownPositionAsync({});
    const { latitude, longitude } = location.coords
    setLat(latitude)
    setLng(longitude)
    loadEvents(latitude, longitude)
  }

  useEffect(() => {
    if(isInit){
      (() => {
        refreshEvents()
        setIsInit(false)
      })()
    }
  }, [lat, lng])

  return (
    <View style={styles.container}>
        <Image source={background} style={styles.backgroundImg} />
        <View style = {styles.searchBar}>
          {isLoading && <Loading />}
          <TopSearchBar 
            setDetails = {setPosition}
            showbtn = {false}
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
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            followsUserLocation={true}
            showsMyLocationButton={false}
            toolbarEnabled={false}
            maxZoomLevel={14}
            region={{
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.2,
              longitudeDelta: 0.2
            }}
            onRegionChange={(region) => {
              setLat(region.latitude)
              setLng(region.longitude)
            }}
          >
            {(data) ? data.map((event, key) => {
              return (
                <Marker 
                  key={key} 
                  // onPress={() => {this.openEvent(event)}}
                  coordinate={{ 
                    latitude: Number.parseFloat(event.latitude.$numberDecimal),
                    longitude: Number.parseFloat(event.longitude.$numberDecimal) 
                  }} 
                  pinColor={event.type == "BRINGUE"?"#6C2BA1":"#FE1F14"} 
                />
              );
            }) : <View></View>}
          </MapView>
          <View style = {styles.footer}>
            <Carousel
              data={data}
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
    bottom: 10
  }
});

//make this component available to the app
export default MapScreen;
