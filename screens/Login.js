import React, { useState, useEffect } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import { globalStyles } from '../GlobalStyles';


const Login = (props) => {
const [email,setEmail] = useState('');
const [password,setPassword] = useState('');
const [error,setError] = useState(null);
    const loginAdmin = async () => {
    console.log(email);
    console.log(password);
    let response = await fetch ('http://192.168.1.73:8000/api/admins/login', { 
    method: 'post',
     headers: { 'content-type':'application/json'
 
      },
      body: JSON.stringify(
      {  
        email: email
        , password: password
      })
    });
    let data = await response.json()
    console.log(data);
    if (data.error) {
        setError('Invalid Email or Password');
        setPassword('');
      return
    }
    props.setToken(data.access_token)
   }
    return ( 
        <View style={globalStyles.container}>
            <Text style={{textAlign:'center',color:'red',fontSize:18}}> {error}</Text>
            <TextInput
                onChangeText={value => {
                    setEmail(value);
                }}
                value = {email}
                placeholder="Email Address"
                style={globalStyles.input}
                placeholderTextColor="white"
            />
            <TextInput 
                onChangeText={value => {
                    setPassword(value);
                    setError('');
                }}
             value = {password}
             placeholder="Password" secureTextEntry={true}
                style={globalStyles.input}
                placeholderTextColor="white"

            />
            <Button
             onPress = 
                {loginAdmin}
                title="Log in"
        
            ></Button>
    </View>
     );
}
 
export default Login;