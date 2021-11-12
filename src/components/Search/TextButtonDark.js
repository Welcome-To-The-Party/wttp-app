import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import PropTypes from 'prop-types';

export default class TextButtonCE extends React.Component
{
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.opacity} onPress={this.props.run}>
            <Text style={styles.buttonText}>{this.props.text}</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

TextButtonCE.propTypes = {
  text: PropTypes.string,
  run: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 50,
    backgroundColor: '#361979',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
  opacity: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
   
    fontStyle: 'italic',
    fontWeight: "700",
    color: "#fff",
    fontSize: 20,
  },
});
