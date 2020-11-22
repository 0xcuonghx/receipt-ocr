import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListReceipt from '../../components/Budgets/List';
import DetailReceipt from '../../components/Budgets/Details';

const BudgetsStack = createStackNavigator();
export default function Budgets() {
  return (
    <BudgetsStack.Navigator initialRouteName="List" headerMode="none">
      <BudgetsStack.Screen name="List" component={ListReceipt} />
      <BudgetsStack.Screen name="Detail" component={DetailReceipt} />
    </BudgetsStack.Navigator>
  );
}
