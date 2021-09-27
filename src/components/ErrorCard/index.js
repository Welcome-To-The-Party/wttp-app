import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image, Dimensions } from 'react-native';

export default class ErrorCard extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      event: undefined,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.imgBtn}>
          <Image source={this.props.img} style={styles.proIcon}/>
        </TouchableOpacity>
        <View style={styles.row}>
          <Text style={styles.header}>{this.props.text}</Text>
        </View>
        <TouchableOpacity onPress={this.props.navigateHome}>
          <Text style={styles.header2}>RETOUR À L’ACCUEIL</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 50,
    height: 400,
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 10
  },
  proIcon: {
    width: '100%',
    height: 250,
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
    fontSize: 20,
    color: '#4f4f4f',
  },
  header2: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "200",
    fontSize: 16,
    marginLeft: 15,
    marginTop: 10,
    color: '#4f4f4f',
    width: 180,
    borderBottomWidth: 1,
  },
  
});

