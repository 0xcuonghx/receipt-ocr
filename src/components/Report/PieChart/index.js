import React from 'react';
import { View, Text, Title } from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';
import {
  PieChart,
} from 'react-native-chart-kit';

export default function PieChartReport() {

  const data = [
    {
      name: 'Seoul',
      population: 21500000,
      color: 'rgba(131, 167, 234, 1)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Toronto',
      population: 2800000,
      color: '#F00',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },

    {
      name: 'Moscow',
      population: 11920000,
      color: 'rgb(0, 0, 255)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Moscow',
      population: 11920000,
      color: 'rgb(0, 221, 122)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },

  ];

  const Note = React.useMemo(() => (
    <View style={styles.note}>
      {data.map((item) => (
        <>
          <View style={{ ...styles.circle, backgroundColor: item.color }} />
          <Text style={styles.noteText}>{item.name}</Text>
        </>
      ))}
    </View>
  ), []);

  return (
    <View style={styles.root}>
      <Title style={styles.title}>
        <Text>Report By Week</Text>
      </Title>
      <PieChart
        data={data}
        width={Dimensions.get('window').width - 30}
        height={Dimensions.get('window').height * 0.3}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={styles.pieChart}
        accessor="population"
        hasLegend={false}
        paddingLeft={Dimensions.get('window').width / 4}
      />
      {Note}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    borderRadius: 10,
  },
  title: {
    marginTop: 10
  },
  // eslint-disable-next-line react-native/no-color-literals
  pieChart: {
    marginVertical: 15,
    borderRadius: 10,
    backgroundColor: '#efefef',
  },
  note: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 15,
    marginRight: 15
  },
  noteText: {
    marginRight: 10,
  },
  circle: {
    height: 20,
    width: 20,
    marginRight: 5
  }
});
