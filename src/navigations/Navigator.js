import 'react-native-gesture-handler';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Terms from '../screens/Terms';
import Login2 from '../screens/Login2';
import Login3 from '../screens/Login3';
import Forgot from '../screens/Forgot';
import Home from '../screens/Home';
import RegistrationScreen from '../screens/Register';
import Routes from '../routes/routes';
import routeslogin from '../screens/routeslogin';
import { createSwitchNavigator } from 'react-navigation';
import Logout from '../components/logout';

const stackNavigatorOptions = {  
    headerShown: false,
}
const AppNavigator = createStackNavigator({
  
    Login2: {screen:Login2},
    // Login3: {screen:Login3},   
    Forgot: {screen:Forgot},
    Register: {screen:RegistrationScreen},
    routes: {screen:Routes},
    routeslogin: {screen:routeslogin},
    logout: {screen:Logout},
    Login: {screen:Login},
    Terms: {screen:Terms},
 
},
{
    defaultNavigationOptions : stackNavigatorOptions,
    initialRouteName: 'Login'
});

export default createAppContainer(AppNavigator);
