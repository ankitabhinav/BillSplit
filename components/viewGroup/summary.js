import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native'
import {ListItem} from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';


const Summary = ({ summary}) => {

    useEffect(() => {
        console.log('summary loaded')
    })


    return (

        <View style={styles.container}>
            <ScrollView>

            {summary &&
                summary.map((item, i) => (
                    <ListItem
                        key={i}
                       // leftAvatar={{ source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' } }}
                       leftIcon={{ name: 'text-box-check-outline', type:'material-community', size:40 }}
                        title={item.item}
                        subtitle={<Text style={{color:'#f44336'}}>Not settled</Text>}
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

export default Summary;