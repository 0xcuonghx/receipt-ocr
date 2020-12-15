import React from 'react';
import {
  Container, Icon, ListItem, Left, Thumbnail, Body, Text, Right
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import HeaderCustom from '../../Common/HeaderCustom';
import IconTest from '../../../../assets/images/budget.png';

export default function Categories(props) {
  const { categories = [] } = props;
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
            <Thumbnail
              source={IconTest}
              small
            />
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

  return (
    <Container>
      <HeaderCustom
        title="Categories"
        right={(
          <Icon name="add" type="MaterialIcons" onPress={goToAdd} />
        )}
        left={(<Icon name="arrow-back" type="MaterialIcons" onPress={backToSetting} />)}
      />
      {list}
    </Container>
  );
}
