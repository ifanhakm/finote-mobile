import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import api from '../services/api';

const TestBackendConnection: React.FC = () => {
  const [response, setResponse] = useState<string>('');

  const testConnection = async () => {
    try {
      const res = await api.get('/auth/login'); // Assuming GET /auth/login exists for test, else use a simple GET endpoint
      setResponse('Backend connected: ' + JSON.stringify(res.data));
    } catch (error: any) {
      setResponse('Error connecting to backend: ' + (error.message || error.toString()));
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Test Backend Connection" onPress={testConnection} />
      <Text style={styles.response}>{response}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  response: { marginTop: 20, color: 'blue' },
});

export default TestBackendConnection;
