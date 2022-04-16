import { Appbar } from 'react-native-paper';
import React from 'react';

export default function CustomNavigationBar({ navigation, back, route }) {
  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={route.name} />
    </Appbar.Header>
  );
}