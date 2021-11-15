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
      <RN.Text>
        {data.nam.fn} {data.nam.gn}
      </RN.Text>
      <RN.Text>Vaccination date: {data.date}</RN.Text>
      <RN.Text>
        Dose: {data.numberOfDose}/{data.seriesDoses}
      </RN.Text>
      <RN.Text>Product: {data.product}</RN.Text>
      <RN.Text>Issuer: {data.issuer}</RN.Text>
    </>
  );
};
