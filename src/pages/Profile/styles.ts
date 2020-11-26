import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

export const Container = styled.View`
  flex: 1;
  margin-left: 4px;
  margin-right: 4px;
`;

export const AvatarCoverWrapper = styled.View`
  padding-bottom: 50px;
  position: relative;
`;
export const Cover = styled.Image`
  width: 100%;
  height: 200px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const AvatarWrapper = styled.View`
  background-color: #000;
  position: absolute;
  border-radius: 2000px;
  left: ${(Math.round(Dimensions.get('window').width) - 30 - 140) /
  2}px; /* paddingHorizontal - avatarWidth */
  bottom: 0;
`;

export const Avatar = styled.Image`
  height: 140px;
  width: 140px;
  border-radius: 2000px;
  border-color: #fff;
  border-width: 5;
`;
