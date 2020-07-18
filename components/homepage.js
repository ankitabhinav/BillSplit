
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


const LoadingPage = () => {
  useEffect(() => {
    console.log('app loaded')
  }, [])

  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
        <Text>Hello Everyone</Text>
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
