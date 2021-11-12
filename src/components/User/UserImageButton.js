import * as React from 'react';
import { StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

const iconSize = 20;

export default class UserImageButton extends React.Component
{
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.opacity} onPress={this.props.onPress}>
            <Image source={this.props.image} style={styles.icon} />
            <View style={styles.separator}>
              <Text style={styles.buttonText}>{this.props.text}</Text>
              <Text style={styles.buttonDesc}>{this.props.desc}</Text>
            </View>
            <FontAwesomeIcon size={iconSize} style={styles.icons} icon={ faChevronRight}/>
          </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 15,
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 100,
    marginRight: 10,
  },
  icons: {
    color: "#6C2BA1",
    fontSize: 5,
  },
  opacity: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
   
    fontStyle: 'italic',
    fontWeight: "300",
    color: "#4f4f4f",
    fontSize: 15,
  },
  buttonDesc: {
   
    fontStyle: 'italic',
    fontWeight: "300",
    color: "#4f4f4f",
    fontSize: 10,
  },
  separator: {
    borderBottomWidth: 1,
    flex: 1,
    paddingBottom: 10
  }
});
