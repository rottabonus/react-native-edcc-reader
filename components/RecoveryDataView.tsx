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
      <RN.Text>{data.dateFrom}</RN.Text>
      <RN.Text>{data.dateUntil}</RN.Text>
      <RN.Text>{data.issuer}</RN.Text>
    </>
  );
};
