import { StyleSheet } from 'react-native';
import { colors } from '@styles'

export const styles = StyleSheet.create({
    container: {
      flex:1,
      flexDirection: "column",
    },
    back_images_container: {
      width: '100%',
      height: '100%',
    },
    icon: {
      width: 65,
      height: 65,
      borderRadius: 15,
      marginBottom: 20
    },
    miniContainer: {
      flexDirection: "column",
      width: '100%',
      marginTop: 20,
      marginBottom: 20,
      marginLeft: 30,
    },
    header: {
     
      fontStyle: 'italic',
      fontWeight: "700",
      fontSize: 35,
      color: '#fff',
    },
    createContainer: {
        padding: 20,
        borderTopRightRadius: 60,
        borderTopLeftRadius: 60,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
    containerScrollView: {

    }
  });
  