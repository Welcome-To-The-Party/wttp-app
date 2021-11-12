import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image, Linking } from 'react-native';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons'

import BubbleCreate from '../Events/BubbleCreate.js';
import Alert from '../Alert.js';

const global_day = [ "Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam" ];
const global_months = [ "Jan" , "Fev", "Mars", "Avril", "May", "Juin",
  "Juil", "Aout", "Sept", "Oct", "Nov", "Dec" ];

class TextButtonDark extends React.Component
{
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btnOpacity} onPress={this.props.run}>
            <Text style={styles.btnButtonText}>{this.props.text}</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

TextButtonDark.propTypes = {
  text: PropTypes.string,
  run: PropTypes.func
}

export default class PastSwipe extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      event: undefined,
      message: '',
      showModal: false,
    };

    this.openLink = this.openLink.bind(this);
    this.endEvent = this.endEvent.bind(this);
  }

  async openLink(link) {
    const supported = await Linking.canOpenURL(link);

    if (supported) {
      await Linking.openURL(supported);
    } else {
      alert("Cannot open url");
    }
  }

  endEvent() {
    fetch(`https://welcome-ttp.com/events/confirm_finished/${this.state.event._id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authentification: `Bearder ${this.props.token}`,
        'Content-Type': 'application/json'
      }
    }).then((reponse) => reponse.json()).then((repJSON) => {
      this.setState({userData: repJSON.user});
      this.setState({message: 'Evenements terminer'});
      this.setState({showModal: !this.state.showModal});
    }).catch((error) => {
      //this.props.logout();
      console.error(error)
    });
  }

  componentDidMount() {
    this.setState({event: this.props.eid});
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
        <Image source={{uri: this.state.event.pictures[0]}} style={styles.proIcon}/>
        <View style={styles.row}>
          <Text style={styles.header}>{this.state.event.title}</Text>
        </View>
        <View style={styles.row}>
          <FontAwesomeIcon size={20} color={'#6C2BA1'} icon={ faCalendar }/>
          <Text style={styles.para}>{global_day[dd2]} {dd} {global_months[parseInt(mm)]} {yyyy}</Text>
        </View>
        <TextButtonDark text={"VOIR"} run={()=>this.props.openPastEvent(this.props.eid)} />
        <TextButtonDark text={"TERMINER"} run={()=>this.endEvent()} />
        <View style={styles.row}>
          <BubbleCreate data={this.state.event} token={this.props.token} />
        </View>
        <Alert message={this.state.message} open={this.state.showModal} />
      </View>
    );
  }
}

PastSwipe.propTypes = {
  openPastEvent: PropTypes.func,
  token: PropTypes.string,
  eid: PropTypes.string,
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
    marginTop: 5,
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
    height: 30,
    backgroundColor: '#361979',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
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
    fontSize: 20,
  },
});

