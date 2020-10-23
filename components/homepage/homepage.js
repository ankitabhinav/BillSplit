
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    ActivityIndicator,
    Image,
    RefreshControl,
    BackHandler,
    Alert,SafeAreaView
} from 'react-native';
import { ListItem, Text, Icon, SearchBar, Button } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import api from '../api'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
import CreateGroup from './createGroup'
import { useLinkProps } from '@react-navigation/native';


const LoadingPage = (props) => {

    const [spinner, setSpinner] = useState(false);
    const [groups, setGroups] = useState(null);
    const [backup, setBackUp] = useState(null);
    const [modalState, setModalState] = useState(false);
    const [refreshing, setRefreshing] = useState(true);
    const [query, setQuery] = useState('')

    let avatars = [
        'https://i.ibb.co/WvL1YXc/bee.png',
        'https://i.ibb.co/2s4QvvJ/cat.png',
        'https://i.ibb.co/fpQ8Yhd/elephant.png',
        'https://i.ibb.co/5xDjnfB/fox.png',
        'https://i.ibb.co/2cK6kRv/leopard.png',
        'https://i.ibb.co/t87wFPT/lion.png',
        'https://i.ibb.co/WpyLZv5/monkey.png',
        'https://i.ibb.co/pZFrW77/raccoon.png',
        'https://i.ibb.co/LR2Zm24/rhino.png',
        'https://i.ibb.co/2cK6kRv/leopard.png',
    ]

    useEffect(() => {
        props.navigation.addListener('focus', () => {
            // do something
            onRefresh();
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
          });

        const unsubscribe = props.navigation.addListener('blur', () => {
            // do something
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
          });
        console.log('app loaded')
        getGroups();

        return () => {
          unsubscribe;
        };
    }, [])

    const handleBackButtonClick = () => {
        Alert.alert(
            'Exit App ?',
            "Press OK to exit",
            [
                { text: 'Cancel'},
                { text: 'OK', onPress: () =>  BackHandler.exitApp() }
               
            ],
            { cancelable: true },
        );
       
        return true;
    }

    const onRefresh = () => {
        setRefreshing(true);
        getGroups();
    }

    const handleSearch = (e) => {
        setQuery(e)

        if (e.length === 0) {
            return setGroups(backup);
        } else {
            const filteredGroups = groups.filter((item) => item.group_name.startsWith(e));
            setGroups(filteredGroups);
        }

        
    }


    const getGroups = async () => {
        console.log('fetch called')
        let auth_token = await AsyncStorage.getItem('billsplit_user_key');
        try {
            let response = await api.post('/groups/fetch_groups', {

                auth_token: auth_token

            });
            if (response.data.success === true) {
                setGroups(response.data.groups);
                setBackUp(response.data.groups)
                setSpinner(false);
                setRefreshing(false);
                return
                //console.log(response.data.groups);
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
        console.log('gggg')
        setModalState(true);
    }

    const hideCreateGroup = () => {
        setModalState(false);
    }

    const handleRefresh = () => {
        getGroups();
    }

    return (
        <React.Fragment>
            <StatusBar barStyle="dark-content" />
            <View style={styles.container}>
                {modalState &&
                    <CreateGroup onPress={hideCreateGroup} refresh={() => handleRefresh()} />
                }

                <View style={styles.headerContainer}>
                    <View style={{ marginTop: 15 }}>
                        <CompanyLogo />
                    </View>

                    <View style={{ marginVertical: 5, width: '100%' }}>
                        <SearchBar
                            placeholder="Type Here..."
                            value={query}
                            containerStyle={{ backgroundColor: '#2196f3', borderTopColor: '#2196f3', borderBottomColor: '#2196f3' }}
                            lightTheme={true}
                            inputContainerStyle={{ backgroundColor: '#f5f5f5' }}
                            onChangeText={handleSearch}
                        />
                    </View>
                </View>
                {spinner &&
                    <ActivityIndicator size='large' color='#2196f3' style={{ marginVertical: 15 }} />
                }
                {!spinner &&

                    <View style={{ flexDirection: 'column', width: '100%', flex: 1 }}>
                        <ScrollView
                            
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                            }

                        >
                            <Text h3 style={{ marginHorizontal: 10, marginVertical: 10 }}>My Groups</Text>

                            {groups &&
                                groups.map((item, i) => {

                                    // let index = Math.floor(Math.random() * 10);
                                    return <ListItem
                                        key={i}
                                        // leftAvatar={{ source: { uri: avatars[index] } }}
                                        leftIcon={{ name: 'account-circle-outline', type: 'material-community', size: 40 }}
                                        title={item.group_name}
                                        subtitle={item.created_by}
                                        bottomDivider
                                        chevron
                                        style={{ marginVertical: 2, marginHorizontal: 2 }}
                                        onPress={() => props.navigation.navigate('ViewGroup', { group: item })}
                                    />
                                })
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
    },
    list: {
         flex: 1
      },
});

export default LoadingPage;
