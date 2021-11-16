import React from 'react';
import RN, {TextStyle} from 'react-native';

type Props = {
  message: string;
  style?: RN.StyleProp<TextStyle>;
};

export const Text: React.FC<Props> = ({message, style}) => {
  return <RN.Text style={style ?? styles.message}>{message}</RN.Text>;
};

const styles = RN.StyleSheet.create({
  message: {
    fontSize: 16,
    lineHeight: 22,
    color: 'darkolivegreen',
  },
});
