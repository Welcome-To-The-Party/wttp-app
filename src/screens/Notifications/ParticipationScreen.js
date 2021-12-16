//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBellSlash } from '@fortawesome/free-solid-svg-icons'

import { get_general_notifications } from '@store/notification/actionNotification';
import { Loading, UserNotifications } from '@components'
import { styles } from './style'
import { AlertSucces } from '../../components';
import { ACCEPT_PARTICIPATION } from '../../store/events/type';

// create a component
const ParticipationScreen = () => {

  const dispatch = useDispatch();
  const [ refreshing, setRefreshing ] = useState(true)
  const {isLoading, list} = useSelector(state => state.notification.general)
  const { message } = useSelector(state => state.events.accpet_participation)

  console.log('notification', list)

  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      <AlertSucces 
        message = {message}
        isVisible = {message?true: false}
        onClose = {() => {
          dispatch({
            type: `${ACCEPT_PARTICIPATION}_SUCCESS`,
            payload: ''
          })
        }}
      />
      {
        list?.participations?.length == 0?
        <View style={styles.containerCenter}>
          <FontAwesomeIcon size={30} style={styles.icons} icon={ faBellSlash}/>
          <Text>Pas de notification</Text>
        </View>
        :
        <FlatList
          data = {list?.participations}
          keyExtractor = {(item) => String(item?._id)}
          renderItem = {({item}) => <UserNotifications data = {item} />}
        />
      }
    </View>
  );
};

//make this component available to the app
export default ParticipationScreen;
