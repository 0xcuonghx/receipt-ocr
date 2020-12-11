/* eslint-disable import/prefer-default-export */
import * as GoogleSignIn from 'expo-google-sign-in';
import { loginSuccess, logoutSuccess } from '../reducers/users.reducer';
import { setError, setLoading } from '../reducers/ui.reducer';

const CLIENT_ID = '751216151427-rekmejfdmcl3tel94ntthgmch5qdont5.apps.googleusercontent.com';

export const getCurrentUser = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await GoogleSignIn.initAsync({ clientId: CLIENT_ID });
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
    dispatch(setLoading(false));
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError('Logout Fail!'));
  }
};
