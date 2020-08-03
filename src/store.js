import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import reducers from 'reducers';

const middlewares = [ thunkMiddleware ];

const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;
