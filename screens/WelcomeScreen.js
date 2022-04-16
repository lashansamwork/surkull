import React, { useState, useRef, useEffect } from 'react';
import { View, Dimensions, StyleSheet, Text, Linking, Platform, Image } from 'react-native';
import { Button, Appbar } from 'react-native-paper'
import layout from '../theme/layout'; 
import images from '../theme/images'; 
import colors from '../theme/colors';
import auth from '@react-native-firebase/auth';

function WelcomeScreen({ navigation }) {

  const testLogin = () => {
    console.log('tadaa....');    
    auth()
    .signInAnonymously()
    .then(() => {
      console.log('User signed in anonymously');
    })
    .catch(error => {
      if (error.code === 'auth/operation-not-allowed') {
        console.log('Enable anonymous in your firebase console.');
      }
      console.error(error);
    });
  }

  return (
    <View style={styles.container}>
        <Appbar style={layout.appBar}/>
        <Image
          style={{ flex: 1.5, width: '100%' }}
          source={images.logo}
          resizeMode={'center'}
        />
        <View style={{ flex: 0.4}}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Button mode="contained" onPress={() => (navigation.navigate('SignUpNavigator') )}>
              Sign Up
            </Button>
            <View style={{ padding: layout.padding.medium }}/>
            <Button mode="outlined" onPress={() => (navigation.navigate('LoginScreen'))}>
              Login
            </Button>
          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%', 
    width: '100%',
    backgroundColor: colors.backgroundColor
  }
});

export default WelcomeScreen;
