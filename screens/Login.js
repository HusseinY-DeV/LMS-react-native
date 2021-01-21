import React from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import { globalStyles } from '../GlobalStyles';


const Login = (props) => {
    return ( 
        <View style={globalStyles.container}>
            <TextInput placeholder="Email Address"
                style={globalStyles.input}
                placeholderTextColor="white"
            />
            <TextInput placeholder="Password" secureTextEntry={true}
                style={globalStyles.input}
                placeholderTextColor="white"

            />
            <TextInput />
            <Button title="Log in"
                onPress={() => {
                    props.setToken(true);
            }}
            ></Button>
    </View>
     );
}
 
export default Login;




