import React from 'react';
import { AppRegistry } from 'react-native';
import { createStackNavigator, createSwitchNavigator, createDrawerNavigator} from 'react-navigation';

import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import SplashScreen from '../screens/Splash';
import SignUpScreen from '../screens/SignUp';
import SignInScreen from '../screens/SignIn';
import ForgotPasswordScreen from '../screens/ForgotPassword';
import Auth from '../Auth';

//App Stack
const DrawerStack = createDrawerNavigator({
  HomeScreen: { screen: HomeScreen },
  ProfileScreen: { screen: ProfileScreen },
},{
    initialRouteName: 'HomeScreen',
    gesturesEnabled: false
})

const AppStack = createStackNavigator(
{
  DrawerStack: { screen: DrawerStack }
}, {
  headerMode: 'none',
  gesturesEnabled: false
});


//Auth Stack
const AuthHeaderDefinedStack = createStackNavigator({
    SplashScreen: {
      screen: SplashScreen,
    },
    SignUpScreen: {
      screen: SignUpScreen,
    },
    SignInScreen: {
      screen: SignInScreen,
    },
    ForgotPasswordScreen: {
      screen: ForgotPasswordScreen,
    },
  },
  {
    initialRouteName: 'SplashScreen',
});

const AuthStack = createStackNavigator({
    Root: {
        screen: AuthHeaderDefinedStack,
        navigationOptions: {
            header: null,
        },
    },
});

//Auth Stack
export default createSwitchNavigator(
  {
    Auth: Auth,
    AppStack: AppStack,
    AuthStack: AuthStack,
  },
  {
    initialRouteName: 'Auth'
  }
);

