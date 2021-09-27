import React from 'react';
import { Image, Text, ScrollView, Modal, TouchableOpacity, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

class BubbleCreate extends React.Component

{
  constructor(props) {
    super(props);
    this.state = {
      pic: [],
      modal: false,
    };
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
        <View style={{width: 150}}>
          <TouchableOpacity style={{width: 150, height: 50}} onPress={() => this.setState({modal: !this.state.modal})}>
            <Image source={{uri: this.state.pic[0].picture}} style={styles.partIcon} />
            <Image source={{uri: (this.state.pic[1]) ? this.state.pic[1].picture : ""}} style={styles.partIcon1} />
            <Image source={{uri: (this.state.pic[2]) ? this.state.pic[2].picture : ""}} style={styles.partIcon2} />
            <Image source={{uri: (this.state.pic[3]) ? this.state.pic[3].picture : ""}} style={styles.partIcon3} />
          </TouchableOpacity>
        </View>
        <Text>+ {(this.props.data.currentParticipants <= 4) ? this.props.data.currentParticipants : this.props.data.currentParticipants - 4} autres participants</Text>
      </View>
    );
  }
}

BubbleCreate.propTypes = {
  data: PropTypes.object,
  token: PropTypes.string,
}

export default class MiniNav extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      sel: 0,
    };
    this.setTab = this.setTab.bind(this);
  }

  setTab(num) {
    this.setState({sel: num});
  }

  render() {
    var header = <View></View>;
    var body = <View></View>;
    var datestart = new Date(this.props.data.start);
    var dateend = new Date(this.props.data.end);
    if (this.state.sel == 0) {
      header = <View style={styles.titleCon}>
                <TouchableOpacity onPress={() => this.setTab(0)}>
                  <Text style={styles.headerSel}>DESCRIPTION</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setTab(1)}>
                  <Text style={styles.header}>SPÉCIFICATIONS</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setTab(2)}>
                  <Text style={styles.header}>PARTICIPANTS</Text>
                </TouchableOpacity>
              </View>;
      body =  <ScrollView>
                <Text style={styles.para}>{this.props.data.description}</Text>
              </ScrollView>;
    } else if (this.state.sel == 1) {
      header = <View style={styles.titleCon}>
                <TouchableOpacity onPress={() => this.setTab(0)}>
                  <Text style={styles.header}>DESCRIPTION</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setTab(1)}>
                  <Text style={styles.headerSel}>SPÉCIFICATIONS</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setTab(2)}>
                  <Text style={styles.header}>PARTICIPANTS</Text>
                </TouchableOpacity>
              </View>;
      body =  <ScrollView>
                <View style={styles.row}>
                  <Text style={styles.paraBold}>Date de l’événement:</Text>
                  <Text style={styles.para}>{datestart.getDate()}/{datestart.getMonth() + 1}/{datestart.getFullYear()} </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.paraBold}>Horaire de l’événement:</Text>
                  <Text style={styles.para}>{datestart.getHours()}:{datestart.getMinutes()} - {dateend.getHours()}:{dateend.getMinutes()}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.paraBold}>Type de musique:</Text>
                  <Text style={styles.para}>{this.props.data.musicType}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.paraBold}>Type de soirée:</Text>
                  <Text style={styles.para}>{this.props.data.type}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.paraBold}>Type de lieu:</Text>
                  <Text style={styles.para}>{this.props.data.placeType}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.paraBold}>Mode d’acceptation:</Text>
                  <Text style={styles.para}>{this.props.data.manualValidation?"Manuelle":"Automatique"}</Text>
                </View>
              </ScrollView>;
    } else {
      header = <View style={styles.titleCon}>
                <TouchableOpacity onPress={() => this.setTab(0)}>
                  <Text style={styles.header}>DESCRIPTION</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setTab(1)}>
                  <Text style={styles.header}>SPÉCIFICATIONS</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setTab(2)}>
                  <Text style={styles.headerSel}>PARTICIPANTS</Text>
                </TouchableOpacity>
              </View>;
      body = <BubbleCreate data={this.props.data} token={this.props.token} />
    }
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          {header}
        </View>
        <View>
          {body}
        </View>
      </View>
    );
  }
}

MiniNav.propTypes = {
  data: PropTypes.object,
  token: PropTypes.string,
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
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
    fontSize: 16,
    textTransform: 'capitalize'
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
