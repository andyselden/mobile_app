import React, { PureComponent } from 'react';
import Navigator from './navigation/Navigator';
import { Provider } from 'react-redux';
import store from './redux/store';

import 'whatwg-fetch'


class App extends PureComponent {
  render () {
      return (
        <Provider store={ store }>
            <Navigator/>
      </Provider>
    )
  }
}

export default App
