import React from "react";
import { View, 
    Text,
    FlatList,
    StyleSheet,
    RefreshControl,
    Alert} from 'react-native';

import { TextInput,
    Button } from 'react-native-paper';

import * as actions from '../../redux/actions';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { isEmailIsValid } from "../../utils/string_helper";
import * as userRepo from '../../data/user/userRepo';

const UserDetails = (props) => {
    const {userToEdit} = props;
    const navigation = useNavigation();

    const [name, setName] = React.useState(userToEdit.name);
    const [username, setUsername] = React.useState(userToEdit.username);
    const [email, setEmail] = React.useState(userToEdit.email);
    const [isSaving, setIsSaving] = React.useState(false);

    const handleSaveData = async() =>{

        setIsSaving(true);

        if(name.length == 0) showAlert('Please ente a valid name.');
        if(username.length == 0) showAlert('Please ente a username.');
        if(!isEmailIsValid(email)) showAlert('Please ente a valid email.');

        userToEdit.email = email;
        userToEdit.name = name;
        userToEdit.username = username;

        if(userRepo.updateUserData(userToEdit)) props.updateUserData(userToEdit);
        else showAlert('Error on saving data.');
        
        setIsSaving(false);

        navigation.navigate('UsersScreen');
    }

    showAlert = (msg) =>{
        Alert.alert('Invalid Data', msg);
    }

    return(
        <View style={{margin: 10}}>
            <TextInput
                style={styles.textInputPaper}
                label="Name"
                value={name}
                onChangeText={val => setName(val)}
                />
             <TextInput
                style={styles.textInputPaper}
                label="Username"
                value={username}
                onChangeText={val => setUsername(val)}
                />
            <TextInput
                style={styles.textInputPaper}
                label="Email"
                value={email}
                onChangeText={val => setEmail(val)}
                />
            <Button style={{margin: 10}}
                loading={isSaving}
                mode="contained" 
                onPress={handleSaveData}>
                SAVE CHANGES
            </Button>
        </View>
    );
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
    updateUserData: user => dispatch(actions.updateUserData(user))
});
const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(UserDetails);