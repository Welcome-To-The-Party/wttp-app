import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight, faCalendar } from '@fortawesome/free-solid-svg-icons'
import { get_my_event } from '@store/user/actionUser';
import { mixins, colors } from '@styles'
import { Button } from '@components';

const global_day = [ "Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam" ];
const global_months = [ "Jan" , "Fev", "Mars", "Avril", "May", "Juin",
  "Juil", "Aout", "Sept", "Oct", "Nov", "Dec" ];

const iconSize = 20;
const titleLength = 8;

export default class PartySelect extends React.Component{
  
  render() {
      const { item, toggleModal, isComing, finishEvent } = this.props
      var today = new Date(item.start);
      var dd = String(today.getDate()).padStart(2, '0');
      var dd2 = today.getDay();
      var mm = String(today.getMonth()).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      return (
        <TouchableOpacity onPress={this.props.onPress} style={styles.container}>
          <Image source={{uri: item.pictures[0]}} style={styles.imageIcon} />
          <View style={styles.column}>
            <Text style={styles.header}>{item.title}</Text>
            <View style={styles.row}>
              <FontAwesomeIcon size={20} color={'#6C2BA1'} icon={ faCalendar }/>
              <Text style={styles.para}>{global_day[dd2]} {dd} {global_months[parseInt(mm)]} {yyyy}</Text>
            </View>
            {
              item.usersThatPaid.length ==0 && isComing?
              <Button
                text = "Annuler"
                textColor = '#fff'
                style = {styles.btn}
                onPress = {() => toggleModal(item._id)}
              />
              :item.usersThatPaid.length != 0 && isComing == false?
              <Button
                text = "Terminer"
                textColor = '#fff'
                style = {styles.btn}
                onPress = {() => finishEvent(item._id)}
              />
              :null
            }
            
          </View>
          <FontAwesomeIcon size={iconSize} style={styles.icons} icon={ faChevronRight}/>
        </TouchableOpacity>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    minHeight: 100,
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingRight: 10,
    ...mixins.boxShadow('#777')
  },
  column: {
    flex: 1
  },
  row: {
    flexDirection: "row",
  },
  imageIcon: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 20,
  },
  header: {
    color: '#4f4f4f',
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '200',
  },
  para: {
    color: '#4f4f4f',
    fontSize: 15,
    fontWeight: '200',
  },
  icons: {
    marginLeft: 15,
    color: "#6C2BA1",
  },
  btn: {
    height: 30,
    width: 120,
    backgroundColor: colors.PRIMARY,
    top: -10
  }
});
