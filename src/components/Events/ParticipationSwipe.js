import React, {useState} from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image, Linking } from 'react-native';
import { Loading } from '@components'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { navigate } from '../../providers/navigationService.js';
import ConfirmCancelEvent from '../ConfirmCancelEvent/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { cancel_participation } from '../../store/events/actionEvents.js';
import BubbleCreate from './BubbleCreate.js';

// import BubbleCreate from '../Events/BubbleCreate.js';
// import Alert from '../../components/Alert.js';
// import Prompt from '../../components/Prompt.js';

const global_day = [ "Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam" ];
const global_months = [ "Jan" , "Fev", "Mars", "Avril", "May", "Juin",
  "Juil", "Aout", "Sept", "Oct", "Nov", "Dec" ];

const ParticipationSwipe = ({item}) => {

    const dispatch = useDispatch()
    const [showSecondModal, setShowSecondModal] = useState(false)

    const cancelModal = () => {
      setShowSecondModal(!showSecondModal)
    }

    const handleCancelParticipation = () => {
      console.log("item", {eventid: item._id})
      cancelModal()
      dispatch(cancel_participation({eventid: item._id}))
    }

    var today = new Date(item.start);
    var dd = String(today.getDate()).padStart(2, '0');
    var dd2 = today.getDay();
    var mm = String(today.getMonth()).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigate("Event", {event: item})}>
          <Image source={{uri: item.pictures[0]}} style={styles.proIcon}/>
        </TouchableOpacity>
        <View style={styles.row}>
          <Text style={styles.header}>{item.title}</Text>
        </View>
        <View style={styles.row}>
          <FontAwesomeIcon size={20} color={'#6C2BA1'} icon={ faCalendar }/>
          <Text style={styles.para}>{global_day[dd2]} {dd} {global_months[parseInt(mm)]} {yyyy}</Text>
        </View>
        <TouchableOpacity style={styles.btnContainer} onPress={cancelModal}>
            <Text style={styles.btnButtonText}>Annuler</Text>
        </TouchableOpacity>
        <ConfirmCancelEvent
          isVisible = {showSecondModal}
          toggle = {cancelModal}
          message = 'Êtes-vous sûr de vouloir annuler votre demande de participation ?'
          onSumit = {handleCancelParticipation}
        />
        <BubbleCreate participants = {item.usersThatPaid} />
        {/* <Alert message={this.state.message} open={this.state.showModal} />
        <Prompt message={this.state.message} open={this.state.showSecondModal} run={() => this.cancel()}/> */}
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
   
    fontStyle: 'normal',
    fontWeight: "200",
    fontSize: 25,
    color: '#4f4f4f',
  },
  para: {
   
    fontStyle: 'normal',
    fontWeight: "200",
    fontSize: 15,
    marginLeft: 15,
    marginTop: 10,
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
   
    fontStyle: 'italic',
    fontWeight: "700",
    color: "#fff",
    fontSize: 16,
  },
});

export default ParticipationSwipe

