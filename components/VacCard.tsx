import React from 'react';
import RN from 'react-native';

import {VaccinationDataView} from './VaccinationDataView';
import {TestDataView} from './TestDataView';
import {RecoveryDataView} from './RecoveryDataView';
import {decodeService, VacPass} from '../services/VacDecoder';

type Props = {
  data: VacPass;
};

export const VacCard: React.FC<Props> = ({data}) => {
  const mapped = decodeService.mapCertData(data);

  return (
    <RN.View>
      <RN.Text>
        {data.nam.gn} {data.nam.fn}
      </RN.Text>
      {mapped.type === 'vaccine' && <VaccinationDataView data={mapped} />}
      {mapped.type === 'recovery' && <RecoveryDataView data={mapped} />}
      {mapped.type === 'test' && <TestDataView data={mapped} />}
    </RN.View>
  );
};
