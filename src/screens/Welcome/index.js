//import liraries
import React, { useEffect, useRef } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'

import { styles } from './style'
import { 
    GoogleButton, 
    Divided, 
    FacebookButton, 
    MailConnect 
} from '@components'
import { social_login, login_google } from '@store/auth/actionAuth';

const background_img = require('@assets/images/home_background.jpg');

// create a component
const WelcomeScreen = ({navigation}) => {

    const dispatch = useDispatch()
    const mounted = useRef();
    const url_social_login = useSelector(state => state.auth.social_login)
    const url_login_google = useSelector(state => state.auth.login_google)

    useEffect(() => {
        // fetch("https://welcome-ttp.com/auth/google", {
        // method: 'GET',
        // headers: {
        //     Accept: 'application/json',
        //     Connection: 'keep-alive',
        //     'Cache-Control': 'no-cache',
        // }
        // }).then((reponse) => {
        //     console.log("reponse", reponse)
        //     console.log("")
        // }).catch((error) => console.error(error));
        if (!mounted.current) {
            // do componentDidMount logic
            console.log("data login", url_login_google)
            mounted.current = true;
          } else {
            console.log("data login 1", url_login_google)
            // do componentDidUpdate logic
          }
        
    })

    

    return (
        <View style={styles.container}>
            {/* <Modal animationType="fade" transparent={true}
            visible={this.state.showModal} onRequestClose={() => {
              this.setState({showModal: false});
            }}>
            <WebView source={{ uri: this.state.callback_url }}
              ref={ ref => { this.webview = ref; }}
              injectedJavaScript={CHECK_COOKIE}
              onMessage={(event) => {
                const { data } = event.nativeEvent;
                if (data.includes('connect.sid')) {
                  const cookie = JSON.parse(data);

                  this.setState({showModal: false});
                  this.props.run(cookie["connect.sid"]);
                }
              }} sharedCookiesEnabled />
          </Modal> */}
            <ImageBackground 
                source={background_img}
                style={styles.back_images_container} 
                imageStyle={styles.back_images}
            >
                <View style={styles.miniContainerTop}>
                    <View>
                        <Text style={styles.header}>
                            Le charme de votre maison, C'est eux.
                        </Text>
                    </View>
                </View>
                <View style={styles.miniContainer}>
                    <FacebookButton onPress = {() => dispatch(social_login())} />
                    <GoogleButton onPress = {() => dispatch(login_google())} />
                </View>
                <View style={styles.miniContainer}>
                    <Divided />
                </View>
                <View style={styles.miniContainer}>
                    <MailConnect navigation = {navigation} />
                </View>
            </ImageBackground>
        </View>
    );
};

//make this component available to the app
export default WelcomeScreen;
