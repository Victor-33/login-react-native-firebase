import React, { useState } from "react";
import { StyleSheet, Button, Text, View, Image, SafeAreaView, Alert } from "react-native";
import FlatButton from "../components/continuar";
import FlatButtonGoogle from "../components/continuargoogle";
import Checkbox from "../components/checkbox";
import Validate from "../components/validate";
import { useFormik } from "formik";
import * as yup from "yup";
import { TouchableOpacity, TouchableHighlight } from "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import { BackHandler } from "react-native";
import { withNavigation } from 'react-navigation';

Text.defaultProps = Text.defaultProps || {}; // block that font size get bigger
Text.defaultProps.allowFontScaling = false;


class Login extends React.Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
      }
    
      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
      }
    
      handleBackPress = () => {
        if (this.props.navigation.routeName=== 'Login') {
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

        console.log(this.props.navigation.state.routeName)

        return (
            <SafeAreaView>
                <Image source={require('../images/logo.png')}
                    style={{
                        width: 200,
                        height: 230,
                        alignSelf: 'center',
                        marginTop: 225, // manipular altura da posição da imagem
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }} />

                <Text
                    style={{
                        fontSize: 53,
                        textAlign: 'center',
                        marginTop: -300,
                        fontWeight: 'bold',
                    }}>
                    HERO FIT
                </Text>
                

                <Text style={{ fontSize: 20, marginTop: -4, alignSelf: 'center', flexDirection: 'column' }}>
                    Tenha constância. Construa</Text>
                <Text style={{ fontSize: 20, marginTop: -1, alignSelf: 'center', flexDirection: 'column' }}>
                    resultados</Text>
                <Text style={{ fontSize: 13, marginTop: 275, alignSelf: 'center', flexDirection: 'column' }}>
                    <Text onPress={() => this.props.navigation.navigate('Register')}
                    style={{ fontSize: 13, marginTop: 0, marginLeft: 77, textShadowColor: 'blue', flexDirection: 'column' }}>
                        Não tem uma conta? Cadastre-se :{')'}</Text></Text>
                <Text style={{ fontSize: 17, marginTop: 10, alignSelf: 'center', flexDirection: 'column' }}>ou</Text>

                <Text style={{ fontSize: 13, marginTop: 90, marginLeft: 77, flexDirection: 'column' }}>
                    Declaro estar de acordo com os<Text onPress={() => this.props.navigation.navigate('routeslogin')}
                    style={{ fontSize: 13, marginTop: 0, marginLeft: 77, color: '#1976D2', flexDirection: 'column' }}> 
                    Termos e Condições de Uso</Text></Text>

                {/* <FlatButton onPress={() => this.props.navigation.navigate('Login3')} /> */}

                <FlatButton onPress={() => {
                    if (this.state.checkbox) {
                        this.props.navigation.push('Login3') // push or replace
                    } else {
                        // alert('Você precisa aceitar os termos e condições de uso para continuar')
                        Alert.alert('Aviso', 'Você precisa aceitar os termos e condições de uso para continuar');
                        
                    }
                }} />

                <View>
                    <Image source={require('../images/google.png')} style={{
                        width: 22,
                        height: 22,
                        alignSelf: 'center',
                        marginLeft: -200,
                        marginTop: -94, // manipular altura da posição da imagem
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }} />
                </View>

                <FlatButtonGoogle text='Continuar com Google' onPress={() => this.props.navigation.navigate('Test')} />

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
        marginRight: 8,
    },
    checkedCheckbox: {
        height: 11,
        width: 11,
        borderRadius: 2,
        backgroundColor: '#31aa52',
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