import { StyleSheet } from 'react-native';



export const globalStyles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    content: {
        marginTop: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: "#E4E4E4",
        borderRadius: 5,
        height : 300,
    },
    text: {
        fontSize: 16,
        fontWeight: '500',
        color: 'black',
        textAlign: 'center'
    },
    select: {
        position: 'relative',
        textAlign: 'center'
    },
    students: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    status: {
        fontSize: 16,
        fontWeight: '500',
        marginVertical:10,
        color: '#007fff',
        textAlign: 'center'
    },
    input: {
        fontSize: 16,
        padding: 10,
        marginVertical: 15,
        outline: 'none',
        backgroundColor: 'gray',
        borderRadius: 3,
        color: 'white'

    },
    btn: {
        width: 100,
        marginHorizontal: 'auto',
        backgroundColor: '#3083FF',
        padding: 10,
        borderRadius: 4,
    }
}) 