import React from 'react';
import { View, 
    Text, 
    StyleSheet, 
    Image, 
    TouchableOpacity, 
    Alert} from 'react-native';

const CustomRow = ({ name, email }) => (
    <View style={styles.container}>
            <Image source={{ uri: 'https://mpng.subpng.com/20180411/rzw/kisspng-user-profile-computer-icons-user-interface-mystique-5aceb0245aa097.2885333015234949483712.jpg' }} style={styles.photo} />
            <View style={styles.container_text}>
                <Text style={styles.name}>
                    {name}
                </Text>
                <Text style={styles.email}>
                    {email}
                </Text>
            </View>
        </View>
);

export default CustomRow;

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