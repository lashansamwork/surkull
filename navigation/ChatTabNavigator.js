import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from '../screens/ChatScreen';
import { NavigationContainer } from '@react-navigation/native';
import CustomNavigationBar from './CustomNavigationBar';

const Stack = createStackNavigator();

export default function ChatTabNavigator() {
  return (<NavigationContainer independent>
      <Stack.Navigator screenOptions={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}>
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
      </Stack.Navigator>
  </NavigationContainer>
  );
}