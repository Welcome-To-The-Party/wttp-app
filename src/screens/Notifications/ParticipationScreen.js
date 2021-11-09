//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBellSlash } from '@fortawesome/free-solid-svg-icons'

import { get_notification_participation } from '@store/notification/actionNotification';
import { Loading, UserNotifications } from '@components'
import { styles } from './style'

// create a component
const ParticipationScreen = () => {

  const dispatch = useDispatch();
  const [ refreshing, setRefreshing ] = useState(true)
  const {isLoading, list} = useSelector(state => state.notification.participation)

  console.log("list participation", list)

  const loadNotification = () => {
    dispatch(get_notification_participation())
  }

  useEffect(() => {
    loadNotification()
  }, [])

  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      {
        list.length == 0?
        <View style={styles.containerCenter}>
          <FontAwesomeIcon size={30} style={styles.icons} icon={ faBellSlash}/>
          <Text>Pas de notification</Text>
        </View>
        :
        <FlatList
          data = {list}
          refreshControl={<RefreshControl
            refreshing={refreshing}
            onRefresh={loadNotification} />
          }
          keyExtractor = {(item) => String(item)}
          renderItem = {({item}) => <UserNotifications data = {item} />}
        />
      }
    </View>
  );
};

//make this component available to the app
export default ParticipationScreen;
