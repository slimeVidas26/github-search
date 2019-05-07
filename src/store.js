
import {createStore,applyMiddleware} from 'redux'
import {logger} from 'redux-logger'
import thunk from 'redux-thunk'
import asyncReducer from './reducers'



const store = createStore(asyncReducer , applyMiddleware(thunk , logger))

 
export default store;
