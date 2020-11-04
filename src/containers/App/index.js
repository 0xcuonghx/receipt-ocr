import React, { useMemo, useState, useCallback } from 'react';
import { View, ActivityIndicator, StyleSheet, StatusBar } from 'react-native';
import Snackbar from 'react-native-snackbar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { useSelector } from 'react-redux';
// import { REDUX_TYPE, LOADING_TYPE } from './redux/redux-type-saga';
// import { Record, Collection } from 'immutable';
// import { IStore } from './redux/redux-state';
// import { sGetIndicatorState } from './redux/selectors';
import { Screens, routes } from './routes';

const Stack = createStackNavigator();

// const isLoadingSelector = (store: Record<IStore> & Readonly<IStore>) => {
//   const count: Collection<string, any> = store.getIn([
//     REDUX_TYPE,
//     LOADING_TYPE,
//   ]);
//   return !!count || sGetIndicatorState(store);
// };

const AppContainer = props => {
  const [visible, setVisible] = useState(false);
  const isLoading = false;
  // const isLoading = useSelector(isLoadingSelector);
  // callbacks
  const showAlert = useCallback((options) => {
    Snackbar.show(options);
  }, []);
  // memos
  const screenProps = useMemo(() => {
    return {
      setHudVisible: setVisible,
      showAlert,
    };
  }, []);
  const IndicatorView = useMemo(() => {
    if (visible || isLoading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center' },
          ]}>
          <StatusBar barStyle="dark-content" />
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return null;
  }, [visible, isLoading]);
  const NavigationView = useMemo(() => {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={Screens.Home}>
          {routes.map(route => (<Stack.Screen
            key={route.name}
            name={route.name}
            component={route.component}
            options={route.options}
          />))}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }, [screenProps]);
  return (
    <React.Fragment>
      {NavigationView}
      {IndicatorView}
    </React.Fragment>
  );
};

export default AppContainer;
