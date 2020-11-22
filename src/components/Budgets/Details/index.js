/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-raw-text */
import React from 'react';
import {
  View, Left, Right, Button, Text, Header, Body, List, ListItem, Input, Thumbnail, Picker, Icon
} from 'native-base';
import { StyleSheet } from 'react-native';
import DateRangePicker from 'react-native-daterange-picker';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import Icon1 from '../../../../assets/images/logo.png';
import AlertCustom from '../../Common/Alert';

export default function DetailBudget() {
  const navigation = useNavigation();

  const backToList = () => {
    navigation.navigate('List');
  };

  const saved = React.useCallback(() => {
    AlertCustom({ message: 'Are you sure ?', title: 'Confirm Save' });
  }, []);
  return (
    <View style={styles.container}>
      <Header style={styles.header}>
        <Left><Button transparent onPress={backToList}><Text>Cancel</Text></Button></Left>
        <Body><Text>Add Budget</Text></Body>
        <Right><Button transparent onPress={saved}><Text>Add</Text></Button></Right>
      </Header>
      <List>
        <ListItem>
          <Left>
            <Thumbnail small source={Icon1} />
            <Text>Category</Text>
          </Left>
          <Right style={styles.right}>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              placeholder="Select category"
              placeholderIconColor="#007aff"
            >
              {[1, 2, 3, 4].map((o) => <Picker.Item key={o} label={o} value={o} />)}
            </Picker>
          </Right>
        </ListItem>
        <ListItem>
          <Left>
            <Text>Among</Text>
          </Left>
          <Right>
            <Input value="2000" />
          </Right>
        </ListItem>
        <ListItem>
          <Left>
            <Text>Time Range</Text>
          </Left>
          <Right>
            <DateRangePicker
              onChange={() => console.log('change')}
              endDate={moment().endOf('month')}
              startDate={moment().startOf('month')}
              displayedDate={moment()}
              range
              containerStyle={styles.containerStyle}
            >
              <Text>1/10 - 31/10</Text>
            </DateRangePicker>
          </Right>
        </ListItem>

      </List>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF'
  },
  header: {

  },
  right: {
    flex: 1,
  },
  containerStyle: {
    top: '-50%'
  },
});
