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
      <RN.Text>{data.date}</RN.Text>
      <RN.Text>{data.result}</RN.Text>
      <RN.Text>{data.issuer}</RN.Text>
    </>
  );
};
