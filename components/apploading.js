
import React, { useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    StatusBar,
    ActivityIndicator,
    Image
} from 'react-native';
import {Button,Icon} from 'react-native-elements'


const LoadingPage = (props) => {
    useEffect(() => {
        console.log('app loaded')
    }, [])

    return (
        <React.Fragment>
            <StatusBar barStyle="dark-content" />
            <View style={styles.container}>
                <Image
                    style={{ height: 100, width: 100, marginTop: '50%', borderRadius: 10, marginBottom: '1%' }}
                    source={{ uri: 'https://i.ibb.co/2YNxscS/billsplit-icon.png' }}
                />
                <Text style={{ color: 'white' }}>BillSplit</Text>
                <ActivityIndicator style={{ marginTop: '2%' }} size="small" color="#fff" />

                <Button
                    title="goto details"
                    onPress={() => props.navigation.navigate('Login')}
                />
            </View>

        </React.Fragment>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#42a5f5',
        alignItems: 'center'
    }
});

export default LoadingPage;
