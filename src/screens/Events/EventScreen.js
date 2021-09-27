//import liraries
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Share } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faShareAlt} from '@fortawesome/free-solid-svg-icons'

import { get_events } from '@store/events/actionEvents';
import { ImageSlider, Button, MiniNav } from '@components'
import { colors } from '@styles'
import AlertSucces from '../../components/AlertSucces';
import { add_favorite, participate_event } from '../../store/events/actionEvents';
import { PARTICIPE_EVENT } from '../../store/events/type';

const background = require("@assets/images/Search/party.png");
const tax = 0.2;

// create a component
const EventScreen = ({route}) => {

  const {eventid} = route.params
  const dispatch = useDispatch();
  const eventData = useSelector(state => state.events.event.data)
  const messageParticipate = useSelector(state => state.events.infos.message)

  console.log("eventData", eventData[eventid])

  const shareEvent = async () => {
    try {
      const result = await Share.share({
        message:
          "✌ je t'invite à participer à la soirée" + eventData[eventid].title + " sur #WTTP" + "\n\n" +
          "Télécharge l'application et voyons voir si tu sera à inviter ou à éviter." + "\n\n" + "https://welcome-ttp.com" ,
      });
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    dispatch(get_events(eventid))
  }, [])

  const onCloseModal = () => {
    dispatch({type: `${PARTICIPE_EVENT}_FAIL`, payload: ""})
  }

  return (
    <View style={styles.container}>
        <AlertSucces 
          message={messageParticipate} 
          isVisible={messageParticipate != ''? true: false}
          onClose = {onCloseModal}
        />
        <Image source={background} style={styles.backgroundImg} />
        <View style={styles.mapContainer}>
          <View>
            <View style={styles.row}>
              <View style={[styles.row, {flex: 1}]} >
                <Text style={styles.header}>
                  {Number(
                    Number(eventData[eventid]?.price) +
                      Number(Number(eventData[eventid]?.price) * tax)
                  ).toFixed(2)}
                  EUR
                </Text>
                <Text style={styles.para}>/place</Text>
              </View>
              <TouchableOpacity onPress = {() => dispatch(add_favorite({eventid}))} >
                <FontAwesomeIcon 
                  size={20} 
                  color={'#6C2BA1'} 
                  icon={ faHeart } 
                  style={styles.titleIcon} 
                />
              </TouchableOpacity>
              <TouchableOpacity onPress = {shareEvent}>
                <FontAwesomeIcon 
                  size={20} 
                  color={'#6C2BA1'} 
                  icon={ faShareAlt } 
                  style={styles.titleIcon}
                />
              </TouchableOpacity>
            </View>
            <Button
              text={"RÉSERVER"}
              textColor = {colors.WHITE}
              style = {styles.btn}
              onPress={() => dispatch(participate_event({eventid}))}
            />
          </View>
          <View style={styles.padding}>
            <Text style={styles.title_event}>{eventData[eventid]?.title}</Text>
          </View>
          <ImageSlider data={eventData[eventid]?.pictures} />
          {/* <MiniNav data={eventData[eventid]} token={this.props.token} /> */}
        </View>
      </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  mapContainer: {
    position: "absolute",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    overflow: "hidden",
    backgroundColor: "#fff",
    width: "100%",
    height: "85%",
    bottom: 0,
    paddingLeft: 20,
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backgroundImg: {
    width: "100%",
    top: 0,
    position: "absolute",
  },
  row: {
    flexDirection: "row",
    alignItems: 'center',
    marginLeft: 5,
  },
  header: {
    color: '#4f4f4f',
    fontSize: 20,
    fontWeight: 'bold',
  },
  para: {
    color: '#4f4f4f',
    fontSize: 20,
    fontWeight: '200',
  },
  title: {
    // width: "65%",
  },
  titleIcon: {
    marginHorizontal: 10,
  },
  padding: {
    marginTop: 10,
  },
  btn: {
    backgroundColor: colors.PRIMARY,
    width: 150,
    borderRadius: 10
  },
  title_event: {
    marginVertical: 20,
    color: '#4f4f4f',
    fontSize: 20,
    fontWeight: '200',
  }
});

//make this component available to the app
export default EventScreen;
