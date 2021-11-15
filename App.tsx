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
    <RN.SafeAreaView style={styles.container}>
      <RN.View style={styles.card}>
        {vacPass.pass && <VacCard data={vacPass.data} />}
        <MessageButton
          message="Scan Covid-19 Certificate"
          onPress={openCamera}
        />
      </RN.View>
    </RN.SafeAreaView>
  );
};

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'cornsilk',
  },
  card: {
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: 'darkseagreen',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});

export default App;
