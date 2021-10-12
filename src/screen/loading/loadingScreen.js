import React from "react";
import { View, 
    ActivityIndicator,
    Text } from 'react-native';

export default function LoadingScreen() {
    return(
        <View style={{flex:1,
            justifyContent:'center',
            alignItems:'center'}}>
          <ActivityIndicator size="large" color='#0000ff'/>
          <Text style={{marginTop: 10}}>Please wait...</Text>
          
        </View>
      );
}