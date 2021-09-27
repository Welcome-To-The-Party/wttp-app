import { StyleSheet } from 'react-native';
import { colors } from '@styles'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header_container: {
        width: '100%',
        height: 100,
        marginBottom: 20,
    },
    background_img: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    headerError: {
        color: "#000",
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 50,
        width: '100%',
    },
    icon: {
        width: 100,
        height: 100,
    },
    errorCont: {
        width: '100%',
        height: '100%',
        top: -110,
        borderTopRightRadius: 25,
        paddingTop: '30%',
        overflow: 'hidden',
        borderTopLeftRadius: 25,
    },
    headerError2: {
        color: "#fff",
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 50,
        width: '60%',
    },
    header: {
        color: "#fff",
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        width: '100%',
    },
    dataContainer: {
        backgroundColor: '#fff',
        top: -120,
        width: '100%',
        height: '80%',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
    },
    scrollData: {
        width: '100%',
        marginTop: 10,
    },
    btn: {
        marginHorizontal: 20
    },
    content: {
        paddingHorizontal: 20
    }
});