import React, { PureComponent } from 'react'
import { Provider } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import store from './redux/store'

import { registerScreens } from './redux/navigation/Navigator';

registerScreens(store, Provider);


const homeNavigatorStyle = {
	statusBarColor: 'black',
	statusBarTextColorScheme: 'light',
	navigationBarColor: 'black',
	navBarBackgroundColor: '#0a0a0a',
	navBarTextColor: 'white',
	navBarButtonColor: 'white',
	tabBarButtonColor: 'red',
	tabBarSelectedButtonColor: 'red',
	tabBarBackgroundColor: 'white',
	topBarElevationShadowEnabled: false,
	navBarHideOnScroll: true,
	tabBarHidden: true,
	drawUnderTabBar: true
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
      let { loggedIn } = store.getState().authentication

      if (this.currentRoot != loggedIn) {
        this.currentRoot = loggedIn;
        this.startApp(loggedIn);
      }
    }

  startApp(loggedIn) {
    switch (loggedIn) {
        case true:
          Navigation.startSingleScreenApp({
                    screen: {
                    screen: 'DropcornApp.Home',
                    title: 'Welcome',
                    homeNavigatorStyle,
                    navigatorButtons: {}
                    },
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
