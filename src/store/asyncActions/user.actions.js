/* eslint-disable import/prefer-default-export */
import * as GoogleSignIn from 'expo-google-sign-in';
import axiosInstance from '../../axiosInstance';

import asyncStorageUtils from '../../utils/asyncStorageUtils';
import routeEnum from '../../axiosInstance/apiRoute';
import { loginSuccess, logoutSuccess } from '../reducers/users.reducer';
import { setError, setLoading } from '../reducers/ui.reducer';
import { AccessToken, clientId } from '../../constraint';

export const createUser = (user) => async (dispatch) => {
  try {
    await axiosInstance.post(routeEnum.CREATE_USER, user);
  } catch (error) {
    dispatch(setError('create user fail!'));
  }
};

export const getCurrentUser = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await GoogleSignIn.initAsync({ clientId });
    const user = await GoogleSignIn.signInSilentlyAsync();
    dispatch(setLoading(false));
    if (user) {
      dispatch(loginSuccess(user));
      await asyncStorageUtils.setItem(AccessToken, user.auth.accessToken);
    }
  } catch (error) {
    dispatch(setLoading(false));
  }
};

export const login = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { type, user } = await GoogleSignIn.signInAsync();
    if (type === 'success') {
      dispatch(setLoading(false));
      dispatch(loginSuccess(user));
      await asyncStorageUtils.setItem(AccessToken, user.auth.accessToken);
      dispatch(createUser(user));
    }
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError('Login Fail!'));
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await GoogleSignIn.signOutAsync();
    await asyncStorageUtils.removeItem(AccessToken);
    dispatch(setLoading(false));
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError('Logout Fail!'));
  }
};
