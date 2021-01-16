/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-raw-text */
import React from 'react';
import {
  Container, Icon, Text, ListItem, List, Thumbnail, View, H3, Left, Right, Input, Picker,
} from 'native-base';

import {
  StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-datepicker';
import HeaderCustom from '../../Common/HeaderCustom';
import AlertCustom from '../../Common/Alert';
import IconMoney from '../../../../assets/images/money.png';
import IconReceipt from '../../../../assets/images/receipt/002.jpg';

import dateUtils from '../../../utils/dateUtils';

export default function DetailReceipt(props) {
  const {
    data = {}, onDelete, getDetail, categories = [], onUpdate
  } = props;

  const route = useRoute();
  const navigation = useNavigation();
  const { receiptId } = route.params;

  const getCategoryId = React.useCallback(
    (name) => categories.find((o) => o.name === name)?.id,
    [categories]
  );

  const getCategoryById = React.useCallback(
    (id) => categories.find((o) => o.id === id),
    [categories]
  );
  const [editMode, setEditMode] = React.useState(false);
  const [detail, setDetail] = React.useState({});
  React.useEffect(() => {
    setDetail({
      id: data.id,
      purchaseDate: dateUtils.isoToDate(data.purchaseDate) || '',
      merchant: data.merchant || '',
      category_id: getCategoryId(data.category) || '',
      total: `${data.total || 0}`,
      products: data.products || [],
      url_image: data.url_image || ''
    });
  }, [data, getCategoryId]);
  const backToList = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const saved = React.useCallback(() => {
    setEditMode(false);
    AlertCustom({
      message: 'Are you sure ?',
      title: 'Confirm Save',
      onOk: () => {
        onUpdate(detail);
        backToList();
      }
    });
  }, [onUpdate, detail, backToList]);

  const deleted = React.useCallback(() => {
    AlertCustom({
      message: 'Are you sure ?',
      title: 'Confirm Deleted',
      onOk: () => {
        onDelete(receiptId);
        navigation.goBack();
      }
    });
  }, [onDelete, receiptId, navigation]);

  const rightHeader = React.useMemo(() => (editMode ? (
    <Icon type="MaterialIcons" name="done" onPress={saved} />
  ) : (
    <>
      <Icon type="MaterialIcons" name="create" onPress={() => setEditMode(true)} />
      <Icon type="MaterialIcons" name="delete" onPress={deleted} />
    </>
  )), [editMode, saved, deleted]);

  React.useEffect(() => {
    getDetail(receiptId);
  }, [receiptId, getDetail]);

  const updateField = React.useCallback((key, value) => {
    setDetail((old) => ({ ...old, [key]: value }));
  }, []);

  const updateProducts = React.useCallback((type, position, value) => {

    if (type === 'add') {
      updateField('products', [...detail.products, { name: 'name', price: '0' }]);
    }
    if (type === 'delete') {
      updateField('products', detail.products.filter((o, index) => index !== position));
    }
    if (type === 'update') {
      const products = [...detail.products];
      products.splice(position, 1, value);
      updateField('products', products);
    }
  }, [updateField, detail]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <HeaderCustom
          title="Detail"
          left={(
            <Icon name="arrow-back" onPress={backToList} />
        )}
          right={rightHeader}
        />
        <ScrollView>
          <List>
            <ListItem itemHeader>
              <View style={styles.thumbnail}>
                <Thumbnail square source={detail.url_image ? IconReceipt : IconMoney} />
              </View>
              <View>
                <Text>Among ($)</Text>
                <Input
                  keyboardType="numeric"
                  value={detail.total}
                  style={{ ...styles.title, ...styles.among }}
                  disabled={!editMode}
                  onChangeText={(value) => updateField('total', value)}
                />
              </View>
            </ListItem>
            <ListItem>
              <Text style={styles.merchant}>Merchant</Text>
              <Input
                style={editMode && styles.input}
                value={detail.merchant}
                disabled={!editMode}
                onChangeText={(value) => updateField('merchant', value)}
              />
            </ListItem>
            <ListItem>
              <Text style={styles.titlePicker}>Category</Text>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={styles.categoryPicker}
                placeholder="Select category"
                placeholderIconColor="#007aff"
                enabled={editMode}
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
            </ListItem>
            <ListItem>
              <Text style={styles.titlePicker}>Purchase Date</Text>
              <DatePicker
                style={styles.datePicker}
                date={detail.purchaseDate}
                mode="date"
                placeholder="Select Purchase Date"
                format="DD-MM-YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                disabled={!editMode}
                onDateChange={(value) => updateField('purchaseDate', value)}
              />
            </ListItem>
          </List>
          <List>
            <ListItem itemHeader>
              <H3 style={styles.title}>List Products</H3>
              {editMode
            && <Icon type="MaterialIcons" name="add" onPress={() => updateProducts('add')} />}
            </ListItem>
            {(detail.products || []).map((o, index) => (
              <ListItem key={index.toString()}>
                <Left>
                  <Input
                    style={styles.productName}
                    value={o?.name || ''}
                    disabled={!editMode}
                    onChangeText={(value) => updateProducts('update', index, { ...o, name: value })}
                  />
                </Left>
                <Right>
                  <Input
                    style={editMode && styles.productInput}
                    keyboardType="numeric"
                    value={`${o?.price || 0}`}
                    disabled={!editMode}
                    onChangeText={(value) => updateProducts('update', index, { ...o, price: value })}
                  />
                </Right>
                {editMode && (
                <Icon
                  type="MaterialIcons"
                  name="delete"
                  onPress={() => updateProducts('delete', index,)}
                />
                )}
              </ListItem>
            ))}
          </List>
          <View style={styles.addHeight} />

        </ScrollView>
      </Container>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  among: {
    width: 200,
  },
  thumbnail: {
    paddingRight: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    width: '90%'
  },
  titlePicker: {
    width: '30%'
  },
  categoryPicker: {
    width: '70%',
  },
  datePicker: {
    width: '70%',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    height: 40
  },
  merchant: {
    marginRight: 20
  },
  addHeight: {
    height: 400
  },
  productInput: {
    borderWidth: 1,
    borderColor: 'black',
    width: 100
  },
  productName: {
    maxWidth: 200,
  }
});
