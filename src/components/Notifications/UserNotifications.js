import * as React from 'react';
import { StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { accept_participation, refuse_participation } from '../../store/events/actionEvents';


const UserNotifications = ({data}) => {
  console.log("event notif", data.from)
  const dispatch = useDispatch()

  const handleAcceptPacticipation = () => {
    dispatch(accept_participation({
      eventid: data.event._id,
      email: data.from
    }))
  }
  
  const handleRefuseParticipation = () => {
    dispatch(refuse_participation({
      eventid: data.event._id,
      email: data.from
    }))
  }

  return (
    <View style={styles.container}>
      <Image style={styles.icon} source={{uri: data.event.owner.picture}} />
      <View style={styles.column}>
        <Text style={styles.para}>Vous avez reçus une demande de participation pour l’événement {data.event.title}</Text>
        <View style={styles.row}>
          <TouchableOpacity 
            style={styles.acceptBtn} 
            onPress={handleAcceptPacticipation}
          >
            <Text style={{color: "#fff"}}>ACCEPTER</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.refuseBtn} 
            onPress={handleRefuseParticipation}
          >
            <Text style={{color: '#6C2BA1'}}>REFUSER</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 120,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginBottom: 10,
  },
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: 5,
    marginRight: 5,
    marginLeft: 5,
  },
  para: {
   
    fontStyle: 'normal',
    fontSize: 13,
    color: '#4f4f4f',
    paddingRight: 110,
    marginTop: 10,
    marginBottom: 10,
  },
  acceptBtn: {
    paddingTop: 5,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 5,
    marginRight: 5,
    backgroundColor: '#6C2BA1',
    borderRadius: 50,
  },
  refuseBtn: {
    paddingTop: 5,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 5,
    marginLeft: 10,
    borderRadius: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#6C2BA1',

  }
});

export default UserNotifications;
