import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image, Linking, ActivityIndicator } from 'react-native';
import WebView from 'react-native-webview';
import Modal from 'react-native-modal'
import Ionicons from 'react-native-vector-icons/Ionicons'

// import QrCode from '../../components/Qrcode/QrCode.js';
// import ExitButton from '../buttons/ExitButton.js';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { navigate } from '../../providers/navigationService.js';
import { useDispatch, useSelector } from 'react-redux';
import { get_participations, pay_participation } from '../../store/events/actionEvents.js';
import { mixins, colors } from '@styles'
import { Loading } from '@components'
import { PAY_PARTICIPATION } from '../../store/events/type.js';
import { get_ticket } from '../../store/ticket/actionTicket.js';
import BubbleCreate from './BubbleCreate.js';
var _ = require('lodash');


const global_day = [ "Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam" ];
const global_months = [ "Jan" , "Fev", "Mars", "Avril", "May", "Juin",
  "Juil", "Aout", "Sept", "Oct", "Nov", "Dec" ];

//let STRIPE_PUBLIC_KEY = "pk_test_51HoVffBMfTJXcWsLbvC7BWGChVqFDqtf9eNcSCgZcRp7bFIY9VpyY6dUT9dU0XKjQq5YOkDjGxSGg3tJXDOumkXL00g9j1mvLB";
let STRIPE_PUBLIC_KEY = "pk_live_51HoVffBMfTJXcWsL2xxzJAuouS6sKNaGWxFmAdxw5EA5pH7Ic32f7tSxUhqQNU0EfRLNdkJ77sQGlomnT11FNDLz00Uuc3rqwu";

const ParticipateSwipe = ({item}) => {
    
    const dispatch = useDispatch();
    const [payModal, setPayModal] = useState(false)
    const [loading, setLoading] = useState(true)
    const user = useSelector(state => state.user.user.data)
    const { data, isLoading } = useSelector(state => state.events.pay_participation)
    const LoadingTicker = useSelector(state => state.ticket.isLoading)
    var today = new Date(item.start);
    var dd = String(today.getDate()).padStart(2, '0');
    var dd2 = today.getDay();
    var mm = String(today.getMonth()).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    const canPay = () => {
      console.log("{eventid: item._id}",{eventid: item._id})
        dispatch(pay_participation({eventid: item._id}))
    }

    const oncloseModal = () => {
      dispatch({type: `${PAY_PARTICIPATION}_SUCCESS`, payload: {}})
      dispatch(get_participations())
    }

    const Mok = [
      {
        _id: "617c1f1d0147300018c57e10",
        description: "It's undefined",
        email: "Jordanyebarthwttp@gmail.com",
        facebook_link: "",
        instagram_link: "",
        name: "Jordan test",
        picture: "https://wwtp-bucket-service.s3.eu-west-1.amazonaws.com/dev/profiles/617c1f1d0147300018c57e10-30-10-2021-10-16-RXICj2pOF.jpg",
        tiktok_link: "",
      },
      {
        _id: "617c1f1d0147300018c57e10",
        description: "It's undefined",
        email: "Jordanyebarthwttp@gmail.com",
        facebook_link: "",
        instagram_link: "",
        name: "Jordan test",
        picture: "https://wwtp-bucket-service.s3.eu-west-1.amazonaws.com/dev/profiles/617c1f1d0147300018c57e10-30-10-2021-10-16-RXICj2pOF.jpg",
        tiktok_link: "",
      },
      {
        _id: "617c1f1d0147300018c57e10",
        description: "It's undefined",
        email: "Jordanyebarthwttp@gmail.com",
        facebook_link: "",
        instagram_link: "",
        name: "Jordan test",
        picture: "https://wwtp-bucket-service.s3.eu-west-1.amazonaws.com/dev/profiles/617c1f1d0147300018c57e10-30-10-2021-10-16-RXICj2pOF.jpg",
        tiktok_link: "",
      },
    ]

    return (
      <View style={styles.container}>
        <Modal
          style = {styles.contentModal}
          animationIn = 'zoomIn'
          isVisible={data?.url?true: false}
          onBackButtonPress = {oncloseModal}
        >
          <View style = {{flex: 1, backgroundColor: '#fff'}}>
            {loading && <Loading />}
            <TouchableOpacity 
              onPress = {oncloseModal}
              style = {styles.btnClose}
            >
              <Ionicons
                name = 'close'
                size = {30}
                color = {colors.PRIMARY}
              />
            </TouchableOpacity>
            <WebView 
              source={{ uri: data?.url}}
              onLoad = {() => {
                setTimeout(() => {
                  setLoading(false)
                }, 10000);
              }}
              useWebKit={true}
              startInLoadingState={true} 
            />
          </View>
        </Modal>
        <TouchableOpacity onPress={() => navigate('Event', {event: item})}>
          <Image source={{uri: item.pictures[0]}} style={styles.proIcon}/>
        </TouchableOpacity>
        <View style={styles.row}>
          <Text style={styles.header}>{item.title}</Text>
        </View>
        <View style={styles.row}>
          <FontAwesomeIcon size={20} color={'#6C2BA1'} icon={ faCalendar }/>
          <Text style={styles.para}>{global_day[dd2]} {dd} {global_months[parseInt(mm)]} {yyyy}</Text>
        </View>
        {
          _.filter(item.usersThatPaid, {_id: user._id}).length == 0?
          <TouchableOpacity style={styles.btnContainer} onPress={canPay}>
            {
              isLoading?
              <ActivityIndicator size = 'large' color = '#fff' />
              :
              <Text style={styles.btnButtonText}>Payer mon ticket</Text>
            }
          </TouchableOpacity>
          :
          <TouchableOpacity 
            style={styles.btnContainer} 
            onPress={() => dispatch(get_ticket(item._id))}
          >
            {
              LoadingTicker?
              <ActivityIndicator size = 'large' color = '#fff' />
              :
              <Text style={styles.btnButtonText}>Obtenir mon QrCode</Text>
            }
            
          </TouchableOpacity>
        }
        <BubbleCreate participants = {item.usersThatPaid} />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    marginVertical: 2,
    backgroundColor: '#fff',
    ...mixins.boxShadow('#777')
  },
  proIcon: {
    width: '100%',
    height: 280,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
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
   
    fontStyle: 'italic',
    fontWeight: "700",
    color: "#fff",
    fontSize: 20,
  },
  contentModal: {
    margin: 0
  },
  btnClose: {
    height: 40,
    width: 40,
    position: 'absolute',
    top: 10,
    right: 20,
    borderRadius: 20,
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2
  },
});


export default ParticipateSwipe
