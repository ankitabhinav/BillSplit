import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text,ScrollView } from 'react-native'
import {ListItem} from 'react-native-elements'


const Bills = ({ bills, created_by }) => {

    useEffect(() => {
        console.log('bills loaded')
        //console.log(bills)
    })


    return (

        <View style={styles.container}>
            <ScrollView>

            {bills &&
                bills.map((item, i) => (
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

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }

})

export default Bills;