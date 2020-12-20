import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { registerRootComponent } from 'expo';
import App from './src/containers/App';
import configureStore from './src/store';

const store = configureStore();

const Application = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

registerRootComponent(Application);
