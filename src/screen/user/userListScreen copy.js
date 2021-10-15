import React, {useEffect, useState} from "react";
import { View, 
    Text,
    Button,
    FlatList,
    StyleSheet,
    RefreshControl,
    Empty } from 'react-native';
import { AppContext } from "../../component/appContext";

import LoadingScreen from "../loading/loadingScreen";
import CustomRow from "../../component/customUserRow";

import * as userRepo from "../../data/user/userRepo";

export default function Users({navigation}){

    const [refreshing, setRefreshing] = React.useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const { LoadingUsers, UpdateUsersCount } = React.useContext(AppContext);

    const fetchUsers = async () => {
        try {
            const data = await userRepo.getUsers();
            setUsers(data);
            UpdateUsersCount(data.length);
        } catch (error) {
          console.error(error);
        }
        finally{
            setIsLoading(false);
            setRefreshing(false);
        }
      };

    useEffect(() => {
        fetchUsers();
    }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchUsers();
      }, []);

    if(isLoading){
        return(
            <LoadingScreen />
        );
    }else{
        return(
            <View style={styles.container}>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                      }
                    keyExtractor={item => item.id.toString()}
                    data={users}
                    renderItem={({ item }) => 
                    <CustomRow
                        name={item.name}
                        email={item.email}
                    />}
                    ListEmptyComponent={
                        ()=>{
                            return(
                                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{marginTop: 20}}>
                                        No data found!
                                    </Text>
                                </View>
                            );
                        }
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});