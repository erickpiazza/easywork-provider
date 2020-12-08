import React from 'react';
import {useAuth} from '../../hooks/auth';
import MapView, {Marker} from 'react-native-maps';
import api from '../../services/api';

const EditProfileMap: React.FC = () => {
  const {user, updateUser} = useAuth();

  return (
    <MapView
      style={{flex: 1}}
      initialRegion={{
        latitude: -22.930213,
        longitude: -47.124883,
        latitudeDelta: 0.0143,
        longitudeDelta: 0.0134,
      }}
      showsUserLocation
      loadingEnabled={true}
      zoomEnabled={true}
      onPress={(item) => {
        const data = {
          ...user,
          latitude: item.nativeEvent.coordinate.latitude,
          longitude: item.nativeEvent.coordinate.longitude,
        };
        api.put('providers/profile', data).then((response) => {
          updateUser(response.data);
        });
      }}>
      <Marker
        coordinate={{
          latitude: user.latitude ? user.latitude : 0,
          longitude: user.longitude ? user.longitude : 0,
        }}
        title="Meu negocio é aqui"
      />

      {console.log('user', user)}
    </MapView>
  );
};

export default EditProfileMap;
