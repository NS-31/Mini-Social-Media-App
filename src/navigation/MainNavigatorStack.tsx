import React from 'react';
import PostMessage from '../screens/main/PostMessage';
import Feed from '../screens/main/Feed';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Text, View } from 'react-native';
import { images } from '../theme';

const Tab = createBottomTabNavigator();

const MainNavigatorStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 64,
        },
      }}>
      <Tab.Screen
        name="PostMessage"
        component={PostMessage}
        options={{
          tabBarIcon: ({ focused }: any) => {
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  source={images.message_icon}
                  style={{ width: 24, height: 24, tintColor: focused ? 'black' : 'gray' }}
                />
                <Text style={{ fontSize: 9, lineHeight: 14, color: focused ? 'black' : 'gray' }}>Message</Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: ({ focused }: any) => {
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  source={images.feed_icon}
                  // color={color}
                  style={{ width: 24, height: 24, tintColor: focused ? 'black' : 'gray' }}
                />
                <Text style={{ fontSize: 9, lineHeight: 14, color: focused ? 'black' : 'gray' }}>Feed</Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  )
};

export default MainNavigatorStack;
