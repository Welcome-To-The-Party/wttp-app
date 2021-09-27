import React from 'react';
import { Image, Text, ScrollView, Modal, TouchableOpacity, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import TextButtonDark from '../Search/TextButtonDark.js';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

class BubbleCreate extends React.Component

{
  constructor(props) {
    super(props);
    this.state = {
      pic: [],
      modal: false,
      select: undefined,
      grade: 0,
    };

    this.selectUser = this.selectUser.bind(this);
    this.grade = this.grade.bind(this);
    this.valGrade = this.valGrade.bind(this);
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
        console.log('here');
        this.setState({pic: [... this.state.pic, repJSON]});
        this.setState({select: this.state.pic[0]});
      }).catch((error) => {
        //this.props.logout();
        console.error(error)
      });
    }
  }

  grade(no) {
    this.setState({grade: no});
  }

  valGrade() {
    fetch("https://welcome-ttp.com/users/rate_user", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authentification: `Bearer ${this.props.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userid: this.state.select.userid,
        grade: Number(this.state.grade),
      })
    }).then((reponse) => reponse.text()).then((repJSON) => {
      this.setState({modal: !this.state.modal});
    }).catch((error) => {
      console.error(error)
    });
  }

  selectUser(user) {
    this.setState({select: user});
    this.setState({modal: !this.state.modal});
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
                <Text style={styles.modalHeader}>NOTEZ VOS INVITÉS!</Text>
                <TouchableOpacity  style={styles.closeIcon} onPress={() => this.setState({modal: !this.state.modal})}>
                  <FontAwesomeIcon size={20} color={'#fff'} icon={ faTimesCircle }/>
                </TouchableOpacity>
              </View>
              <View style={styles.modalContent}>
                <Text style={styles.para}>NOTER VOS INVITÉS VOUS PERMET À VOUS ET AUX AUTRES ORGANISATEURS DE SAVOIR SI VOS CONVIVES SONT À INVITER OU NON</Text>
                <Text style={styles.para}>VOTRE NOTE ATTRIBUÉE À {(this.state.select) ? this.state.select.name : ""}</Text>
                <View style={styles.row}>
                  <Image source={{uri: (this.state.select) ? this.state.select.picture : "https://static.thenounproject.com/png/55168-200.png"}} style={styles.partIcon} />
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
                <TextButtonDark text={"ÉVALUER"} run={()=>this.valGrade()} />
              </View>
            </View>
          </View>
        </Modal>
        <ScrollView style={{width: '100%', height: 100}}>
            {this.state.pic.map((user, key) => {
              return (<View key={key}>
                <TouchableOpacity style={styles.row} onPress={() => this.selectUser(user)}>
                    <Image source={{uri: user.picture}} style={styles.partIcon} />
                    <View style={styles.column}>
                      <Text style={styles.para}>{user.name}</Text>
                      <Text style={styles.para}>{user.numberOfJoinedEvents} participations</Text>
                    </View>
                    <View style={styles.evalButton}>
                      <Text style={styles.paraEval}>ÉVALUER</Text>
                    </View>
                  </TouchableOpacity>
                </View>);
            })}
        </ScrollView>
      </View>
    );
  }
}

BubbleCreate.propTypes = {
  data: PropTypes.object,
  token: PropTypes.string,
}

export default class PastMiniNav extends React.Component
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
    if (this.state.sel == 0) {
      header = <View style={styles.titleCon}>
                <TouchableOpacity onPress={() => this.setTab(0)}>
                  <Text style={styles.headerSel}>NOTES</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setTab(1)}>
                  <Text style={styles.header}>BÉNÉFICES</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setTab(2)}>
                  <Text style={styles.header}>ÉVALUEZ</Text>
                </TouchableOpacity>
              </View>;
      body =  <View>
                <View style={styles.row}>
                  <Text style={styles.para}>Note obtenue: </Text>
                  <FontAwesomeIcon size={15} color='#6C2BA1' icon={ faStar }/>
                  <FontAwesomeIcon size={15} color='#6C2BA1' icon={ faStar }/>
                  <FontAwesomeIcon size={15} color='#6C2BA1' icon={ faStar }/>
                  <FontAwesomeIcon size={15} color='#6C2BA1' icon={ faStar }/>
                  <FontAwesomeIcon size={15} color='#6C2BA1' icon={ faStar }/>
                </View>
                <Text style={styles.para}>
                  Votre soirée semble avoir connue un succès.
                  Voulez-vous la reprogrammer ?
                </Text>
        <TextButtonDark text={"JE REMET ÇA!"} run={() => this.props.navigation.navigate('CreateEvent')} />
              </View>;
    } else if (this.state.sel == 1) {
      header = <View style={styles.titleCon}>
                <TouchableOpacity onPress={() => this.setTab(0)}>
                  <Text style={styles.header}>NOTES</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setTab(1)}>
                  <Text style={styles.headerSel}>BÉNÉFICES</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setTab(2)}>
                  <Text style={styles.header}>ÉVALUEZ</Text>
                </TouchableOpacity>
              </View>;
      body =  <View>
                <View style={styles.row}>
                  <Text style={styles.paraBold}>Votre chiffre de vente net:</Text>
                  <Text style={styles.para}>{this.props.data.price * this.props.data.participatingUsers.length} EUR</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.paraBold}>Vous avez gagnés:</Text>
                  <Text style={styles.para}>{this.props.data.price * this.props.data.participatingUsers.length - (this.props.data.price * this.props.data.participatingUsers.length * 0.1)} EUR</Text>
                </View>
              </View>;
    } else {
      header = <View style={styles.titleCon}>
                <TouchableOpacity onPress={() => this.setTab(0)}>
                  <Text style={styles.header}>NOTES</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setTab(1)}>
                  <Text style={styles.header}>BÉNÉFICES</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setTab(2)}>
                  <Text style={styles.headerSel}>ÉVALUEZ</Text>
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

PastMiniNav.propTypes = {
  data: PropTypes.object,
  navigation: PropTypes.object,
  token: PropTypes.string,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 90,
  },
  titleCon: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  evalButton: {
    backgroundColor: '#6C2BA1',
    borderRadius: 10,
  },
  paraEval: {
    color: 'white',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  column: {
    marginRight: '10%',
    marginLeft: '5%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  header: {
    color: '#4f4f4f',
    fontSize: 20,
    marginRight: 25,
    fontWeight: 'bold',
  },
  partIcon: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginLeft: 10,
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
    fontSize: 20,
    marginRight: 25,
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
