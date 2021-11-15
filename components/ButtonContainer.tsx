import React from 'react';
import RN from 'react-native';

interface Props {
  onPress: () => void | undefined;
  style?: RN.StyleProp<RN.ViewStyle>;
  disabled?: boolean;
}

export const ButtonContainer: React.FC<Props> = ({
  onPress,
  style,
  disabled,
  children,
}) => {
  return (
    <RN.TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      disabled={disabled}>
      {children}
    </RN.TouchableOpacity>
  );
};

const styles = RN.StyleSheet.create({
  container: {
    minHeight: 40,
    alignSelf: 'stretch',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
});
