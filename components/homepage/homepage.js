
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    ActivityIndicator,
    Image
} from 'react-native';
import { ListItem, Text, Icon, SearchBar, Button } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import api from '../api'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
import CreateGroup from './createGroup'


const LoadingPage = () => {

    const [spinner, setSpinner] = useState(false);
    const [groups, setGroups] = useState(null);



    useEffect(() => {
        console.log('app loaded')
        getGroups();
    }, [])


    const getGroups = async () => {
        let auth_token = await AsyncStorage.getItem('billsplit_user_key');
        try {
            let response = await api.post('/groups/fetch_groups', {

                auth_token: auth_token

            });
            if (response.data.success === true) {
                setGroups(response.data.groups);
                setSpinner(false);
                return console.log(response.data.groups);
            } else {
                setSpinner(false);
                return console.log(response.data.status)
            }
        }
        catch (err) {
            setSpinner(false);

            return console.log(err.response.data.status)
        }


    }


    const list = [
        {
            name: 'Amy Farha',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            subtitle: 'Vice President'
        },
        {
            name: 'Chris Jackson',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            subtitle: 'Vice Chairman'
        },
        {
            name: 'Amy Farha',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            subtitle: 'Vice President'
        },
        {
            name: 'Chris Jackson',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            subtitle: 'Vice Chairman'
        },
        {
            name: 'Amy Farha',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            subtitle: 'Vice President'
        },
        {
            name: 'Chris Jackson',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            subtitle: 'Vice Chairman'
        },
        {
            name: 'Amy Farha',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            subtitle: 'Vice President'
        },
        {
            name: 'Chris Jackson',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            subtitle: 'Vice Chairman'
        },
        {
            name: 'Amy Farha',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            subtitle: 'Vice President'
        },
        {
            name: 'Chris Jackson',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            subtitle: 'Vice Chairman'
        },

    ]



    const CompanyLogo = () => {
        return (
            <>
                <View style={{ flexDirection: 'row' }}>
                    <Image
                        style={{ height: 30, width: 30, borderRadius: 10 }}
                        source={{ uri: 'https://i.ibb.co/2YNxscS/billsplit-icon.png' }}
                    />
                    <Text style={{ alignSelf: 'center', fontSize: 20, color: '#fff', marginLeft: 5 }}>BillSplit</Text>
                </View>

            </>

        )
    }


    const openCreateGroup = () => {
        
    }

    return (
        <React.Fragment>
            <StatusBar barStyle="dark-content" />
            <View style={styles.container}>

                <View style={styles.headerContainer}>
                    <View style={{ marginTop: 15 }}>
                        <CompanyLogo />
                    </View>

                    <View style={{ marginVertical: 5, width: '100%' }}>
                        <SearchBar
                            placeholder="Type Here..."
                            value={'Search'}
                            containerStyle={{ backgroundColor: '#2196f3', borderTopColor: '#2196f3', borderBottomColor: '#2196f3' }}
                            lightTheme={true}
                            inputContainerStyle={{ backgroundColor: '#f5f5f5' }}
                        />
                    </View>
                </View>
                {spinner &&
                    <ActivityIndicator size='large' color='#2196f3' style={{ marginVertical: 15 }} />
                }
                {!spinner &&

                    <View style={{ flexDirection: 'column', width: '100%' }}>
                        <ScrollView>
                            <Text h3 style={{ marginHorizontal: 10, marginVertical: 10 }}>My Groups</Text>
                            <CreateGroup/>
                            {groups &&
                                groups.map((item, i) => (
                                    <ListItem
                                        key={item.group_name}
                                        leftAvatar={{ source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' } }}
                                        title={item.group_name}
                                        subtitle={item.created_by}
                                        bottomDivider
                                        chevron
                                        style={{ marginVertical: 2, marginHorizontal: 2 }}
                                    />
                                ))
                            }
                        </ScrollView>
                    </View>

                }


                <Icon
                    reverse
                    name='plus'
                    type='material-community'
                    color='#f44336'
                    raised={true}
                    containerStyle={styles.submitButton}
                    onPress={openCreateGroup}
                />
            </View>

        </React.Fragment>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    submitButton: {
        // alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 20,
        right: 20
    },
    headerContainer: {
        backgroundColor: '#2196f3',
        width: '100%',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    }
});

export default LoadingPage;
