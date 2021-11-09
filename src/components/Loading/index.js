import * as React from 'react';
import { StyleSheet, TouchableOpacity, View, Animated, Image, Easing } from 'react-native';

const loading_img = require('@assets/images/loading.png');

export default class Loading extends React.Component
{
  constructor(props) {
    super(props);

    this.RotateValueHolder = new Animated.Value(0);

    this.StartImageRotateFunction = this.StartImageRotateFunction.bind(this);
  }

  componentDidMount() {
    this.StartImageRotateFunction();
  }

  StartImageRotateFunction () {
    this.RotateValueHolder.setValue(0)
    Animated.timing(this.RotateValueHolder, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(() => this.StartImageRotateFunction())
  }

  render() {
   const RotateData = this.RotateValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    });

    return (
        <View style={styles.container}>
            <Animated.Image style={{
              width: 50,
              height: 50,
              transform: [{rotate: RotateData}]
            }} source={loading_img} />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 70,
    backgroundColor: '#6C2BA1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    marginLeft: 15,
    marginBottom: 15,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    top: 0,
    right: 0,
    position: 'absolute',
    elevation: 20,
    zIndex: 3
  },
});
