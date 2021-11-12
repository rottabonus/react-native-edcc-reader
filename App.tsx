import React from 'react';
import * as RN from 'react-native';

import {MessageButton} from './components/MessageButton';
import {ReaderContainer} from './components/Reader';

import {decodeService, VacPass} from './services/VacDecoder';

const App = () => {
  const [shouldShowReader, setShouldShowReader] =
    React.useState<boolean>(false);

  const [isScanned, setIsScanned] = React.useState<boolean>(false);

  const openCamera = () => {
    setIsScanned(false);
    setShouldShowReader(true);
  };

  const onGoBack = () => setShouldShowReader(false);

  const scanCode = (value: any) => {
    console.log('scanned');
    //https://github.com/teslamotors/react-native-camera-kit
    // scanning result type is not typed, but the value we want to get is in nativeEvent.codeStringValue --> value.nativeEvent.codeStringValue
    if (isScanned) {
      return;
    }

    const code: string = value.nativeEvent.codeStringValue;
    setShouldShowReader(false);
    setIsScanned(true);
    const data = decodeService.decodeVacPass(code);
    console.log(data);
  };

  return shouldShowReader ? (
    <ReaderContainer onGoBack={onGoBack} scanBarcode={scanCode} />
  ) : (
    <RN.SafeAreaView>
      <MessageButton message="Scan Covid-19 Certificate" onPress={openCamera} />
    </RN.SafeAreaView>
  );
};

const styles = RN.StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
