import React from 'react';
import RN from 'react-native';

import {ButtonContainer} from './ButtonContainer';

interface Props {
  onPress: () => void | undefined;
  style?: RN.StyleProp<RN.ViewStyle>;
  messageStyle?: RN.StyleProp<RN.TextStyle>;
  message: string;
  values?: Record<string, React.ReactNode>;
  icon?: RN.ImageSourcePropType;
  disabled?: boolean;
  numOfLines?: number;
}

export const MessageButton: React.FC<Props> = ({
  onPress,
  style,
  messageStyle,
  message,
  icon,
  disabled,
}) => {
  return (
    <ButtonContainer
      style={[styles.container, style]}
      onPress={onPress}
      disabled={disabled}>
      <RN.Text style={[styles.message, messageStyle]}>{message}</RN.Text>
      {icon ? <RN.Image source={icon} /> : null}
    </ButtonContainer>
  );
};

const borderRadius = 18;
const styles = RN.StyleSheet.create({
  container: {
    minHeight: 40,
    alignSelf: 'stretch',
    borderRadius,
    paddingVertical: 4,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  message: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
    color: 'navy',
    flexDirection: 'column',
    marginHorizontal: 8,
  },
});
