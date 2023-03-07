import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert  } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as yup from "yup";
import { firebase } from '../../config'

// validate formik
const validationFormik = yup.object().shape({
    email: yup.string().email('Entre com um email válido').required('Insira seu email').label('Email'),

})

class Forgot extends React.Component {

    state = {
        email: '',
      };

      handlePasswordRecovery = async () => {
        try {
          await firebase.auth().sendPasswordResetEmail(this.state.email);
          Alert.alert('E-mail de recuperação de senha enviado', 'Por favor, verifique seu e-mail para obter instruções sobre como redefinir sua senha.');
        } catch (error) {
          Alert.alert('E-mail não encontrado', 'Por favor, certifique-se de que o e-mail está escrito corretamente.'); // Alert.alert('Erro', error.message);
        }
      };


    render() {
        return (
            <SafeAreaView>

                <View>
                    <Text
                        style={{
                            fontSize: 60,
                            fontWeight: 'bold',
                            alignSelf: 'center',
                            marginTop: 140,
                            marginBottom: 20,
                        }}
                    >HEROFIT</Text>
                </View>

                <Formik
                    initialValues={{ email: ""}}
                    onSubmit={(values, actions) => {
                        // mudar lógica
                        this.doLogin({ email: values.email, password: values.password })
                            .then(() => alert('Login success'))
                            .catch(e => actions.setFieldError('MyErrorLogin', e.message))
                            .finally(() => actions.setSubmitting(false));
                        alert(JSON.stringify(values));
                    }}
                    validationSchema={validationFormik}
                >


                    {formikProps => (

                        <>
                            {/* <ActivityIndicator animating={formikProps.isSubmitting} size="large" color="#0ad6f2" /> */}

                            <View >
                                <Text style={styles.txtLabel}>Insira seu endereço de email cadastrado</Text>
                                <TextInput
                                    value={this.state.email}
                                    selectionColor={'#0ad6f2'}
                                    style={styles.txtInput}
                                    // onChangeText={formikProps.handleChange('email')}
                                    onChangeText={email => this.setState({ email })}
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

                            {/* tenho que enviar código para o emal ao click do botão
                            ao clicar e email bater com o cadastrado, exibir uma simples notificação
                            dizendo que o email de recuperação de senha foi enviado com sucesso.
                            o email deve conter um link para o cadastro de uma nova senha */}
                            <TouchableOpacity style={{
                                alignItems: 'center',
                            }}
                            
                            onPress={this.handlePasswordRecovery}
                            // onPress={formikProps.handleSubmit}
                            >
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>Enviar</Text>
                            
                                </View>

                            </TouchableOpacity>

                            <View>
                                <Text 
                                onPress={() => this.props.navigation.navigate('Login3')}
                                style={{
                                    marginTop: 20,
                                    alignSelf: 'center',
                                }}>
                                    Voltar para o Login
                                </Text>
                            </View>
             

                            <View style={styles.logincheckbox}>

                            </View>
                        
                        </>


                    )}

                </Formik>

            </SafeAreaView>
        )
    }
}

export default Forgot;

const styles = StyleSheet.create({
    txtLabel: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 5,
        marginLeft: 35,
        opacity: 0.3,
        height: 27,
        marginTop: -10, // manipular altura de tudo
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
    button: {
        alignItems: "center",
        backgroundColor: '#030303',
        borderRadius: 10,
        borderWidth: 0.15,
        padding: 11,
        marginTop: 15,
        marginHorizontal: 29,
        width: 300,
        height: 65,
    },
    buttonText: {
        color: '#FCFCFC',
        fontSize: 30,
        alignItems: 'center',
    }
});