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
    <RN.View style={styles.container}>
      {mapped.type === 'vaccine' && <VaccinationDataView data={mapped} />}
      {mapped.type === 'recovery' && <RecoveryDataView data={mapped} />}
      {mapped.type === 'test' && <TestDataView data={mapped} />}
    </RN.View>
  );
};

const styles = RN.StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 16,
    marginVertical: 16,
  },
});
