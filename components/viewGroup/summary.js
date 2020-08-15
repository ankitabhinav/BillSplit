import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native'
import {ListItem} from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';


const Summary = ({ summary}) => {

    useEffect(() => {
        console.log('summary loaded')
    })

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


    return (

        <View style={styles.container}>
            <ScrollView>

            {summary &&
                summary.map((item, i) => {
                   return  <ListItem
                        key={i}
                       // leftAvatar={{ source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' } }}
                        leftIcon={{ name: getIconDetail(item.item), type:'material-community', size:40, color:'#9e9e9e'}}
                        title={item.item}
                        subtitle={<Text style={{color:'#f44336'}}>Not settled</Text>}
                        bottomDivider
                        chevron
                        style={{ marginVertical: 2, marginHorizontal: 2 }}
                       /*  onPress={() => props.navigation.navigate('ViewGroup', { group: item })} */
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