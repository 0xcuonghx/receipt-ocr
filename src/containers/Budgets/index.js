import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import {
  fetchListBudgets, createBudget, editBudget, deleteBudget,
} from '../../store/asyncActions/budget.actions';
import { fetchListCategories } from '../../store/asyncActions/category.actions';
import List from '../../components/Budgets/List';
import Add from '../../components/Budgets/Add';

const BudgetsStack = createStackNavigator();
export default function Budgets() {
  const dispatch = useDispatch();
  const budgetReducer = useSelector((state) => state.budgetReducer);
  const categoryReducer = useSelector((state) => state.categoryReducer);

  const fetchBudgets = React.useCallback((params) => {
    dispatch(fetchListBudgets(params));
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(fetchListBudgets());
    dispatch(fetchListCategories());
  }, [dispatch]);

  const onDelete = React.useCallback((id) => {
    dispatch(deleteBudget(id));
  }, [dispatch]);

  const onUpdate = React.useCallback((detail) => {
    dispatch(editBudget(detail));
  }, [dispatch]);

  const onAdd = React.useCallback((detail) => {
    dispatch(createBudget(detail));
  }, [dispatch]);

  return (
    <BudgetsStack.Navigator initialRouteName="List" headerMode="none">
      <BudgetsStack.Screen
        name="List"
      >
        {(props) => (
          <List
            {...props}
            budgets={budgetReducer.data}
            fetchBudgets={fetchBudgets}
          />
        )}
      </BudgetsStack.Screen>
      <BudgetsStack.Screen
        name="Add"
      >
        {(props) => (
          <Add
            {...props}
            categories={categoryReducer.data}
            onAdd={onAdd}
            onDelete={onDelete}
            onUpdate={onUpdate}
            budgets={budgetReducer.data}
          />
        )}
      </BudgetsStack.Screen>
    </BudgetsStack.Navigator>
  );
}
