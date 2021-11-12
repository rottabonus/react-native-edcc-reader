import React from 'react';
import * as RN from 'react-native';

import {MessageButton} from './components/MessageButton';
import {ReaderContainer} from './components/Reader';

import * as E from 'fp-ts/lib/Either';
import {decodeService, VacPass} from './services/VacDecoder';
import {VacCard} from './components/VacCard';

type VacPassState =
  | {
      pass: false;
      data: {};
    }
  | {pass: true; data: VacPass};

const App = () => {
  const [shouldShowReader, setShouldShowReader] =
    React.useState<boolean>(false);

  const [isScanned, setIsScanned] = React.useState<boolean>(false);
  const [vacPass, setVacPass] = React.useState<VacPassState>({
    pass: false,
    data: {},
  });

  const openCamera = () => {
    setIsScanned(false);
    setShouldShowReader(true);
  };

  const onGoBack = () => setShouldShowReader(false);

  const scanCode = (value: any) => {
    //https://github.com/teslamotors/react-native-camera-kit
    // scanning result type is not typed, but the value we want to get is in nativeEvent.codeStringValue --> value.nativeEvent.codeStringValue
    const code: string = value.nativeEvent.codeStringValue;

    if (isScanned) {
      return;
    }

    setShouldShowReader(false);
    setIsScanned(true);
    const data = decodeService.decodeVacPass(code);
    const nextState: VacPassState = E.isRight(data)
      ? {pass: true, data: data.right}
      : {pass: false, data: {}};

    setVacPass(nextState);
  };

  return shouldShowReader ? (
    <ReaderContainer onGoBack={onGoBack} scanBarcode={scanCode} />
  ) : (
    <RN.SafeAreaView>
      <MessageButton message="Scan Covid-19 Certificate" onPress={openCamera} />
      {vacPass.pass && <VacCard data={vacPass.data} />}
    </RN.SafeAreaView>
  );
};

export default App;
