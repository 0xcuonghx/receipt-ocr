/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Container, Content, List, ListItem, Thumbnail, Text, Left, Body,
  Right, Button, Icon
} from 'native-base';
import { StyleSheet, View, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IconTest from '../../../../assets/images/budget.png';
import HeaderCustom from '../../Common/HeaderCustom';

export default function ListBudget() {
  const navigation = useNavigation();
  const navigateToDetails = (budgetId) => {
    navigation.navigate('Detail', { budgetId });
  };
  return (
    <Container>
      <HeaderCustom
        title="Budgets"
        right={(
          <Button transparent onPress={() => navigateToDetails(1)}>
            <Icon name="add" type="MaterialIcons" />
          </Button>
        )}
        left={(<View />)}
      />
      <Content>
        <List>
          {[1, 2, 3, 4].map((item) => (
            <ListItem thumbnail key={item}>
              <Left>
                <Thumbnail
                  square
                  source={IconTest}
                />
              </Left>
              <Body>
                <Text>Food</Text>
                <View style={styles.progressBar}>
                  <Animated.View
                    style={{ backgroundColor: '#8BED4F', width: '50%' }}
                  />
                </View>
              </Body>
              <Right>
                <Text>2000 VND</Text>
              </Right>
            </ListItem>
          ))}
        </List>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  progressBar: {
    flexDirection: 'row',
    height: 20,
    width: '90%',
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5
  },
});
