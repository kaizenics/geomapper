import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Circle, Line, Text as SvgText } from 'react-native-svg';

const { width, height } = Dimensions.get('window');
const centerX = width / 2;
const centerY = height;
const radius = Math.min(width, height) * 0.8;

export const Sonar = () => {
  const [angle, setAngle] = useState(0);
  const [distance, setDistance] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left

  useEffect(() => {
    // Simulating Arduino data
    // Replace this with actual Arduino integration
    const interval = setInterval(() => {
      setAngle((prevAngle) => {
        const newAngle = prevAngle + 3 * direction;
        if (newAngle >= 180 || newAngle <= 0) {
          setDirection((prevDirection) => -prevDirection);
        }
        return newAngle < 0 ? 0 : newAngle > 180 ? 180 : newAngle;
      });
      setDistance(Math.random() * 100);
    }, 100);

    return () => clearInterval(interval);
  }, [direction]);
  

  const polarToCartesian = (angle: number, distance: number) => {
    const x = centerX + distance * Math.cos((angle * Math.PI) / 180);
    const y = centerY - distance * Math.sin((angle * Math.PI) / 180);
    return { x, y };
  };

  const renderArcs = () => {
    return [0.25, 0.5, 0.75, 1].map((scale, index) => (
      <Path
        key={index}
        d={`M ${centerX - radius * scale} ${centerY} A ${radius * scale} ${radius * scale} 0 0 1 ${centerX + radius * scale} ${centerY}`}
        stroke="rgba(98, 245, 31, 0.5)"
        strokeWidth="2"
        fill="none"
      />
    ));
  };

  const renderLines = () => {
    return [0, 30, 60, 90, 120, 150, 180].map((angle, index) => {
      const { x, y } = polarToCartesian(angle, radius);
      return (
        <Line
          key={index}
          x1={centerX}
          y1={centerY}
          x2={x}
          y2={y}
          stroke="rgba(98, 245, 31, 0.5)"
          strokeWidth="1"
        />
      );
    });
  };

  const renderSweepLine = () => {
    const { x, y } = polarToCartesian(angle, radius);
    return (
      <Line
        x1={centerX}
        y1={centerY}
        x2={x}
        y2={y}
        stroke="rgb(30, 250, 60)"
        strokeWidth="3"
      />
    );
  };

  const renderObject = () => {
    if (distance > 0 && distance <= 100) {
      const scaledDistance = (distance / 100) * radius;
      const { x, y } = polarToCartesian(angle, scaledDistance);
      return (
        <Circle
          cx={x}
          cy={y}
          r="5"
          fill="rgb(255, 10, 10)"
        />
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Svg width={width} height={height}>
        <Circle cx={centerX} cy={centerY} r={radius} fill="rgba(0, 0, 0, 0.8)" />
        {renderArcs()}
        {renderLines()}
        {renderSweepLine()}
        {renderObject()}
        <SvgText x={10} y={30} fill="rgb(98, 245, 31)" fontSize="20">
          Angle: {angle.toFixed(0)}°
        </SvgText>
        <SvgText x={10} y={60} fill="rgb(98, 245, 31)" fontSize="20">
          Distance: {distance.toFixed(1)} cm
        </SvgText>
        <SvgText x={width - 70} y={centerY - 10} fill="rgb(98, 245, 31)" fontSize="16">0°</SvgText>
        <SvgText x={centerX - 10} y={centerY - radius - 10} fill="rgb(98, 245, 31)" fontSize="16">90°</SvgText>
        <SvgText x={10} y={centerY - 10} fill="rgb(98, 245, 31)" fontSize="16">180°</SvgText>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'flex-end',
  },
});

export default Sonar;