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
        width: '100%',
        height: '75%',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#fff',
      },
      headerCont: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        zIndex: 1
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
        borderRadius: 50
      },
      header: {
       
        fontStyle: 'italic',
        fontWeight: "400",
        fontSize: 25,
        color: '#4f4f4f',
        paddingTop: 5,
      },
      statNum: {
       
        fontStyle: 'italic',
        fontWeight: "700",
        fontSize: 30,
        color: '#4f4f4f',
      },
      statDesc: {
       
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
        marginTop: 120
      },
      infoCont: {
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 20,
        width: '100%',
        left: 0
      },
      infoHeader: {
       
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
      marginTop: 50
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
    },
    content_avatar: {
     
    }
});