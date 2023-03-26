import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const { width } = Dimensions.get('window');
const qrSize = width * 0.7;

export default function App() {
  const [openedCamera, setOpenedCamera] = useState(false);

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);
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

  return (
    <View style={styles.container}>
      {openedCamera&&
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={[StyleSheet.absoluteFillObject, styles.container]}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        >
          <Text style={styles.description}>Scan your QR code</Text>
        </BarCodeScanner>
      }
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      <View style={styles.button}><Button title={'Tap to open camera'} onPress={openCamera}/></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems:'flex-end',
  },
  camera: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  cameraContainer: {
    width: 200,
    height: 200,
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
});
