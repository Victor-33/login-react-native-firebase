import React from 'react';
import { Text, View, SafeAreaView, Touchable, StyleSheet } from 'react-native';
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
                style={styles.button}>

                <Text style={styles.buttonText}>Logout</Text>

                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: "#030303",
        padding: 11,
        marginTop: 35,
        borderRadius: 10,
        marginHorizontal: 29,
        height: 55,
        
    },
    buttonText: {
        color: '#fcfcfc',
        textAlign: 'center',
        fontSize: 30,
        marginTop: -5,
    }
});

export default withNavigation(Logout);


