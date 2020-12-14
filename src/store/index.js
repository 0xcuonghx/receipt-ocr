import {
  createStore, applyMiddleware, compose, combineReducers
} from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';

// eslint-disable-next-line import/no-extraneous-dependencies
import thunk from 'redux-thunk';

import userReducer, { initialState as userInitialState } from './reducers/users.reducer';
import budgetReducer, { initialState as budgetInitialState } from './reducers/budgets.reducer';
import uiReducer, { initialState as uiInitialState } from './reducers/ui.reducer';
import receiptReducer, { initialState as receiptInitialState } from './reducers/receipts.reducer';
import categoryReducer, { initialState as categoryInitialState } from './reducers/categories.reducer';
import reportReducer, { initialState as reportInitialState } from './reducers/reports.reducer';

export const initialRootState = {
  userReducer: userInitialState,
  budgetReducer: budgetInitialState,
  uiReducer: uiInitialState,
  receiptReducer: receiptInitialState,
  categoryReducer: categoryInitialState,
  reportReducer: reportInitialState
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
    uiReducer,
    receiptReducer,
    categoryReducer,
    reportReducer
  });

  return createStore(rootReducer, preloadedState, composedEnhancers);
}
