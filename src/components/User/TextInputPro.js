import * as React from 'react';
import { StyleSheet, Image, Text, TouchableOpacity, TextInput, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import PropTypes from 'prop-types';

const iconSize = 20;

export default class TextInputPro extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      desc: this.props.desc
    };
    this.changeDesc = this.changeDesc.bind(this);
  }

  changeDesc(data) {
    this.setState({desc: data});
    this.props.run(data);
  }

  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.header}>{this.props.text}</Text>
          <TextInput value={this.state.desc}
            style={styles.txtinpt} onChangeText={(data) => this.changeDesc(data)}/>
          <View style={styles.icon}>
            <TouchableOpacity onPress={() => {this.changeDesc('')}}>
              <FontAwesomeIcon size={iconSize} icon={ faTimesCircle } color={"rgba(0, 0, 0, 0.54)"} />
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}

TextInputPro.propTypes = {
  text: PropTypes.string,
  desc: PropTypes.string,
  run: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    marginTop: 0,
    marginBottom: 0,
  },
  header: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "400",
    fontSize: 15,
    color: '#4f4f4f',
    paddingTop: 15,
    marginRight: '5%',
    width: '30%',
  },
  txtinpt: {
    width: '50%',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  }
});
