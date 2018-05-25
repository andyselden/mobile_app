import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase';

//import { DATA_AVAILABLE } from "../actions/" //Import the actions types constant we defined in our actions

let dataState = { data: [], loading:true };

const dataReducer = (state = dataState, action) => {
    //   switch (action.type) {
    //       case DATA_AVAILABLE:
    //           state = Object.assign({}, state, { data: action.data, loading:false });
    //           return state;
    //       default:
               return state;
    //  }
};

const rootReducer = combineReducers({
    firebase: firebaseStateReducer,
    dataReducer
})

export default rootReducer;

