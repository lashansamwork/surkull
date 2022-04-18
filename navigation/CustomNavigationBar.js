import { Appbar } from 'react-native-paper';
import React from 'react';
import auth from '@react-native-firebase/auth';
import _ from 'lodash'

export default function CustomNavigationBar({ navigation, back, route }) {

  const { roomInfo, user } = route.params || {};

  const onLogoutPress = () => {
    auth()
    .signOut()
    .then(() => console.log('User signed out!'));
  }

  const getScreenTitle = () => {
    switch (route.name) {
      case 'ProfileScreen':
        if(user) {
          return 'Profile';
        } else {
          return 'My Account';
        }
      case 'ChatsScreen':
        return 'My Chats';
      case 'MessageScreen':
        return roomInfo.title
      default:
        break;
    }
  }

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={getScreenTitle()} />
      {route.name == 'ProfileScreen' && !user && <Appbar.Action icon="logout" onPress={onLogoutPress} />}
    </Appbar.Header>
  );
}