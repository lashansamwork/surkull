import { Appbar } from 'react-native-paper';
import React from 'react';
import auth from '@react-native-firebase/auth';

export default function CustomNavigationBar({ navigation, back, route }) {

  const onLogoutPress = () => {
    auth()
    .signOut()
    .then(() => console.log('User signed out!'));
  }

  const getScreenTitle = () => {
    switch (route.name) {
      case 'ProfileScreen':
        return 'My Account';
      case 'ChatsScreen':
        return 'My Chats';
      default:
        break;
    }
  }

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={getScreenTitle()} />
      {route.name == 'ProfileScreen' && <Appbar.Action icon="logout" onPress={onLogoutPress} />}
    </Appbar.Header>
  );
}