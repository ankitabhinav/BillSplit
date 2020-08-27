import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Input, Button, Text } from 'react-native-elements'
//import api from '../api'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { TouchableOpacity } from 'react-native';
import { useLinkProps } from '@react-navigation/native';

const Register = (props) => {
    const input = React.createRef();
    const [emailFocus, setEmailFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);
    const [spinner, setSpinner] = useState(false);

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);


    useEffect(() => {

        console.log('register page loaded')

    }, [])


    const handleEmail = (e) => {
        setEmail(e);
    }
    const handlePassword = (e) => {
        setPassword(e);
    }

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e);
    }

    function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }

        return (false)
    }

    const handleRegister = async () => {
        setSpinner(true);
        console.log('Email :' + email + '  Password:' + password + 'confirm password:' +confirmPassword)
        if (email === null || password === null || confirmPassword == null) {
            setSpinner(false);
            return alert('enter email and password and confirm password to continue');
        }

        if (!ValidateEmail(email)) {
            setSpinner(false);
            return alert("You have entered an invalid email address!");
        }

        if(password !== confirmPassword) {
            setSpinner(false);
            return alert('Passwords do not match !')
        }
        try {
            let response = await axios.post('https://secure-notes-backend.herokuapp.com/register', {
                name: email.split('@')[0],
                email: email,
                password: password,
                secret_key: '12345'
            });

            if (response.data.status === 'registered successfully') {
                console.log(response.data);
                setSpinner(false);
                props.handlePress();
                return Alert.alert(
                    'Success',
                    "Registered Successfully",
                    [
                        { text: 'OK' },
                    ],
                    { cancelable: false },
                );

            } else {
                setSpinner(false);

                return Alert.alert(
                    'Error',
                    "something went wrong",
                    [
                        { text: 'OK' },
                    ],
                    { cancelable: false },
                );
            }

        }
        catch (err) {
            if (err.response) {
                setSpinner(false);
                console.log(err.response.data);
                return Alert.alert(
                    'Error',
                    err.response.data.status,
                    [
                        { text: 'OK' },
                    ],
                    { cancelable: false },
                );
            } else {
                setSpinner(false);
                return Alert.alert(
                    'Error',
                    "something went wrong",
                    [
                        { text: 'OK' },
                    ],
                    { cancelable: false },
                );
            }

        }
    }



    return (
        <React.Fragment>

            <View style={{ flexDirection: 'column', width: '100%', flex: 1, backgroundColor: '#fff' }}>
                <View style={{ marginTop: 20, marginHorizontal: 10 }}>
                    <Text h3 style={{ marginHorizontal: 10, marginVertical: 10 }}>Register</Text>

                    <Input
                        placeholder='email@address.com'
                        leftIcon={{ type: 'material-community', name: 'email', color: emailFocus ? '#42a5f5' : '#607d8b' }}
                        label="Your Email Address"
                        labelStyle={{ color: emailFocus ? '#42a5f5' : '#607d8b' }}
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                        inputContainerStyle={{ borderBottomColor: emailFocus ? '#42a5f5' : '##0a4ae' }}
                        onChangeText={handleEmail}
                        disabled={spinner}
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
                        disabled={spinner}

                    />

                    <Input
                        placeholder='Confirm Password'
                        leftIcon={{ type: 'material-community', name: 'lock', color: confirmPasswordFocus ? '#42a5f5' : '#607d8b' }}
                        label="Confirm Password"
                        secureTextEntry={true}
                        labelStyle={{ color: confirmPasswordFocus ? '#42a5f5' : '#607d8b' }}
                        onFocus={() => setConfirmPasswordFocus(true)}
                        onBlur={() => setConfirmPasswordFocus(false)}
                        inputContainerStyle={{ borderBottomColor: confirmPasswordFocus ? '#42a5f5' : '#90a4ae' }}
                        onChangeText={handleConfirmPassword}
                        disabled={spinner}

                    />
                    <Button
                        title="Register"
                        loading={spinner}
                        containerStyle={{ width: '40%', alignSelf: 'center' }}
                        raised={true}
                        onPress={handleRegister}

                    />
                    <TouchableOpacity onPress={props.handlePress}>
                             <Text style={{ alignSelf: 'center', marginVertical: 20, color: 'blue' }}>Already Regsitered ? Log In</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </React.Fragment>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
});

export default Register;
