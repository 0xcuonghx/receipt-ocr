import React from 'react';
import moment from 'moment';
import {
  Container, Button, Icon, View, Text
} from 'native-base';
import {
  StyleSheet, ScrollView
} from 'react-native';
import dataUtils from '../../utils/dateUtils';
import HeaderCustom from '../Common/HeaderCustom';
import BarChartReport from './BarChart';
import PieChartReport from './PieChart';

export default function Report() {
  const currentMonth = React.useMemo(() => dataUtils.getCurrentMonthByUnix(), []);
  const [selectedMonth, setSelectedMonth] = React.useState(currentMonth);

  const toggleNextMonth = React.useCallback(() => {
    setSelectedMonth(dataUtils.getNextMonthByUnix(selectedMonth));
  }, [selectedMonth]);

  const togglePreviousMonth = React.useCallback(() => {
    setSelectedMonth(dataUtils.getPreviousMonthByUnix(selectedMonth));
  }, [selectedMonth]);

  return (
    <Container>
      <HeaderCustom
        left={(
          <Button transparent onPress={togglePreviousMonth}>
            <Icon name="arrow-back" />
          </Button>
        )}
        right={(
          <Button transparent onPress={toggleNextMonth}>
            <Icon name="arrow-forward" />
          </Button>
        )}
        title={(
          <View style={styles.container}>
            <Text>{currentMonth === selectedMonth ? 'This Month' : moment.unix(selectedMonth).format('MM/YYYY')}</Text>
            <Text numberOfLines={1} note>
              {moment.unix(selectedMonth).startOf('month').format('DD/MM/YYYY')}
              -
              {moment.unix(selectedMonth).endOf('month').format('DD/MM/YYYY')}
            </Text>
          </View>
        )}
      />
      <ScrollView>
        <BarChartReport />
        <PieChartReport />
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
