import React, {useEffect, useState} from "react";
import { View, 
    Text,
    Button,
    FlatList,
    StyleSheet,
    RefreshControl,
    Empty } from 'react-native';

import LoadingScreen from "../loading/loadingScreen";
import CustomRow from "../../component/customUserRow";

import * as userRepo from "../../data/user/userRepo";

import * as actions from '../../redux/actions';
import { connect } from 'react-redux';

const Users = (props) => {
    
    const [refreshing, setRefreshing] = React.useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const data = await userRepo.getUsers();

            props.updateUsers(data);

            console.log('data: ', data.length);

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

        console.log('rederede....');
    }, []);

    onRefresh = React.useCallback(() => {
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
                    data={props.users}
                    renderItem={({ item }) => 
                    <CustomRow
                        user={item}
                        props={props}
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

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
    updateUsers: users => dispatch(actions.updateUsers(users)),
    updateUsersCount: ctr => dispatch(actions.updateUsersCount(ctr))
});
const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(Users);

/* 
const mapStateToProps = (state, props) => {
    return { amount: state.counter.amount };
  }
export default connect(mapStateToProps)(SimpleCounter);
*/