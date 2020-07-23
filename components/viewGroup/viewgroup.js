
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    ActivityIndicator,
    Image,
    RefreshControl,
    Dimensions,
    TouchableRipple,
    TouchableOpacity,
    Alert
} from 'react-native';
import { ListItem, Text, SearchBar, Button, Header } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import api from '../api'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
import { TabView, SceneMap } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Members from './members'
import Bills from './bills'
import Summary from './summary'



const initialLayout = { width: Dimensions.get('window').width };



const ViewGroup = (props) => {
    const { group } = props.route.params;
    const [spinner, setSpinner] = useState(false);
    const [groups, setGroups] = useState(group);
    const [summary, setSummary] = useState(null);
    const [modalState, setModalState] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'bills', title: 'bills' },
        { key: 'members', title: 'members' },
        { key: 'summary', title: 'summary' },
    ]);

    useEffect(() => {
        console.log('view group loaded')
        // const { group } = props.route.params;
        // setGroups(group);
        //console.log(group);
        // getGroups();
        calculateSummary();
    }, [])


    const FirstRoute = () => (
        <Bills bills={groups.transactions} created_by={groups.created_by} />
        //<View style={[styles.scene]} />
    );

    const SecondRoute = () => (
        <Members members={groups.members} created_by={groups.created_by} />
    );

    const ThirdRoute = () => (
        <Summary summary={summary} created_by={groups.created_by} />
    );

    const calculateSummary = async() => {
        try {
            let response = await api.post('/groups/calculate',{
                group_id : groups._id
            });
           // console.log(response.data);
            if(response.data.success === true) {
                setSummary(response.data.data);
                //console.log(response.data);
                
            } else {
                return  Alert.alert(
                    'Error',
                    'Something went wrong !',
                    [
                        { text: 'OK' },
                    ],
                    { cancelable: false },
                );
            }

        }catch(err) {
            console.log(err.response.data);
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




    const onRefresh = () => {
        setRefreshing(true);
        getGroups();
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
                    <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal:10, paddingVertical:10 }}>
                        <Icon name='arrow-left' size={20} color='white' />

                    </TouchableOpacity >


                    {groups &&
                        <Text style={{ alignSelf: 'center', fontSize: 20, color: '#fff', marginLeft: 15 }}>{groups.group_name}</Text>

                    }
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


    const renderScene = SceneMap({
        bills: FirstRoute,
        members: SecondRoute,
        summary: ThirdRoute
    });

    return (
        <React.Fragment>
            <StatusBar barStyle="dark-content" />
            <View style={styles.container}>


                <View style={styles.headerContainer}>
                    <View style={{ marginTop: 15 }}>
                        <CompanyLogo />
                    </View>

                    {/*   <View style={{ marginVertical: 5, width: '100%' }}>
                        <SearchBar
                            placeholder="Type Here..."
                            value={'Search'}
                            containerStyle={{ backgroundColor: '#2196f3', borderTopColor: '#2196f3', borderBottomColor: '#2196f3' }}
                            lightTheme={true}
                            inputContainerStyle={{ backgroundColor: '#f5f5f5' }}
                        />
                    </View> */}
                </View>
                <View style={{ flex: 1, width: '100%' }}>
                    <TabView
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        onIndexChange={setIndex}
                        initialLayout={initialLayout}
                    />
                </View>


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
        alignItems: 'flex-start',

    },
    scene: {
        flex: 1,
    },
});

export default ViewGroup;
