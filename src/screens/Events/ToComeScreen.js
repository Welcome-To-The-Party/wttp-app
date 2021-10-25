//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import EmptyEvent from '../../components/Events/EmptyEvent';
import PartySelect from '../../components/Events/PartySelect';
import { navigate } from '../../providers/navigationService';

// create a component
const ToComeScreen = ({data}) => {

  return (
    <View style={styles.container}>
      <FlatList
        data = {data}
        keyExtractor = {(item) => String(item.title)}
        renderItem = {({item}) => <PartySelect item = {item} onPress = {() => navigate("EventHandler")} />}
        ListEmptyComponent = {EmptyEvent}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  },
});

//make this component available to the app
export default ToComeScreen;
