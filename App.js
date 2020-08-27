import React, { useEffect } from 'react';
import {StatusBar,SafeAreaView} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppLoading from './components/apploading'
import HomeScreen from './components/homepage/homepage'
import LoginPage from './components/login/login'
import ViewGroupPage from './components/viewGroup/viewgroup'
import DrawerNavigation from './components/drawerNavigation'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { navigationRef } from './RootNavigation';
import { ThemeProvider } from 'react-native-elements'
import codePush from "react-native-code-push";


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const theme = {
    colors: {
      primary: '#2196f3',
    },
    platform: {
      android: {
        primary:'#2196f3'
      }
    }
   
};


function App() {
  return (
    <SafeAreaView style={{flex:1}}>
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" backgroundColor='#2196f3' />
      <NavigationContainer ref={navigationRef}>
        <DrawerNavigation>
          <Stack.Navigator initialRouteName="LandingPage">
            <Stack.Screen name="LandingPage" component={AppLoading} options={{ headerShown: false }} />
            <Stack.Screen
              name="Login"
              component={LoginPage}
              options={
                {
                  headerShown:false,
                  headerStyle: {
                    backgroundColor: '#42a5f5'
                  },
                  headerTintColor: '#fff',

                }
              } />
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name ="ViewGroup" component={ViewGroupPage} options={{headerShown : false}} />

          </Stack.Navigator>
        </DrawerNavigation>
      </NavigationContainer>
    </ThemeProvider>
    </SafeAreaView>

  );
}

let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };

export default codePush(codePushOptions)(App);


