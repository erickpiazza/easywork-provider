import styled, {css} from 'styled-components/native';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  background: #f2f2f2;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: #0099ff;
  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #006bb3;
    `}
`;

export const TextInput = styled.TextInput`
  color: #1c1c1c;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;
export const TitleInput = styled.Text`
  color: #1c1c1c;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  text-align: center;
  margin-bottom: 12px;
`;
