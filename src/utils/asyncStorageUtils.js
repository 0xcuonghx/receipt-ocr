import AsyncStorage from '@react-native-community/async-storage';

const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log('AsyncStorage-setItem', error);
  }
};

// eslint-disable-next-line consistent-return
const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.log('AsyncStorage-getItem', error);
  }
};

const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('AsyncStorage-removeItem', error);
  }
};

export default {
  setItem,
  getItem,
  removeItem,
};
