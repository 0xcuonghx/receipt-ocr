/* eslint-disable react-native/no-raw-text */
import React from 'react';
import {
  Container, Button, Icon, Text, ListItem, List, Thumbnail, View, H3, Left, Right, Input, Picker,
} from 'native-base';
import { StyleSheet, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-datepicker';
import HeaderCustom from '../../Common/HeaderCustom';
import AlertCustom from '../../Common/Alert';
import IconMoney from '../../../../assets/images/money.png';

export default function DetailReceipt() {
  const route = useRoute();
  const navigation = useNavigation();
  const { receiptId } = route.params;

  const [editMode, setEditMode] = React.useState(false);

  const backToList = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const saved = React.useCallback(() => {
    setEditMode(false);
    AlertCustom({ message: 'Are you sure ?', title: 'Confirm Save' });
  }, []);

  const rightHeader = React.useMemo(() => (editMode ? (
    <Button transparent onPress={saved}>
      <Icon type="MaterialIcons" name="done" />
    </Button>
  ) : (
    <Button transparent onPress={() => setEditMode(true)}>
      <Icon type="MaterialIcons" name="create" />
    </Button>
  )), [editMode, saved]);

  return (
    <Container>
      <HeaderCustom
        title="Detail"
        left={(
          <Button transparent onPress={backToList}>
            <Icon name="arrow-back" />
            <Text>Back</Text>
          </Button>
        )}
        right={rightHeader}
      />
      <List>
        <ListItem itemHeader>
          <View style={styles.thumbnail}>
            <Thumbnail square source={IconMoney} />
          </View>
          <View>
            <Text>Among</Text>
            <Input value="2000" style={styles.title} disabled={!editMode} />
          </View>
        </ListItem>
        <ListItem>
          <Text style={styles.titlePicker}>Category</Text>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={styles.categoryPicker}
            placeholder="Select category"
            placeholderIconColor="#007aff"
            enabled={editMode}
          >
            {[1, 2, 3, 4].map((o) => <Picker.Item key={o} label={o} value={o} />)}
          </Picker>
        </ListItem>
        <ListItem>
          <Text style={styles.titlePicker}>Purchase Date</Text>
          <DatePicker
            style={styles.datePicker}
              // date={this.state.date}
            mode="date"
            placeholder="Select Purchase Date"
            format="DD-MM-YYYY"
            // minDate="2016-05-01"
            // maxDate="2016-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            disabled={!editMode}
          />
        </ListItem>
      </List>
      <ScrollView>
        <List>
          <ListItem itemHeader>
            <H3 style={styles.title}>List Products</H3>
          </ListItem>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((o) => (
            <ListItem key={o}>
              <Left>
                <Input value="Pant" disabled={!editMode} />
              </Left>
              <Right>
                <Input value="200" disabled={!editMode} />
              </Right>
            </ListItem>
          ))}
        </List>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  thumbnail: {
    paddingRight: 20
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20
  },
  titlePicker: {
    width: '30%'
  },
  categoryPicker: {
    width: '70%',
  },
  datePicker: {
    width: '70%',
  },
});
