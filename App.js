import { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, View, Dimensions, Animated } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import EdgeQRCode from './EdgeQRCode';

const { width } = Dimensions.get('window');

export default function App() {
  const [openedCamera, setOpenedCamera] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [sizeQrCode, setSizeQrCode] = useState({width: 0, height: 0})
  const scannerLine = useRef(new Animated.Value(0)).current;
  console.log(scannerLine)

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  useEffect(() => {
    updateAnimationScanLine();
  }, []);

  const updateAnimationScanLine = () => {
    scannerLine.setValue(0);
    Animated.timing(scannerLine, {
      toValue: 1,
      duration: 8000,
      useNativeDriver: false,
    }).start(() => updateAnimationScanLine());
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const openCamera = () => {
    setOpenedCamera(true);
  }

  const onLayoutView = (event) => {
    const { height, width } = event.nativeEvent.layout
    setSizeQrCode({ width: width, height: height });
  }

  const transformLine = scannerLine.interpolate({
    inputRange: [0, 1],
    outputRange: [0, sizeQrCode?.height],
  });
  console.log(transformLine)

  return (
    <View style={styles.container}>
      {openedCamera&&
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={[StyleSheet.absoluteFillObject, styles.camera]}
        >
          <View style={styles.layerTop}/>
          <View style={styles.layerCenter}>
            <View style={styles.layerLeft}/>
            <View style={styles.layerFocus} onLayout={onLayoutView}>
              <EdgeQRCode position={'topLeft'}/>
              <EdgeQRCode position={'topRight'}/>
              <Animated.View
                  style={[
                    {
                      transform: [{ translateY: transformLine }],
                    },
                    styles.scannerLine,
                  ]}
                />
              <EdgeQRCode position={'bottomLeft'}/>
              <EdgeQRCode position={'bottomRight'}/>
            </View>
            <View style={styles.layerRight}/>
          </View>
          <View style={styles.layerBottom}/>
        </BarCodeScanner>
      }
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      {!openedCamera&&<View style={styles.button}><Button title={'Tap to open camera'} onPress={openCamera}/></View>}
    </View>
  );
}

const opacity = "rgba(0, 0, 0, .8)";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems:'flex-end',
  },
  camera: {
    flex: 1,
    flexDirection: 'column'
  },
  text: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center'
  },
  button: {
    flex: 1
  },
  description: {
    fontSize: 20,
    marginTop: '10%',
    textAlign: 'center',
    width: '70%',
    color: 'white',
  },
  layerTop: {
    flex: 1,
    backgroundColor: opacity
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity
  },
  layerCenter: {
    flex: 1,
    flexDirection: 'row'
  },
  layerFocus: {
    flex: 1,
    position: 'relative',
    borderWidth: 0.5,
    borderColor: '#fff',
    borderRadius: 4
  },
  layerBottom: {
    flex: 1,
    backgroundColor: opacity
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity
  },
  scannerLine: { height: 2, backgroundColor: '#fff' },
});
