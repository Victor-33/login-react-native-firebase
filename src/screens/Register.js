import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, Button, ActivityIndicator } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from "react-native-safe-area-context";
import { firebase } from '../../config'
import Upload from "../components/uploadphoto";
import { Formik } from "formik";
import * as yup from "yup";
import { useContext } from 'react';
import { PhotoUri } from "../components/uploadphoto";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from '@react-navigation/native';
import AppNavigator from '../navigations/Navigator';
import { Alert } from 'react-native';
import { withNavigation } from 'react-navigation';

const validationFormik = yup.object().shape({
    name: yup.string().required('Enter your name').label('Name'),
    email: yup.string().email('Enter a valid email').required('Enter your e-mail').label('E-mail'),
    password: yup.string().required('Enter your password').min(6, 'Password must contain at least 6 characters').max(15, 'Password too long').label("Password"),
})




function RegistrationScreen(props) {

    const showImage = (
        <Image
            style={{
                width: 35,
                height: 20,
                marginLeft: 285,
                marginTop: -55, // manipular altura da posição da imagem
                flexDirection: 'column',
                tintColor: '#BCBCBC',
            }}
            source={require('../images/show.png')}
        />
    );

    const hideImage = (
        <Image
            style={{
                width: 30,
                height: 30,
                marginLeft: 288,
                marginTop: -60, // manipular altura da posição da imagem
                flexDirection: 'column',
                tintColor: '#BCBCBC',
            }}
            source={require('../images/hide.png')}
        />
    );

    const [secureTextEntry, setSecureTextEntry] = useState(false);
    const [loading, setLoading] = useState(false);

    const toggleSecureTextEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const navigation = useNavigation();


    const [avatar, setAvatar] = useState();
    const [uri, setUri] = useState('');

    async function imagePickerCall() {
        try {
            if (Constants.platform.ios) {
                const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

                if (status !== "granted") {
                    alert("We need this permission.");
                    return;
                }
            }

            const data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All
            });

            if (data.canceled) {
                return;
            }

            if (!data.assets) {
                return;
            }

            setAvatar(data);
            setUri(data.assets[0].uri);
            console.log(uri);

        } catch (error) {
            console.log(error);
        }
    }

    const onRegisterPress = ({ email, password, name }) => {
        setLoading(true);
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                // create user success, now sign in the user
                return firebase.auth().signInWithEmailAndPassword(email, password);
            })
            .then(() => {
                // sign in success, now store user data in firestore
                const uid = firebase.auth().currentUser.uid;
                const data = {
                    id: uid,
                    email,
                    photo: uri,
                    name
                };
                const usersRef = firebase.firestore().collection('users');
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        console.log("Data saved successfully");
                        props.navigation.replace('routes', { user: data }); // navigate
                    })
                    .catch((error) => {
                        alert(error);
                    });
            })
            .catch((error) => {
                // alert('Esse email já está em uso. Tente outro email.');
                Alert.alert("Error", "This e-mail is already in use. Try another e-mail.");
                setLoading(false);
            });
    };


    return (
        <SafeAreaView >
            <KeyboardAwareScrollView>

                <View style={styles.content}>
                    <TouchableOpacity style={styles.button} onPress={imagePickerCall}>
                        <Image
                            source={{
                                uri: avatar
                                    ? avatar.assets[0].uri
                                    : "https://i.pinimg.com/originals/74/32/c0/7432c05285a3833ecf9e4a896e82b0ff.jpg"
                            }}
                            style={styles.avatar}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={imagePickerCall}>
                        <Text style={styles.buttonTextselect}>Select an image</Text>
                    </TouchableOpacity>

                </View>

                <Formik
                    initialValues={{ email: "", password: "", name: "" }}
                    // change here to register in the database

                    onSubmit={values => onRegisterPress(values)}
                    validationSchema={validationFormik}
                >


                    {formikProps => (

                        <>
                            <ActivityIndicator style={styles.hidespace} />

                            <View >

                                <TextInput
                                    style={styles.txtInput}
                                    onChangeText={formikProps.handleChange("name")}
                                    oneBlur={formikProps.handleBlur('name')}
                                    placeholder="Name"
                                    selectionColor={'#0ad6f2'}
                                />

                                {/* show error name  */}
                                <Text style={{
                                    marginTop: -10,
                                    marginLeft: 35,
                                    color: 'red'
                                }}>
                                    {formikProps.touched.name && formikProps.errors.name}
                                </Text>
                            </View>

                            <View >
                                <TextInput
                                    style={styles.txtInput}
                                    onChangeText={formikProps.handleChange('email')}
                                    oneBlur={formikProps.handleBlur('email')}
                                    placeholder="E-mail"
                                    selectionColor={'#0ad6f2'}
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
                                <TextInput
                                    style={styles.txtInputpassword}
                                    onChangeText={formikProps.handleChange('password')}
                                    oneBlur={formikProps.handleBlur('password')}
                                    secureTextEntry={!secureTextEntry}
                                    placeholder="Password"
                                    selectionColor={'#0ad6f2'}

                                />

                                {/* show error password  */}
                                <Text style={{
                                    marginTop: -10,
                                    marginLeft: 35,
                                    color: 'red'
                                }}>
                                    {formikProps.touched.password && formikProps.errors.password}
                                </Text>

                                <TouchableOpacity onPress={toggleSecureTextEntry}>
                                    {secureTextEntry ? showImage : hideImage}
                                </TouchableOpacity>

                            </View>

                            <View >
                                <Text style={
                                    {
                                        fontSize: 11,
                                        textAlign: 'center',
                                        marginTop: 7,
                                    }
                                }>When accessing the app's services:</Text>
                                <Text style={
                                    {
                                        fontSize: 11,
                                        textAlign: 'center',
                                        marginTop: 1,
                                    }}> 
                                    I declare to be aware of and agree with the<Text onPress={() => this.props.navigation.navigate('Terms')}
                                    style={{ fontSize: 11, marginTop: 0, color: '#1976D2', flexDirection: 'column' }}> Terms of use</Text> and</Text>
                                <Text onPress={() => this.props.navigation.navigate('Terms')}
                                    style={{ fontSize: 11, marginTop: 0, textAlign: 'center', color: '#1976D2', marginTop: 1 }}>Privacy </Text>
                            </View>


                            <TouchableOpacity style={{
                                alignItems: 'center',
                            }}
                                onPress={formikProps.handleSubmit}>
                                {/* formikProps.handleSubmit */}
                                <View style={styles.buttonsign}>
                                    <Text style={styles.buttonText}>Sign-up</Text>
                                    <Image source={require('../images/logo.png')} style={{
                                        width: 110,
                                        height: 110,
                                        marginLeft: -100,
                                        marginTop: -72, // manipular altura (antes tava -74, no iphone -70)
                                        flexDirection: 'column',
                                        tintColor: '#fcfcfc'
                                    }} />
                                </View>

                            </TouchableOpacity>

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

export default withNavigation(RegistrationScreen);

const styles = StyleSheet.create({
    txtLabel: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 5,
        marginLeft: 40,
        opacity: 0.3,
        height: 27,
        marginTop: 40, // manipular altura de tudo
    },
    txtLabelpassword: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 5,
        marginLeft: 40,
        opacity: 0.3,
        height: 27,

    },
    txtInput: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#BCBCBC',
        padding: 12,
        borderRadius: 5,
        marginTop: 6,
        marginBottom: 10,
        marginHorizontal: 30,
    },
    txtInputpassword: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#BCBCBC',
        padding: 12,
        borderRadius: 5,
        marginTop: 6,
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
    buttonsign: {
        alignItems: "center",
        backgroundColor: '#030303',
        borderRadius: 10,
        borderWidth: 0.15,
        padding: 11,
        marginTop: 20,
        marginHorizontal: 29,
        width: 300,
        height: 65,
    },
    buttonText: {
        color: '#FCFCFC',
        fontWeight: 'semibold',
        fontSize: 30,
        marginLeft: 60,
    },
    content: {

        justifyContent: "center",
        alignItems: "center",
        marginTop: 70,

    },
    button: {
        width: 120,
        height: 30,
        borderRadius: 0,
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40
    },
    buttonTextselect: {

    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 50

    },
    loadingContainer: {
        position: 'absolute',
        top: -165,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    hidespace : {
        height: 35,
        width: 35,
        opacity: 0,
    },
});
