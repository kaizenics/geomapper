import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const CustomLineChart = ({ dailyLabels, dailyWaveHeights }: { dailyLabels: string[], dailyWaveHeights: number[] }) => {
  const renderDotContent = ({ x, y, index }: { x: number, y: number, index: number }) => {
    return (
      <View
        key={index}
        style={{
          position: 'absolute',
          top: y - 10,
          left: x - 10,
        }}
      >
        <Text style={{ fontSize: 10, color: 'white' }}>
          {dailyWaveHeights[index]}
        </Text>
      </View>
    );
  };

  return (
    <LineChart
      data={{
        labels: dailyLabels.length > 0 ? dailyLabels : ['Fetching Data...'],
        datasets: [
          {
            data: dailyWaveHeights.length > 0 ? dailyWaveHeights : [0],
          },
        ],
      }}
      width={Dimensions.get('window').width - 32}
      height={200}
      yAxisLabel=""
      yAxisSuffix="m"
      yAxisInterval={1}
      chartConfig={{
        backgroundColor: '#167cfa',
        backgroundGradientFrom: '#167cfa',
        backgroundGradientTo: '#0e4483',
        decimalPlaces: 1,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: '6',
          strokeWidth: '2',
          stroke: '#ffa726',
        },
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
      renderDotContent={renderDotContent}
    />
  );
};

export default CustomLineChart;