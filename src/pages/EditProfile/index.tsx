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
  about: string;
  street: string;
}

const EditProfile: React.FC = () => {
  const {user, updateUser} = useAuth();
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const handleSignUp = (data: EditProfileFormData) => {
    api.put('providers/profile', data).then((response) => {
      updateUser(response.data);
      navigation.goBack();
    });
  };
  return (
    <ScrollView style={{marginHorizontal: 12}}>
      <Form initialData={user} ref={formRef} onSubmit={handleSignUp}>
        <Input
          title="Nome"
          autoCapitalize="words"
          placeholder="nome"
          name="name"
        />
        <Input
          title="Telefone"
          autoCapitalize="words"
          placeholder="nome"
          name="phone"
        />
        <TextArea
          title="Sobre nos"
          autoCapitalize="words"
          name="about"
          onSubmitEditing={() => {}}
        />
        <View>
          <TitleInput>Endereço</TitleInput>
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

          <Input
            title="CEP"
            autoCapitalize="words"
            placeholder="cep 00000-000"
            name="zipcode"
          />
        </View>
      </Form>
      <Button
        onPress={() => {
          formRef.current?.submitForm();
        }}>
        Salvar
      </Button>
    </ScrollView>
  );
};

export default EditProfile;
