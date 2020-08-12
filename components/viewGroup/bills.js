import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text,ScrollView, RefreshControl } from 'react-native'
import {ListItem, Icon} from 'react-native-elements'
import AddBill from './addBill'
import api from '../api'




const Bills = ({ bills, created_by, group_id }) => {

    const [modalState, setModalState] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [transactionsState, setTransactionsState] = useState(bills)




    useEffect(() => {
        console.log('bills loaded')
        //console.log(bills)
    })



    const getTransactions = async () => {
        console.log('fetch transactions called')

        try {
            let response = await api.get('groups/transaction?group_id=' + group_id);
           // console.log(response.data);
            if (response.data.success === true) {
                //setGroups(response.data.groups);
                //setBackUp(response.data.groups)
                setTransactionsState(response.data.data)
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

    const onRefresh = () => {
        setRefreshing(true);
        getTransactions();
    }

    const openAddBill = () => {
        setModalState(true);
    }

    const hideAddBill = () => {
        setModalState(false);
    }

    const handleRefresh = () => {
        getTransactions();
    }


    return (

        <View style={styles.container}>
             {modalState &&
                <AddBill onPress={hideAddBill} refresh={() => handleRefresh()} group_id={group_id} />
            }
            <ScrollView
            
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>

            {transactionsState &&
                transactionsState.map((item, i) => (
                    <ListItem
                        key={i}
                        //leftAvatar={{ source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' } }}
                        leftIcon={{ name: 'file-document-edit-outline', type:'material-community', size:40 }}
                        title={'₹ '+item.amount + ' for '+item.purpose}
                        subtitle={
                            <View>
                                {item.type === 'split' &&
                                    <Text style={{color:'#ff9800'}}>splitted equally</Text>
                                }
                                 {item.type === 'lent' &&
                                    <Text style={{color:'#f44336'}}>lent to {item.to}</Text>
                                }
                                <Text><Text>Added By</Text> <Text style={{color:'#757575', fontStyle:'italic'}}>{item.started_by}</Text></Text>
                            </View>
                        }
                        bottomDivider
                        chevron
                        style={{ marginVertical: 2, marginHorizontal: 2 }}
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
                    onPress={openAddBill}
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

export default Bills;