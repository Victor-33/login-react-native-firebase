import React from 'react';
import { Text, View, SafeAreaView, Touchable } from 'react-native';
import { firebase } from '../../config';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';

class Logout extends React.Component {
    Logout_function = () => {
        firebase.auth().signOut()
        .then(() => {
            this.props.navigation.navigate('Login')
            console.log("Logout successfully");
        })
        .catch(error => {
            console.error(error);
        });
    }
    render() {
        return (
            <View>
                <TouchableOpacity 
                onPress={this.Logout_function}
                style={{
                backgroundColor: 'red',
                padding: 10,
                borderRadius: 5,
                marginTop: 500,
                marginLeft: 135,
                width: 100,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                }}
                >
                <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default withNavigation(Logout);


