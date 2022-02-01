//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal'
import Ionicons from 'react-native-vector-icons/Ionicons'
import QRCode from 'react-native-qrcode-generator';

import { colors } from '@styles'
import { verify_ticket } from '../../store/ticket/actionTicket';

// create a component
const QRcodeView = ({data, isVisible, onClose}) => {
    return (
        <Modal 
            animationIn = 'zoomIn'
            style={styles.container}
            isVisible = {isVisible}
        >
            <View style = {styles.content}>
                <View style = {styles.header}>
                    <TouchableOpacity onPress = {onClose} style = {styles.btn_close}>
                        <Ionicons 
                            name = 'close'
                            size = {30}
                            color = {colors.PRIMARY}
                        />
                    </TouchableOpacity>
                </View>
                <View style = {styles.center_bloc}>
                    <Text style={styles.paraBold}>CE QR CODE VOUS SERA EXIGÉ,VEUILLEZ LE CONSERVER</Text>
                    <Text style={styles.subtitle}>Ce QR code unique est généré automatiquement</Text>
                    <QRCode
                        value={verify_ticket(data?.cypher)}
                        size={250}
                        bgColor='black'
                        fgColor='white'
                    />
                    <View style = {styles.content_info}>
                        <View style = {styles.row}>
                            <Ionicons 
                                name = 'location-outline'
                                size = {20}
                                color = {colors.PRIMARY}
                            />
                            <Text style={styles.para}>Lieu: {data?.address}</Text>
                        </View>
                        <View style = {styles.row}>
                            <Ionicons 
                                name = 'call-outline'
                                size = {20}
                                color = {colors.PRIMARY}
                            />
                            <Text style={styles.para}>Téléphone: {data?.number}</Text>
                        </View>
                        <View style = {styles.row}>
                            <Ionicons 
                                name = 'information-circle-outline'
                                size = {20}
                                color = {colors.PRIMARY}
                            />
                            <Text style={styles.para}>Information additionnel: {data?.additionalInfos}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 0,
        paddingTop: 30
    },
    content: {
        height: '100%',
        borderRadius: 10,
        padding: 20,
        backgroundColor: '#fff'
    },
    btn_close: {
        height: 40,
        width: 40,
    },
    header: {
        height: 60,
        alignItems: 'flex-end'
    },
    center_bloc: {
        alignItems: 'center'
    },
    paraBold: {
        textAlign: 'center',
        fontSize: 20
    },
    subtitle: {
        textAlign: 'center',
        color: '#777',
        marginBottom: 50,
        marginTop: 20
    },
    para: {
        color: '#000', 
        marginLeft: 10,
        marginVertical: 5
    }, 
    content_info: {
        marginTop: 20
    }, 
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

//make this component available to the app
export default QRcodeView;
