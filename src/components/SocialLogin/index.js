//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { WebView } from 'react-native-webview';
import { LOGIN_FACEBOOK, LOGIN_GOOGLE } from '../../store/auth/type';

const CHECK_COOKIE = `
  ReactNativeWebView.postMessage(document.getElementsByTagName("pre")[0].innerHTML);
  true;
`;

// create a component
const SocialLogin = ({url, network}) => {

    const dispatch = useDispatch()
    
    return (
        <Modal 
            animationType="fade" 
            transparent={true}
            visible={url?true:false} 
            onRequestClose={() => {
                dispatch({type: network == "google"?`${LOGIN_GOOGLE}_SUCCESS`:`${LOGIN_FACEBOOK}_SUCCESS` })
            }}
        >
                <WebView source={{ html:  url }}
                    injectedJavaScript={CHECK_COOKIE}
                    onMessage={(event) => {
                        const { data } = event.nativeEvent;
                        console.log("auth social", data)
                    }} 
                    sharedCookiesEnabled 
                />
        </Modal>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default SocialLogin;
