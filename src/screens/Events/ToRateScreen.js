//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import RateSwipe from '../../components/Events/RateSwipe';

// create a component
const ToRateScreen = ({data}) => {
  return (
    <View style={styles.container}>
      {
        data?.length ==0?
        <View style = {styles.content}>
          <Text style = {styles.infos}>Aucun évènement en attente </Text>
        </View>:
        <Carousel
          data={data}
          loop
          renderItem={({item}) => <RateSwipe item={item} />}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width - 120}
        />
      }
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infos: {
    fontSize: 18,
    color: '#777'
  }
});

//make this component available to the app
export default ToRateScreen;
