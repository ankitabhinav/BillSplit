import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppLoading from './components/apploading'
import HomeScreen from './components/homepage'
import LoginPage from './components/login/login'
import DrawerNavigation from './components/drawerNavigation'
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <DrawerNavigation>
        <Stack.Navigator initialRouteName="LandingPage">
          <Stack.Screen name="LandingPage" component={AppLoading} options={{ headerShown: false }} />
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={
              {
                headerStyle: {
                  backgroundColor: '#42a5f5'
                },
                headerTintColor: '#fff',
                
              }
            } />
        </Stack.Navigator>
      </DrawerNavigation>
    </NavigationContainer>
  );
}

export default App;


