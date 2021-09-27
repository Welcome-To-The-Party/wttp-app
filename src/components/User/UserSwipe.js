import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Linking } from 'react-native';
import PropTypes from 'prop-types';

const facebook_icon = '../../assets/images/User/facebook.png';
const insta_icon = '../../assets/images/User/insta.png';
const twitter_icon = '../../assets/images/User/twitter.png';
const tiktok_icon = '../../assets/images/User/tiktok.png';


export default class UserSwipe extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      userData: undefined
    };
    this.openLink = this.openLink.bind(this);
  }

  async openLink(link) {
    const supported = await Linking.canOpenURL(link);

    if (supported) {
      await Linking.openURL(link);
    } else {
      alert("Cannot open url");
    }
  }

  componentDidMount() {
    fetch(`https://welcome-ttp.com/users/get_user/${this.props.uid}`, {
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
    if (this.state.userData == undefined) {
      return (<View></View>);
    }
    return (
      <View style={styles.container}>
        <Image source={{uri: this.state.userData.picture}} style={styles.proIcon}/>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => this.props.openUser(this.state.userData)}>
            <Text style={styles.header}>{this.state.userData.name}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.bubble}>
            <Text style={styles.bubbleText}>{this.state.userData.numberOfCreatedEvents} organisations</Text>
          </View>
          <View style={styles.bubble}>
            <Text style={styles.bubbleText}>{this.state.userData.numberOfJoinedEvents} participations</Text>
          </View>
        </View>
        <Text style={styles.para}>EN SAVOIR PLUS VIA LES RÉSEAUX</Text>
        <View style={{flexDirection: 'row'}}>
          { (this.state.userData.facebook_link) ?
            <TouchableOpacity onPress={() => this.openLink(this.state.userData.facebook_link)}>
              <Image source={require(facebook_icon)} style={styles.icon_social} />
            </TouchableOpacity>
          : <View></View>}
          { (this.state.userData.instagram_link) ?
            <TouchableOpacity onPress={() => this.openLink(this.state.userData.instagram_link)}>
              <Image source={require(insta_icon)} style={styles.icon_social} />
            </TouchableOpacity>
          : <View></View>}
          { (this.state.userData.twitter_link) ?
            <TouchableOpacity onPress={() => this.openLink(this.state.userData.twitter_link)}>
              <Image source={require(twitter_icon)} style={styles.icon_social} />
            </TouchableOpacity>
          : <View></View>}
          { (this.state.userData.tiktok_link) ?
            <TouchableOpacity onPress={() => this.openLink(this.state.userData.tiktok_link)}>
              <Image source={require(tiktok_icon)} style={styles.icon_social} />
            </TouchableOpacity>
                : <View></View>}
              </View>
      </View>
    );
  }
}

UserSwipe.propTypes = {
  token: PropTypes.string,
  uid: PropTypes.string,
  openUser: PropTypes.func,
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
  }
});

