import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Image, Alert, TouchableHighlight, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerLayoutAndroid } from 'react-native';
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DrawerItem from './drawerItem'
import AsyncStorage from '@react-native-community/async-storage';



const Navigation = (props) => {



    const [visible, setVisible] = useState(true);

    const [loggedInUser, setLoggedInUser] = useState(null);
    const [drawerState, setDrawerState] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    var _drawer = useRef(null);

    useEffect(() => {


    }, [])

    const onDrawerOpen = async() => {
        let data = await AsyncStorage.getItem('billsplit_user_key');
        if (data) {
            setIsLoggedIn(true);

        } else {
            setIsLoggedIn(false);
        }
    }

    const openDrawerNavigation = () => {
        _drawer.openDrawer();
    }
    const closeDrawerNavigation = () => {
        _drawer.closeDrawer();
    }

    const handleDrawerClose = () => {
        console.log('drawer closed')
    }

    const confirmLogOut = () => {
        closeDrawerNavigation();
        Alert.alert(
            'Warning',
            'Are you sure you want Logout ?',
            [
                { text: 'Cancel' },
                { text: 'OK', onPress: () => handleLogOut() },

            ],
            { cancelable: false },
        );
    }

    const handleLogOut = async() => {
        try {
            let del = await AsyncStorage.removeItem('billsplit_user_key');
        } catch(err) {
            Alert.alert(
                'Error',
                'Logout Failed try again',
                [
                    { text: 'OK' },
    
                ],
                { cancelable: false },
            );
        }
    }




    var navigationView = (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>

            <View style={{flexDirection:'row',marginVertical:10}}>
                <Image
                    style={{ height: 85, width: 86, padding: '1%', marginTop: '4%', marginLeft: '5%', borderRadius: 0, marginBottom: '1%' }}
                    source={{ uri: 'https://i.ibb.co/2YNxscS/billsplit-icon.png' }}

                />
                <Text style={{ color: 'black', marginTop: 25, marginLeft: '5%',fontSize:20 }}>BillSplit</Text>
            </View>
            <DrawerItem
                name='Home'
                icon='home'
                iconType='material-community'
                onPress={() => console.log('pressed')}
            />
            <DrawerItem
                name='Account'
                icon='face'
                iconType='material-community'
                onPress={() => console.log('pressed')}
            />
            {!isLoggedIn &&
                <DrawerItem
                name='Log In'
                icon='login'
                iconType='material-community'
                onPress={() => console.log('pressed')}
            />
            }
            
            {isLoggedIn &&
                <DrawerItem
                name='Log Out'
                icon='logout'
                iconType='material-community'
                onPress={confirmLogOut}
            />
            }
            


        </View>
    );



    return (


        <DrawerLayoutAndroid
            drawerWidth={300}
            drawerPosition="left"
            ref={(DrawerLayoutAndroid) => { _drawer = DrawerLayoutAndroid }}
            drawerBackgroundColor="rgba(1,5,7,0.5)"
            renderNavigationView={() => navigationView}
            onDrawerClose={handleDrawerClose}
            onDrawerOpen={onDrawerOpen}
        >
            {props.children}

        </DrawerLayoutAndroid>



    );

}
export default Navigation;
