//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Modal from 'react-native-modal'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { CheckBox } from 'react-native-elements'

import { colors } from '@styles'
import Button from '../Buttons/Button'

// create a component
const FilterSearch = ({
    isVisible, 
    toggle, 
    eventsType, 
    manualValidation,
    setEventsType,
    setManualValidation,
    onFilter,
    resetFilter
}) => {
    return (
        <Modal
            isVisible = {isVisible}
            style={styles.container}
        >
            <ScrollView style = {styles.content}>
                <TouchableOpacity onPress = {toggle} style = {styles.btn_close}>
                    <Ionicons
                        name = "close"
                        color = {colors.PRIMARY}
                        size = {30}
                    />
                </TouchableOpacity>
                <View>
                    <Text style = {styles.title}>Type de soirée</Text>
                    <View style = {styles.row}>
                        <View style = {{flex: 1}}>
                            <Text style = {styles.menuTitle}>Soirée posée</Text>
                            <Text style = {styles.menuSubTitle}>Si tu Préfères les soirées avec une ambiance calme et chill</Text>
                        </View>
                        <CheckBox
                            checked={eventsType == "POSEE"?true: false}
                            onPress = {() => setEventsType("POSEE")}
                        />
                    </View>
                    <View style = {styles.row}>
                        <View style = {{flex: 1}}>
                            <Text style = {styles.menuTitle}>Bringue</Text>
                            <Text style = {styles.menuSubTitle}>Si tu Préfères les soirées ambiancées ou l'on danse jusqu'au bout de la nuit</Text>
                        </View>
                        <CheckBox
                            checked={eventsType == "BRINGUE"?true: false}
                            onPress = {() => setEventsType("BRINGUE")}
                        />
                    </View>
                </View>
                <View style = {styles.divided} />
                <View>
                    <Text style = {styles.title}>Mode d'acceptation</Text>
                    <View style = {styles.row}>
                        <View style = {{flex: 1}}>
                            <Text style = {styles.menuTitle}>Manuelle</Text>
                            <Text style = {styles.menuSubTitle}>Vous pourrez réserver seulement après avoir été accepté par l'organisateur</Text>
                        </View>
                        <CheckBox
                            checked={manualValidation?true:false}
                            onPress = {() => setManualValidation(true)}
                        />
                    </View>
                    <View style = {styles.row}>
                        <View style = {{flex: 1}}>
                            <Text style = {styles.menuTitle}>Automatique</Text>
                            <Text style = {styles.menuSubTitle}>Tout le monde à le droit de s'amuser! vous êtes validé après le paiement </Text>
                        </View>
                        <CheckBox
                            checked={manualValidation == false?true:false}
                            onPress = {() => setManualValidation(false)}
                        />
                    </View>
                </View>
                <Button
                    text = "Appliquer le filtre"
                    textColor = {colors.WHITE}
                    style = {styles.btn}
                    onPress = {onFilter}
                />
                <Button
                    text = "Filtre par defaut"
                    textColor = {colors.PRIMARY}
                    style = {styles.btn_outline}
                    onPress = {resetFilter}
                />
            </ScrollView>
        </Modal>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 0,
        justifyContent: 'flex-end'
    },
    content: {
       marginTop: 70,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20
    },
    btn_close:{
        height: 50,
        width: 50,
        alignSelf: 'flex-end'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    menuTitle: {
        fontSize: 18,
        marginTop: 20
    },
    menuSubTitle: {
        color: '#777',
        fontStyle: 'italic'
    },
    divided: {
        height: 1,
        marginVertical: 10,
        backgroundColor: '#f0f0f0'
    },
    btn: {
        backgroundColor: colors.PRIMARY
    },
    btn_outline: {
        marginTop: 20,
        borderColor: colors.PRIMARY,
        borderWidth: 1 
    }
});

//make this component available to the app
export default FilterSearch;
