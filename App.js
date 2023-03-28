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
          style={[StyleSheet.absoluteFillObject, styles.camera]}
        >
          {/* <View style={styles.layerTop}>
            <Text style={styles.description}>Scan your QR code</Text>
          </View> */}
          <View style={styles.layerCenter}>
            <View style={styles.layerTopLeft} />
            <View style={styles.layerTopRight} />
            <View style={styles.layerBottomLeft} />
            <View style={styles.layerBottomRight} />
          </View>
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
    flex: 2
  },
  layerCenter: {
    flex: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '50%'
  },
  layerTopLeft: {
    flex: 1,
    borderTopColor: 'white',
    borderTopWidth: 5,
    borderLeftColor: 'white',
    borderLeftWidth: 5,
    height: '100%',
    marginRight: 20
  },
  layerTopRight: {
    flex: 1,
    backgroundColor: opacity,
    borderTopColor: 'white',
    borderTopWidth: 5,
    borderRightColor: 'white',
    borderRightWidth: 5,
    height: '100%',
    marginLeft: 20
  },
  layerBottomLeft: {
    flex: 1,
    borderBottomColor: 'white',
    borderBottomWidth: 5,
    borderLeftColor: 'white',
    borderLeftWidth: 5,
    height: '100%',
    marginRight: 20
  },
  layerBottomRight: {
    flex: 1
  },
  layerBottom: {
    flex: 2
  },
});
