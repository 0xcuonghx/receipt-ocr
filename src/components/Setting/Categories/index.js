/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Container, Icon, ListItem, Left, Body, Text, Right
} from 'native-base';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import HeaderCustom from '../../Common/HeaderCustom';

export default function Categories(props) {
  const { categories = [], fetchCategories } = props;
  const navigation = useNavigation();

  const goToAdd = React.useCallback(() => {
    navigation.navigate('Detail');
  }, [navigation]);

  const goToDetail = React.useCallback((categoryId) => {
    navigation.navigate('Detail', { categoryId });
  }, [navigation]);

  const list = React.useMemo(() => {
    return categories.map((item) => {
      return (
        <ListItem thumbnail key={item.id} onPress={() => goToDetail(item.id)}>
          <Left>
            <Icon name={item.icon} />
          </Left>
          <Body>
            <Text>{item.name || ''}</Text>
          </Body>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
      );
    });
  }, [categories, goToDetail]);

  const backToSetting = React.useCallback(() => {
    navigation.navigate('Setting');
  }, [navigation]);

  const refresh = React.useCallback(() => {
    fetchCategories();
  }, [fetchCategories]);

  useFocusEffect(
    React.useCallback(() => {
      refresh();
    }, [refresh])
  );
  return (
    <Container>
      <HeaderCustom
        title="Categories"
        right={(
          <>
            <Icon name="add" type="MaterialIcons" onPress={goToAdd} style={{ marginRight: 10 }} />
            <Icon name="ios-refresh" onPress={refresh} />
          </>
        )}
        left={(
          <>
            <Icon name="arrow-back" type="MaterialIcons" onPress={backToSetting} />
          </>
)}
      />
      <ScrollView>
        {list}
      </ScrollView>
    </Container>
  );
}
