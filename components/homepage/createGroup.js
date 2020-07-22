import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Input, Button, Text, Card, Overlay } from 'react-native-elements'
import api from '../api'
import AsyncStorage from '@react-native-community/async-storage';


const CreateGroup = (props) => {

    const [spinner, setSpinner] = useState(null);
    const [modalState, setModalState] =useState(false);


    useEffect(() => {
        setModalState(!modalState);
        
    }, [props.modal])

    const handleGroupInput = () => { 

    }

    const handleSubmit = () => {
        
    }

    const toggleModalState = () => {
        setModalState(!modalState);
    }


    return (
            <Overlay
                isVisible={modalState}
                windowBackgroundColor="rgba(255, 255, 255, .5)"
                overlayBackgroundColor="red"
                animationType='fade'
                onBackdropPress={() => toggleModalState}

            >
                <View style={{ width: 300 }}>
                    <Input
                        placeholder='your group name goes here'

                        onChangeText={handleGroupInput}
                    />

                    <Button
                        title="Login"
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
