import { StyleSheet } from 'react-native';
import { colors } from '@styles'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    content_wrapper: {
        flex: 1,
        // marginTop: -30
    },
    header_content: {
        height: 200,
        borderRadius: 10,
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    headerImg: {
        height: 200,
        width: '100%'
    },
    header_radius_img: {
        borderRadius: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        borderBottomColor: colors.PRIMARY,
        borderBottomWidth: 1,
        alignSelf: 'flex-start',
        marginVertical: 10
    },
    bigHeader: {
        fontSize: 17,
        textAlign: 'center',
        textTransform: 'uppercase',
        color: colors.WHITE,
        marginTop: 40
    },
    subTitle: {
        color: "#eee",
        textAlign: 'center',
        fontSize: 10
    },
    btn_textStyle: {
        fontStyle: 'italic',
        fontWeight: "700", 
    },
    btn: {
        backgroundColor: colors.PRIMARY,
        width: 300
    }
});