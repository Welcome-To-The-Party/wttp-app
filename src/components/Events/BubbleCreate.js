import React from 'react';
import { Image, Text, ScrollView, TouchableOpacity, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal'


import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { navigate } from '../../providers/navigationService';

export default class BubbleCreate extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      pic: [],
      modal: false,
    };
  }

  

  componentDidMount() {
    
  }

  
  render() {
    const {participants} = this.props
    if (participants.length < 1) {
      return (
        <Text style = {styles.empty_user}>Il n'y a pas de participants</Text>
      );
    }
    return (
      <View >
        <Modal
          backdropOpacity = {0.1}
          style = {styles.contentModal}
          isVisible={this.state.modal}
          onBackButtonPress={() => this.setState({modal: !this.state.modal})}>
            <View style={styles.popup}>
              <View style={styles.topHeader}>
                <Text style={styles.modalHeader}>PARTICIPANTS ACTIFS</Text>
                <TouchableOpacity  style={styles.closeIcon} onPress={() => this.setState({modal: !this.state.modal})}>
                  <FontAwesomeIcon size={30} color={'#fff'} icon={ faTimesCircle }/>
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.modalData} contentContainerStyle={styles.modalDataCont}>
                {participants.map((data, key) => {
                  return (
                    <TouchableOpacity onPress = {() => navigate('User', {user: data})} style={styles.modalRow} key={key}>
                      <Image key={key} source={{uri: data.picture}} style={styles.modalIcons} />
                      <View>
                        <Text>{data.name}</Text>
                        {/* <Text>{data.joinedEvents.length} participations</Text> */}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
        </Modal>
        <TouchableOpacity
          onPress = {() => this.setState({modal: !this.state.modal})} 
          style = {styles.content_avatar}
        >
          {
            participants.length != 0 && participants.slice(0, 4).map((participate, index) => {
              return(
                <Image key = {index} source = {{uri: participate.picture}} style = {styles.avatar} />
              )
            })
          }
          {
            participants.length != 0 &&
            <View style = {styles.btn_show_participant}>
              <Text>{participants.length > 4?`+ ${participants.length - 2}autres`: participants.length} participant{participants.length>1?'s':''}</Text>
            </View>
          }
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
  },
  titleCon: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  title: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  header: {
    color: '#4f4f4f',
    fontSize: 16,
    marginRight: 10,
    fontWeight: 'bold',
  },
  partIcon: {
    width: 50,
    height: 50,
    borderRadius: 100,
    position: 'absolute',
    left: 0,
  },
  paraBold: {
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 10,
    marginBottom: 5,
    color: '#4f4f4f',
    fontSize: 16,
  },
  para: {
    marginTop: 5,
    marginLeft: 10,
    marginBottom: 5,
    color: '#4f4f4f',
    fontSize: 10,
  },
  popup: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%'
  },
  topHeader: {
    backgroundColor: '#361979',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: '100%',
  },
  modalHeader: {
   
    fontStyle: 'normal',
    fontWeight: "200",
    fontSize: 15,
    color: '#fff',
  },
  modalData: {
    padding: 20
  },
  modalDataCont: {
    justifyContent: 'center',
  },
  modalIcons: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 10,
  },
  modalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#f3f3f3',
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 10,
  },
  headerSel: {
    color: '#4f4f4f',
    fontSize: 16,
    marginRight: 10,
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderColor: '#6C2BA1',
  },
  closeIcon: {
    height: 30,
    width: 30,
    position: 'absolute', 
    top: 20,
    right: 10,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginLeft: -20
  },
  content_avatar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: 10
  },
  btn_show_participant: {
    marginLeft: 10
  },
  empty_user: {
    textAlign: 'center',
    marginTop: 20
  },
  contentModal: {
    margin: 0,
    justifyContent: 'flex-end'
  }
});
