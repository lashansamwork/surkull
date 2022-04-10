import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignUpNavigator from './SignUpNavigator';
import WelcomeScreen from '../screens/WelcomeScreen'
import HomeNavigator from './HomeNavigator'
const Stack = createStackNavigator();

function PrimaryNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="WelcomeScreen"
      screenOptions={{
        headerShown: false,
    }}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="SignUpNavigator" component={SignUpNavigator} />
      <Stack.Screen name="HomeNavigator" component={HomeNavigator} />
    </Stack.Navigator>
  );
}

export default PrimaryNavigator;
