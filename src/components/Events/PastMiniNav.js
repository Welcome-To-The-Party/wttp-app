import React, { useState } from 'react';
import { Image, Text, ScrollView, Modal, TouchableOpacity, StyleSheet, View } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { colors } from '@styles'
import Button  from '../Buttons/Button'
import { navigate } from '../../providers/navigationService';
import UserEvaluation from './UserEvaluation';

const PastMiniNav = ({data}) => {

  const [ selectedIndex, setSelectedIndex ] = useState(0)
  const startDate = new Date(data?.start)
  const endDate = new Date(data?.end)

  const handleSwiper = (event) => {
    setSelectedIndex(event.nativeEvent.selectedSegmentIndex)
  }

  return (
    <View style={styles.container}>
      <SegmentedControl
        values={['Notes', 'Bénéfices', 'Évaluer']}
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
              <View style={styles.row}>
                  <Text style={styles.para}>Note obtenue: </Text>
                  <FontAwesomeIcon size={15} color='#6C2BA1' icon={ faStar }/>
                  <FontAwesomeIcon size={15} color='#6C2BA1' icon={ faStar }/>
                  <FontAwesomeIcon size={15} color='#6C2BA1' icon={ faStar }/>
                  <FontAwesomeIcon size={15} color='#6C2BA1' icon={ faStar }/>
                  <FontAwesomeIcon size={15} color='#6C2BA1' icon={ faStar }/>
              </View>
              <Text style={styles.para}>
                Votre soirée semble avoir connue un succès.
                Voulez-vous la reprogrammer ?
              </Text>
              <Button 
                text = "JE REMET ÇA!"
                textColor = {colors.WHITE}
                style = {styles.btn_add_event}
                onPress = {() => navigate("CreateEvent")}
              />
            </ScrollView>
            :selectedIndex == 1?
            <ScrollView style={styles.slide}>
                <View style={styles.row}>
                  <Text style={styles.paraBold}>Votre chiffre de vente net:</Text>
                  <Text style={styles.para}>{data?.price * data?.usersThatPaid?.length} EUR</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.paraBold}>Vous avez gagnés:</Text>
                  <Text style={styles.para}>{data?.price * data?.usersThatPaid?.length - (data?.price * data?.usersThatPaid?.length * 0.1)} EUR</Text>
                </View>
            </ScrollView>
            :
            <ScrollView style={styles.slide}>
              {
                data?.usersThatPaid?.map((item, index) => {
                  return (
                    <UserEvaluation eventid = {data._id} item = {item} key = {index} />
                  )
                })
              }
            </ScrollView>
          }
        </View>
    </View>
  );
};

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
    color: '#000'
  },
  para: {
    marginLeft: 10,
    color: '#4f4f4f',
    fontSize: 16,
    textTransform: 'capitalize'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  map: {
    height: 120,
    width: '100%'
  },
  btn_add_event: {
    backgroundColor: colors.PRIMARY
  }
});


export default PastMiniNav