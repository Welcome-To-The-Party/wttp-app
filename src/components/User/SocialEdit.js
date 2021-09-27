import * as React from 'react';
import { StyleSheet, Image, Text, TouchableOpacity, TextInput, Modal, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import TextButtonCE from '../../components/Buttons/TextButtonCE.js';

export default class SocialEdit extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      desc: this.props.text,
      modal: false,
    };
    this.changeDesc = this.changeDesc.bind(this);
  }

  changeDesc(data) {
    this.setState({desc: data});
  }

  render() {
    if (!this.props.text || this.props.text.length < 1) {
      return (
          <View style={styles.container}>
            <Modal animationType="fade" transparent={true} visible={this.state.modal}
              onRequestClose={() => this.setState({modal: !this.state.modal})}>
              <View style={styles.centerMe}>
                <View style={styles.popup}>
                  <View style={styles.topHeader}>
                    <Text style={styles.modalHeader}>AJOUTER UN LIEN</Text>
                    <TouchableOpacity  style={styles.closeIcon} onPress={() => this.setState({modal: !this.state.modal})}>
                      <FontAwesomeIcon size={20} color={'#fff'} icon={ faTimesCircle }/>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.modalContent}>
                    <TextInput onChangeText={(text) => {this.changeDesc(text)}}
                    value={this.state.desc} style={styles.inputModal} />
                    <TextButtonCE text={"VALIDER"} run={() => {
                        this.props.run(this.state.desc);
                        this.setState({modal: !this.state.modal});
                      }} />
                  </View>
                </View>
              </View>
            </Modal>
            <Image source={this.props.icon} style={styles.icon}/>
            <View style={styles.editBtn}>
              <TouchableOpacity onPress={() => this.setState({modal: !this.state.modal})}>
                <Text style={styles.textBtn}>AJOUTER MON COMPTE {this.props.type}</Text>
              </TouchableOpacity>
            </View>
          </View>
      );
    } else {
      return (
          <View style={styles.container}>
            <Modal animationType="fade" transparent={true} visible={this.state.modal}
              onRequestClose={() => this.setState({modal: !this.state.modal})}>
              <View style={styles.centerMe}>
                <View style={styles.popup}>
                  <View style={styles.topHeader}>
                    <Text style={styles.modalHeader}>AJOUTER UN LIEN</Text>
                    <TouchableOpacity  style={styles.closeIcon} onPress={() => this.setState({modal: !this.state.modal})}>
                      <FontAwesomeIcon size={20} color={'#fff'} icon={ faTimesCircle }/>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.modalContent}>
                    <TextInput onChangeText={(text) => {this.changeDesc(text)}}
                    value={this.state.desc} style={styles.inputModal} />
                    <TextButtonCE text={"VALIDER"} run={() => {
                        this.props.run(this.state.desc);
                        this.setState({modal: !this.state.modal});
                      }} />
                  </View>
                </View>
              </View>
            </Modal>
            <Image source={this.props.icon} style={styles.icon}/>
            <Text style={styles.modalLink} numberOfLines = {1}>{this.props.text}</Text>
            <View style={styles.editBtn}>
              <TouchableOpacity onPress={() => this.setState({modal: !this.state.modal})}>
                <Text style={styles.textBtn}>MODIFIER</Text>
              </TouchableOpacity>
            </View>
          </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  header: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "200",
    fontSize: 15,
    color: '#4f4f4f',
    paddingTop: 15,
    marginRight: '10%',
    width: '10%',
  },
  modalLink: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "200",
    fontSize: 15,
    color: '#4f4f4f',
    width: '50%',
  },
  txtinpt: {
    width: '60%',
  },
  icon: {
    width: 35,
    height: 35,
  },
  editBtn: {
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderColor: '#6C2BA1',
    marginLeft: 10
  },
  centerMe: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#0000003e'
  },
  textBtn: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "200",
    fontSize: 15,
    color: '#6C2BA1',
    paddingRight: 20,
    paddingLeft: 20
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
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
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
  inputModal: {
    borderBottomWidth: 1,
    width: '90%'
  }
});
