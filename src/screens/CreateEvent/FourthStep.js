//import liraries
import React, { useState } from 'react';
import { View, Text, Modal, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPhone, faKey, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { styles } from './style'
import { colors } from '@styles'
import { Button, Input, Select, Calendar } from '@components'
import { navigate } from '../../providers/navigationService';

const party_type = [ 'AUTOMATIQUE', 'MANUELLE' ];

// create a component
const FourthStep = ({
  setManualValidation,
  setPhone,
  setStartTime,
  setShowModal,
  setAdditionalInfos,
  setEndTime,
  showModal,
  phone,
  manualValidation,
  additionalInfos,
  startTime,
  showRecap
}) => {

  const setDateTime = (start, end) => {
    setStartTime(start)
    setEndTime(end)
  }

  return (
    <View style={styles.container}>
      <Modal 
        animationType={"fade"} 
        transparent={true}
        visible={showModal}
      >
            <View style={styles.centerMe}>
              <View style={styles.popup}>
                <View style={styles.topHeader}>
                  <Text style={styles.modalHeader}>INFORMATIONS COMPLÉMENTAIRES</Text>
                  <TouchableOpacity  style={styles.closeIcon} onPress={() => setShowModal(false)}>
                    <FontAwesomeIcon size={20} color={'#fff'} icon={ faTimesCircle }/>
                  </TouchableOpacity>
                </View>
                <ScrollView style={styles.modalContent}>
                  <Text style={styles.header2}>SOUHAITEZ-VOUS AJOUTER UNE INFORMATION SPÉCIALE SUR L’ÉVÉNEMENT ?</Text>
                  <Text style={styles.para}>Ces informations seront privées</Text>
                  <View style={styles.row}>
                    <FontAwesomeIcon size={20} color={'#361979'} icon={ faKey }/>
                    <Input 
                      style={styles.input}
                      placeholder="Information d'accès à la soirée"
                      value={additionalInfos} 
                      onChangeText={setAdditionalInfos}
                      maxLength={50} 
                    />
                  </View>
                  <View style={styles.row}>
                    <FontAwesomeIcon size={20} color={'#361979'} icon={ faPhone } />
                    <Input 
                      style={styles.input} 
                      keyboardType="numeric"
                      placeholder="Veuillez renseigner un numéro de téléphone de contact"
                      value={phone} 
                      onChangeText={setPhone} 
                    />
                  </View>
                  <Button 
                    text={"VALIDER"}
                    textColor = {colors.WHITE}
                    style = {styles.btnNextStep}
                    onPress={showRecap} 
                  />
                </ScrollView>
              </View>
            </View>
          </Modal>
        <ScrollView>
          <View style={styles.padding}>
            <Text style={styles.header2}>TYPE D'ACCEPTATION</Text>
            <Select 
              selected={manualValidation} 
              set={(data) => setManualValidation(data)} 
              types={party_type} 
            />
            <Text style={styles.header2}>DATE & HEURE DE L’ÉVÉNEMENT</Text>
            <Calendar 
              date={startTime} 
              set={(one, two) => setDateTime(one, two)} 
            />
            <Button 
              text={"Valider la création"}
              textColor = {colors.WHITE}
              style = {styles.btnNextStep}
              onPress = {() => setShowModal(true)}
           />
          </View>
        </ScrollView>
    </View>
  );
};

//make this component available to the app
export default FourthStep;
