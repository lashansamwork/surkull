import React, { useState, useRef, useEffect } from 'react';
import { View, Dimensions, StyleSheet, Text, Linking, Platform } from 'react-native';
import { Appbar } from 'react-native-paper';
import layout from '../theme/layout';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../context-store/AuthContextProvider';
import firestore from '@react-native-firebase/firestore';

function ProfileScreen({ route, navigation }) {

  const { user } = route.params || {};
  const { user: userObject } = React.useContext(AuthContext);
  const [profileInfo, setProfileInfo] = useState(null);

  useEffect(()=>{
    if(!user && userObject.email) {
      firestore().collection('Users').doc(userObject.email).get().then((user)=>{
        const userInfo = user.data();
        userInfo && setProfileInfo(userInfo);
      })
    }
  }, []);

  return (
    <View style={styles.container}>
        <Text onPress={()=>{
          auth()
          .signOut()
          .then(() => console.log('User signed out!'));
        }}>Logout</Text>
        <Text onPress={()=>{addRecord()}}>
          Add record
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  }
});

export default ProfileScreen;
