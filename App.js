import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

import AppNavigation from './src/navigation/appNavigation';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Provider } from 'react-redux';
import store from './src/redux/store';

const Stack = createNativeStackNavigator();

const App = () => {
  return(
    <Provider store={store}>
      <AppNavigation/>
    </Provider>
  );
}

export default App;