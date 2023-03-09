import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator(); // Create a tab navigator



export default function Routes(prop) {
    return (



        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 5,
                    backgroundColor: '#161616', // black menu
                    borderRadius: 45,
                    height: 70,
                }
            }}
        >


            <Tab.Screen name="Home" component={Home} routeName="Home"
                options={{
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return (
                                <Image source={require('../images/Home.png')}
                                    style={{ width: 40, height: 40, tintColor: '#0AD6F2' }} />
                            )
                        }
                        else {
                            return (
                                <Image source={require('../images/Home.png')}
                                    style={{ width: 30, height: 30, tintColor: '#cccccc' }} />
                            )
                        }
                    }

                }}
            />

            <Tab.Screen name="Workout" component={Workout} routeName="Workout"
                options={{
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return (
                                <Image source={require('../images/Dumbbell2.png')}
                                    style={{ width: 50, height: 50, tintColor: '#0AD6F2' }} />
                            )
                        }
                        else {
                            return (
                                <Image source={require('../images/Dumbbell2.png')}
                                    style={{ width: 40, height: 40, tintColor: '#cccccc' }} />
                            )
                        }
                    }

                }}

            />

            <Tab.Screen name="User" component={User} routeName="User"
                options={{
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return (
                                <Image source={require('../images/User.png')}
                                    style={{ width: 40, height: 40, tintColor: '#0AD6F2' }} />
                            )
                        }
                        else {
                            return (
                                <Image source={require('../images/User.png')}
                                    style={{ width: 30, height: 30, tintColor: '#cccccc' }} />
                            )
                        }
                    }

                }}

            />

        </Tab.Navigator>
    );
}