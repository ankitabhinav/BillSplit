import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native'
import { ListItem, Badge } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import { getIcons } from '../customIcon'
import api from '../api'



const Summary = ({ summary, group_id }) => {

    const [summaryItems, setSummaryItems] = useState(summary);

    useEffect(() => {
        console.log('summary loaded');
        calculateSummary();
    },[])

    const calculateSummary = async() => {
        console.log('calculate summary called')
        try {
            let response = await api.post('/groups/calculate',{
                group_id : group_id
            });
           // console.log(response.data);
            if(response.data.success === true) {
                setSummaryItems(response.data.data);
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



    return (

        <View style={styles.container}>
            <ScrollView>

                {summaryItems &&
                    summaryItems.map((item, i) => {
                        return <ListItem
                            key={i}
                            //leftAvatar={{ source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' } }}
                            leftIcon={{ name: getIcons(item.item), type: 'material-community', size: 40, color: '#9e9e9e' }}
                            title={item.item}
                            subtitle={<Badge status={summaryItems.isSettled ? 'success' : 'warning'} value={<Text style={{ fontSize: 10, padding: 5 }}>{summaryItems.isSettled ? 'Settled' : 'Not Settled'}</Text>} />}
                            bottomDivider
                            chevron
                            style={{ marginVertical: 2, marginHorizontal: 2 }}
                        /*onPress={() => props.navigation.navigate('ViewGroup', { group: item })} */
                        />
                    })
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

export default Summary;