/* eslint-disable react-native/no-color-literals */
import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import {
  Button, Icon, View, Text, List, ListItem, Left, Right
} from 'native-base';
import { StyleSheet, Platform } from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';

export default function UploadModal({ handleUploadFile }) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = React.useState(false);
  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const chooseImage = React.useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    const uriPaths = result.uri.split('.');
    handleUploadFile({
      fileName: `receipt.${uriPaths[uriPaths.length - 1]}`,
      uri: result.uri,
      type: `${result.type}/${uriPaths[uriPaths.length - 1]}`
    });
  }, [handleUploadFile]);

  const addByHand = () => {
    navigation.navigate('Receipt', { screen: 'Add', params: { isAddOcr: false } });
  };
  const handlePress = (item) => {
    if (item === 'Upload') {
      chooseImage();
    }
    if (item === 'Take Photo') {
      navigation.navigate('Receipt', { screen: 'Camera' });
    }
    if (item === 'Add Receipt') {
      addByHand();
    }
  };
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
            {['Upload', 'Take Photo', 'Add Receipt'].map((item) => (
              <ListItem key={item} style={styles.item} onPress={() => handlePress(item)}>
                <Left>
                  <Text>{item}</Text>
                </Left>
                <Right>
                  {item === 'Upload'
                  && <Icon type="MaterialIcons" name="add-to-photos" />}
                  {item === 'Take Photo'
                  && <Icon type="MaterialIcons" name="add-a-photo" />}
                  {item === 'Add Receipt'
                  && <Icon type="MaterialIcons" name="add" />}
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
  content: {
    backgroundColor: 'white',
    height: '25%'
  },
  item: {
  }
});
