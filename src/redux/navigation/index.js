import {
    createStackNavigator,
} from 'react-navigation'
import {
    createStore,
    applyMiddleware,
    combineReducers,
} from 'redux'
import {
  createNavigationPropConstructor,
  createNavigationReducer,
  createReactNavigationReduxMiddleware,
  initializeListeners,
} from 'react-navigation-redux-helpers';
import { Provider, connect } from 'react-redux'
import React from 'react'
import Navigator from './Navigator.js'


