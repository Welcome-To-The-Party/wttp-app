import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#6C2BA1',
    },
    back_images: {
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        height: '70%',
    },
    back_images_container: {
        width: Dimensions.get("window").width,
        height: '100%',
        paddingHorizontal: 20
    },
    miniContainerTop: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        marginBottom: 70
    },
    miniContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '5%',
    },
    header: {
        fontFamily: 'Roboto',
        fontStyle: 'italic',
        fontWeight: "700",
        fontSize: 30,
        color: '#fff',
        marginLeft: 10
    }
});