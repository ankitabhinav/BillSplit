import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native'
import { ListItem, Badge } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import { getIcons } from '../customIcon'


const Summary = ({ summary }) => {

    useEffect(() => {
        console.log('summary loaded')
    })



    return (

        <View style={styles.container}>
            <ScrollView>

                {summary &&
                    summary.map((item, i) => {
                        return <ListItem
                            key={i}
                            //leftAvatar={{ source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' } }}
                            leftIcon={{ name: getIcons(item.item), type: 'material-community', size: 40, color: '#9e9e9e' }}
                            title={item.item}
                            subtitle={<Badge status={summary.isSettled ? 'success' : 'warning'} value={<Text style={{ fontSize: 10, padding: 5 }}>{summary.isSettled ? 'Settled' : 'Not Settled'}</Text>} />}
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