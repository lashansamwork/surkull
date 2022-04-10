
import 'react-native-gesture-handler';
import React from 'react';
import { View } from 'react-native';
import BioInfoScreen from '../screens/BioInfoScreen'
import InterestInfoScreen from '../screens/InterestInfoScreen'
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

function SignUpNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="BioInfoScreen"
      screenOptions={{
        headerShown: false,
    }}>
      <Stack.Screen name="BioInfoScreen" component={BioInfoScreen} />
      <Stack.Screen name="InterestInfoScreen" component={InterestInfoScreen} />
    </Stack.Navigator>
  );
}

export default SignUpNavigator;
