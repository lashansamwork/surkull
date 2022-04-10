/**
 * @format
 */

import {AppRegistry, StatusBar} from 'react-native';
import * as React from 'react';
import App from './App';
import {name as appName} from './app.json';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Colors from './theme/colors'

//(appName, () => App);

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: Colors.themeLightColors.primary,
        background: Colors.themeLightColors.background,
        text: Colors.themeLightColors.text
    },
};


export default function Main() {
    return (
      <PaperProvider theme={theme}>
        <StatusBar barStyle="light-content"/>
        <App />
      </PaperProvider>
    );
  }
  
AppRegistry.registerComponent(appName, () => Main);
