import React, { component } from 'react';
import Navigator from './navigator/Navigator';
import { Provider } from 'react-redux';
import { store } from './redux/store';

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

