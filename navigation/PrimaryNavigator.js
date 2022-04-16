import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignUpNavigator from './SignUpNavigator';
import WelcomeScreen from '../screens/WelcomeScreen'
import LoginScreen from '../screens/LoginScreen';
import CustomBottomNavigation from './CustomBottomNavigation';
import { AuthContext } from '../context-store/AuthContextProvider';
const Stack = createStackNavigator();

function PrimaryNavigator() {

  const { user } = React.useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
    }}>
      { user? 
        <>
          <Stack.Screen name="HomeNavigator" component={CustomBottomNavigation} />
        </> :
        <>
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="SignUpNavigator" component={SignUpNavigator} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
        </>
      }
    </Stack.Navigator>
  );
}

export default PrimaryNavigator;
