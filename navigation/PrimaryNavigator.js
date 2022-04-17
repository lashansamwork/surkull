import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignUpNavigator from './SignUpNavigator';
import WelcomeScreen from '../screens/WelcomeScreen'
import LoginScreen from '../screens/LoginScreen';
import CustomBottomNavigation from './CustomBottomNavigation';
import { AuthContext } from '../context-store/AuthContextProvider';
import CustomNavigationBar from './CustomNavigationBar';
import InterestInfoScreen from '../screens/InterestInfoScreen';
const Stack = createStackNavigator();

function PrimaryNavigator({ route }) {

  const { user } = React.useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={({ route }) =>({
        headerShown: route.name == 'HomeNavigator'? false : true,
        header: (props) => <CustomNavigationBar {...props} />,
      })}>
      { user? 
        <>
          <Stack.Screen name="HomeNavigator" component={CustomBottomNavigation} />
        </> :
        <>
          {/* <Stack.Screen name="InterestInfoScreen" component={InterestInfoScreen} /> */}
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="SignUpNavigator" component={SignUpNavigator} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
        </>
      }
    </Stack.Navigator>
  );
}

export default PrimaryNavigator;
