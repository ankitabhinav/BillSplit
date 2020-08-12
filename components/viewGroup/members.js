import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, RefreshControl,Alert } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import AddMember from './addMember'
import { ScrollView } from 'react-native-gesture-handler';
import api from '../api'


const Members = ({ members, created_by, group_id }) => {

    const [modalState, setModalState] = useState(false);
    const [membersState, setMembersState] = useState(members);
    const [spinner, setSpinner] = useState(false);
    const [refreshing, setRefreshing] = useState(false);



    useEffect(() => {
        console.log('members loaded')
       // getGroups();
    })

    const onRefresh = () => {
        setRefreshing(true);
        getGroups();
    }

    const getGroups = async () => {
        console.log('fetch members called')



        try {
            let response = await api.get('groups/member?group_id=' + group_id);
           
            if (response.data.success === true) {
                //setGroups(response.data.groups);
                //setBackUp(response.data.groups)
                setMembersState(response.data.data)
                setSpinner(false);
                setRefreshing(false);
                return

            } else {
                setSpinner(false);
                setRefreshing(false);
                return console.log(response.data.status)
            }
        }
        catch (err) {
            setSpinner(false);
            setRefreshing(false);
            return console.log(err.response.data.status)
        }


    }

    const openAddMember = () => {
        setModalState(true);
    }

    const hideAddMember = () => {
        setModalState(false);
    }

    const handleRefresh = () => {
        getGroups();
    }

    const confirmDelete = (item) => {
        Alert.alert(
            'Warning',
            'Are you sure you want to delete '+item+' ?',
            [
                { text: 'Cancel' },
                { text: 'OK', onPress: () => handleDeleteMember(item) },

            ],
            { cancelable: false },
        );
    }

    const handleDeleteMember = async(memberEmail) => {
       //axios does not support request body in delete mode , thats why we need to send body inside data 
        console.log(group_id+" "+memberEmail)
        try {
            let response = await api.delete('/groups/member/delete', 
            {
                data:{
                    member : memberEmail,
                    group_id : group_id
                }
            }
            );
            console.log(response.data)
            if(response.data.success === true) {
                getGroups();
               return alert('Deleted')
            } else {
               return alert(response.data.status)
            }
        } catch(err) {
            alert('Something went wrong!!')
           return console.log(err.response.data.status)
        }
    }

    const right = (member) => {
        return (
            <Icon
            name='delete-circle'
            type='material-community'
            color='#2196f3'
            onPress={()=> confirmDelete(member)}
        />
        )
    }


    return (

        <View style={styles.container}>
            {modalState &&
                <AddMember onPress={hideAddMember} refresh={() => handleRefresh()} group_id={group_id} />
            }
            <ScrollView
               // contentContainerStyle={{flex:1}}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                {membersState &&
                    membersState.map((item, i) => (
                        <ListItem
                            key={i}
                            // leftAvatar={{ source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' } }}
                            leftIcon={{ name: 'account-circle-outline', type: 'material-community', size: 30 }}
                            title={item.email.split('@')[0]}
                            subtitle={item.email === created_by ? 'Admin' : 'Member'}
                            bottomDivider
                            style={{ marginVertical: 2, marginHorizontal: 2 }}
                            rightIcon={() => right(item.email)}
                        /*  onPress={() => props.navigation.navigate('ViewGroup', { group: item })} */
                        />
                    ))
                }

               
            </ScrollView>
            <Icon
                    reverse
                    name='plus'
                    type='material-community'
                    color='#f44336'
                    raised={true}
                    containerStyle={styles.submitButton}
                    onPress={openAddMember}
                />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    submitButton: {
        // alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 20,
        right: 20
    },

})

export default Members;