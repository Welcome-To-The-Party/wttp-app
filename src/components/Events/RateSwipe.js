import React, { useState } from 'react';
import { Modal,TouchableOpacity, StyleSheet, Text, View, Image, Linking } from 'react-native';
import { Rating } from 'react-native-ratings';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendar, faStar, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import BubbleCreate from '../Events/BubbleCreate.js';
import { useDispatch, useSelector } from 'react-redux';
import { rating_user } from '../../store/user/actionUser.js';
// import TextButtonCE from '../buttons/TextButtonCE.js';
// import TextButtonLight from '../User/TextButtonLight.js';

const global_day = [ "Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam" ];
const global_months = [ "Jan" , "Fev", "Mars", "Avril", "May", "Juin",
  "Juil", "Aout", "Sept", "Oct", "Nov", "Dec" ];

const TextButtonDark = ({text, event}) => {

  const dispatch = useDispatch()
  const [modal, setModal] = useState(false)
  const user = useSelector(state => state.user.user.data)

  const handleRating = (rate) => {
    console.log("rate", event._id)
    dispatch(rating_user({
      email: user.email,
      eventid: event._id,
      rate
    }))
  }

  return (
    <View style={styles.btnContainer}>
      <Modal animationType="fade" transparent={true} visible={modal}
        onRequestClose={() => setModal(!modal)}>
        <View style={styles.centerMe}>
          <View style={styles.popup}>
            <View style={styles.topHeader}>
              <Text style={styles.modalHeader}>NOTEZ!</Text>
              <TouchableOpacity  style={styles.closeIcon} onPress={() => setModal(!modal)}>
                <FontAwesomeIcon size={20} color={'#fff'} icon={ faTimesCircle }/>
              </TouchableOpacity>
            </View>
            <View style={styles.modalContent}>
              <View style={styles.row}>
                <Rating
                  ratingCount={5}
                  imageSize={40}
                  onStartRating = {handleRating}
                  startingValue = {0}
                  showRating
                  style = {{margin: 5}}
                />
              </View>
              </View>
            </View>
          </View>
      </Modal>
      <TouchableOpacity style={styles.btnOpacity} onPress={() => setModal(!modal)}>
        <Text style={styles.btnButtonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const RateSwipe = ({item}) => {
  var today = new Date(item?.start);
  var dd = String(today.getDate()).padStart(2, '0');
  var dd2 = today.getDay();
  var mm = String(today.getMonth()).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => this.props.openEvent(this.props.eid)}>
        <Image source={{uri: item?.pictures[0]}} style={styles.proIcon}/>
      </TouchableOpacity>
      <View style={styles.row}>
        <Text style={styles.header}>{item?.title}</Text>
      </View>
      <View style={styles.row}>
        <FontAwesomeIcon size={20} color={'#6C2BA1'} icon={ faCalendar }/>
        <Text style={styles.para}>{global_day[dd2]} {dd} {global_months[parseInt(mm)]} {yyyy}</Text>
      </View>
      <TextButtonDark text={"ÉVALUER"} event = {item} />
      <View style={styles.row}>
        <BubbleCreate participants = {item?.usersThatPaid} />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 10
  },
  proIcon: {
    width: '100%',
    height: 250,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 15
  },
  header: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "200",
    fontSize: 25,
    color: '#4f4f4f',
  },
  para: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "200",
    fontSize: 15,
    marginLeft: 15,
    color: '#4f4f4f',
  },
  bubble: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 5,
    paddingLeft: 5,
    borderWidth: 1,
    borderRadius: 50,
    marginRight: 10,
    borderColor: '#6C2BA1'
  },
  icon_social: {
    width: 50,
    height: 50,
  },
  bubbleText: {
    color: '#6C2BA1'
  },
  btnContainer: {
    width: '90%',
    height: 50,
    backgroundColor: '#361979',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginRight: 15,
    marginLeft: 15,
    borderRadius: 10,
  },
  btnOpacity: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnButtonText: {
    fontFamily: 'Roboto',
    fontStyle: 'italic',
    fontWeight: "700",
    color: "#fff",
    fontSize: 20,
  },
  centerMe: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#0000003e'
  },
  modalData: {
    width: '100%',
    height: '100%',
  },
  modalDataCont: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalIcons: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 10,
  },
  popup: {
    backgroundColor: '#fff',
    width: '75%',
    height: '50%',
    borderRadius: 20,
  },
  topHeader: {
    backgroundColor: '#361979',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: '20%',
    width: '100%',
  },
  modalHeader: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "200",
    fontSize: 15,
    color: '#fff',
  },
  modalContent: {
    marginTop: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default RateSwipe

