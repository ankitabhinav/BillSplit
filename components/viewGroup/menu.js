import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert, TouchableOpacity } from 'react-native';
import { Input, Button, Text, Card, Overlay, CheckBox, ListItem, Avatar } from 'react-native-elements'
import api from '../api'
import AsyncStorage from '@react-native-community/async-storage';
import { getIcons } from '../customIcon'
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const Menu = (props) => {

    const [modalState, setModalState] = useState(true);
    const [deleteSpinner, setDeleteSpinner] = useState(false);

    useEffect(() => {
        setModalState(!modalState);

    }, [props.modal])

    const handleDeleteGroup = async() => {
        try {
            setDeleteSpinner(true);
            let response = await api.delete('/groups/delete_group',
                {
                    data: {
                        group_id: props.group_id
                    }
                }
            );
            console.log(response.data)
            if (response.data.success === true) {
                setDeleteSpinner(false);
                alert("Group Deleted");
                props.navigation.navigate("HomeScreen");
                return props.onPress();

                
            } else {
                setDeleteSpinner(false);
                return alert(response.data.status)
            }
        } catch (err) {
            setDeleteSpinner(false);
            alert('something went wrong');
            console.log(err.response)
        }

    }


    return (
        <Overlay
            isVisible={true}
            windowBackgroundColor="rgba(255, 255, 255, .5)"
            overlayBackgroundColor="white"
            animationType='fade'
            onBackdropPress={props.onPress}

        >
            <View style={{ width: 300, marginBottom: 10 }}>
                <ListItem
                    key={1}
                    title='Delete Group'
                    leftIcon={<Icon name='trash-can-outline' size={20} color='grey' />}
                    bottomDivider
                    chevron
                    onPress={handleDeleteGroup}
                    disabled={deleteSpinner}
                    rightElement={<Button
                        type="clear"
                        loading={deleteSpinner}
                      />}
                />
                <ListItem
                    key={2}
                    title='Details'
                    leftIcon={<Icon name='card-account-details-outline' size={20} color='grey' />}
                    bottomDivider
                    chevron
                />
                <ListItem
                    key={3}
                    title='Graphs'
                    leftIcon={<Icon name='chart-bar' size={20} color='grey' />}
                    bottomDivider
                    chevron
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

export default Menu;
