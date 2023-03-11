import 'react-native-gesture-handler';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Login from '../screens/Login';
import Terms from '../screens/Terms';
import Login2 from '../screens/Login2';
import Forgot from '../screens/Forgot';
import Home from '../screens/Home';
import RegistrationScreen from '../screens/Register';
import Logout from '../components/logout';

const stackNavigatorOptions = {  
    headerShown: false,
}
const AppNavigator = createStackNavigator({
  
    Login2: {screen:Login2},
    Forgot: {screen:Forgot},
    Register: {screen:RegistrationScreen},
    logout: {screen:Logout},
    Login: {screen:Login},
    Terms: {screen:Terms},
    Home: {screen:Home},
 
},
{
    defaultNavigationOptions : stackNavigatorOptions,
    initialRouteName: 'Login'
});

export default createAppContainer(AppNavigator);
