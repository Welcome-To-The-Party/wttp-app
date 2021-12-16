//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBellSlash } from '@fortawesome/free-solid-svg-icons'

import { get_general_notifications } from '@store/notification/actionNotification';
import { Loading, GeneralNotifications } from '@components'
import { styles } from './style'
import { useNavigation } from '@react-navigation/core';


// create a component
const GeneralScreen = () => {

  const navigation = useNavigation()
  const dispatch = useDispatch();
  const [ refreshing, setRefreshing ] = useState(true)
  const {isLoading, list} = useSelector(state => state.notification.general)

  const loadNotification = () => {
    dispatch(get_general_notifications())
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadNotification()
    });
    return unsubscribe;
  }, [])

  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      {
        list?.generales?.length == 0?
        <View style={styles.containerCenter}>
          <FontAwesomeIcon size={30} style={styles.icons} icon={ faBellSlash}/>
          <Text>Pas de notification</Text>
        </View>
        :
        <FlatList
          data = {list?.generales}
          refreshControl={<RefreshControl
            refreshing={refreshing}
            onRefresh={loadNotification} />
          }
          keyExtractor = {(item) => String(item)}
          renderItem = {({item}) => <GeneralNotifications text = {item.message} />}
        />
      }
    </View>
  );
};

//make this component available to the app
export default GeneralScreen;
