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

export default function Report(props) {
  const {
    fetchByWeek, fetchByCategory, dataByWeek = [], dataByCategory = []
  } = props;
  const currentMonth = React.useMemo(() => dataUtils.getCurrentMonthByUnix(), []);
  const [selectedMonth, setSelectedMonth] = React.useState(currentMonth);

  const toggleNextMonth = React.useCallback(() => {
    setSelectedMonth(dataUtils.getNextMonthByUnix(selectedMonth));
  }, [selectedMonth]);

  const togglePreviousMonth = React.useCallback(() => {
    setSelectedMonth(dataUtils.getPreviousMonthByUnix(selectedMonth));
  }, [selectedMonth]);

  React.useEffect(() => {
    fetchByWeek({
      fromDate: moment.unix(selectedMonth).startOf('month').toISOString(),
      toDate: moment.unix(selectedMonth).endOf('month').toISOString()
    });
    fetchByCategory({
      fromDate: moment.unix(selectedMonth).startOf('month').toISOString(),
      toDate: moment.unix(selectedMonth).endOf('month').toISOString()
    });
  }, [selectedMonth, fetchByWeek, fetchByCategory]);

  const barData = React.useMemo(() => {
    const labels = dataByWeek.map((o) => o.name);
    const data = dataByWeek.map((o) => o.among);

    return {
      labels,
      datasets: [
        {
          data
        }
      ]
    };
  }, [dataByWeek]);

  const colorRandom = React.useCallback(
    // eslint-disable-next-line no-bitwise
    () => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`,
    []
  );
  const pieData = React.useMemo(
    () => dataByCategory.map((o) => ({ name: o.category, value: o.among, color: colorRandom() })),
    [dataByCategory, colorRandom]
  );
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
        <BarChartReport data={barData} />
        <PieChartReport data={pieData} />
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
