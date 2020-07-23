import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Input, Button, Text, Card, Overlay } from 'react-native-elements'
import api from '../api'
import AsyncStorage from '@react-native-community/async-storage';


const CreateGroup = (props) => {

    const [spinner, setSpinner] = useState(null);
    const [modalState, setModalState] = useState(true);
    const [groupName, setGroupName] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);



    useEffect(() => {
        setModalState(!modalState);

    }, [props.modal])

    const handleGroupInput = (e) => {
        setGroupName(e);
    }

    const handleSubmit = async() => {
        if (groupName.length<1) {
            return setErrorMessage('Group name is empty')
        }
        if(groupName. length < 5) {
            return setErrorMessage('Enter atleast 5 characters')
        }
        setErrorMessage(null);

        try {
            setSpinner(true);
            let auth_token = await AsyncStorage.getItem('billsplit_user_key');

            let response = await api.post('/groups',{
                auth_token:auth_token,
                group_name: groupName
            })

            console.log(response.data)

            if(response.data.success === true) {
                setSpinner(false);
                props.onPress();
                props.refresh();
                return  Alert.alert(
                    'Success',
                    'Group Created',
                    [
                        { text: 'OK' },
                    ],
                    { cancelable: false },
                );
            } else {
                setSpinner(false);
                return  Alert.alert(
                    'Error',
                    'Something went wrong !',
                    [
                        { text: 'OK' },
                    ],
                    { cancelable: false },
                );
            }
        } catch(err) {
            console.log(err.response.data)
            setSpinner(false);
            return  Alert.alert(
                'Error',
                'Something went wrong !!',
                [
                    { text: 'OK' },
                ],
                { cancelable: false },
            );
        }

    }


    return (
        <Overlay
            isVisible={true}
            windowBackgroundColor="rgba(255, 255, 255, .5)"
            overlayBackgroundColor="red"
            animationType='fade'
            onBackdropPress={props.onPress}

        >
            <View style={{ width: 300, marginBottom: 10 }}>
                <Text h4 style={{ marginHorizontal: 10, marginVertical: 10, fontWeight: '100' }}>New Group</Text>
                <Input
                    placeholder='Enter group name'
                    errorStyle={{ color: 'red' }}
                    errorMessage={errorMessage}
                    onChangeText={handleGroupInput}
                    disabled={spinner}
                />

                <Button
                    title="Create"
                    loading={spinner}
                    containerStyle={{ width: '40%', alignSelf: 'center' }}
                    raised={true}
                    onPress={handleSubmit}

                />

            </View>

        </Overlay>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
});

export default CreateGroup;
