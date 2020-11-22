import React from 'react';
import {
  Container, Content, Thumbnail, Text, View, List, ListItem, Left, Right, Icon, Button
} from 'native-base';
import { StyleSheet } from 'react-native';
import HeaderCustom from '../Common/HeaderCustom';
import IconTest from '../../../assets/images/budget.png';
import SelectPicker from './SelectPicker';

export default function Setting() {
  const moneyOption = [
    { label: 'vnđ', key: 'VND' },
    { label: '$', key: 'DOLLAR' },
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
    { label: 'Việt Nam', key: 'vie' },
  ];
  return (
    <Container>
      <HeaderCustom title="Setting" />
      <Content>
        <View style={styles.avatar}>
          <Thumbnail large source={IconTest} />
          <Text>cuong1181998@gmail.com</Text>
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
                <Button transparent>
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
  // eslint-disable-next-line react-native/no-color-literals
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  left: {
    flex: 1
  },
  right: {
    flex: 1
  }
});
