import React from 'react';
import { View, Text, Title } from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';
import {
  BarChart,
} from 'react-native-chart-kit';

export default function BarChartReport() {

  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        data: [100, 200, 300, 200]
      }
    ]
  };

  return (
    <View>
      <Title style={styles.title}>
        <Text>Report By Week</Text>
      </Title>
      <BarChart
        data={data}
        width={Dimensions.get('window').width - 30}
        height={Dimensions.get('window').height * 0.3}
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={styles.barChart}
        fromZero
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 10
  },
  barChart: {
    marginVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  }
});
