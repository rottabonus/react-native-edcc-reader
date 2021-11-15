import React from 'react';
import RN from 'react-native';

import {TestData} from '../services/vacDecoder';

type Props = {
  data: TestData;
};

export const TestDataView: React.FC<Props> = ({data}) => {
  return (
    <>
      <RN.Text>Test</RN.Text>
      <RN.Text>Test date: {data.date}</RN.Text>
      <RN.Text>Test result: {data.result}</RN.Text>
      <RN.Text>Test facility: {data.facility}</RN.Text>
      <RN.Text>Issuer: {data.issuer}</RN.Text>
    </>
  );
};
