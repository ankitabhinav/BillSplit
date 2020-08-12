import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Input, Button, Text, Card, Overlay } from 'react-native-elements'
import api from '../api'
import AsyncStorage from '@react-native-community/async-storage';


const AddMember = (props) => {

    const [spinner, setSpinner] = useState(null);
    const [modalState, setModalState] = useState(true);
    const [memberEmail, setMemberEmail] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);



    useEffect(() => {
        setModalState(!modalState);

    }, [props.modal])

    const handleMemberInput = (e) => {
        setMemberEmail(e);
    }

    const handleSubmit = async() => {
        if ( memberEmail === null || memberEmail.length<1) {
            return setErrorMessage('Member email is empty')
        }
        if(memberEmail.length < 5) {
            return setErrorMessage('Enter atleast 5 characters')
        }
        setErrorMessage(null);

        console.log('member : '+memberEmail + 'id : '+props.group_id)

        try {
            setSpinner(true);

            let response = await api.post('/groups/member/add',{
                group_id: props.group_id,
                member : memberEmail
            })

            console.log(response.data)

            if(response.data.success === true) {
                setSpinner(false);
                props.onPress();
                props.refresh();
                return  Alert.alert(
                    'Success',
                    'Member Added',
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
                <Text h4 style={{ marginHorizontal: 10, marginVertical: 10, fontWeight: '100' }}>Add Member</Text>
                <Input
                    placeholder='Enter member email adress'
                    errorStyle={{ color: 'red' }}
                    errorMessage={errorMessage}
                    onChangeText={handleMemberInput}
                    disabled={spinner}
                />

                <Button
                    title="Add"
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

export default AddMember;
