import React from 'react';
import {TouchableOpacity, Text, View, FlatList} from 'react-native';
import {string} from 'yup';
import {useAuth} from '../../hooks/auth';
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
} from './styles';

const uritt =
  'http://192.168.0.20:3333/files/0e26957a1e8b04e38c52-vingadores.png';

const Profile: React.FC = () => {
  const {signOut, user} = useAuth();

  return (
    <Container>
      <AvatarCoverWrapper>
        {console.log('console.log result', user)}
        <TouchableOpacity activeOpacity={0.8}>
          <Cover source={{uri: uritt}} />
        </TouchableOpacity>
        <AvatarWrapper>
          <TouchableOpacity activeOpacity={0.9}>
            <Avatar source={{uri: uritt}} />
          </TouchableOpacity>
        </AvatarWrapper>
      </AvatarCoverWrapper>
      <TextNameProvider>Marcenaria Roberto</TextNameProvider>
      <TextPhoneProvider>(19) 98888-7777</TextPhoneProvider>

      <ContainerInformations>
        <TitleBox>Endereço</TitleBox>
        <BoxInformations>
          <TextContent>
            Rua Julio Tim N° 396 Cep 13060824 Jardim Ipaussurama Campinas São
            Paulo
          </TextContent>
        </BoxInformations>
      </ContainerInformations>

      <ContainerInformations>
        <TitleBox>Sobre Nos</TitleBox>
        <BoxInformations>
          <TextContent style={{textAlign: 'justify'}}>
            Ateliê e design de ambientes planejados que desenvolve projetos com
            funcionalidade e personalidade. Nosso produto possui alta tecnologia
            e o cuidado artesanal de milímetro a milímetro para entregar aos
            nossos clientes projetos com exclusividade e sempre mantendo a
            riqueza nos detalhes dos acabamentos com qualidade, excelência e
            durabilidade.
          </TextContent>
        </BoxInformations>
      </ContainerInformations>

      <TitleBox>Meu trabalhos</TitleBox>
      <FlatList
        data={imageList}
        renderItem={({item}) => <Image source={{uri: item.image_url}} />}
        numColumns={3}
      />
    </Container>
  );
};

export default Profile;

interface IListImage {
  id: string;
  image_url: string;
}

const imageList: IListImage[] = [
  {
    id: '2312das',
    image_url:
      'http://192.168.0.20:3333/files/0e26957a1e8b04e38c52-vingadores.png',
  },
  {
    id: '23fsdfsd12das',
    image_url:
      'http://192.168.0.20:3333/files/07f174b59a7344294d3d-liga da justiça.jpg',
  },
  {
    id: '23ggg12das',
    image_url:
      'http://192.168.0.20:3333/files/0e26957a1e8b04e38c52-vingadores.png',
  },
  {
    id: '23ffsdfsd12das',
    image_url:
      'http://192.168.0.20:3333/files/07f174b59a7344294d3d-liga da justiça.jpg',
  },
  {
    id: '23ffsdfsd12das',
    image_url:
      'http://192.168.0.20:3333/files/07f174b59a7344294d3d-liga da justiça.jpg',
  },
  {
    id: '23ffsdfsd12das',
    image_url:
      'http://192.168.0.20:3333/files/07f174b59a7344294d3d-liga da justiça.jpg',
  },
];
