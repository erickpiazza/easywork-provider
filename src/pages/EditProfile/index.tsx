import React, {useRef} from 'react';
import {View, ScrollView} from 'react-native';
import TextArea from '../../components/textArea/index';
import Input from '../../components/input/index';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import Button from '../../components/button';
import {TitleInput} from './styles';
import {useAuth} from '../../hooks/auth';
import api from '../../services/api';
import {useNavigation} from '@react-navigation/native';

interface EditProfileFormData {
  name: string;
  zipcode: string;
  about: string;
  street: string;
  state: string;
}

const EditProfile: React.FC = () => {
  const {user, updateUser} = useAuth();
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const updateProfile = (data: EditProfileFormData) => {
    api.put('providers/profile', data).then((response) => {
      updateUser(response.data);
      navigation.goBack();
    });
  };

  return (
    <ScrollView style={{marginHorizontal: 12}}>
      <Form initialData={user} ref={formRef} onSubmit={updateProfile}>
        <Input
          title="Nome"
          autoCapitalize="words"
          placeholder="nome"
          name="name"
        />
        <Input
          title="Telefone"
          autoCapitalize="words"
          placeholder="Telefone"
          name="phone"
        />
        <TextArea title="Sobre nos" autoCapitalize="words" name="about" />
        <View>
          <TitleInput>Endereço</TitleInput>
          <Input
            title="CEP"
            autoCapitalize="words"
            placeholder="00000-000"
            name="zipcode"
          />
          <Input
            title="Rua e numero"
            autoCapitalize="words"
            placeholder="Rua e numero"
            name="street"
          />
          <Input
            title="Cidade"
            autoCapitalize="words"
            placeholder="Cidade"
            name="city"
          />
          <Input
            title="Estado - UF"
            autoCapitalize="words"
            placeholder="Estado - UF"
            name="state"
          />
        </View>
      </Form>
      <Button
        onPress={() => {
          formRef.current?.submitForm();
        }}>
        Salvar
      </Button>
      <Button onPress={() => navigation.navigate('EditProfileMap')}>
        MAPA
      </Button>
    </ScrollView>
  );
};

export default EditProfile;
