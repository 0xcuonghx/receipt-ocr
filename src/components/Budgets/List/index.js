/* eslint-disable react-native/no-raw-text */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Container, Content, List, ListItem, Thumbnail, Text, Left, Body,
  Right, Button, Icon
} from 'native-base';
import { StyleSheet, View, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import IconTest from '../../../../assets/images/budget.png';
import HeaderCustom from '../../Common/HeaderCustom';
import dataUtils from '../../../utils/dateUtils';

export default function ListBudget(props) {
  const { fetchBudgets, budgets=[] } = props;
  const navigation = useNavigation();
  const goToAdd = () => {
    navigation.navigate('Add');
  };

  const goToDetail = (id) => {
    navigation.navigate('Add', { id })
  }
  const currentMonth = React.useMemo(() => dataUtils.getCurrentMonthByUnix(), []);
  const [selectedMonth, setSelectedMonth] = React.useState(currentMonth);

  const toggleNextMonth = React.useCallback(() => {
    setSelectedMonth(dataUtils.getNextMonthByUnix(selectedMonth));
  }, [selectedMonth]);

  const togglePreviousMonth = React.useCallback(() => {
    setSelectedMonth(dataUtils.getPreviousMonthByUnix(selectedMonth));
  }, [selectedMonth]);

  React.useEffect(() => {
    // #TODO: seeds 
    fetchBudgets({ 
      // fromDate: moment.unix(selectedMonth).startOf('month').toISOString(),
      // toDate: moment.unix(selectedMonth).endOf('month').toISOString()
      fromDate: '0',
      toDate: '3'
    });

  }, [fetchBudgets, selectedMonth]);

  const list = React.useMemo(() => {
    return budgets.map((item) => {
      // TODO: total seeds
      const total = 30;
      return(
      <ListItem thumbnail key={item.id} onPress={() => goToDetail(item.id)}>
        <Left>
          <Thumbnail
            square
            source={IconTest}
          />
        </Left>
        <Body>
          <Text>{item.category || ''}</Text>
          <View style={styles.progressBar}>
            <Animated.View
              style={{ backgroundColor: '#8BED4F', width: `${total / item.among * 100} %` }}
            />
          </View>
          <Text numberOfLines={1} note>
            {moment(item.fromDate).startOf('month').format('DD/MM/YYYY')}
            -
            {moment(item.toDate).endOf('month').format('DD/MM/YYYY')}
          </Text> 
        </Body>
        <Right>
          <Text>{item.among || 0} VND</Text>
        </Right>
      </ListItem>
    )})
  }, [budgets]);

  return (
    <Container>
      <HeaderCustom
        title={(
          <View style={styles.header}>
            <Text>Budgets</Text>
            <Text numberOfLines={1} note>
              <Icon name="arrow-back" onPress={togglePreviousMonth}/>
              {`   `}
              {moment.unix(selectedMonth).startOf('month').format('DD/MM/YYYY')}
              -
              {moment.unix(selectedMonth).endOf('month').format('DD/MM/YYYY')}
              {`   `}
              <Icon name="arrow-forward" onPress={toggleNextMonth}/>
            </Text>
          </View>
        )}
        right={(
          <Button transparent onPress={goToAdd}>
            <Icon name="add" type="MaterialIcons" />
          </Button>
        )}
        left={(<View />)}
      />
      <Content>
        <List>
         {list}
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
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
