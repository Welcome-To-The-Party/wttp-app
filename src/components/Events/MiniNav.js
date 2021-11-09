//import liraries
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import MapView, {Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { colors } from '@styles'
import moment from 'moment';
import BubbleCreate from './BubbleCreate';

// create a component
const MiniNav = ({data}) => {

  const [ selectedIndex, setSelectedIndex ] = useState(0)
  const startDate = new Date(data?.start)
  const endDate = new Date(data?.end)

  console.log("data mini", data)

  const handleSwiper = (event) => {
    setSelectedIndex(event.nativeEvent.selectedSegmentIndex)
  }

  return (
    <View style={styles.container}>
      <SegmentedControl
        values={['Description', 'Spécificati...', 'Participants', 'Map']}
        selectedIndex={selectedIndex}
        tintColor = {colors.PRIMARY}
        style = {styles.tabStyle}
        fontStyle = {styles.fontStyle}
        activeFontStyle = {styles.activeFontStyle}
        onChange={handleSwiper}
      />
      <View
        style = {{flex: 1}}
      >
          {
            selectedIndex == 0?
            <ScrollView nestedscrollenabled={true} style={styles.slide}>
              <Text style={styles.text}>{data?.description}</Text>
            </ScrollView>
            :selectedIndex == 1?
            <ScrollView style={styles.slide}>
                <View style={styles.row}>
                  <Text style={styles.paraBold}>Date de l’événement:</Text>
                  <Text style={styles.para}>{moment(data?.start).format("DD/MM/YYYY")}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.paraBold}>Horaire de l’événement:</Text>
                  <Text style={styles.para}>{moment.utc(data?.start).format("HH:mm")} - {moment.utc(data?.end).format("HH:mm")}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.paraBold}>Type de musique:</Text>
                  <Text style={styles.para}>{data?.musicType}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.paraBold}>Type de soirée:</Text>
                  <Text style={styles.para}>{data?.type}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.paraBold}>Type de lieu:</Text>
                  <Text style={styles.para}>{data?.placeType}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.paraBold}>Mode d’acceptation:</Text>
                  <Text style={styles.para}>{data?.manualValidation?"Manuelle":"Automatique"}</Text>
                </View>
            </ScrollView>
            :selectedIndex == 2?
            <ScrollView style={styles.slide}>
              <BubbleCreate participants = {data.usersThatPaid} />
            </ScrollView>
            :
            <ScrollView style={styles.slide}>
              <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                followsUserLocation={true}
                showsMyLocationButton={false}
                toolbarEnabled={false}
                maxZoomLevel={14}
                region={{
                  latitude: parseFloat(data?.latitude['$numberDecimal']),
                  longitude: parseFloat(data?.longitude['$numberDecimal']),
                  latitudeDelta: 0.2,
                  longitudeDelta: 0.2
                }}
              >
                <Marker
                    // onPress={() => {this.openEvent(event)}}
                    coordinate={{ 
                      latitude: parseFloat(data.latitude['$numberDecimal']),
                      longitude: parseFloat(data.longitude['$numberDecimal']) 
                    }} 
                    pinColor={data.type == "BRINGUE"?"#6C2BA1":"#FE1F14"} 
                />
              </MapView>
            </ScrollView>
          }
        </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabStyle: {
    height: 40,
    marginTop: 10
  },
  fontStyle: {
    color: '#444'
  },
  activeFontStyle: {
    color: '#fff'
  },
  slide: {
    padding: 20,
  },
  text: {
    fontSize: 16,
  },
  paraBold: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  para: {
    marginLeft: 10,
    color: '#4f4f4f',
    fontSize: 16,
    textTransform: 'capitalize'
  },
  row: {
    flexDirection: 'row',
  },
  map: {
    height: 120,
    width: '100%'
  }
});

//make this component available to the app
export default MiniNav;
