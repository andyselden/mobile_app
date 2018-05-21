import React, { component } from 'react';
import Navigator from './Navigator';
import { Provider } from 'react-redux';
import { store } from './config/store';

export default Navigator;


export class App extends React.Component {
  render () {
    return (
      <Provider store={ store }>
          <Navigator />
      </Provider>
    )
  }
}

