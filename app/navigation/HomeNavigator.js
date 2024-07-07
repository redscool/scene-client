import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Account from '../screens/Account';
import Home from '../screens/Home';
import Icon from '../Icons';
import routes from './routes';
import Search from '../screens/Search';
import useAppConfig from '../context/AppConfigContext';

const Tab = createBottomTabNavigator();

export default HomeNavigator = () => {
  const {getAppConfig} = useAppConfig();

  useEffect(() => {
    getAppConfig();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: colors.text,
        tabBarShowLabel: false,
        tabBarStyle: {height: 60},
      }}>
      <Tab.Screen
        name={routes.HOME}
        component={Home}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={routes.SEARCH}
        component={Search}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={routes.ACCOUNT}
        component={Account}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name="account" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
