import React from 'react';
import { Modal,TouchableOpacity, StyleSheet, Text, View, Image, Linking } from 'react-native';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendar, faStar, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import BubbleCreate from '../Events/BubbleCreate.js';
import TextButtonCE from '../buttons/TextButtonCE.js';
import TextButtonLight from '../User/TextButtonLight.js';

const global_day = [ "Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam" ];
const global_months = [ "Jan" , "Fev", "Mars", "Avril", "May", "Juin",
  "Juil", "Aout", "Sept", "Oct", "Nov", "Dec" ];

class TextButtonDark extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  grade(grade) {
      fetch("https://welcome-ttp.com/users/rate_user", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authentification: `Bearer ${this.props.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userid: this.props.eid,
          grade: Number(grade),
        })
      }).then((reponse) => reponse.text()).then((repJSON) => {
        this.setState({modal: !this.state.modal});
      }).catch((error) => {
        console.error(error)
      });
  }

  render() {
    return (
        <View style={styles.btnContainer}>
        <Modal animationType="fade" transparent={true} visible={this.state.modal}
          onRequestClose={() => this.setState({modal: !this.state.modal})}>
          <View style={styles.centerMe}>
            <View style={styles.popup}>
              <View style={styles.topHeader}>
                <Text style={styles.modalHeader}>NOTEZ!</Text>
                <TouchableOpacity  style={styles.closeIcon} onPress={() => this.setState({modal: !this.state.modal})}>
                  <FontAwesomeIcon size={20} color={'#fff'} icon={ faTimesCircle }/>
                </TouchableOpacity>
              </View>
              <View style={styles.modalContent}>
                <View style={styles.row}>
                  <TouchableOpacity onPress={()=>this.grade(1)}>
                    <FontAwesomeIcon size={20} color='#6C2BA1' icon={ faStar } style={{marginLeft: 15}}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>this.grade(2)}>
                    <FontAwesomeIcon size={20} color='#6C2BA1' icon={ faStar } style={{marginLeft: 15}}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>this.grade(3)}>
                    <FontAwesomeIcon size={20} color='#6C2BA1' icon={ faStar } style={{marginLeft: 15}}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>this.grade(4)}>
                    <FontAwesomeIcon size={20} color='#6C2BA1' icon={ faStar } style={{marginLeft: 15}}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>this.grade(5)}>
                    <FontAwesomeIcon size={20} color='#6C2BA1' icon={ faStar } style={{marginLeft: 15}}/>
                  </TouchableOpacity>
                </View>
                </View>
                  <TextButtonCE text={"OK"} run={() => {
                    this.setState({modal: !this.state.modal});
                  }} />
                  <TextButtonLight text={"ANNULER"} run={() => {
                    this.setState({modal: !this.state.modal});
                  }} />
              </View>
            </View>
        </Modal>
          <TouchableOpacity style={styles.btnOpacity} onPress={() => this.setState({modal: !this.state.modal})}>
            <Text style={styles.btnButtonText}>{this.props.text}</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

TextButtonDark.propTypes = {
  text: PropTypes.string,
  eid: PropTypes.string
}

export default class RateSwipe extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      event: undefined
    };

    this.openLink = this.openLink.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  async openLink(link) {
    const supported = await Linking.canOpenURL(link);

    if (supported) {
      await Linking.openURL(supported);
    } else {
      alert("Cannot open url");
    }
  }

  cancel() {
    fetch(`https://welcome-ttp.com/events/delete_event/${this.state.event.eventid}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authentification: `Bearder ${this.props.token}`,
        'Content-Type': 'application/json'
      }
    }).then((reponse) => reponse.json()).then((repJSON) => {
      alert('Cet evenement vas etre annuler celas peut prendre quelques minutes');
    }).catch((error) => {
      //this.props.logout();
      console.error(error)
    });
  }

  componentDidMount() {
    if (typeof this.props.eid === 'string') {
      fetch(`https://welcome-ttp.com/events/get_event/${this.props.eid}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authentification: `Bearder ${this.props.token}`,
          'Content-Type': 'application/json'
        }
      }).then((reponse) => reponse.json()).then((repJSON) => {
        this.setState({event: repJSON});
      }).catch((error) => {
        //this.props.logout();
        console.error(error)
      });
    } else {
    this.setState({event: this.props.eid});
    }

  }

  render() {
    if (this.state.event == undefined) {
      return (<View></View>);
    }
    var today = new Date(this.state.event.start);
    var dd = String(today.getDate()).padStart(2, '0');
    var dd2 = today.getDay();
    var mm = String(today.getMonth()).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.openEvent(this.props.eid)}>
          <Image source={{uri: this.state.event.pictures[0]}} style={styles.proIcon}/>
        </TouchableOpacity>
        <View style={styles.row}>
          <Text style={styles.header}>{this.state.event.title}</Text>
        </View>
        <View style={styles.row}>
          <FontAwesomeIcon size={20} color={'#6C2BA1'} icon={ faCalendar }/>
          <Text style={styles.para}>{global_day[dd2]} {dd} {global_months[parseInt(mm)]} {yyyy}</Text>
        </View>
        <TextButtonDark text={"ÉVALUER"} run={()=>this.cancel()} />
        <View style={styles.row}>
          <BubbleCreate data={this.state.event} token={this.props.token} />
        </View>
      </View>
    );
  }
}

RateSwipe.propTypes = {
  token: PropTypes.string,
  eid: PropTypes.string,
  openEvent: PropTypes.function,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  proIcon: {
    width: '100%',
    height: '60%',
    resizeMode: 'stretch'
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
    height: 30,
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

