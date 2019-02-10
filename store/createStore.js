import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import thunk from "redux-thunk"

import * as reducers from './modules';

const rootReducer = combineReducers(reducers);

const enhancers = compose(
	typeof window !== 'undefined' && process.env.NODE_ENV !== 'production'
		? window.devToolsExtension && window.devToolsExtension()
		: f => f
)

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

export default initialState =>
	createStoreWithMiddleware(rootReducer, initialState, enhancers)
