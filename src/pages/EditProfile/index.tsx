import React, {useRef} from 'react';
import {View, Text, ScrollView} from 'react-native';
import TextArea from '../../components/textArea/index';
import Input from '../../components/input/index';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import Button from '../../components/button';
import {TitleInput} from './styles';

interface EditProfileFormData {
  about: string;
}

const EditProfile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSignUp = (data: EditProfileFormData) => {
    console.log('teste');
    console.log('dados form', data);
  };
  return (
    <ScrollView style={{marginHorizontal: 12}}>
      <Text>Editar Profilee </Text>
      <Form ref={formRef} onSubmit={handleSignUp}>
        <TextArea
          title="Sobre nos"
          autoCapitalize="words"
          name="about"
          onSubmitEditing={() => {}}
        />
        <View>
          <TitleInput>Endereço</TitleInput>
          <Input
            autoCapitalize="words"
            placeholder="Rua e numero"
            name="street"
          />
          <Input autoCapitalize="words" placeholder="Cidade" name="city" />
          <Input
            autoCapitalize="words"
            placeholder="Estado - UF"
            name="state"
          />

          <Input
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
        Entrar
      </Button>
    </ScrollView>
  );
};

export default EditProfile;
