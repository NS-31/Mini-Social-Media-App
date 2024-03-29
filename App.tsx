import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { LogBox, StyleSheet, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { createContext, useState } from 'react';

LogBox.ignoreAllLogs();

export default function App() {

  const AuthenticatedUserContext = createContext({});

  const AuthenticatedUserProvider = ({ children }: any) => {
    const [user, setUser] = useState(null);
    return (
      <AuthenticatedUserContext.Provider value={{ user, setUser }}>
        {children}
      </AuthenticatedUserContext.Provider>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <AuthenticatedUserProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AuthenticatedUserProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
