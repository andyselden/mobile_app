import { Navigation } from 'react-native-navigation'

import HomeScreen from '../../screens/Home';
import ProfileScreen from '../../screens/Profile';
import SplashScreen from '../../screens/Splash';
import SignUpScreen from '../../screens/SignUp';
import SignInScreen from '../../screens/SignIn';
import ForgotPasswordScreen from '../../screens/ForgotPassword';

export function registerScreens(store, Provider) {
	Navigation.registerComponent('DropcornApp.Home', () => HomeScreen, store, Provider);
	Navigation.registerComponent('DropcornApp.ProfileSettings', () => ProfileScreen, store, Provider);
	Navigation.registerComponent('DropcornApp.Splash', () => SplashScreen, store, Provider);
	Navigation.registerComponent('DropcornApp.SignUp', () => SignUpScreen, store, Provider);
	Navigation.registerComponent('DropcornApp.SignIn', () => SignInScreen, store, Provider);
	Navigation.registerComponent('DropcornApp.ForgotPassword', () => ForgotPasswordScreen, store, Provider);
}
