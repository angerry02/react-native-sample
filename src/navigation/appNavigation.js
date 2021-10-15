import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

import UsersScreen from '../screen/user/userListScreen';
import UserDetails from '../screen/user/userDetails';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { connect } from 'react-redux';

const Stack = createNativeStackNavigator();

const AppNavigation = (props) => {
  return(
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen 
                options={{
                    headerTitle: 'USERS',
                    headerRight: () => (
                    <Text style={{color: '#616161'}}>
                        TOTAL USER(s): 
                            <Text style={{fontWeight: 'bold', color: '#000000'}}>
                                {props.userCount}
                            </Text>
                    </Text>
                    ),
                }}
                name="UsersScreen" 
                component={UsersScreen} />
            <Stack.Screen 
                options={{
                    headerTitle: 'USER DETAILS'
                }}
                name="UserDetails" 
                component={UserDetails} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/*const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
    updateUsers: users => dispatch({type: actionTypes.UPDATE_USERS, users: users})
});
const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(AppNavigation);*/

const mapStateToProps = state => state;
export default connect(mapStateToProps)(AppNavigation);
