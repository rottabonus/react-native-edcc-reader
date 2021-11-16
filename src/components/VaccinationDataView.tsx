import React from 'react';
import RN from 'react-native';

import {VacData} from '../services/vacDecoder';

import {Text} from './Text';

type Props = {
  data: VacData;
};

export const VaccinationDataView: React.FC<Props> = ({data}) => {
  return (
    <>
      <Text style={[styles.message, styles.header]} message={'Vaccine'} />
      <Text message={`${data.nam.fn} ${data.nam.gn}`} />
      <Text message={`Vaccination date: ${data.date}`} />
      <Text message={`Dose: ${data.numberOfDose}/${data.seriesDoses}`} />
      <Text message={`Product: ${data.product}`} />
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
