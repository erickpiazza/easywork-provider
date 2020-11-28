import React, {useCallback, useEffect, useState} from 'react';
import {TouchableOpacity, FlatList, Alert, Button, View} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
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
  ButtonEditProfile,
  TextEditProfile,
  ContainerEditProfile,
  ButtonEditImage,
  ContainerEditImage,
} from './styles';
import {useNavigation} from '@react-navigation/native';

interface IListImage {
  id: string;
  image_url: string;
}

const Profile: React.FC = () => {
  const [imageList, setImageList] = useState<IListImage[]>([]);
  const navigation = useNavigation();

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
          updateUser(apiResponse.data);
        });
      },
    );
  }, [updateUser, user.id]);

  const handleUpdateImages = useCallback(() => {
    ImageCropPicker.openPicker({
      multiple: true,
    }).then((images) => {
      const data = new FormData();

      images.map((item) => {
        data.append('images', {
          type: 'image/jpg',
          name: `${user.id}.jpg`,
          uri: item.path,
        });
      });

      api.post('providers/imagens', data).then((apiResponse) => {
        api.get('providers/imagens').then((response) => {
          setImageList(response.data);
        });
      });
    });
  }, [user.id]);

  return (
    <Container>
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

      <ContainerEditProfile>
        <ButtonEditProfile onPress={() => navigation.navigate('EditProfile')}>
          <>
            <Icon
              color="#ffffff"
              style={{marginLeft: 8}}
              size={16}
              name="edit"
            />
            <TextEditProfile>Editar Perfil</TextEditProfile>
          </>
        </ButtonEditProfile>
      </ContainerEditProfile>
      <ContainerInformations>
        <TitleBox>Endereço</TitleBox>
        <BoxInformations>
          <TextContent>
            {user.street && user.city && user.state && user.uf && user.zipcode
              ? `${user.street} ${user.city} ${user.state} ${user.uf} ${user.zipcode}`
              : 'Você ainda não empreecheu seu endereço este campo é muito importante para seus clientes te encontrar'}
          </TextContent>
        </BoxInformations>
      </ContainerInformations>

      <ContainerInformations>
        <TitleBox>Sobre Nos</TitleBox>
        <BoxInformations>
          {user.about ? (
            <TextContent style={{textAlign: 'justify'}}>
              {user.about}
            </TextContent>
          ) : (
            <TextContent style={{textAlign: 'justify'}}>
              Voce ainda não empreencheu este campo. Aqui você pode falar sobre
              seu trabalho ou sua empresa, fale para nos os trabalhos que você
              realiza.
            </TextContent>
          )}
        </BoxInformations>
      </ContainerInformations>
      <ContainerEditImage>
        <View style={{flexDirection: 'row', alignContent: 'center'}}>
          <TitleBox>Meus trabalhos</TitleBox>
          <Icon style={{marginLeft: 8}} size={16} name="image" />
        </View>

        <ButtonEditImage onPress={handleUpdateImages}>
          <Icon style={{marginLeft: 8}} size={16} name="plus" />
          <TitleBox>Adicionar</TitleBox>
        </ButtonEditImage>
      </ContainerEditImage>

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
