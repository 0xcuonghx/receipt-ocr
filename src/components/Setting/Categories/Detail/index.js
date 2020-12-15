/* eslint-disable react-native/no-color-literals */
import React from 'react';
import {
  View, ListItem, List, Input, Text, Icon, Picker
} from 'native-base';
import { StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import HeaderCustom from '../../../Common/HeaderCustom';
import AlertCustom from '../../../Common/Alert';
import icons from './icons';

export default function Detail(props) {
  const {
    categories, onAdd, onUpdate, onDelete
  } = props;

  const navigation = useNavigation();
  const route = useRoute();

  const id = route.params?.categoryId;
  const category = categories.find((o) => o.id === id);
  const isAdd = !id;

  const [detail, setDetail] = React.useState({
    id: category?.id || '',
    name: category?.name || 'name',
    icon: category?.icon || ''
  });
  const updateField = React.useCallback((key, value) => {
    setDetail((old) => ({ ...old, [key]: value }));
  }, []);

  const saved = React.useCallback(() => {
    AlertCustom({
      message: 'Are you sure ?',
      title: 'Confirm saved',
      onOk: () => {
        if (isAdd) {
          onAdd(detail);
        } else {
          onUpdate(detail);
        }
        backToList();
      }
    });
  }, [onAdd, onUpdate, isAdd, detail, backToList]);

  const deleted = React.useCallback(() => {
    AlertCustom({
      message: 'Are you sure ?',
      title: 'Confirm deleted',
      onOk: () => {
        onDelete(id);
        backToList();
      }
    });
  }, [onDelete, id, backToList]);

  const backToList = React.useCallback(() => {
    navigation.navigate('Categories');
  }, [navigation]);

  return (
    <View>
      <HeaderCustom
        title="Categories"
        right={(
          <>
            <Icon name="done" type="MaterialIcons" onPress={saved} />
            {!isAdd && <Icon name="delete" type="MaterialIcons" onPress={deleted} />}
          </>
        )}
        left={(<Icon name="arrow-back" type="MaterialIcons" onPress={backToList} />)}
      />
      <List>
        <ListItem>
          <Text style={styles.title}>
            Icon
          </Text>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={styles.categoryPicker}
            placeholder="Select category"
            placeholderIconColor="#007aff"
            selectedValue={detail.icon}
            onValueChange={(value) => updateField('icon', value)}
          >
            {icons.map((o) => (
              <Picker.Item
                key={o}
                label={<Icon name={o} />}
                value={o}
              />
            ))}
          </Picker>
        </ListItem>
        <ListItem>
          <Text style={styles.title}>
            Name
          </Text>
          <Input
            style={styles.input}
            value={detail.name}
            onChangeText={(value) => updateField('name', value)}
          />
        </ListItem>
      </List>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    width: '50%'
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    height: 40
  },
  categoryPicker: {
    borderWidth: 1,
    borderColor: 'black',
    width: 150,
    height: 40
  }
});
