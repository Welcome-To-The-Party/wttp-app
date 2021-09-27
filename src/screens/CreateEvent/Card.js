//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { useSelector, useDispatch } from 'react-redux'

import { create_stripe_account, get_stripe_dashboard } from '@store/stripe/actionStripe';
import { Loading } from '@components'

// create a component
const Card = () => {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const stripeAccountID = useSelector(state => state.user.user.data.stripeAccountID)
  const { url } = useSelector(state => state.stripe);

  useEffect(() => {
    if(stripeAccountID != undefined && stripeAccountID.length > 0)
      dispatch(get_stripe_dashboard())
    else
      dispatch(create_stripe_account())
  },[])

  return (
    <View style={styles.container}>
      {
        loading?
        <View style = {styles.loading}>
          <Loading />
        </View>:null
      }
      <WebView 
        source={{ uri: url}}
        onLoadEnd = {() => setLoading(false)}
        useWebKit={true}
        startInLoadingState={true}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  loading: {
   flex: 1,
   width: '100%',
   position: 'absolute',
   elevation: 200
  }
});

//make this component available to the app
export default Card;
