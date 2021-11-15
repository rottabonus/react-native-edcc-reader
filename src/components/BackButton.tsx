import React from 'react';
import RN from 'react-native';

import {ButtonContainer} from './ButtonContainer';

interface Props {
  onPress: () => void | undefined;
  style?: RN.StyleProp<RN.ViewStyle>;
  disabled?: boolean;
}

export const BackButton: React.FC<Props> = ({onPress, style, disabled}) => {
  return (
    <ButtonContainer
      style={[styles.container, style]}
      onPress={onPress}
      disabled={disabled}>
      <RN.Image source={require('../svg/bx-chevron-left.svg')} />
    </ButtonContainer>
  );
};

const styles = RN.StyleSheet.create({
  container: {
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: 'cornsilk',
    width: 40,
    alignSelf: 'stretch',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});
