import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import SettingComponent from '../../components/Setting';
import Categories from '../../components/Setting/Categories';
import {
  fetchListCategories, createCategory, editCategory, deleteCategory
} from '../../store/asyncActions/category.actions';
import Detail from '../../components/Setting/Categories/Detail';

const SettingStack = createStackNavigator();

export default function Setting() {
  const dispatch = useDispatch();

  const categoryReducer = useSelector((state) => state.categoryReducer);

  const fetchCategories = React.useCallback(() => {
    dispatch(fetchListCategories());
  }, [dispatch]);

  React.useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const onDelete = React.useCallback((id) => {
    dispatch(deleteCategory(id));
  }, [dispatch]);

  const onUpdate = React.useCallback((detail) => {
    dispatch(editCategory(detail));
  }, [dispatch]);

  const onAdd = React.useCallback((detail) => {
    dispatch(createCategory(detail));
  }, [dispatch]);

  return (
    <SettingStack.Navigator initialRouteName="Setting" headerMode="none">
      <SettingStack.Screen name="Setting">
        {(props) => (
          <SettingComponent {...props} />
        )}
      </SettingStack.Screen>
      <SettingStack.Screen name="Categories">
        {(props) => (
          <Categories {...props} categories={categoryReducer.data} />
        )}
      </SettingStack.Screen>
      <SettingStack.Screen name="Detail">
        {(props) => (
          <Detail
            {...props}
            onDelete={onDelete}
            onUpdate={onUpdate}
            onAdd={onAdd}
            categories={categoryReducer.data}
          />
        )}
      </SettingStack.Screen>
    </SettingStack.Navigator>
  );
}
