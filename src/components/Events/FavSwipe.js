import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image, Linking, Dimensions } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons'

import BubbleCreate from '../Events/BubbleCreate.js';
import { get_my_event } from '../../store/user/actionUser.js';
import { mixins } from '@styles'

const global_day = [ "Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam" ];
const global_months = [ "Jan" , "Fev", "Mars", "Avril", "May", "Juin",
  "Juil", "Aout", "Sept", "Oct", "Nov", "Dec" ];
const hours = [ "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00",
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00","17:00",
  "18:00", "19:00", "20:00", "21:00", "22:00", "23:00" ];

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

export default class FavSwipe extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      event: undefined
    };

  }

  componentDidMount() {
    // get_my_event(this.props.eid)
    // .then((res) => {
    //   this.setState({event: res.data});
    // }).catch((error) => {
    //   //this.props.logout();
    //   console.error(error)
    // });
  }

  render() {
    const { item } = this.props
    var today = new Date(item.start);
    var dd = String(today.getDate()).padStart(2, '0');
    var dd2 = today.getDay();
    console.log(dd2);
    var mm = String(today.getMonth()).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return (
      <View style={styles.container}>
        <Image source={{uri: item.pictures[0]}} style={styles.proIcon}/>
        <View style={styles.row}>
          <Text style={styles.header}>{item.title}</Text>
        </View>
        <View style={styles.row}>
          <FontAwesomeIcon size={20} color={'#6C2BA1'} icon={ faCalendar }/>
          <Text style={styles.para}>{global_day[today.getDay()]} {dd} {global_months[parseInt(mm)]} {yyyy}</Text>
        </View>
        <TextButtonDark text={"VOIR"} run={()=>this.props.openEvent()} />
        {/* <View style={styles.row}>
          <BubbleCreate data={item} token={this.props.token} />
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 80,
    height: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    ...mixins.boxShadow("#777")
  },
  proIcon: {
    width: '100%',
    height: 300,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
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
    height: 50,
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

