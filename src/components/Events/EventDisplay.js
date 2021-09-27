import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, Image, RefreshControl, StyleSheet, View, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { get_events } from '@store/events/actionEvents';
import { mixins } from '@styles'
import { navigate } from '../../providers/navigationService';

// create a component
const EventDisplay = ({item}) => {

  const dispatch = useDispatch();
  const [eventid, setEventid] = useState(item.eventid)
  const eventData = useSelector(state => state.events.event.data)
  const userData = useSelector(state => state.events.owner_event.data)
  var startDate = new Date(eventData[item.eventid]?.start);

  useEffect(() => {
    dispatch(get_events(eventid))
  }, [eventid])

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress = {() => navigate("Event",{eventid} )}>
        <Image source={{ uri: eventData[item.eventid]?.pictures[0] }} style={styles.img} />
      </TouchableOpacity>
      <View style={styles.row}>
        <View style={styles.rowIconFill}>
          <Text style={styles.styleText}>{eventData[item.eventid]?.placeType}</Text>
        </View>
        <View style={styles.rowIconFill}>
          <Text style={styles.styleText}>{eventData[item.eventid]?.type}</Text>
        </View>
        <View style={styles.rowIcon}>
          <Text style={styles.smokeText}>{eventData[item.eventid]?.smoke? "FUMEUR" : "NON-FUMEUR"}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.para}>Par: </Text>
        <TouchableOpacity>
          <View style={styles.rowIcon}>
            <Image source={{ uri: userData[item.eventid]?.picture }} style={styles.icon} />
            <Text style={styles.userText}>{userData[item.eventid]?.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Text style={styles.para}>Le: </Text>
        <Text>{startDate?.getDate()}/{startDate?.getMonth() + 1}/{startDate?.getFullYear()}</Text>
      </View>
    </View>
  );
};

//make this component available to the app
export default EventDisplay;


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: 230,
    height: 300,
    flexDirection: "column",
    backgroundColor: '#f9f9f9',
    marginTop: 10,
    marginRight: 10,
    marginVertical: 5,
    // paddingBottom: 15,
    borderRadius: 20,
    ...mixins.boxShadow('#777')
  },
  img: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  para: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "bold",
    fontSize: 14,
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
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginVertical: 10,
  },
  rowIcon: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#6C2BA1',
    borderRadius: 20,
    padding: 3,
    marginVertical: 5,
  },
  rowIconFill: {
    flexDirection: 'row',
    alignItems: 'center',
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
