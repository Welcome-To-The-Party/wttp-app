import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex:1,
      paddingHorizontal: 20
    },
    containerCenter: {
      flex: 1,
      alignItems: "center",
      justifyContent: 'center',
    },
    headerContainer: {
      marginBottom: 15,
      paddingLeft: 15,
      marginTop: 35,
      flexDirection: 'row',
      alignItems: 'center',
    },
    dataContainer: {
      width: '100%',
      paddingLeft: 15,
      paddingRight: 15,
      marginTop: 15,
      paddingBottom: 15,
    }
})