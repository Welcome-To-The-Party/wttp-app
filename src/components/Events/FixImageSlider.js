import React from 'react';
import { Image, ScrollView, TouchableOpacity, StyleSheet, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faBars } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';

export default class FixImageSlider extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      sel: 0,
    };
  }

  render() {
    if(this.props.data == undefined) {
      return(<View></View>);
    }
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Image source={{uri: this.props.data[this.state.sel]}} style={styles.mainImg} />
          <ScrollView style={styles.scroller}>
            {this.props.data.map((data, key) => {
              if (key == this.state.sel) {
                return (<View key={key}></View>);
              } else {
                return (
                  <TouchableOpacity key={key} onPress={() => {this.setState({sel: key})}}>
                    <Image source={{uri: data}} style={styles.scrollImg} key={key} />
                  </TouchableOpacity>
                );
              }
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}

FixImageSlider.propTypes = {
  data: PropTypes.array,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: 250,
  },
  scroller: {
    height: 250,
  },
  row: {
    flexDirection: 'row',
    marginLeft: 5,
  },
  mainImg: {
    width: '70%',
    height: 250,
    borderRadius: 15,
  },
  scrollImg: {
    borderRadius: 15,
    marginLeft: 10,
    marginBottom: 10,
    width: 90,
    height: 90,
  }
});
