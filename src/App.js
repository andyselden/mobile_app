import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';

import 'whatwg-fetch'


class App extends PureComponent {
  render () {
      return (
        <Provider store={ store }>
      </Provider>
    )
  }
}

export default App
