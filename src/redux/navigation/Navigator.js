import { Navigation } from 'react-native-navigation'

import HomeScreen from '../../components/screens/Home';
import ProfileScreen from '../../components/screens/Profile';
import SplashScreen from '../../components/screens/Splash';
import EmailAuthenticationScreen from '../../components/screens/EmailAuthentication';

export function registerScreens(store, Provider) {
	Navigation.registerComponent('DropcornApp.Home', () => HomeScreen, store, Provider);
	Navigation.registerComponent('DropcornApp.ProfileSettings', () => ProfileScreen, store, Provider);
	Navigation.registerComponent('DropcornApp.Splash', () => SplashScreen, store, Provider);
	Navigation.registerComponent('DropcornApp.EmailAuthentication', () => EmailAuthenticationScreen, store, Provider);
}
