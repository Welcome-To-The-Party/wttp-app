import { StyleSheet } from 'react-native';
import { colors } from '@styles'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header_container: {
        width: '100%',
        height: '20%',
        marginBottom: 50,
    },
    background_img: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pro_icon: {
        width: 100,
        height: 100,
        borderRadius: 100,
        top: '50%',
    },
    pictureCircle: {
        backgroundColor: '#6f6f6f8f',
        width: 100,
        height: 100,
        borderRadius: 100,
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
       
        fontStyle: 'italic',
        fontWeight: "700",
        fontSize: 20,
        color: '#4f4f4f',
        marginLeft: 30,
        marginBottom: 20,
    },
    btn: {
        backgroundColor: colors.PRIMARY
    },
    content: {
        paddingHorizontal: 20
    }
});