import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '@styles'

export const styles = StyleSheet.create({
    container: {
      flex:1,
      paddingHorizontal: 20,
    },
    header: {
      marginLeft: 10,
      marginBottom: 10,
      fontFamily: 'Roboto',
      fontStyle: 'italic',
      fontWeight: "700",
      fontSize: 20,
      color: '#4F4F4F',
    },
    header2: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: "400",
      fontSize: 16,
      marginVertical: 10,
      color: '#4F4F4F',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      // justifyContent: 'center',
      // marginTop: 10,
      marginBottom: 10,
    },
    input: {
        flex: 1,
        borderBottomColor: colors.PRIMARY,
        borderBottomWidth: 1,
    },
    inputGoogle: {
      marginTop: 10,
      marginBottom: 10,
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: "400",
      fontSize: 20,
      borderColor: '#4F4F4F',
      backgroundColor: '#F9F9F9',
      borderBottomWidth: 1
    },
    banner: {
      width: '100%',
      height: 100,
      borderRadius: 10,
    },
    btnNextStep: {
        backgroundColor: colors.PRIMARY
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
      width: '85%',
      height: 450,
      borderRadius: 20,
    },
    topHeader: {
      backgroundColor: '#361979',
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      flexDirection: 'row',
      paddingHorizontal: 20,
      alignItems: 'center',
      height: '20%',
      width: '100%',
    },
    closeIcon: {
     
    },
    modalHeader: {
      flex: 1,
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: "200",
      fontSize: 15,
      color: '#fff',
    },
    modalContent: {
      marginTop: 30,
      width: '100%',
      paddingHorizontal: 20
    },
    inputModal: {
      borderBottomWidth: 1,
      width: '90%'
    },
    container_modal: {
      margin: 0
    }
  });
  