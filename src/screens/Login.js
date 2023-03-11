import React from "react";
import { StyleSheet, Button, Text, View, Image, SafeAreaView, Alert } from "react-native";
import FlatButton from "../components/continue";
import FlatButtonGoogle from "../components/continuegoogle";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BackHandler } from "react-native";
import { withNavigation } from 'react-navigation';

Text.defaultProps = Text.defaultProps || {}; // Lock font size
Text.defaultProps.allowFontScaling = false;

class Login extends React.Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        if (this.props.navigation.routeName === 'Login') {
            BackHandler.exitApp();
            return true;
        }
        return false;
    }

    constructor(props) {
        super(props);
        this.state = {
            checkbox: false,
            uncheckedCheckbox: false,
        };
    }

    render() {
        return (
            <SafeAreaView>

                <Image source={require('../images/firebase.png')}
                    style={{
                        width: 90,
                        height: 125,
                        alignSelf: 'center',
                        marginTop: 130,
                        marginLeft: -200,
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }} />

                    <Text
                        style={{
                            fontSize: 50,
                            marginTop: -90,
                            marginLeft: 120,
                            alignSelf: 'center',
                            flexDirection: 'column',
                        }}>

                    Firebase</Text>

                <Image source={require('../images/React-icon.png')}
                    style={{
                        width: 205,
                        height: 180,
                        alignSelf: 'center',
                        marginTop: 50,
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }} />

                <Text style={{ fontSize: 13, marginTop: 80, alignSelf: 'center', flexDirection: 'column' }}>
                    <Text onPress={() => this.props.navigation.navigate('Register')}
                        style={{ fontSize: 13, marginTop: 10, marginLeft: 77, textShadowColor: 'blue', flexDirection: 'column' }}>
                        Do not have an account? Register :{')'}
                    </Text>
                </Text>

                <Text style={{ fontSize: 17, marginTop: 20, alignSelf: 'center', flexDirection: 'column' }}>or</Text>

                <Text style={{ fontSize: 13, marginTop: 90, marginLeft: 97, flexDirection: 'column' }}>
                    I agree to <Text onPress={() => this.props.navigation.navigate('Terms')}
                        style={{ fontSize: 13,  marginTop: 0, textAlign: 'center', color: '#1976D2', marginTop: 1  }}>
                        Terms and Conditions
                    </Text>
                </Text>

                <FlatButton onPress={() => {
                    if (this.state.checkbox) {
                        this.props.navigation.push('Login2')
                    } else {
                        Alert.alert('Alert', 'You need to accept the terms and conditions of use to continue');

                    }
                }} />

                <View>
                    <Image source={require('../images/google.png')} style={{
                        width: 22,
                        height: 22,
                        alignSelf: 'center',
                        marginLeft: -200,
                        marginTop: -74,
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }} />
                </View>

                {/* make Google API */}
                <FlatButtonGoogle text='Continue with Google' /> 

                {/* Checkbox */}
                <View style={styles.container}>
                    <TouchableOpacity style={styles.checkbox} onPress={() => this.setState({ checkbox: !this.state.checkbox })}>
                        {this.state.checkbox ? (<View style={styles.checkedCheckbox} />) : null}
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        )
    }
}

export default withNavigation(Login);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -32,
        marginLeft: 53,
    },
    checkbox: {
        height: 16,
        width: 16,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15,
        marginTop: 15,
    },
    checkedCheckbox: {
        height: 11,
        width: 11,
        borderRadius: 2,
        backgroundColor: '#319eaa',
    },
    uncheckedCheckbox: {
        height: 16,
        width: 16,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
});
