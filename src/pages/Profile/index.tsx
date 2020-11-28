import React, {useCallback, useEffect, useState} from 'react';
import {
  TouchableOpacity,
  FlatList,
  Button,
  Alert,
  View,
  Text,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';

import {useAuth} from '../../hooks/auth';
import api from '../../services/api';
import {
  Container,
  AvatarCoverWrapper,
  Cover,
  AvatarWrapper,
  Avatar,
  TextNameProvider,
  TextPhoneProvider,
  ContainerInformations,
  BoxInformations,
  Image,
  TitleBox,
  TextContent,
  TextCoverEdit,
  ContainerFooterCover,
  ContentFooterCover,
  ButtonEditCover,
} from './styles';

interface IListImage {
  id: string;
  image_url: string;
}

const Profile: React.FC = () => {
  const [imageList, setImageList] = useState<IListImage[]>([]);

  const {signOut, user, updateUser} = useAuth();

  useEffect(() => {
    api.get('providers/imagens').then((response) => {
      setImageList(response.data);
    });
  }, []);

  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Editar seu Avatar',
        cancelButtonTitle: 'Cancelar',
        takePhotoButtonTitle: 'Usar câmera',
        chooseFromLibraryButtonTitle: 'Escolher da galeria',
      },
      (response) => {
        if (response.didCancel) {
          return;
        }
        if (response.error) {
          Alert.alert('Erro ao atualizar seu avatar');
          return;
        }

        const data = new FormData();
        data.append('avatar', {
          type: 'image/jpg',
          name: `${user.id}.jpg`,
          uri: response.uri,
        });

        api.patch('providers/avatar', data).then((apiResponse) => {
          console.log('apiResponse.data', apiResponse.data);
          updateUser(apiResponse.data);
        });
      },
    );
  }, [updateUser, user.id]);

  const handleUpdateCover = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Editar sua capa',
        cancelButtonTitle: 'Cancelar',
        takePhotoButtonTitle: 'Usar câmera',
        chooseFromLibraryButtonTitle: 'Escolher da galeria',
      },
      (response) => {
        if (response.didCancel) {
          return;
        }
        if (response.error) {
          Alert.alert('Erro ao atualizar seu avatar');
          return;
        }

        const data = new FormData();
        data.append('cover', {
          type: 'image/jpg',
          name: `${user.id}.jpg`,
          uri: response.uri,
        });

        api.patch('providers/cover', data).then((apiResponse) => {
          console.log('apiResponse.data', apiResponse.data);
          updateUser(apiResponse.data);
        });
      },
    );
  }, [updateUser, user.id]);

  return (
    <Container>
      {console.log('user', user)}
      <AvatarCoverWrapper>
        <View>
          <Cover source={{uri: user.cover_url}} />
          <ContainerFooterCover>
            <ContentFooterCover>
              <ButtonEditCover activeOpacity={0.5} onPress={handleUpdateCover}>
                <Icon
                  style={{marginRight: 4}}
                  size={16}
                  color="#000000"
                  name="camera"
                />
                <TextCoverEdit>Editar capa</TextCoverEdit>
              </ButtonEditCover>
            </ContentFooterCover>
          </ContainerFooterCover>
        </View>

        <AvatarWrapper>
          <TouchableOpacity activeOpacity={0.9} onPress={handleUpdateAvatar}>
            <Avatar source={{uri: user.avatar_url}} />
          </TouchableOpacity>
        </AvatarWrapper>
      </AvatarCoverWrapper>
      <TextNameProvider>{user.name}</TextNameProvider>
      <TextPhoneProvider>{user.phone}</TextPhoneProvider>

      <ContainerInformations>
        <TitleBox>Endereço</TitleBox>
        <BoxInformations>
          <TextContent>
            {`${user.street} ${user.city} ${user.state} ${user.uf} ${user.zipcode}`}
          </TextContent>
        </BoxInformations>
      </ContainerInformations>

      <ContainerInformations>
        <TitleBox>Sobre Nos</TitleBox>
        <BoxInformations>
          <TextContent style={{textAlign: 'justify'}}>{user.about}</TextContent>
        </BoxInformations>
      </ContainerInformations>

      <TitleBox>Meu trabalhos</TitleBox>
      <FlatList
        data={imageList}
        renderItem={({item}) => (
          <Image key={item.id} source={{uri: item.image_url}} />
        )}
        numColumns={3}
      />
      <Button title="sair" onPress={signOut} />
    </Container>
  );
};

export default Profile;
