import React, { useState, useRef, useEffect } from 'react';
import { View, Dimensions, StyleSheet, Text, Linking, Platform, Image } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import layout from '../theme/layout';
import images from '../theme/images';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';

function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const [userBio, setUserBio] = useState({
    email: null,
    password: null
  });

  const [errors, setErrors] = useState('');


  const onLoginPress = () => {
    setLoading(true);
    auth()
    .signInWithEmailAndPassword(userBio.email, userBio.password)
    .then(()=> setLoading(false))
    .catch(error => {
      setLoading(false);
      if (error.code === 'auth/email-already-in-use') {
        setErrors('That email address is already in use!');
      }
      if (error.code === 'auth/invalid-email') {
        setErrors('That email address is invalid!');
      }
      if (error.code === 'auth/wrong-password') {
        setErrors('That password is invalid!');
      }
    });
  }


  return (
    <View style={styles.container}>
        <KeyboardAwareScrollView style={{ width: '100%', height: '100%'}} contentContainerStyle={{ paddingTop: layout.padding.xxxLarge }}>
          <Image
            style={{ height: 300, width: '100%' }}
            source={images.logo}
            resizeMode={'contain'}
          />
          <View style={{ width: '100%', paddingTop: layout.padding.xxxLarge }}>
            <View style={{ margin: layout.padding.medium}}>
              <HelperText type="error" visible={true}>
                {errors}
              </HelperText>
            </View>
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
            <Button mode="contained" onPress={() => onLoginPress()} loading={loading}>
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
