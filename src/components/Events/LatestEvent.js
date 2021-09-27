import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, Image, RefreshControl, StyleSheet, View, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { get_events } from '../../store/events/actionEvents';
import { navigate } from '../../providers/navigationService';
import { mixins } from '@styles'

// create a component
const LatestEvent = ({item}) => {

  const dispatch = useDispatch();
  const [eventid, setEventid] = useState(item.eventid)
  const eventData = useSelector(state => state.events.event.data)
  const userData = useSelector(state => state.events.owner_event.data)

  useEffect(() => {
    dispatch(get_events(eventid))
  }, [eventid])

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress = {() => navigate("Event",{eventid} )}>
          <Image source={{ uri: eventData[item.eventid]?.pictures[0] }} style={styles.img} />
        </TouchableOpacity>
        <View style={styles.row}>
          <TouchableOpacity >
            <Text style={styles.header}>{eventData[item.eventid]?.title}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <Text style={styles.para}>Par: </Text>
          <TouchableOpacity >
            <View style={styles.rowIcon}>
              <Image source={{ uri: userData[item.eventid]?.picture }} style={styles.icon} />
              <Text style={styles.userText}>{userData[item.eventid]?.name}</Text>
            </View>
          </TouchableOpacity>
        </View>
    </View>
  );
};

//make this component available to the app
export default LatestEvent;


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    marginTop: 10,
    marginRight: 10,
    paddingBottom: 15,
    borderRadius: 20,
    marginVertical: 5,
    ...mixins.boxShadow('#777')
  },
  img: {
    width: '100%',
    height: 150,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20
  },
  para: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "bold",
    fontSize: 14,
    color: '#000',
  },
  header: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "200",
    fontSize: 25,
    color: '#000',
  },
  date: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "200",
    fontSize: 14,
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 5,
    paddingTop: 5,
    paddingBottom: 5
  },
  rowIcon: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#6C2BA1',
    borderRadius: 20,
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 3,
    paddingLeft: 3,
  },
  rowIconFill: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#6C2BA1',
    backgroundColor: '#6C2BA1',
    marginRight: 10,
    borderRadius: 20,
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 3,
    paddingLeft: 3,
  },
  styleText: {
    color: '#fff',
    fontSize: 10,
    marginLeft: 5,
    marginRight: 5
  },
  smokeText: {
    color: '#6C2BA1',
    fontSize: 10,
    marginLeft: 5,
    marginRight: 5
  },
  userText: {
    color: '#6C2BA1',
    marginLeft: 10,
    marginRight: 10
  },
  icon: {
    width: 20,
    height: 20,
    borderRadius: 100,
  }
});
