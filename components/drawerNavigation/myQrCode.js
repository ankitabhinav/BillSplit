import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert,Image } from 'react-native';
import { Input, Button, Text, Card, Overlay } from 'react-native-elements'
import api from '../api'
import AsyncStorage from '@react-native-community/async-storage';
import { greaterOrEq } from 'react-native-reanimated';


const MyQrCode = (props) => {

    const [email,setEmail] = useState(null);

    const getEmail = async() => {
        let emailAddress = await AsyncStorage.getItem('billsplit_user_email');
        setEmail(emailAddress);

    }

    useEffect(() => {
        getEmail();
    },[])

    return (
        <Overlay
            isVisible={true}
            windowBackgroundColor="rgba(255, 255, 255, .5)"
            overlayBackgroundColor="red"
            animationType='fade'
            onBackdropPress={props.onPress}

        >
            <View style={{ width: 300, marginBottom: 10, justifyContent: 'center', }}>
                <Text h4 style={{ marginHorizontal: 10, marginVertical: 10, fontWeight: '100' }}>My QR Code</Text>
               {email &&
                <View style={{ flexDirection: 'row', marginVertical: 10,justifyContent:'center', marginVertical:30 }}>
                    <Image
                        style={{ height: 200, width: 200}}
                        source={{ uri:'http://api.qrserver.com/v1/create-qr-code/?data='+email+'&size=200x200'}}

                    />
                </View>
                }

            </View>

        </Overlay>
    )
}





export default MyQrCode;
