import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatsScreen from '../screens/ChatsScreen';
import { NavigationContainer } from '@react-navigation/native';
import CustomNavigationBar from './CustomNavigationBar';

const Stack = createStackNavigator();

export default function ChatTabNavigator() {
  return (<NavigationContainer independent>
      <Stack.Navigator screenOptions={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}>
        <Stack.Screen name="ChatsScreen" component={ChatsScreen} />
      </Stack.Navigator>
  </NavigationContainer>
  );
}