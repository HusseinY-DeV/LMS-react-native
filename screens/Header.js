import React from 'react';
import { Text, View , StyleSheet } from 'react-native';
import Burger from '../Burger';




const Header = (props) => {
    return ( 
        <View style={styles.header}>
            <Burger navigation={props.navigation} />
            <Text style={{textTransform:'uppercase',color:'white'}}>{ props.name }</Text>
        </View>
     );
}
 
export default Header;


const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#007fff',
        padding: 10,
        borderRadius: 5
    }
})