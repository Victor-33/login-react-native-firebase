import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as yup from "yup";
import { firebase } from '../../config';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

const validationFormik = yup.object().shape({
    email: yup.string().email('Enter a valid e-mail').required('Enter your e-mail').label('E-mail'),
    password: yup.string().required('Enter your password').max(15, 'Password too long').label("Password"),
    Checkbox: yup.boolean().oneOf([true], 'Please check the agreement').label("Checkbox")

})

// const getcolor = () => {

//     if (formikProps.touched.password && formikProps.errors.password || formikProps.touched.email && formikProps.errors.email == true) {
//         return 'red'
//     } else {
//         return '#BCBCBC'
//     }
// }

class Login2 extends React.Component {

    state = {
        secureTextEntry: true,
        loading: false,
    };

    onLoginPress = ({ email, password }) => {
        this.setState({ loading: true });
        try {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(() => {
                    console.log("Login successfully");
                    this.props.navigation.replace("routes");
                })
                .catch(error => {
                    Alert.alert("Error when trying to login", "Incorrect email or password");
                    this.setState({ loading: false });
                });
        } catch (error) {
            console.error(error);
            this.setState({ loading: false });
        }
    };

    toggleSecureTextEntry = () => {
        this.setState({ secureTextEntry: !this.state.secureTextEntry });
    };

    render() {

        const { loading } = this.state;

        const showImage = (
            <Image
                style={{
                    width: 35,
                    height: 20,
                    marginLeft: 283,
                    marginTop: -155, // manipular altura da posição da imagem
                    flexDirection: 'column',
                }}
                tintColor='#BCBCBC'
                source={require('../images/show.png')}
            />
        );

        const hideImage = (
            <Image
                style={{
                    width: 30,
                    height: 30,
                    marginLeft: 285,
                    marginTop: -160, // manipular altura da posição da imagem
                    flexDirection: 'column',
                }}
                tintColor='#BCBCBC'
                source={require('../images/hide.png')}
            />
        );

        // if (loading) {
        //     return (
        //       <View style={styles.loadingContainer}>
        //         <ActivityIndicator size="large" color="#0ad6f2" />
        //       </View>
        //     );
        //   }

        return (
            <SafeAreaView style={{marginTop: -20}}>
                <KeyboardAwareScrollView>

                    <View>

                        {/* <TouchableOpacity>
                            <Text style={{fontSize: 50,  color: '#0ad6f2' }}
                                onPress={() => this.props.navigation.navigate('Login')}
                                    >Voltar</Text>

                        </TouchableOpacity> */}

                    <Image source={require('../images/firebase.png')}
                        style={{
                            width: 90,
                            height: 125,
                            alignSelf: 'center',
                            marginTop: 130, // manipular altura da posição da imagem
                            marginLeft: 150,
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }} />


                    <Image source={require('../images/React-icon.png')}
                        style={{
                            width: 130,
                            height: 115,
                            alignSelf: 'center',
                            marginTop: -122, // manipular altura da posição da imagem
                            marginLeft: -120,
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }} />
                       
                    </View>

                    <Formik
                        initialValues={{ email: "", password: "" }}

                        // onSubmit={(values, actions) => {
                        //     this.doLogin({ email: values.email, password: values.password })
                        //         .then(() => alert('Login success'))
                        //         .catch(e => actions.setFieldError('MyErrorLogin', e.message))
                        //         .finally(() => actions.setSubmitting(false));
                        //     alert(JSON.stringify(values));
                        // }}

                        onSubmit={values => {
                            this.onLoginPress({ email: values.email, password: values.password })
                        }}

                        validationSchema={validationFormik}
                    >

                        {formikProps => (

                            <>

                                {/* <ActivityIndicator animating={formikProps.isSubmitting} size="large" color="#0ad6f2" /> */}


                                <View style={{marginTop: 40}}>
                                    <Text style={styles.txtLabel}>E-mail</Text>
                                    <TextInput
                                        selectionColor={'#0ad6f2'}
                                        style={styles.txtInput}
                                        onChangeText={formikProps.handleChange('email')}
                                        oneBlur={formikProps.handleBlur('email')}

                                    />

                                    {/* show error email  */}

                                    <Text style={{
                                        marginTop: -10,
                                        marginLeft: 35,
                                        color: 'red'
                                    }}>
                                        {formikProps.touched.email && formikProps.errors.email}
                                    </Text>

                                </View>



                                <View >
                                    <Text style={styles.txtLabelpassword}>Password</Text>

                                    <TextInput
                                        selectionColor={'#0ad6f2'}
                                        style={styles.txtInputpassword}
                                        onChangeText={formikProps.handleChange('password')}
                                        oneBlur={formikProps.handleBlur('password')}
                                        secureTextEntry={this.state.secureTextEntry}
                                    />

                                    {/* show error password  */}

                                    <Text
                                        style={{
                                            marginTop: -10,
                                            marginLeft: 35,
                                            color: 'red'
                                        }}>
                                        {formikProps.touched.password && formikProps.errors.password}
                                    </Text>


                                </View>


                                <TouchableOpacity style={{
                                    alignItems: 'center',
                                }}
                                    onPress={formikProps.handleSubmit}>
                                    <View style={styles.button}>
                                        <Text style={styles.buttonText}>Login</Text>
                                    </View>

                                </TouchableOpacity>

                                <TouchableOpacity onPress={this.toggleSecureTextEntry}>
                                    {this.state.secureTextEntry ? hideImage : showImage}
                                </TouchableOpacity>

                                <View>
                                    <Text
                                        onPress={() => this.props.navigation.navigate('Forgot')} // fazer nova tela para recuperar senha
                                        style={{
                                            marginTop: -110,
                                            marginLeft: 190,
                                            color: 'grey',


                                        }}>
                                        Forgot your password?
                                    </Text>
                                </View>

                                <View>
                                    <Text
                                        onPress={() => this.props.navigation.navigate('Register')} // fazer nova tela para recuperar senha
                                        style={{
                                            marginTop: 40,
                                            alignSelf: 'center',
                                        }}>
                                        Don't have an account? Register :{')'}
                                    </Text>

                                </View>

                                {/* <View>
                              
                                    
                               
                                </View> */}



                                {/* <View style={styles.button}> */}

                                {/* <TouchableOpacity >
                                    <Text style={styles.btnSubmit} onPress={formikProps.handleSubmit}>

                                        Entrar
                                    
                                    </Text>
                                </TouchableOpacity> */}

                                {/* <Button style={styles.btnSubmit} title="Login" onPress={formikProps.handleSubmit} />
                                    <Text style={{ color: 'red' }}> {formikProps.errors.MyErrorLogin} </Text> */}
                                {/* </View> */}

                                <View style={styles.logincheckbox}>

                                </View>

                                {loading ? (
                                    <View style={styles.loadingContainer}>
                                        <ActivityIndicator size="large" color="#0ad6f2" />
                                    </View>
                                ) : null}


                            </>



                        )}



                    </Formik>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        )
    }
}


