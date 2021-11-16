import React from 'react';
import RN from 'react-native';

import {RecData} from '../services/vacDecoder';

import {Text} from './Text';

type Props = {
  data: RecData;
};

export const RecoveryDataView: React.FC<Props> = ({data}) => {
  return (
    <>
      <Text style={[styles.message, styles.header]} message={'Recovery'} />
      <Text message={`${data.nam.fn} ${data.nam.gn}`} />
      <Text message={`Disease: ${data.disease}`} />
      <Text message={`Recovery from: ${data.dateFrom}`} />
      <Text message={`Recovery until: ${data.dateUntil}`} />
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
