import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Profile from '../pages/Profile/index';
import Icon from 'react-native-vector-icons/Feather';

const Router = createBottomTabNavigator();

const AppRoutes: React.FC = () => (
  <Router.Navigator
    tabBarOptions={{
      activeTintColor: '#0099FF',
      showLabel: false,
      tabStyle: {borderColor: 'rgba(0, 153, 255, 0.308)', borderTopWidth: 1},
    }}>
    <Router.Screen
      name="dasd "
      component={Profile}
      options={{
        tabBarIcon: ({color}) => <Icon name="home" color={color} size={34} />,
      }}
    />
  </Router.Navigator>
);

export default AppRoutes;
