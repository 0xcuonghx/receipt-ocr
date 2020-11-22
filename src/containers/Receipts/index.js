import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListReceipt from '../../components/Receipts/List';
import DetailReceipt from '../../components/Receipts/Details';

const ReceiptStack = createStackNavigator();

export default function Receipt() {
  return (
    <ReceiptStack.Navigator initialRouteName="List" headerMode="none">
      <ReceiptStack.Screen name="List" component={ListReceipt} />
      <ReceiptStack.Screen name="Detail" component={DetailReceipt} />
    </ReceiptStack.Navigator>
  );
}
