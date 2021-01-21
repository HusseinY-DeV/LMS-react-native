import React from 'react';
import { StyleSheet, Text, View , Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Attendance from './screens/Attendance';
import Reports from './screens/Reports';
import Login from './screens/Login';
import Logout from './screens/Logout';



const Drawer = createDrawerNavigator();


function DrawerNavigator({setToken}) {
  return (
      <Drawer.Navigator>
        <Drawer.Screen component={Attendance} name="Attendance"/>
        <Drawer.Screen component={Reports} name="Reports"/>
        <Drawer.Screen name="Logout">
           {props => <Logout {...props} setToken={setToken} />}
        </Drawer.Screen>
      </Drawer.Navigator>
  );
}

const Auth = createStackNavigator();

function AuthNavigator({setToken}) {
  return (
    <Auth.Navigator>
      <Auth.Screen name="Login" options={{title:"StudyBuddy Log in",headerTitleAlign:'center' ,headerTintColor:'black'}}>
          {props => <Login {...props} setToken={setToken} />}
      </Auth.Screen>
  </Auth.Navigator>
  )
}


export default function App() {
  const [token, setToken] = React.useState(false);
  return (
    <NavigationContainer>
      {token ? <DrawerNavigator setToken={setToken} /> : <AuthNavigator setToken={setToken} />}
    </NavigationContainer>
  );
}

