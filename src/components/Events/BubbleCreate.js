import React from 'react';
import { Image, Text, ScrollView, Modal, TouchableOpacity, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import equal from 'fast-deep-equal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export default class BubbleCreate extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      pic: [],
      modal: false,
    };

    this.refresh = this.refresh.bind(this);
  }

  refresh() {
    for (var i = 0 ; i < this.props.data.usersThatPaid.length && i < 4; i++) {
      fetch(`https://welcome-ttp.com/users/get_user/${this.props.data.usersThatPaid[i]}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authentification: `Bearder ${this.props.token}`,
          'Content-Type': 'application/json'
        }
      }).then((reponse) => reponse.json()).then((repJSON) => {
        this.setState({pic: [... this.state.pic, repJSON]});
      }).catch((error) => {
        //this.props.logout();
        console.error(error)
      });
    }
  }

  componentDidMount() {
    for (var i = 0 ; i < this.props.data.usersThatPaid.length && i < 4; i++) {
      fetch(`https://welcome-ttp.com/users/get_user/${this.props.data.usersThatPaid[i]}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authentification: `Bearder ${this.props.token}`,
          'Content-Type': 'application/json'
        }
      }).then((reponse) => reponse.json()).then((repJSON) => {
        this.setState({pic: [... this.state.pic, repJSON]});
      }).catch((error) => {
        //this.props.logout();
        console.error(error)
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (!equal(this.props.data, prevProps.data)) {
      this.refresh();
    }
  }
  render() {
    if (this.state.pic.length < 1) {
      return (
        <Text>Il n'y a pas de participants</Text>
      );
    }
    return (
      <View style={styles.row}>
        <Modal animationType="fade" transparent={true} visible={this.state.modal}
          onRequestClose={() => this.setState({modal: !this.state.modal})}>
          <View style={styles.centerMe}>
            <View style={styles.popup}>
              <View style={styles.topHeader}>
                <Text style={styles.modalHeader}>PARTICIPANTS ACTIFS</Text>
                <TouchableOpacity  style={styles.closeIcon} onPress={() => this.setState({modal: !this.state.modal})}>
                  <FontAwesomeIcon size={20} color={'#fff'} icon={ faTimesCircle }/>
                </TouchableOpacity>
              </View>
              <View style={styles.modalContent}>
                <ScrollView style={styles.modalData} contentContainerStyle={styles.modalDataCont}>
                  {this.state.pic.map((data, key) => {
                    return (
                      <View style={styles.modalRow} key={key}>
                        <Image key={key} source={{uri: data.picture}} style={styles.modalIcons} />
                        <View>
                          <Text>{data.name}</Text>
                          <Text>{data.joinedEvents.length} participations</Text>
                        </View>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          </View>
        </Modal>
        <View style={{width: 130}}>
          <TouchableOpacity style={{width: 150, height: 50}} onPress={() => this.setState({modal: !this.state.modal})}>
            <Image source={{uri: this.state.pic[0].picture}} style={styles.partIcon} />
            <Image source={{uri: (this.state.pic[1]) ? this.state.pic[1].picture : ""}} style={styles.partIcon1} />
            <Image source={{uri: (this.state.pic[2]) ? this.state.pic[2].picture : ""}} style={styles.partIcon2} />
            <Image source={{uri: (this.state.pic[3]) ? this.state.pic[3].picture : ""}} style={styles.partIcon3} />
          </TouchableOpacity>
        </View>
        <Text style={styles.para}>+ {(this.props.data.currentParticipants <= 4) ? this.props.data.currentParticipants : this.props.data.currentParticipants - 4} autres participants</Text>
      </View>
    );
  }
}

BubbleCreate.propTypes = {
  data: PropTypes.object,
  token: PropTypes.string,
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
  partIcon1: {
    width: 50,
    height: 50,
    borderRadius: 100,
    position: 'absolute',
    left: 30,
  },
  partIcon2: {
    width: 50,
    height: 50,
    borderRadius: 100,
    position: 'absolute',
    left: 60,
  },
  partIcon3: {
    width: 50,
    height: 50,
    borderRadius: 100,
    position: 'absolute',
    left: 90,
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
  modalRow: {
    flexDirection: 'row',
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
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
