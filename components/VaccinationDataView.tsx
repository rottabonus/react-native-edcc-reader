import React from 'react';
import RN from 'react-native';

import {VacData} from '../services/vacDecoder';

type Props = {
  data: VacData;
};

export const VaccinationDataView: React.FC<Props> = ({data}) => {
  return (
    <>
      <RN.Text>Vaccine</RN.Text>
      <RN.Text>{data.date}</RN.Text>
      <RN.Text>{data.product}</RN.Text>
      <RN.Text>{data.issuer}</RN.Text>
    </>
  );
};
