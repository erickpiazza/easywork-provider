import React from 'react';
import {TouchableOpacity} from 'react-native';
// import {useAuth} from '../../hooks/auth';
import {
  Container,
  AvatarCoverWrapper,
  Cover,
  AvatarWrapper,
  Avatar,
} from './styles';

const uritt =
  'http://10.0.2.2:3333/files/9f2ff3bced5ad403bca2-150401-tv-feature-harry-potter-image1-vpdnsqfrou.jpg';

const Profile: React.FC = () => {
  // const {signOut} = useAuth();

  return (
    <Container>
      <AvatarCoverWrapper>
        <TouchableOpacity activeOpacity={0.8}>
          <Cover source={{uri: uritt}} />
        </TouchableOpacity>
        <AvatarWrapper>
          <TouchableOpacity activeOpacity={0.9}>
            <Avatar source={{uri: uritt}} />
          </TouchableOpacity>
        </AvatarWrapper>
      </AvatarCoverWrapper>
    </Container>
  );
};

export default Profile;
