import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

import UsersScreen from './src/screen/user/userListScreen';
import LoadingScreen from './src/screen/loading/loadingScreen';
import UserDetails from './src/screen/user/userDetails';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppContext } from './src/component/appContext';

const Stack = createNativeStackNavigator();

export default function App() {

  const initialAppState = {
    isLoading: false,
    userCount: 0,
    userToEdit: []
  };

  const appStateReducer = (prevState, action) => {
    switch( action.type ) {
      case 'SYNC_USERS': 
        return {
          ...prevState,
          isLoading: action.isLoading
        };
      case 'UPDATE_USER_COUNT': 
        return {
          ...prevState,
          userCount: action.userCount
        };
    }
  };

  const [appState, dispatch] = React.useReducer(appStateReducer, initialAppState);

  const appContext = React.useMemo(()=>({
    LoadingUsers: async (isLoading)=> {
      dispatch({type: 'SYNC_USERS', isLoading: isLoading});
    },
    UpdateUsersCount: async(userCount) => {
      dispatch({type: 'UPDATE_USER_COUNT', userCount: userCount});
    },
  }));

  if(appState.isLoading){
    return(
      <LoadingScreen/>
    );
  }else{
    return (
      <AppContext.Provider value={appContext}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
                options={{
                  headerTitle: 'USERS',
                  headerRight: () => (
                    <Text style={{color: '#616161'}}>
                      TOTAL USER(s): 
                            <Text style={{fontWeight: 'bold', color: '#000000'}}>
                                {appState.userCount}
                            </Text>
                    </Text>
                  ),
                }}
                name="UsersSreen" 
                component={UsersScreen} />
             <Stack.Screen 
                options={{
                  headerTitle: 'USER DETAILS'
                }}
                name="UserDetails" 
                component={UserDetails} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
