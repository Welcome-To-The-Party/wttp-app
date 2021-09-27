import React from 'react';
import { Modal, TouchableOpacity, StyleSheet, Text, View, Image, Linking } from 'react-native';
import WebView from 'react-native-webview';
import StripeCheckout from 'react-native-stripe-checkout-webview';
import PropTypes from 'prop-types';

import QrCode from '../../components/Qrcode/QrCode.js';
import ExitButton from '../buttons/ExitButton.js';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons'

const global_day = [ "Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam" ];
const global_months = [ "Jan" , "Fev", "Mars", "Avril", "May", "Juin",
  "Juil", "Aout", "Sept", "Oct", "Nov", "Dec" ];

//let STRIPE_PUBLIC_KEY = "pk_test_51HoVffBMfTJXcWsLbvC7BWGChVqFDqtf9eNcSCgZcRp7bFIY9VpyY6dUT9dU0XKjQq5YOkDjGxSGg3tJXDOumkXL00g9j1mvLB";
let STRIPE_PUBLIC_KEY = "pk_live_51HoVffBMfTJXcWsL2xxzJAuouS6sKNaGWxFmAdxw5EA5pH7Ic32f7tSxUhqQNU0EfRLNdkJ77sQGlomnT11FNDLz00Uuc3rqwu";

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

export default class ParticipateSwipe extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      checkout_id: undefined,
      url: undefined,
      event: undefined,
      payModal: false,
    };

    this.openLink = this.openLink.bind(this);
    this.canPay = this.canPay.bind(this);
    this.load = this.load.bind(this);
  }

  async openLink(link) {
    const supported = await Linking.canOpenURL(link);

    if (supported) {
      await Linking.openURL(supported);
    } else {
      alert("Cannot open url");
    }
  }

  canPay() {
    console.log(this.props.eid);
    fetch(`https://welcome-ttp.com/banking/pay_for_event`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authentification: `Bearder ${this.props.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        eventid: this.props.eid.eventid
      })
    }).then((reponse) => reponse.json()).then((repJSON) => {
      console.log(repJSON);
      this.load();
      if (repJSON.status !== undefined && repJSON.status == 401) {
        alert("Vous n'etez pas authorizer a payer");
      } else {
        this.setState({url: repJSON.url});
        this.setState({checkout_id: repJSON.id});
        this.setState({payModal: true});
      }
    }).catch((error) => {
      this.load();
      //this.props.logout();
      console.error(error)
    });
  }

  load() {
    fetch(`https://welcome-ttp.com/events/get_event/${this.props.eid.eventid}`, {
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
  }

  componentDidMount() {
    this.load();
  }

  render() {
    if (this.state.event == undefined || this.state.event.pictures === undefined) {
      return (<View></View>);
    }
    var today = new Date(this.state.event.start);
    var dd = String(today.getDate()).padStart(2, '0');
    var dd2 = today.getDay();
    var mm = String(today.getMonth()).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return (
      <View style={styles.container}>
        <Modal animationType={"fade"} transparent={true}
          visible={this.state.payModal} onRequestClose={() => {this.setState({payModal: false})}}>
          <WebView source={{ uri: this.state.url}} useWebKit={true}
              startInLoadingState={true} />
          <ExitButton run={() => {this.setState({ payModal: false }); this.props.refresh();}} />
        </Modal>
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
        {this.props.eid.canPay === true ?
            <TextButtonDark text={"PAYER"} run={()=>this.canPay()} />
          :
            <View>
              <QrCode token={this.props.token} eid={this.props.eid.eventid} />
            </View>
        }
      </View>
    );
  }
}

ParticipateSwipe.propTypes = {
  token: PropTypes.string,
  refresh: PropTypes.func,
  eid: PropTypes.object,
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
    resizeMode: 'stretch',
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
});

