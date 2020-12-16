/* eslint-disable react-native/no-color-literals */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container, Content, Thumbnail, Text, View, List, ListItem, Left, Right, Icon, Button
} from 'native-base';
import {
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import HeaderCustom from '../Common/HeaderCustom';
import SelectPicker from './SelectPicker';
import { logout } from '../../store/asyncActions/user.actions';

export default function Setting() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const user = useSelector((state) => state.userReducer.user);

  const moneyOption = [
    { label: '$', key: '$' },
  ];
  const timeFormatOption = [
    { label: 'MM/DD/YYYY', key: 'MM/DD/YYYY' },
    { label: 'MM-DD-YYYY', key: 'MM-DD-YYYY' },
  ];
  const moneyFormatOption = [
    { label: '2.000.000', key: '.' },
    { label: '2,000,000', key: ',' },
  ];
  const LanguageOption = [
    { label: 'English', key: 'eng' },
  ];

  const onLogout = React.useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const goToCategories = React.useCallback(() => {
    navigation.navigate('Categories');
  }, [navigation]);

  return (
    <Container>
      <HeaderCustom title="Setting" />
      <Content>
        <View style={styles.avatar}>
          {user.photoURL && <Thumbnail large source={{ uri: user.photoURL }} />}
          <Text>{user?.email || ''}</Text>
          <Text>{user?.displayName || ''}</Text>
        </View>
        <View
          style={styles.divider}
        />
        <List>
          {['Categories', 'Money', 'Time Format', 'Money Format', 'Language'].map((item) => (
            <ListItem key={item}>
              <Left style={styles.left}>
                <Text>{item}</Text>
              </Left>
              <Right style={styles.right}>
                {item === 'Categories' && (
                <Button transparent onPress={goToCategories}>
                  <Icon name="arrow-forward" />
                </Button>
                )}
                {item === 'Money'
                && <SelectPicker iosHeader="Money" options={moneyOption} />}
                {item === 'Time Format'
                && <SelectPicker iosHeader="Time Format" options={timeFormatOption} />}
                {item === 'Money Format'
                && <SelectPicker iosHeader="Money Format" options={moneyFormatOption} />}
                {item === 'Language'
                && <SelectPicker iosHeader="Money Format" options={LanguageOption} />}
              </Right>
            </ListItem>
          ))}
        </List>
      </Content>
      <View style={styles.logoutContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onLogout}
          style={styles.logoutButton}
        >
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  avatar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 30
  },
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  left: {
    flex: 1
  },
  right: {
    flex: 1
  },
  logoutContainer: {
    flex: 0.1,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15
  },
  logoutButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff7675',
    width: '80%',
    padding: 15,
    borderRadius: 20
  }
});
