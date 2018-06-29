import React, { PureComponent } from 'react'
import { Provider } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import store from './redux/store'
import { registerScreens } from './redux/navigation/Navigator';
import {
    D_COLOR_PRIMARY,
} from './styles/constants'


registerScreens(store, Provider);


const homeNavigatorStyle = {
    navBarHidden: true
};

const splashNavigationStyle = {
    navBarHidden: true
}

class App extends PureComponent {
    constructor(props) {
		super(props);
        store.subscribe(this.onStoreUpdate.bind(this));
	}

  onStoreUpdate() {
        let { signedIn } = store.getState().user

        if (this.currentRoot != signedIn) {
          this.currentRoot = signedIn;
          this.startApp(signedIn);
        }
    }

  startApp(signedIn) {
         switch (signedIn) {
        case true:
          Navigation.startSingleScreenApp({
                    screen: {
                        screen: 'DropcornApp.Home',
                        title: 'Find Something',
                        navigatorStyle: {
                            statusBarColor: 'white',
                        	statusBarTextColorScheme: 'light',
                        	navigationBarColor: 'white',
                        	navBarBackgroundColor: '#ffffff',
                        	navBarTextColor: '#2C127D',
                        	navBarButtonColor: '#2C127D',
                        	navBarHideOnScroll: true,
                        	tabBarHidden: true,
                        }
                    }
                });
                return;

        case false:
          Navigation.startSingleScreenApp({
                    screen: {
                    screen: 'DropcornApp.Splash',
                    title: 'Sign In',
                    navigatorStyle: {
                        navBarHidden: true
                    },
                    navigatorButtons: {}
                    },
                });
                return;

          default:
            console.log("No Root Found")
        }
  }
}

export default App
