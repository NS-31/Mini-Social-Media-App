import React, { createContext, useContext, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigatorStack from './AuthNavigatorStack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import MainNavigatorStack from './MainNavigatorStack';

const Stack = createNativeStackNavigator();

const AuthenticatedUserContext = createContext({});

const AppNavigator = () => {
  const { user, setUser }: any = useContext(AuthenticatedUserContext);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        if (authenticatedUser) {
          setUser(authenticatedUser);
        }
      }
    );
    return unsubscribeAuth; // Unsubscribe auth listener on unmount
  }, [user]);

  return (
    <Stack.Navigator initialRouteName={user ? 'MainNavigatorStack' : 'AuthNavigatorStack'}>
      <Stack.Screen
        name="MainNavigatorStack"
        component={MainNavigatorStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AuthNavigatorStack"
        component={AuthNavigatorStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
