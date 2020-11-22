import React from 'react';
import moment from 'moment';
import {
  Container, Tab, Tabs, Separator, ListItem, Content, Body, Right, Text, View
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import dateUtils from '../../../utils/dateUtils';

import HeaderCustom from '../../Common/HeaderCustom';

export default function ListReceipt() {
  const navigation = useNavigation();
  const currentMonth = React.useMemo(() => dateUtils.getCurrentMonthByUnix(), []);
  const [selectedMonth, setSelectedMonth] = React.useState(currentMonth);
  const [page, setPage] = React.useState(1);

  const tabs = React.useMemo(() => {
    const previousMonth = dateUtils.getPreviousMonthByUnix(selectedMonth);
    const nextMonth = dateUtils.getNextMonthByUnix(selectedMonth);

    if (selectedMonth === currentMonth) {
      return [
        { heading: 'LastMonth', disabled: false },
        { heading: 'ThisMonth', disabled: true },
        { heading: '', disabled: true }
      ];
    }

    return [
      { heading: moment.unix(previousMonth).format('MM-YYYY'), disabled: false },
      { heading: moment.unix(selectedMonth).format('MM-YYYY'), disabled: true },
      { heading: moment.unix(nextMonth).format('MM-YYYY'), disabled: false }
    ];
  }, [selectedMonth, currentMonth]);

  const onChangeTab = React.useCallback((params) => {
    const isLeft = params.i === 0;
    const isRight = params.i === 2;
    const previousMonth = dateUtils.getPreviousMonthByUnix(selectedMonth);
    const nextMonth = dateUtils.getNextMonthByUnix(selectedMonth);

    if (isLeft) {
      setSelectedMonth(previousMonth);
    }

    if (isRight) {
      setSelectedMonth(nextMonth);
    }

    setPage(Math.random()); // fake for tab re-render
  }, [selectedMonth]);

  React.useEffect(() => {
    setPage(1);
  }, [page]);

  const handleGotoDetail = React.useCallback((receiptId) => {
    navigation.navigate('Detail', { receiptId });
  }, [navigation]);

  return (
    <Container>
      <HeaderCustom title="Receipt" />
      <Tabs
        onChangeTab={onChangeTab}
        initialPage={1}
        page={page}
        scrollWithoutAnimation
        locked
      >
        {tabs.map((tab) => (
          tab.disabled
            ? (
              <Tab key={tab.heading} heading={tab.heading} disabled>
                <Content>
                  {[1, 2, 3, 4, 5, 6].map((a) => (
                    <View key={a}>
                      <Separator bordered>
                        <Text>01/02/2020</Text>
                      </Separator>
                      {[1, 2].map((o) => (
                        <ListItem key={o} onPress={() => handleGotoDetail(o)}>
                          <Body>
                            <Text note>Merchant</Text>
                            <Text numberOfLines={1}>Vinmax Co-op</Text>
                          </Body>
                          <Right>
                            <Text note>Total</Text>
                            <Text>2000 vnd</Text>
                          </Right>
                        </ListItem>
                      ))}
                    </View>
                  ))}
                </Content>
              </Tab>
            )
            : (
              <Tab key={tab.heading} heading={tab.heading}>
                <Text />
              </Tab>
            )
        ))}
      </Tabs>
    </Container>
  );
}
