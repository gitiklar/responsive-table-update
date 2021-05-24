import { combineReducers, createStore } from 'redux';

import userDetailsReducer from './reducers/userDetailsReducer';

const reducer = combineReducers({ userDetailsReducer });

const store = createStore(reducer);
window.store = store;
export default store;