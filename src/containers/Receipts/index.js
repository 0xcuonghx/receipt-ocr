import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import { fetchListBudgets } from '../../store/asyncActions/budget.actions';

import ListReceipt from '../../components/Receipts/List';
import DetailReceipt from '../../components/Receipts/Details';

const ReceiptStack = createStackNavigator();

export default function Receipt() {
  const dispatch = useDispatch();

  const budget = useSelector((state) => state.budgetReducer);

  React.useEffect(() => {
    dispatch(fetchListBudgets());
  }, [dispatch]);

  return (
    <ReceiptStack.Navigator initialRouteName="List" headerMode="none">
      <ReceiptStack.Screen name="List" component={ListReceipt} />
      <ReceiptStack.Screen name="Detail" component={DetailReceipt} />
    </ReceiptStack.Navigator>
  );
}
