import React from 'react';
import { Text, View,TouchableOpacity } from 'react-native';
import { Icon, Button, Divider } from 'react-native-elements';

const DrawerItem = (props) => {
    return (
        <>
            <TouchableOpacity onPress={props.onPress}>
            <View style={{ flexDirection: 'row', margin: 5, height: 40, justifyContent: 'flex-start', alignItems: 'center', borderRadius: 10 }}>
                <Icon
                    name={props.icon}
                    type={props.iconType}
                    color='#517fa4'
                    style={{ marginHorizontal: 5 }}
                />
                <Text>{props.name}</Text>
            </View>
            </TouchableOpacity>
            <Divider style={{ backgroundColor: 'blue' }} />
        </>
    );

}
export default DrawerItem;
