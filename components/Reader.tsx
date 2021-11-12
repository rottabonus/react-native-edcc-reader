import React from 'react';
import * as RN from 'react-native';

import {Camera, CameraType} from 'react-native-camera-kit';
import {BackButton} from './BackButton';

type Props = {
  onGoBack: () => void;
  scanBarcode: (value: any) => void;
  style?: RN.StyleProp<RN.ViewStyle>;
};

export const ReaderContainer: React.FC<Props> = ({
  onGoBack,
  scanBarcode,
  style,
}) => {
  return (
    <RN.View style={[styles.cameraContainer, style]}>
      <Camera
        onReadCode={scanBarcode}
        cameraType={CameraType.Back}
        style={styles.camera}
        showFrame={true}
        scanBarcode={true}
        laserColor={'blue'}
        frameColor={'gray'}
      />
      <BackButton onPress={onGoBack} style={styles.backButton} />
    </RN.View>
  );
};

const styles = RN.StyleSheet.create({
  cameraContainer: {
    flex: 1,
  },
  camera: {
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    zIndex: 1,
    bottom: 16,
    left: 24,
  },
});
