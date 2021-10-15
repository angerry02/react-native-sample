import React from 'react';
import { View, 
    Text, 
    StyleSheet, 
    Image, 
    TouchableOpacity, 
    Alert} from 'react-native';

import * as actions from '../redux/actions';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import * as userRepo from '../data/user/userRepo';

const CustomRow = (props) => {
    const {user} = props;
    const navigation = useNavigation();

    const userDataToUpdate = () => {
        props.setUserDataToEdit(user);
        navigation.navigate('UserDetails');
    }

    const deleteUserConfirmation = async() => {
        const id = user.id;

        Alert.alert(
           'Delete User',
           'Are you sure do you want to delete this user: ' + user.name,
           [
             {text: 'Yes', onPress: async()=> deleteUser(id) },
             {text: 'No', style: 'cancel'},
           ],
           { cancelable: false }
         );
    }

    const deleteUser = async (id) => {
        const delUserParam = {id: id};
        if(userRepo.deleteUser(delUserParam))props.deleteUser(delUserParam);
    }

    return(
        <TouchableOpacity
            onPress={userDataToUpdate}
            onLongPress={deleteUserConfirmation}
            >
        <View style={styles.container}>
        <Image source={{ uri: 'https://mpng.subpng.com/20180411/rzw/kisspng-user-profile-computer-icons-user-interface-mystique-5aceb0245aa097.2885333015234949483712.jpg' }} style={styles.photo} />
            <View style={styles.container_text}>
                <Text style={styles.name}>
                    {user.name}
                </Text>
                <Text style={styles.email}>
                    {user.email}
                </Text>
            </View>
        </View>
    </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginLeft:16,
        marginRight:16,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 5,
        backgroundColor: '#FFF',
        elevation: 2,
    },
    name: {
        fontSize: 16,
        color: '#000',
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',
    },
    email: {
        fontSize: 11,
        fontStyle: 'italic',
    },
    photo: {
        height: 50,
        width: 50,
    },
});

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
    setUserDataToEdit: user => dispatch(actions.setUserDataToEdit(user)),
    setUserToDelete: user => dispatch(actions.setUserToDelete(user)),
    deleteUser: user => dispatch(actions.deleteUser(user))
});
const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(CustomRow);