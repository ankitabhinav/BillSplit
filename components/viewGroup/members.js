import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native'
import {ListItem} from 'react-native-elements'


const Members = ({ members, created_by }) => {

    useEffect(() => {
        console.log('members loaded')
    })


    return (

        <View style={styles.container}>
            {members &&
                members.map((item, i) => (
                    <ListItem
                        key={i}
                       // leftAvatar={{ source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' } }}
                       leftIcon={{ name: 'account-circle-outline', type:'material-community', size:30 }}
                        title={item.email.split('@')[0]}
                        subtitle={item.email === created_by ? 'Admin' :'Member'}
                        bottomDivider
                        chevron
                        style={{ marginVertical: 2, marginHorizontal: 2 }}
                       /*  onPress={() => props.navigation.navigate('ViewGroup', { group: item })} */
                    />
                ))
            }
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }

})

export default Members;