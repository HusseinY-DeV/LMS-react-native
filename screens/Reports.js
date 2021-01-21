import React from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../GlobalStyles';
import Header from './Header';




const Reports = (props) => {
    return ( 
        <View style={globalStyles.container}>
            <Header navigation={props.navigation} name="Reports" />
            <View style={globalStyles.content}>
                <Text>Hello World</Text>
            </View>
        </View>
     );
}
 
export default Reports;