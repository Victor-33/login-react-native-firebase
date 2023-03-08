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
import Workout from '../screens/Workout';
import User from '../screens/User';
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
    Login3: {screen:Login3},   
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
}
);
export default createAppContainer(AppNavigator);


// const Stack = createStackNavigator();

// const AppNavigator = () => { 
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Login" component={Login} />
//         <Stack.Screen name="Register" component={Register} />
//         <Stack.Screen name="Terms" component={Terms} />
//         <Stack.Screen name="Login2" component={Login2} />
//         <Stack.Screen name="Login3" component={Login3} />
//         <Stack.Screen name="Test" component={Test} />
//         <Stack.Screen name="Forgot" component={Forgot} />
//         <Stack.Screen name="Backup" component={Backup} />
//         <Stack.Screen name="Home" component={Home} />
//         <Stack.Screen name="Workout" component={Workout} />
//         <Stack.Screen name="User" component={User} />
//         <Stack.Screen name="testing" component={MyComponent} />
//         <Stack.Screen name="Register" component={RegistrationScreen} />
//         <Stack.Screen name="routes" component={Routes} />
//         <Stack.Screen name="routeslogin" component={routeslogin} />
//         <Stack.Screen name="logout" component={Logout} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default AppNavigator;