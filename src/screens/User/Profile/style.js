import { StyleSheet } from 'react-native';
import { colors } from '@styles'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
      },
      icon_social: {
        width: 50,
        height: 50,
      },
      dataContainer: {
        alignItems:'center',
        flexDirection: "column",
        width: '100%',
        height: '75%',
        bottom: 0,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        position: 'absolute',
        backgroundColor: '#fff',
      },
      headerCont: {
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 80,
      },
      gradeCont: {
        flexDirection: "row",
      },
      header_container: {
        width: '100%',
        height: '20%',
        marginBottom: 50,
      },
      background_img: {
        width: '100%',
        height: '100%',
      },
      icon: {
        width: 100,
        height: 100,
        borderRadius: 100
      },
      header: {
        fontFamily: 'Roboto',
        fontStyle: 'italic',
        fontWeight: "400",
        fontSize: 25,
        color: '#4f4f4f',
        paddingTop: 5,
      },
      statNum: {
        fontFamily: 'Roboto',
        fontStyle: 'italic',
        fontWeight: "700",
        fontSize: 30,
        color: '#4f4f4f',
      },
      statDesc: {
        fontFamily: 'Roboto',
        fontStyle: 'italic',
        fontWeight: "300",
        fontSize: 10,
        color: '#4f4f4f',
      },
      statDat: {
        justifyContent: 'center',
        alignItems: 'center',
    
        marginRight: 5,
        marginLeft: 5,
      },
      statCont: {
        flexDirection: 'row',
        bottom: 70,
      },
      infoCont: {
        bottom: 50,
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 20,
        width: '100%',
        left: 0
      },
      infoHeader: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: "500",
        fontSize: 17,
        color: '#4f4f4f',
        borderBottomWidth: 1,
        alignSelf: 'flex-start',
        borderColor: '#6C2BA1',
        marginBottom: 10
      },
      pictureCircle: {
        backgroundColor: '#6f6f6f8f',
        width: 100,
        height: 100,
        borderRadius: 100,
        top: 0,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 100,
      top: 0,
      position: 'absolute',
    },
    content_edit: {
      marginTop: -50
    },
    btn_edit: {
      backgroundColor: colors.PRIMARY
    },
    btn_back: {
      height: 40,
      width: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255, 0.3)',
      elevation: 20,
      marginTop: 40,
      marginLeft: 20
    }
});