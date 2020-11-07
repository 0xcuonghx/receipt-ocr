import React from 'react';
import moment from 'moment';

import {
  Container, Button, Icon, View, Text
} from 'native-base';
import {
  StyleSheet
} from 'react-native';
import HeaderCustom from '../Common/HeaderCustom';

export default function Report() {
  const currentMonth = React.useMemo(() => moment().startOf('month').unix(), []);
  const [selectedMonth, setSelectedMonth] = React.useState(currentMonth);

  const toggleNextMonth = React.useCallback(() => {
    setSelectedMonth(moment.unix(selectedMonth).add(1, 'months').startOf('month').unix());
  }, [selectedMonth]);

  const togglePreviousMonth = React.useCallback(() => {
    setSelectedMonth(moment.unix(selectedMonth).subtract(1, 'months').startOf('month').unix());
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
            <Text>{currentMonth === selectedMonth ? 'This Month' : moment.unix(selectedMonth).format('MM-YYYY')}</Text>
            <Text numberOfLines={1} note>
              {moment.unix(selectedMonth).startOf('month').format('DD/MM/YYYY')}
              -
              {moment.unix(selectedMonth).endOf('month').format('DD/MM/YYYY')}
            </Text>
          </View>
        )}
      />

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
