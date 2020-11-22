/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Container, Content, List, ListItem, Thumbnail, Text, Left, Body,
  Right, Button, Icon, Card, CardItem
} from 'native-base';
import { StyleSheet, View, Animated } from 'react-native';
import Modal from 'react-native-modal';
import IconTest from '../../../../assets/images/budget.png';
import HeaderCustom from '../../Common/HeaderCustom';

export default function ListBudget() {
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <Container>
      <HeaderCustom
        title="Budgets"
        right={(
          <Button transparent onPress={() => setModalVisible(true)}>
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
      <Modal
        backdropOpacity={0.1}
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.container}
      >
        <View style={styles.content}>
          <Card>
            <CardItem>
              <Left><Button transparent><Text>Cancel</Text></Button></Left>
              <Text>Add Budget</Text>
              <Right><Button transparent><Text>Add</Text></Button></Right>
            </CardItem>
          </Card>
        </View>
      </Modal>
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
  content: {
    backgroundColor: 'white',
    height: '80%',
    marginLeft: 10,
    marginRight: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10
  },
  container: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});
