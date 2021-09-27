import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, ScrollView, Image, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'
import equal from 'fast-deep-equal';

export default class UserGrade extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
    };
    this.getUser = this.getUser.bind(this);
  }

  getUser() {
    fetch(`https://welcome-ttp.com/users/get_user/${this.props.uid}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authentification: `Bearder ${this.props.token}`,
        'Content-Type': 'application/json'
      }
    }).then((reponse) => reponse.json()).then((repJSON) => {
      this.setState({user: repJSON});
    }).catch((error) => {
      //this.props.logout();
      console.error(error)
    });
  }

  componentDidMount() {
    this.getUser();
  }

  componentDidUpdate(prevProps) {
    if (!equal(this.props.uid, prevProps.uid)) {
      this.getUser();
    }
  }

  render() {
    var i = 0;
    var grades = [ ]
    if (this.state.user == undefined) {
      return(<View></View>);
    }
    for (i = 0; i < this.state.user.average; i++) {
      grades.push(<FontAwesomeIcon size={15} color='#6C2BA1' icon={ faStar } key={i} />);
    }
    while (i < 5) {
      grades.push(<FontAwesomeIcon size={15} color='#6C2BA1' icon={ faStar } key={i} />);
      i++;
    }
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.openUser(this.state.user)} style={styles.container}>
          <Image source={{uri: this.state.user.picture}} style={styles.icon} />
          <View style={styles.column}>
            <Text style={styles.header}>{this.state.user.name}</Text>
            <Text style={styles.para}>{this.state.user.joinedEvents.length} participations</Text>
          </View>
          <View style={styles.gradeCont}>
            {grades}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

UserGrade.propTypes = {
  logout: PropTypes.function,
  token: PropTypes.string,
  navigation: PropTypes.object,
  uid: PropTypes.string,
  openUser: PropTypes.function,
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: "row",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    borderColor: '#4f4f4f',
    borderBottomWidth: 1,
  },
  gradeCont: {
    flexDirection: "row",
    borderColor: '#6C2BA1',
    borderRadius: 100,
    marginLeft: 10,
    borderWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5
  } ,
  header: {
    color: "#4f4f4f",
    paddingLeft: 15,
    fontSize: 25,
  },
  para: {
    color: "#4f4f4f",
    paddingLeft: 15,
    fontSize: 15,
  },
  column: {
    flexDirection: "column",
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 100,
  }
});
