//import liraries
import React, { useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import Carousel from 'react-native-snap-carousel';

import { styles } from './style'
import { FavSwipe, ErrorCard } from '@components'
import { getUser } from '@store/user/actionUser'
import { navigate } from '../../providers/navigationService';
import { Loading } from '../../components';
import { useNavigation } from '@react-navigation/core';

const confirmed_screen = require('@assets/images/Errors/FavScreen.png');

// create a component
const FavoriteScreen = () => {

  const navigation = useNavigation()
  const dispatch = useDispatch()
  const favorites = useSelector(state => state.user.user.data.favorites)
  const isLoading = useSelector(state => state.user.user.isLoading)

  useEffect(()=> {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getUser())
    });
    return unsubscribe;
  }, [navigation])

  return (
    <View style={styles.container}>
      <Text style = {styles.title}>Mes Favoris</Text>
        {
          isLoading && 
          <View style = {styles.loading}>
            <Loading />
          </View>
        }
      
        {
          favorites.length > 0?
          <Carousel
            data={favorites}
            loop
            renderItem={({item}) => <FavSwipe item={item} openEvent = {() => navigate("Event", {event: item})} />}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Dimensions.get('window').width - 80}
          />
          :
          <View style = {styles.content_empty_result}>
            <ErrorCard 
              img={confirmed_screen} 
              text={"Aucun événement favoris"} 
              navigateHome={() => navigate("Search")}  
              imgBtn={() => navigate("Map")} 
            />
          </View>
        }
    </View>
  );
};

//make this component available to the app
export default FavoriteScreen;
