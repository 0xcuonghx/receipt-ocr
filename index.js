
import 'react-native-gesture-handler';
import React from 'react';
import App from './src/containers/App';
import { Provider } from 'react-redux';
import configureStore from './src/store';
import { registerRootComponent } from 'expo';

const store = configureStore();


const Application = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

registerRootComponent(Application)