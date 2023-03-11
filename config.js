import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// const firebaseConfig = {
//     apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
//     authDomain: "xxxxxxx.firebaseapp.com",
//     projectId: "xxxxxxxxxxxxx",
//     storageBucket: "xxxxxxxxxx.appspot.com",
//     messagingSenderId: "xxxxxxxxxx",
//     appId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
// };

const firebaseConfig = {
    apiKey: "AIzaSyAFW2kQ6p6Vtm0ciZWT6-tk-aeJNENl-dg",
    authDomain: "login-react-native-fireb-62c1b.firebaseapp.com",
    projectId: "login-react-native-fireb-62c1b",
    storageBucket: "login-react-native-fireb-62c1b.appspot.com",
    messagingSenderId: "456580674615",
    appId: "1:456580674615:web:bd445ce1bb25625458bbb2"
  };

app = firebase.initializeApp(firebaseConfig)

export { firebase };
