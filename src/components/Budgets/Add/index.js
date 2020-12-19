/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-unused-styles */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-raw-text */
import React from 'react';
import {
  View, Left, Right, Text, Header, Body, List, ListItem, Input, Thumbnail, Picker, Icon
} from 'native-base';
import { StyleSheet } from 'react-native';
import DateRangePicker from 'react-native-daterange-picker';
import moment from 'moment';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon1 from '../../../../assets/images/logo.png';
import AlertCustom from '../../Common/Alert';

export default function DetailBudget(props) {
  const navigation = useNavigation();
  const route = useRoute();

  const id = route.params?.id;
  const isAdd = !route.params?.id;
  const {
    categories = [], budgets = [], onAdd, onDelete, onUpdate
  } = props;

  const getCategoryId = React.useCallback(
    (name) => categories.find((o) => o.name === name)?.id,
    [categories]
  );

  const getCategoryById = React.useCallback(
    (id_) => categories.find((o) => o.id === id_),
    [categories]
  );

  const budget = budgets.find((o) => o.id === id) || {};
  const [detail, setDetail] = React.useState({
    id: budget.id,
    category_id: getCategoryId(budget.category),
    fromDate: moment(budget.fromDate),
    toDate: moment(budget.fromDate),
    among: `${budget.among || 0}`
  });
  const backToList = React.useCallback(() => {
    navigation.navigate('List');
  }, [navigation]);

  const saved = React.useCallback((type) => {
    AlertCustom({
      message: 'Are you sure ?',
      title: 'Confirm Save',
      onOk: () => {
        if (type === 'add') {
          onAdd(detail);
        }
        if (type === 'update') {
          onUpdate(detail);
        }
        if (type === 'delete') {
          onDelete(detail.id);
        }
        backToList();
      }
    });
  }, [onAdd, detail, backToList, onUpdate, onDelete]);

  const updateField = React.useCallback((key, value) => {
    setDetail((old) => ({ ...old, [key]: value }));
  }, []);

  return (
    <View style={styles.container}>
      <Header style={styles.header}>
        <Left><Icon type="MaterialIcons" name="arrow-back" onPress={backToList} /></Left>
        <Body><Text>{isAdd ? 'Add Budget' : 'Detail'}</Text></Body>
        <Right>
          { isAdd ? <Icon type="MaterialIcons" name="done" onPress={() => saved('add')} /> : (
            <>
              <Icon type="MaterialIcons" name="create" onPress={() => saved('update')} />
              <Icon type="MaterialIcons" name="delete" onPress={() => saved('delete')} />
            </>
          )}
        </Right>
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
              selectedValue={detail.category_id}
              onValueChange={(value) => updateField('category_id', value)}

            >
              {categories.map((o) => {
                const category = getCategoryById(o.id);
                return (
                  <Picker.Item
                    key={o.id}
                    label={(
                      <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                        <Icon name={category.icon} />
                        <Text style={{ paddingLeft: 10 }}>{category.name}</Text>
                      </View>
                  )}
                    value={o.id}
                  />
                );
              })}
            </Picker>
          </Right>
        </ListItem>
        <ListItem>
          <Left>
            <Text>Among</Text>
          </Left>
          <Right>
            <Input
              style={styles.input}
              value={detail.among}
              keyboardType="numeric"
              onChangeText={(value) => updateField('among', value)}
            />
          </Right>
        </ListItem>
        <ListItem>
          <Left style={styles.dateLabel}>
            <Text>Time Range</Text>
          </Left>
          <Right>
            <DateRangePicker
              onChange={(dates) => {
                if (dates.startDate) {
                  updateField('fromDate', dates.startDate);
                }
                if (dates.endDate) {
                  updateField('toDate', dates.endDate);
                }
              }}
              endDate={detail.toDate}
              startDate={detail.fromDate}
              displayedDate={moment()}
              range
              containerStyle={styles.containerStyle}
            >
              <Text>
                {`${moment(detail.fromDate).format('DD/MM/YYYY')} - ${moment(detail.toDate).format('DD/MM/YYYY')}`}
              </Text>
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
  dateLabel: {
    flex: 0.7,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    width: 100,
  },
});
