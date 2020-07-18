import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppLoading from './components/apploading'
import HomeScreen from './components/homepage'
import DrawerNavigation from './components/drawerNavigation'
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <DrawerNavigation>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={AppLoading} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={HomeScreen} />
      </Stack.Navigator>
      </DrawerNavigation>
    </NavigationContainer>
  );
}

export default App;


