import { Navigation } from 'react-native-navigation'

import HomeScreen from '../../components/screens/Home'
import SettingsScreen from '../../components/screens/Settings'
import SplashScreen from '../../components/screens/Splash'
import EmailAuthenticationScreen from '../../components/screens/EmailAuthentication'
import FontAwesomeNavButton from '../../components/molecules/FontAwesomeNavButton'
import Notification from '../../components/molecules/Notification'

export function registerScreens(store, Provider) {
	Navigation.registerComponent('DropcornApp.Home', () => HomeScreen, store, Provider)
	Navigation.registerComponent('DropcornApp.Settings', () => SettingsScreen, store, Provider)
	Navigation.registerComponent('DropcornApp.Splash', () => SplashScreen, store, Provider)
	Navigation.registerComponent('DropcornApp.EmailAuthentication', () => EmailAuthenticationScreen, store, Provider)
    Navigation.registerComponent('DropcornApp.FontAwesomeNavButton', () => FontAwesomeNavButton, store, Provider)
    Navigation.registerComponent('DropcornApp.Notification', () => Notification, store, Provider);
}
