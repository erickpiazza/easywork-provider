import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Profile from '../pages/Profile/index';
import EditProfile from '../pages/EditProfile/index';
import EditProfileMap from '../pages/EditProfileMap/index';
import Icon from 'react-native-vector-icons/Feather';
import {Text, TouchableOpacity} from 'react-native';
import {useAuth} from '../../src/hooks/auth';

const Router = createBottomTabNavigator();
const RouterStackProfile = createStackNavigator();

function ScreensProfile() {
  const {signOut} = useAuth();
  return (
    <RouterStackProfile.Navigator>
      <RouterStackProfile.Screen
        options={{
          title: 'Meu Perfil',
          headerRight: () => (
            <TouchableOpacity
              onPress={signOut}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 8,
              }}>
              <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={{marginHorizontal: 8, fontSize: 16, color: '#0099FF'}}>
                sair
              </Text>

              <Icon size={18} color="#0099FF" name="log-out" />
            </TouchableOpacity>
          ),
        }}
        name="Profile"
        component={Profile}
      />
      <RouterStackProfile.Screen
        options={{title: 'Editar Perfil'}}
        name="EditProfile"
        component={EditProfile}
      />
      <RouterStackProfile.Screen
        options={{title: 'Mapa'}}
        name="EditProfileMap"
        component={EditProfileMap}
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
