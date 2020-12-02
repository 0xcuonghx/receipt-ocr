import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import { fetchListBudgets } from '../../store/asyncActions/budget.actions';

import ListReceipt from '../../components/Budgets/List';
import DetailReceipt from '../../components/Budgets/Details';

const BudgetsStack = createStackNavigator();
export default function Budgets() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.budgetReducer);

  React.useEffect(() => {
    dispatch(fetchListBudgets());
  }, [dispatch]);

  return (
    <BudgetsStack.Navigator initialRouteName="List" headerMode="none">
      <BudgetsStack.Screen
        name="List"
        component={ListReceipt}
        budgets={data}
      />
      <BudgetsStack.Screen
        name="Detail"
        component={DetailReceipt}
      />
    </BudgetsStack.Navigator>
  );
}
