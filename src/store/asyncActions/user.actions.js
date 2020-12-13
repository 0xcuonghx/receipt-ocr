/* eslint-disable import/prefer-default-export */
import * as GoogleSignIn from 'expo-google-sign-in';
import { loginSuccess, logoutSuccess } from '../reducers/users.reducer';
import { setError, setLoading } from '../reducers/ui.reducer';
import asyncStorageUtils from '../../utils/asyncStorageUtils';
import { AccessToken, clientId } from '../../constraint';

export const getCurrentUser = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await GoogleSignIn.initAsync({ clientId });
    const payload = await GoogleSignIn.signInSilentlyAsync();
    dispatch(setLoading(false));
    if (payload) {
      dispatch(loginSuccess(payload));
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
