import React from 'react';
import RN from 'react-native';

import {RecData} from '../services/vacDecoder';

type Props = {
  data: RecData;
};

export const RecoveryDataView: React.FC<Props> = ({data}) => {
  return (
    <>
      <RN.Text>Recovery</RN.Text>
      <RN.Text>
        {data.nam.fn} {data.nam.gn}
      </RN.Text>
      <RN.Text>Disease: {data.disease}</RN.Text>
      <RN.Text>Recovery from: {data.dateFrom}</RN.Text>
      <RN.Text>Recovery until: {data.dateUntil}</RN.Text>
      <RN.Text>Issuer: {data.issuer}</RN.Text>
    </>
  );
};
