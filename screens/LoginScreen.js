import React, { useState, useRef, useEffect } from 'react';
import { View, Dimensions, StyleSheet, Text, Linking, Platform, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import layout from '../theme/layout';
import images from '../theme/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';

function LoginScreen() {
  const insets = useSafeAreaInsets();
  const [userBio, setUserBio] = useState({
    email: null,
    password: null
  });


  const onLoginPress = () => {
    auth()
    .signInWithEmailAndPassword(userBio.email, userBio.password)
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
      console.error(error);
    });
  }

  return (
    <View style={styles.container}>
        <Appbar style={layout.appBar}/>
        <KeyboardAwareScrollView style={{ width: '100%', height: '100%'}} contentContainerStyle={{ paddingTop: layout.padding.xxxLarge }}>
          <Image
            style={{ height: 300, width: '100%' }}
            source={images.logo}
            resizeMode={'contain'}
          />
          <View style={{ width: '100%', paddingTop: layout.padding.xxxLarge }}>
            <TextInput
              mode='outlined'
              label="Email"
              keyboardType="email-address"
              style={{ marginHorizontal: layout.padding.xxxLarge }}
              value={userBio.email}
              onChangeText={email => setUserBio({ ...userBio, email })}
            />
          </View>
          <View style={{ width: '100%', paddingTop: layout.padding.xxxLarge }}>
            <TextInput
              mode='outlined'
              label="Password"
              secureTextEntry
              style={{ marginHorizontal: layout.padding.xxxLarge }}
              value={userBio.password}
              onChangeText={password => setUserBio({ ...userBio, password })}
            />
          </View>
          <View style={{ width: '100%', paddingTop: layout.padding.xxxLarge*2, paddingHorizontal: layout.padding.xxxLarge }}>
            <Button mode="contained" onPress={() => onLoginPress()}>
                Login
              </Button>
          </View>
        </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    width: '100%'
  }
});

export default LoginScreen;
