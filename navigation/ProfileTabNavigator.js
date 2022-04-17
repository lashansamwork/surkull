import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
import CustomNavigationBar from './CustomNavigationBar';


const Stack = createStackNavigator();

export default function ProfileTabNavigator() {
  return (<NavigationContainer independent>
    <Stack.Navigator screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
        }}
    >
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}