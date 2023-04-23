import { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, View, Dimensions, Animated } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {
  Canvas,
  Points,
  vec,
} from "@shopify/react-native-skia";
import AnimatedLine from './AnimatedLine';

// const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export default function App() {
  const [openedCamera, setOpenedCamera] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const scannerLine = useRef(new Animated.Value(0)).current;
  const [cornerPointValue, setCornerPointValue] = useState([]);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data, bounds, cornerPoints, ...rest }) => {
    if(scanned) return
    setCornerPointValue(cornerPoints);
    // setTimeout(() => {
    //   setScanned(true);
    // }, 3000)
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
          onBarCodeScanned={handleBarCodeScanned}
          style={[StyleSheet.absoluteFillObject, styles.camera]}
        >
          <View style={styles.layerCenter}>
            <View style={styles.layerFocus}>
              <Canvas style={{ flex: 1 }}>
                <AnimatedLine
                  cornerPointValue={cornerPointValue}
                />
                <Points
                  points={
                    [
                      vec(Number(cornerPointValue[0]?.x??0), Number(cornerPointValue[0]?.y??0)),
                      vec(Number(cornerPointValue[1]?.x??0), Number(cornerPointValue[1]?.y??0)),
                      vec(Number(cornerPointValue[2]?.x??0), Number(cornerPointValue[2]?.y??0)),
                      vec(Number(cornerPointValue[3]?.x??0), Number(cornerPointValue[3]?.y??0)),
                      vec(Number(cornerPointValue[0]?.x??0), Number(cornerPointValue[0]?.y??0)),
                    ]
                  }
                  mode="polygon"
                  color="navy"
                  style="stroke"
                  strokeWidth={2}
                />
              </Canvas>
            </View>
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
    // borderWidth: 0.5,
    // borderColor: '#fff',
    // borderRadius: 4
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
