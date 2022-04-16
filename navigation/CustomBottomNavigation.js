import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import ProfileTabNavigator from './ProfileTabNavigator';
import ChatTabNavigator from './ChatTabNavigator';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

const CustomBottomNavigation = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'profile', title: 'Account', icon: 'account-circle' },
    { key: 'chats', title: 'Chat', icon: 'chat' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    profile: ProfileTabNavigator,
    chats: ChatTabNavigator
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={(index)=>{
          setIndex(index);
          setTimeout(()=>setIndex(index), 0); //hack
        }}
      renderScene={renderScene}
    />
  );
};

export default CustomBottomNavigation;