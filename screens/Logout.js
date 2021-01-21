import React from 'react';
import { Text, View, TouchableOpacity, Touchable } from 'react-native';
import { globalStyles } from '../GlobalStyles';


const Logout = (props) => {
    return ( 
        <View style={globalStyles.container}>
            <Text style={globalStyles.status}>Are you sure you want to logout ?</Text>
            
            <TouchableOpacity
                style={globalStyles.btn}    
                onPress={() => {
                    props.setToken(false);
            }}
            >
                <Text style={globalStyles.text}>Log out</Text>
            </TouchableOpacity>
    </View>
     );
}
 
export default Logout;