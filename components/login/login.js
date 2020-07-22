import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Input, Button, Text } from 'react-native-elements'
import api from '../api'
import AsyncStorage from '@react-native-community/async-storage';



const Login = () => {
    const input = React.createRef();
    const [emailFocus, setEmailFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    useEffect(() => {
        console.log('login page loaded')
        checkLocalStorage();


    }, [])

    const checkLocalStorage = async () => {
        let data = await AsyncStorage.getItem('billsplit_user_key');
        if (data) {
            setIsLoggedIn(true);
            console.log('user found in local storage')

        } else {
            setIsLoggedIn(false);
            console.log('user not found in local storage')
        }
    }

    const handleEmail = (e) => {
        setEmail(e);
    }
    const handlePassword = (e) => {
        setPassword(e);
    }

    function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        
        return (false)
    }

    const handleLogin = async () => {
        setSpinner(true);
        console.log('Email :' + email + '  Password:' + password)
        if (email === null || password === null) {
            setSpinner(false);
            return alert('enter email and password to continue');
        }

        if(!ValidateEmail(email)) {
            setSpinner(false);
            return alert("You have entered an invalid email address!");
        }
        
        try {
            let response = await api.post('/login', {
                email: email,
                password: password
            });

            if (response.data.status === 'login successful') {
                Alert.alert(
                    'Success',
                    "Login Successful",
                    [
                        { text: 'OK' },
                    ],
                    { cancelable: false },
                );
                try {
                    let key = await AsyncStorage.setItem('billsplit_user_key', response.data.jwt);
                    let email = await AsyncStorage.setItem('billsplit_user_email', response.data.email);
                } catch (err) {
                    console.log(err);
                }
            }
            console.log(response.data);

        }
        catch (err) {
            console.log(err.response.data);
            Alert.alert(
                'Error',
                err.response.data.status,
                [
                    { text: 'OK' },
                ],
                { cancelable: false },
            );

        }

        setSpinner(false);

    }



    return (
        <React.Fragment>
            {!isLoggedIn &&

                <View style={styles.container}>
                    <View style={{ marginTop: 30, marginHorizontal: 10 }}>
                        <Input
                            placeholder='email@address.com'
                            leftIcon={{ type: 'material-community', name: 'email', color: emailFocus ? '#42a5f5' : '#607d8b' }}
                            label="Your Email Address"
                            labelStyle={{ color: emailFocus ? '#42a5f5' : '#607d8b' }}
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                            inputContainerStyle={{ borderBottomColor: emailFocus ? '#42a5f5' : '##0a4ae' }}
                            onChangeText={handleEmail}
                        />
                        <Input
                            placeholder='Password'
                            leftIcon={{ type: 'material-community', name: 'lock', color: passwordFocus ? '#42a5f5' : '#607d8b' }}
                            label="Password"
                            secureTextEntry={true}
                            labelStyle={{ color: passwordFocus ? '#42a5f5' : '#607d8b' }}
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                            inputContainerStyle={{ borderBottomColor: passwordFocus ? '#42a5f5' : '#90a4ae' }}
                            onChangeText={handlePassword}
                        />
                        <Button
                            title="Login"
                            loading={spinner}
                            containerStyle={{ width: '40%', alignSelf: 'center' }}
                            raised={true}
                            onPress={handleLogin}

                        />
                    </View>

                </View>
            }
            {isLoggedIn &&
                <Text>Already Logged In</Text>
            }
        </React.Fragment>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
});

export default Login;