import React from 'react';
import moment from 'moment';
import {
  Container, Tab, Tabs, Separator, ListItem, Content, Body, Right, Text, View, Thumbnail, Left
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import dateUtils from '../../../utils/dateUtils';

import HeaderCustom from '../../Common/HeaderCustom';
import ImageDefault from '../../../../assets/images/logo.png';
import ImageReceipt from '../../../../assets/images/receipt/001.jpg';

export default function ListReceipt(props) {
  const { data = {}, fetchReceipts } = props;
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

  React.useEffect(() => {
    fetchReceipts({
      fromDate: moment.unix(selectedMonth).startOf('month').toISOString(),
      toDate: moment.unix(selectedMonth).endOf('month').toISOString()
    });
  }, [selectedMonth, fetchReceipts]);
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
                  {Object.keys(data).sort((a, b) => moment(a).subtract(moment(b))).map((key) => (
                    <View key={key}>
                      <Separator bordered>
                        <Text>{key}</Text>
                      </Separator>
                      {(data[key] || []).map((o) => (
                        <ListItem avatar key={o.id} onPress={() => handleGotoDetail(o.id)}>
                          <Left>
                            <Thumbnail
                              small
                              source={
                                o.url_image ? ImageReceipt : ImageDefault
                              }
                            />
                          </Left>
                          <Body>
                            <Text note>Merchant</Text>
                            <Text numberOfLines={1}>{o.merchant}</Text>
                          </Body>
                          <Right>
                            <Text note>Total</Text>
                            <Text>
                              {`${o.total} $`}
                            </Text>
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
