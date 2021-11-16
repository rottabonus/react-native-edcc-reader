import React from 'react';
import RN from 'react-native';

import {TestData} from '../services/vacDecoder';

import {Text} from './Text';

type Props = {
  data: TestData;
};

export const TestDataView: React.FC<Props> = ({data}) => {
  return (
    <>
      <Text style={[styles.message, styles.header]} message={'Test'} />
      <Text message={`${data.nam.fn} ${data.nam.gn}`} />
      <Text message={`Test date: ${data.date}`} />
      <Text message={`Test result: ${data.result}`} />
      <Text message={`Test facility: ${data.facility}`} />
      <Text message={`Issuer: ${data.issuer}`} />
    </>
  );
};

const styles = RN.StyleSheet.create({
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 26,
  },
  message: {
    fontSize: 16,
    lineHeight: 22,
    color: 'darkolivegreen',
  },
});
