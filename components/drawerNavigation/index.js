import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Image, Alert, TouchableHighlight, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerLayoutAndroid } from 'react-native';
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DrawerItem from './drawerItem'

const Navigation = (props) => {



    const [visible, setVisible] = useState(true);

    const [loggedInUser, setLoggedInUser] = useState(null);
    const [state, setState] = useState(false);
    var _drawer = useRef(null);

    useEffect(() => {


    }, [])



    const openDrawerNavigation = () => {
        _drawer.openDrawer();
    }

    const handleDrawerClose = () => {
        console.log('drawer closed')
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
            <DrawerItem
                name='Log In'
                icon='login'
                iconType='material-community'
                onPress={() => console.log('pressed')}
            />


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
        >
            {props.children}

        </DrawerLayoutAndroid>



    );

}
export default Navigation;
