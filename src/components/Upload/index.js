import React from 'react';
import {
  Button, Icon, View, Text, List, ListItem, Left, Right
} from 'native-base';
import { StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

export default function UploadModal() {
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <>
      <Button
        onPress={() => { setModalVisible(true); }}
      >
        <Icon name="add" type="MaterialIcons" fontSize={20} />
      </Button>
      <Modal
        backdropOpacity={0.1}
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.container}
      >
        <View style={styles.content}>
          <List>
            {['Upload', 'Take Photo'].map((item) => (
              <ListItem key={item} style={styles.item} onPress={() => console.log('click')}>
                <Left>
                  <Text>{item}</Text>
                </Left>
                <Right>
                  {item === 'Upload'
                  && <Icon type="MaterialIcons" name="add-to-photos" />}
                  {item === 'Take Photo'
                  && <Icon type="MaterialIcons" name="add-a-photo" />}

                </Right>
              </ListItem>
            ))}
          </List>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  // eslint-disable-next-line react-native/no-color-literals
  content: {
    backgroundColor: 'white',
    height: '15%'
  },
  // eslint-disable-next-line react-native/no-color-literals
  item: {
  }
});
