import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Profile from '../pages/Profile/index';
import EditProfile from '../pages/EditProfile/index';
import Icon from 'react-native-vector-icons/Feather';

const Router = createBottomTabNavigator();
const RouterStackProfile = createStackNavigator();

function ScreensProfile() {
  return (
    <RouterStackProfile.Navigator>
      <RouterStackProfile.Screen
        options={{title: 'Meu Perfil'}}
        name="Profile"
        component={Profile}
      />
      <RouterStackProfile.Screen
        options={{title: 'Editar Perfil'}}
        name="EditProfile"
        component={EditProfile}
      />
    </RouterStackProfile.Navigator>
  );
}

const AppRoutes: React.FC = () => (
  <Router.Navigator
    tabBarOptions={{
      activeTintColor: '#0099FF',
      showLabel: false,
      tabStyle: {borderColor: 'rgba(0, 153, 255, 0.308)', borderTopWidth: 1},
    }}>
    <Router.Screen
      name="dasd "
      component={ScreensProfile}
      options={{
        tabBarIcon: ({color}) => <Icon name="home" color={color} size={34} />,
      }}
    />
  </Router.Navigator>
);

export default AppRoutes;
