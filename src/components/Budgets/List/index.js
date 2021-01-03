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
import { acc } from 'react-native-reanimated';

export default function ListBudget(props) {
  const { fetchBudgets, budgets=[] } = props;

  const [showMap, setShowMap] = React.useState(new Set())
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
    fetchBudgets({ 
      fromDate: moment.unix(selectedMonth).startOf('month').toISOString(),
      toDate: moment.unix(selectedMonth).endOf('month').toISOString()
    });

  }, [fetchBudgets, selectedMonth]);

  const handleGotoDetail = React.useCallback((id) => {
    navigation.navigate('Receipt', { screen: 'Detail', params: {receiptId: id} })
  }, [])

  const handleShowOrHidden = React.useCallback((status, key) => {
    const newShowMap = new Set(showMap)
    if (status) {
      newShowMap.add(key);
      setShowMap(newShowMap)
    } else {
      newShowMap.delete(key);
      setShowMap(newShowMap)
    }
  }, [showMap]);

  const listItem = React.useCallback((item) => {
    const isShow = showMap.has(item?.id);
    
    if (!(item?.receipts || []).length) return null;
    return (<View style={styles.listItem}>
          <Button transparent onPress={() => handleShowOrHidden(!isShow, item?.id)}>{isShow ? <Text>Hide</Text> : <Text>Show</Text>}</Button>
          {isShow && (item?.receipts || []).map(o => 
          (<ListItem 
              avatar 
              key={o.id} 
              onPress={() => handleGotoDetail(o.id)}  
            >
            <Body>
              <Text note>Merchant</Text>
              <Text numberOfLines={1}>{o.merchant}</Text>
            </Body>
            <Right>
              <Text note>Total</Text>
              <Text>
                {`${o.total} VND`}
              </Text>
            </Right>
          </ListItem>
          ))}
        </View>
      )
  }, [handleGotoDetail, handleShowOrHidden, showMap])

  const list = React.useMemo(() => {
    return budgets.map((item) => {
      const total = (item.receipts || []).reduce((acc,cur) => acc + (cur.total || 0), 0);
      const percent = Math.min(total / item.among , 1);
      const color = percent < 0.5 ? '#8BED4F' : (percent < 0.8) ? '#fdcb6e' : '#d63031';
      return(
        <View key={item.id}>
        <ListItem itemDivider thumbnail  onPress={() => goToDetail(item.id)}>
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
                style={{ backgroundColor: color, width: `${percent * 100} %` }}
              />
            </View>
            <Text numberOfLines={1} note>
              {moment(item.fromDate).format('DD/MM/YYYY')}
              -
              {moment(item.toDate).format('DD/MM/YYYY')}
            </Text> 
          </Body>
          <Right>
            <View>
              <Text style={styles.text}>{`Budget: ${item.among || 0}`} $</Text>
              <Text style={styles.text}>{`Used: ${total}`} $</Text>
            </View>
          </Right>
        </ListItem>
        {listItem(item)}
      </View>
    )})
  }, [budgets, listItem, goToDetail]);

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
            <Icon name="add" type="MaterialIcons" onPress={goToAdd}/>
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
  text: {
    fontSize: 10
  },
  listItem: {
    marginLeft: 20
  }
});
