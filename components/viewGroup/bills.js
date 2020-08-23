import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text,ScrollView, RefreshControl } from 'react-native'
import {ListItem, Icon,Badge} from 'react-native-elements'
import AddBill from './addBill'
import ViewBill from './viewBill' 
import api from '../api'
import {getIcons} from '../customIcon'


const Bills = ({ bills, created_by, group_id }) => {

    const [modalState, setModalState] = useState(false);
    const [viewBillModalState, setViewBillModalState] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [transactionsState, setTransactionsState] = useState(bills)
    const [viewBillDetail, setViewBillDetail] = useState(null)




    useEffect(() => {
        console.log('bills loaded')

        console.log(bills)
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

    const openViewBill = (billDetail) => {
        setViewBillModalState(true);
        setViewBillDetail(billDetail);
    }

    const hideViewBill = () => {
        setViewBillModalState(false);
    }

    const handleRefresh = () => {
        getTransactions();
    }

/* 
    const getIconDetail = (e) => {
        if(e.match(/cab|auto|taxi|bus/)) {
            return 'taxi'
        } else
        
        if(e.match(/electricity/)) {
            return 'flash'
        } else
        
        if(e.match(/petrol|diesel|cng/)) {
            return 'gas-station'
        } else

        if(e.match(/medicine|doctor|hospital/)) {
            return 'stethoscope'
        } else

        if(e.match(/plane|flight|aeroplane|airplane/)) {
            return 'airplane'
        } else

        if(e.match(/water/)) {
            return 'water'
        } else

        if(e.match(/rent/)) {
            return 'home'
        } else

        if(e.match(/grocery|shop|shopping/)) {
            return 'cart'
        } else

        if(e.match(/wifi|net|internet|broadband/)) {
            return 'flash'
        } else

        if(e.match(/food|burger|bread|drink/)) {
            return 'food'
        } else 
        {
            return 'file-document'
        }
      }
 */

    return (

        <View style={styles.container}>
             {modalState &&
                <AddBill onPress={hideAddBill} refresh={() => handleRefresh()} group_id={group_id} />
             }
             {viewBillModalState &&
                <ViewBill onPress={hideViewBill} refresh={() => handleRefresh()} group_id={group_id} amount={viewBillDetail.amount} description={viewBillDetail.purpose} type={viewBillDetail.type} to={viewBillDetail.to ? viewBillDetail.to : null} started_by={viewBillDetail.started_by} />
             }
            <ScrollView
            
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>

            {transactionsState &&
                transactionsState.map((item, i) => {
                   return <ListItem
                    onPress={ () =>openViewBill(item)}
                    key={i}
                    //leftAvatar={{ source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' } }}
                    leftIcon={ { name: getIcons(item.purpose), type:'material-community', size:40, color:'#9e9e9e' }}
                    title={'₹ '+item.amount + ' for '+item.purpose}
                    subtitle={
                        <>
                        <View style={{flexDirection:'row', alignItems:'flex-start',width:'100%'}}>
                            {item.type === 'split' &&
                                 <Badge status='warning' value={<Text style={{ fontSize: 10, padding: 5 }}>Splitted Equally</Text>} />
                            }
                             {item.type === 'lent' &&
                                <Badge status='error' value={<Text style={{ fontSize: 10, padding: 5 }}>Lent</Text>} />
                            }
                            <View style={{marginHorizontal:10}}>
                            <Badge status={item.isSettled ? 'success' : 'warning'} value={<Text style={{ fontSize: 10, padding: 5 }}>{item.isSettled ? 'Settled' : 'Not Settled'}</Text>} />

                            </View>

                        </View>
                        <Text><Text>Added By</Text> <Text style={{color:'#757575', fontStyle:'italic'}}>{item.started_by}</Text></Text>

                        </>
                    }
                    bottomDivider
                    chevron
                    style={{ marginVertical: 2, marginHorizontal: 2 }}
                   /*  onPress={() => props.navigation.navigate('ViewGroup', { group: item })} */
                />
                })
                   
                
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