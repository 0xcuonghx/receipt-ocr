/* eslint-disable react-native/no-color-literals */
import React, { useMemo } from 'react';
import {
  View, ActivityIndicator, StyleSheet, StatusBar
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector, useDispatch } from 'react-redux';
import LoginView from '../LoginView';
import { Screens, routes } from './routes';
import { clearSnackBar } from '../../store/reducers/ui.reducer';

const Tab = createBottomTabNavigator();

export default function AppContainer() {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.uiReducer.loading);
  const isAuthenticated = useSelector((state) => state.userReducer.isAuthenticate);
  const error = useSelector((state) => state.uiReducer.error);
  const message = useSelector((state) => state.uiReducer.message);

  React.useEffect(() => {
    if (error) {
      Snackbar.show({
        text: error,
        duration: Snackbar.LENGTH_SHORT,
      });
    }
    if (message) {
      Snackbar.show({
        text: message,
        duration: Snackbar.LENGTH_SHORT,
      });
    }
    dispatch(clearSnackBar());
  }, [error, message, dispatch]);

  const IndicatorView = useMemo(() => (
    <View
      style={[
        StyleSheet.absoluteFill,
        styles.loading,
      ]}
    >
      <StatusBar barStyle="dark-content" />
      <ActivityIndicator size="large" />
    </View>
  ),
  []);

  const NavigationView = useMemo(() => (
    <NavigationContainer>
      <Tab.Navigator initialRouteName={Screens.Home}>
        {routes.map((route) => (
          <Tab.Screen
            key={route.name}
            name={route.name}
            component={route.component}
            options={route.options}
          />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  ),
  []);

  return (
    <>
      {isAuthenticated ? NavigationView : <LoginView /> }
      {isLoading && IndicatorView}
    </>
  );
}

const styles = StyleSheet.create({
  loading: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center'
  }
});
