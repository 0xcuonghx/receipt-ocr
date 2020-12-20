import React from 'react';
import _ from 'lodash';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import {
  fetchListReceipts, getDetailReceipt, deleteReceipt, editReceipt, createReceipt,
  createReceiptOCR
} from '../../store/asyncActions/receipt.actions';
import {
  fetchListCategories
} from '../../store/asyncActions/category.actions';

import ListReceipt from '../../components/Receipts/List';
import DetailReceipt from '../../components/Receipts/Details';
import AddReceipt from '../../components/Receipts/Add';
import CustomCamera from '../../components/Camera';

const ReceiptStack = createStackNavigator();

export default function Receipt() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const receiptReducer = useSelector((state) => state.receiptReducer);
  const categoryReducer = useSelector((state) => state.categoryReducer);

  const fetchReceipts = React.useCallback((params) => {
    dispatch(fetchListReceipts(params));
  }, [dispatch]);

  const fetchCategories = React.useCallback(() => {
    dispatch(fetchListCategories());
  }, [dispatch]);

  const getDetail = React.useCallback((id) => {
    dispatch(getDetailReceipt(id));
  }, [dispatch]);

  React.useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  React.useEffect(() => {
    fetchReceipts();
  }, [fetchReceipts]);

  const receipts = React.useMemo(() => _.groupBy(receiptReducer.data,
    (x) => moment(x.purchaseDate).format('MM/DD/YYYY')),
  [receiptReducer.data]);

  const onDelete = React.useCallback((receiptId) => {
    dispatch(deleteReceipt(receiptId));
  }, [dispatch]);

  const onUpdate = React.useCallback((receipt) => {
    dispatch(editReceipt(receipt));
  }, [dispatch]);

  const onAdd = React.useCallback((receipt) => {
    dispatch(createReceipt(receipt));
  }, [dispatch]);

  const goToAdd = React.useCallback(() => {
    navigation.navigate('Receipt', { screen: 'Add', params: { isAddOcr: true } });
  }, [navigation]);

  const handleUploadFile = React.useCallback(({ uri, fileName, type }) => {
    const formData = new FormData();
    formData.append('image', {
      uri,
      name: fileName,
      type
    });
    dispatch(createReceiptOCR(formData, goToAdd));
  }, [dispatch, goToAdd]);

  return (
    <ReceiptStack.Navigator initialRouteName="List" headerMode="none">
      <ReceiptStack.Screen name="List">
        {(props) => (
          <ListReceipt
            {...props}
            data={receipts}
            fetchReceipts={fetchReceipts}
          />
        )}
      </ReceiptStack.Screen>
      <ReceiptStack.Screen name="Detail">
        {(props) => (
          <DetailReceipt
            {...props}
            getDetail={getDetail}
            data={receiptReducer.detail}
            onDelete={onDelete}
            onUpdate={onUpdate}
            categories={categoryReducer.data}
          />
        )}
      </ReceiptStack.Screen>
      <ReceiptStack.Screen name="Add">
        {(props) => (
          <AddReceipt
            {...props}
            onAdd={onAdd}
            categories={categoryReducer.data}
          />
        )}
      </ReceiptStack.Screen>
      <ReceiptStack.Screen name="Camera">
        {(props) => (
          <CustomCamera
            {...props}
            handleUploadFile={handleUploadFile}
          />
        )}
      </ReceiptStack.Screen>
    </ReceiptStack.Navigator>
  );
}
