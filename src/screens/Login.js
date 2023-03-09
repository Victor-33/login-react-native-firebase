import React, { useState } from "react";
import { StyleSheet, Button, Text, View, Image, SafeAreaView, Alert } from "react-native";
import FlatButton from "../components/continuar";
import FlatButtonGoogle from "../components/continuargoogle";
import Validate from "../components/validate";
import { useFormik } from "formik";
import * as yup from "yup";
import { TouchableOpacity, TouchableHighlight } from "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
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

        // console.log(this.props.navigation.state.routeName)

        return (
            <SafeAreaView>

                <Image source={require('../images/firebase.png')}
                    style={{
                        width: 90,
                        height: 125,
                        alignSelf: 'center',
                        marginTop: 130, // manipular altura da posição da imagem
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
                        marginTop: 50, // manipular altura da posição da imagem
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }} />







                <Text style={{ fontSize: 13, marginTop: 80, alignSelf: 'center', flexDirection: 'column' }}>
                    <Text onPress={() => this.props.navigation.navigate('Register')}
                        style={{ fontSize: 13, marginTop: 10, marginLeft: 77, textShadowColor: 'blue', flexDirection: 'column' }}>
                        Do not have an account? Register :{')'}
                    </Text>
                </Text>

                {/* <Text style={{marginLeft: 20, marginTop: 10}}>___________________</Text>
                <Text style={{marginLeft: 220, marginTop: -20}}>___________________</Text> */}

                <Text style={{ fontSize: 17, marginTop: 20, alignSelf: 'center', flexDirection: 'column' }}>or</Text>

                <Text style={{ fontSize: 13, marginTop: 90, marginLeft: 97, flexDirection: 'column' }}>
                    I agree to <Text onPress={() => this.props.navigation.navigate('Terms')}
                        style={{ fontSize: 13, marginTop: 10, marginLeft: 77, color: '#1976D2', flexDirection: 'column' }}>
                        Terms and Conditions
                    </Text>
                </Text>

                {/* <FlatButton onPress={() => this.props.navigation.navigate('Login3')} /> */}

                <FlatButton onPress={() => {
                    if (this.state.checkbox) {
                        this.props.navigation.push('Login2') // push or replace
                    } else {
                        // alert('Você precisa aceitar os termos e condições de uso para continuar')
                        Alert.alert('Alert', 'You need to accept the terms and conditions of use to continue');

                    }
                }} />

                {/* hereeeee */}


                <View>
                    <Image source={require('../images/google.png')} style={{
                        width: 22,
                        height: 22,
                        alignSelf: 'center',
                        marginLeft: -200,
                        marginTop: -74, // manipular altura da posição da imagem
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }} />
                </View>

                <FlatButtonGoogle text='Continue with Google' onPress={() => this.props.navigation.navigate('Test')} />


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