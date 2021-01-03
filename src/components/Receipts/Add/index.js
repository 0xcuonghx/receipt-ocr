/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-native/no-raw-text */
import React from 'react';
import {
  Container, Icon, Text, ListItem, List, Thumbnail, View, H3, Left, Right, Input, Picker,
} from 'native-base';
import moment from 'moment';
import { StyleSheet, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import HeaderCustom from '../../Common/HeaderCustom';
import AlertCustom from '../../Common/Alert';
import IconMoney from '../../../../assets/images/money.png';
import IconReceipt from '../../../../assets/images/receipt/003.jpg';
import dateUtils from '../../../utils/dateUtils';

export default function AddReceipt(props) {
  const route = useRoute();
  const isAddOcr = route.params?.isAddOcr;
  const receiptReducer = useSelector((state) => state.receiptReducer);
  const ocrRs = React.useMemo(() => receiptReducer.detail || {}, [receiptReducer]);

  const {
    categories = [], onAdd
  } = props;
  const navigation = useNavigation();

  const getCategoryId = React.useCallback(
    (name) => categories.find((o) => o.name === name)?.id,
    [categories]
  );
  const getCategoryById = React.useCallback(
    (id) => categories.find((o) => o.id === id),
    [categories]
  );

  const [detail, setDetail] = React.useState({
    purchaseDate: moment().format('DD-MM-YYYY'),
    merchant: 'merchant',
    category_id: '',
    total: '0',
    products: [],
    url_image: ''
  });

  React.useEffect(() => {
    if (isAddOcr) {
      setDetail({
        purchaseDate: dateUtils.isoToDate(ocrRs?.purchaseDate) || moment().format('DD-MM-YYYY'),
        merchant: ocrRs?.merchant || 'merchant',
        category_id: getCategoryId(ocrRs?.category) || '',
        total: `${ocrRs?.total || '0'}`,
        products: ocrRs?.products || [],
        url_image: ocrRs?.url_image || ''
      });
    }
  }, [isAddOcr, ocrRs, getCategoryId]);

  // }, [isAddOcr, ocrRs, getCategoryId]);

  const saved = React.useCallback(() => {
    AlertCustom({
      message: 'Are you sure ?',
      title: 'Confirm Save',
      onOk: () => {
        onAdd(detail);
        backToList();
      }
    });
  }, [onAdd, detail, backToList]);

  const rightHeader = React.useMemo(() => (
    <Icon type="MaterialIcons" name="done" onPress={saved} />
  ),
  [saved]);

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

  const backToList = React.useCallback(() => {
    navigation.navigate('List');
  }, [navigation]);

  return (
    <Container>
      <HeaderCustom
        title="Add Receipt"
        left={(
          <Icon name="arrow-back" onPress={backToList} />
        )}
        right={rightHeader}
      />
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
              onChangeText={(value) => updateField('total', value)}
            />
          </View>
        </ListItem>
        <ListItem>
          <Text style={styles.merchantTitle}>
            Merchant
          </Text>
          <Input
            style={styles.input}
            value={detail.merchant}
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
            onDateChange={(value) => updateField('purchaseDate', value)}
          />
        </ListItem>
      </List>
      <ScrollView>
        <List>
          <ListItem itemHeader>
            <H3 style={styles.title}>List Products</H3>
            <Icon type="MaterialIcons" name="add" onPress={() => updateProducts('add')} />
          </ListItem>
          {(detail.products || []).map((o, index) => (
            <ListItem key={index.toString()}>
              <Left>
                <Input
                  value={o?.name || ''}
                  onChangeText={(value) => updateProducts('update', index, { ...o, name: value })}
                />
              </Left>
              <Right>
                <Input
                  keyboardType="numeric"
                  value={`${o?.price || ''}`}
                  onChangeText={(value) => updateProducts('update', index, { ...o, price: value })}
                />
              </Right>
              <Icon
                type="MaterialIcons"
                name="delete"
                onPress={() => updateProducts('delete', index,)}
              />
            </ListItem>
          ))}
        </List>
        <View style={styles.addHeight} />

      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  thumbnail: {
    paddingRight: 20
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
  merchantTitle: {
    width: '30%',
  },
  datePicker: {
    width: '70%',
  },
  among: {
    width: 200,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    height: 40
  },
  addHeight: {
    height: 400
  },
});
