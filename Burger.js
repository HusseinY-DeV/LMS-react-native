import React from 'react';
import { SimpleLineIcons } from '@expo/vector-icons';


const Burger = (props) => {
    return ( 
        <>
            <SimpleLineIcons name="menu" size={24} color="white"
            onPress={() => props.navigation.toggleDrawer()}
            />
        </>
     );
}
 
export default Burger;