import * as React from 'react';
import { StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native';

import PropTypes from 'prop-types';

export default class UserNotifications extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      userData: undefined,
      partyData: undefined,
    };

    this.accept = this.accept.bind(this);
    this.refuse = this.refuse.bind(this);
  }

  accept() {
    fetch("https://welcome-ttp.com/participations/accept_participation_demand", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authentification: `Bearder ${this.props.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        eventid: this.props.data.eventid,
        userid: this.props.data.from,
        reference: this.props.data._id
      })
    }).then((reponse) => reponse.json()).then((repJSON) => {
      console.log(repJSON);
    }).catch((error) => {
      //this.props.logout();
      console.error(error)
    });
  }

  refuse() {
    fetch("https://welcome-ttp.com/participations/refuse_participation_demand", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authentification: `Bearder ${this.props.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        eventid: this.props.data.eventid,
        userid: this.props.data.from,
        reference: this.props.data._id
      })
    }).then((reponse) => reponse.json()).then((repJSON) => {
      console.log(repJSON);
    }).catch((error) => {
      //this.props.logout();
      console.error(error)
    });
  }

  componentDidMount() {
    fetch(`https://welcome-ttp.com/events/get_event/${this.props.data.eventid}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authentification: `Bearder ${this.props.token}`,
        'Content-Type': 'application/json'
      }
    }).then((reponse) => reponse.json()).then((repJSON) => {
      this.setState({partyData: repJSON});
    }).catch((error) => {
      //this.props.logout();
      console.error(error)
    });
    fetch(`https://welcome-ttp.com/users/get_user/${this.props.data.from}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authentification: `Bearder ${this.props.token}`,
        'Content-Type': 'application/json'
      }
    }).then((reponse) => reponse.json()).then((repJSON) => {
      this.setState({userData: repJSON});
    }).catch((error) => {
      //this.props.logout();
      console.error(error)
    })
  }

  render() {
    if (this.state.userData == undefined || this.state.partyData == undefined) {
      return(<View></View>);
    }
    return (
      <View style={styles.container}>
        <Image style={styles.icon} source={{uri: this.state.userData.picture}} />
        <View style={styles.column}>
          <Text style={styles.para}>Vous avez reçus une demande de participation pour l’événement {this.state.partyData.title}</Text>
          <View style={styles.row}>
            <TouchableOpacity style={styles.acceptBtn} onPress={() => this.accept()}>
              <Text style={{color: "#fff"}}>ACCEPTER</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.refuseBtn} onPress={() => this.refuse()}>
              <Text style={{color: '#6C2BA1'}}>REFUSER</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

UserNotifications.propTypes = {
  data: PropTypes.object,
  token: PropTypes.string,
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
    width: 100,
    height: 100,
    borderRadius: 100,
    marginTop: 5,
    marginRight: 5,
    marginLeft: 5,
  },
  para: {
    fontFamily: 'Roboto',
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
