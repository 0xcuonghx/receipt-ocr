import { createStore, applyMiddleware, compose, combineReducers } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';

import { userReducer, initialState as userInitialState } from './reducers/user.reducer';

export const initialRootState = {
  userReducer: userInitialState
};

export default function configureStore(
  preloadedState = initialRootState,
) {
  const middleWares = [thunk];
  const middlewareEnhancer = applyMiddleware(...middleWares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers =
    process.env.NODE_ENV === 'development'
      ? composeWithDevTools(...enhancers)
      : compose(...enhancers);

  const rootReducer = combineReducers({
    userReducer
  });

  return createStore(rootReducer, preloadedState, composedEnhancers);
}
