import React from 'react';
import { View, Text } from 'react-native';
import TestBackendConnection from '../src/components/TestBackendConnection';

export default function Dashboard() {
  return (
    <View>
      <Text>Dashboard Screen</Text>
      <TestBackendConnection />
    </View>
  );
}
