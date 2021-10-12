import React, {useEffect, useState} from "react";
import { View, 
    Text,
    Button,
    FlatList,
    StyleSheet,
    RefreshControl } from 'react-native';
import { AppContext } from "../../component/appContext";

import LoadingScreen from "../loading/loadingScreen";
import CustomRow from "../../component/customUserRow";

import { USERS_LIST_API } from "../../utils/api_uri_helper";

export default function Users(){

    const [refreshing, setRefreshing] = React.useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const { LoadingUsers, UpdateUsersCount } = React.useContext(AppContext);

    const getUsers = async () => {
        try {
            const response = await fetch(USERS_LIST_API);
            const data = await response.json();
            setUsers(data);

            UpdateUsersCount(data.length);

            //console.log(data);

        } catch (error) {
          console.error(error);
        }
        finally{
            setIsLoading(false);
            setRefreshing(false);
        }
      };

    useEffect(() => {
        getUsers();
    }, []);


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getUsers();
        //wait(2000).then(() => setRefreshing(false));
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