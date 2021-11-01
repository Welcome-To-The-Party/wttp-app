import React from 'react';
import { TouchableOpacity, Text, ScrollView, StyleSheet, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFilter, faSearch } from '@fortawesome/free-solid-svg-icons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'

import { mixins, colors } from '@styles'
import { navigate } from '../../providers/navigationService';

const inputGoogle = {
  container: {
    flex: 0,
    backgroundColor: '#F8F8F8',
    borderRadius: 50,
    ...mixins.boxShadow("#000")
  },
  textInputContainer: {
    paddingRight: 8,
    paddingLeft: 8,
    backgroundColor: '#F8F8F8',
    width: '100%',
    borderRadius: 50,
  },
  textInput: {
    backgroundColor: '#F8F8F8',
  },
}

// create a component
const TopSerachBar = ({setDetails, showbtn, toggleModal}) => {
  return (
    <View style={styles.container}>
      <View style = {{flex:1 }}>
        <GooglePlacesAutocomplete
          placeholder='EX PARIS 18IÈME'
          onPress={(data, details = null) => setDetails(details)}
          query={{
            key: 'AIzaSyAZTZx2-gwcOimkU1UoSlLr5rxfLpI7EAE',
            language: 'en',
          }}
          fetchDetails={true}
          styles={inputGoogle}
          currentLocation={false}
          currentLocationLabel={'Position Actuelle'}
          renderLeftButton = {() => {
            return (
              <View style={styles.searchIcon}>
                <FontAwesomeIcon 
                  size={22} 
                  color={'#6C2BA1'} 
                  icon={ faSearch } 
                />
              </View>
            );
          }}
          renderRightButton={() => {
            return (
              <View style={styles.searchIcon}>
                <Ionicons 
                  size={22}
                  name = "md-options"
                  onPress = {toggleModal}
                  style = {styles.iconOption}
                />
              </View>
            );
          }}
        />
      </View>
      {
        showbtn == undefined?
        <TouchableOpacity onPress = {() => navigate("CreateEvent")} style = {styles.btn_add}>
          <Ionicons 
            name = "md-add"
            color = {colors.WHITE}
            size = {30}
          />
        </TouchableOpacity>:null
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20
  },
  searchIcon: {
    borderRadius: 50,
    backgroundColor: '#f8f8f8',
    width: 45,
    height:45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBtnSel: {
    backgroundColor: '#6C2BA1',
    borderRadius: 50,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    marginLeft: 10,
    marginTop: 10,
  },
  filterTextSel: {
    color: '#fff',
  },
  filterBtn: {
    borderColor: '#6C2BA1',
    marginTop: 10,
    marginLeft: 10,
    borderWidth: 1,
    borderRadius: 50,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
  },
  filterText: {
    color: '#6C2BA1',
  },
  btn_add: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },
  iconOption: {
    borderLeftColor: '#777',
    borderLeftWidth: 1,
    paddingLeft: 10
  }
});

//make this component available to the app
export default TopSerachBar;