export default Login2;



const styles = StyleSheet.create({
    txtLabel: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 5,
        marginLeft: 40,
        opacity: 0.3,
        height: 27,
        marginTop: -10, // manipular altura de tudo
    },
    txtLabelpassword: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 5,
        marginLeft: 40,
        opacity: 0.3,
        height: 27,
        marginTop: 10,
    },
    txtInput: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#BCBCBC',
        padding: 12,
        borderRadius: 5,
        marginTop: -5,
        marginBottom: 10,
        marginHorizontal: 30,
    },

    txtInputwrong: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'red',
        padding: 12,
        borderRadius: 5,
        marginTop: -63.5,
        marginBottom: 10,
        marginHorizontal: 30,
    },

    txtInputpassword: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#BCBCBC',
        padding: 12,
        borderRadius: 5,
        marginTop: -5,
        marginBottom: 10,
        marginHorizontal: 30,
    },

    txtInputpasswordwrong: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'red',
        padding: 12,
        borderRadius: 5,
        marginTop: -63.5,
        marginBottom: 10,
        marginHorizontal: 30,

    },

    btnSubmit: {
        backgroundColor: '#030303',
        padding: 20,
        borderRadius: 5,
        marginTop: 300,
        textAlign: 'center',
        color: '#fcfcfc',

        width: 300,
        marginHorizontal: 30,
    },
    txtSubmit: {
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
    },
    logincheckbox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
    },
    validatecheckbox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        color: 'red',
    },
    checkedCheckbox: {
        height: 11,
        width: 11,
        borderRadius: 2,
        backgroundColor: '#31aa52',
    },
    button: {
        alignItems: "center",
        backgroundColor: '#030303',
        borderRadius: 10,
        borderWidth: 0.15,
        padding: 11,
        marginTop: 35,
        marginHorizontal: 29,
        width: 300,
        height: 65,
    },
    buttonText: {
        color: '#FCFCFC',
        fontWeight: 'semibold',
        fontSize: 30,
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
});