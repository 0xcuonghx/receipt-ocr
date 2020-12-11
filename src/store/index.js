import {
  createStore, applyMiddleware, compose, combineReducers
} from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';

// eslint-disable-next-line import/no-extraneous-dependencies
import thunk from 'redux-thunk';

import userReducer, { initialState as userInitialState } from './reducers/users.reducer';
import budgetReducer, { initialState as budgetInitialState } from './reducers/budgets.reducer';
import uiReducer, { initialState as uiInitialState } from './reducers/ui.reducer';

export const initialRootState = {
  userReducer: userInitialState,
  budgetReducer: budgetInitialState,
  uiReducer: uiInitialState
};

export default function configureStore(
  preloadedState = initialRootState,
) {
  const middleWares = [thunk];
  const middlewareEnhancer = applyMiddleware(...middleWares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = process.env.NODE_ENV === 'development'
    ? composeWithDevTools(...enhancers)
    : compose(...enhancers);

  const rootReducer = combineReducers({
    userReducer,
    budgetReducer,
    uiReducer
  });

  return createStore(rootReducer, preloadedState, composedEnhancers);
}
