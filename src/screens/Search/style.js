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
    },
    section_title: {
        fontSize: 20,
        marginTop: 20,
        fontWeight: 'bold'
    },
    section_subTitle: {
        color: '#777',
        marginBottom: 20
    },
    card_image: {
        borderRadius: 20
    },
    card: {
        height: 400,
        borderRadius: 10,
        marginVertical: 20
    },
    card_header: {
        backgroundColor: colors.PRIMARY,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 10
    },
    card_header_title: {
        color: '#fff',
        textAlign: 'center',
        marginTop: 10
    },
    card_body_image: {
        height: 400,
        width: '100%',
    },
    card_header_btn: {
        width: 250,
        alignSelf: 'center'
    }
});