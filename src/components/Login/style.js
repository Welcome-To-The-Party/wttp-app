import { StyleSheet } from 'react-native';
import { colors } from '@styles'

export const styles = StyleSheet.create({
    container: {
      width: '100%',
      paddingTop: 15,
      borderRadius: 20,
    },
    header: {
      fontFamily: 'Roboto',
      fontStyle: 'italic',
      fontWeight: "700",
      fontSize: 25,
      color: '#000',
    },
    icon: {
      width: 30,
      height: 30,
      marginRight: 10,
    },
    loginButton: {
      marginTop: 20,
      marginBottom: 50,
      flexDirection: "row",
      width:'100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      fontFamily: 'Roboto',
      fontStyle: 'italic',
      fontWeight: "700",
      fontSize: 20,
    },
    text: {
      fontFamily: 'Roboto',
      fontStyle: 'italic',
      fontWeight: "300",
      fontSize: 20,
    },
    textInputLine: {
      marginTop: 10,
      fontSize: 18,
      height: 50,
      borderBottomWidth: 1,
      borderColor: "#361979"
    },
    btn__eyeIconStyle: {
      height: 40,
      width: 40,
      justifyContent: 'center',
      position: 'absolute',
      bottom: 0,
      right: 10,
    },
    btn: {
        backgroundColor: colors.PRIMARY,
        marginVertical: 20
    }
  });  