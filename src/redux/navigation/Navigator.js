import { Navigation } from 'react-native-navigation'

import HomeScreen from '../../screens/Home';
import ProfileScreen from '../../screens/Profile';
import SplashScreen from '../../screens/Splash';
import EmailAuthScreen from '../../screens/EmailAuth';
import ForgotPasswordScreen from '../../screens/ForgotPassword';

export function registerScreens(store, Provider) {
	Navigation.registerComponent('DropcornApp.Home', () => HomeScreen, store, Provider);
	Navigation.registerComponent('DropcornApp.ProfileSettings', () => ProfileScreen, store, Provider);
	Navigation.registerComponent('DropcornApp.Splash', () => SplashScreen, store, Provider);
	Navigation.registerComponent('DropcornApp.EmailAuth', () => EmailAuthScreen, store, Provider);
	Navigation.registerComponent('DropcornApp.ForgotPassword', () => ForgotPasswordScreen, store, Provider);
}
