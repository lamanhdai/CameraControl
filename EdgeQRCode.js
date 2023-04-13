import { Button, StyleSheet, Text, View, Dimensions } from 'react-native';

const EdgeQRCode = ({position, data}) => {
  const edgeWidth = 20;
  const edgeHeight = 20;
  const edgeColor = 'green'
  const edgeBorderWidth = 4
  const edgeRadius = 0
  const edgePosition = 4

  const defaultStyle = {
    width: edgeWidth,
    height: edgeHeight,
    borderColor: edgeColor
  };
  const egdeBorderStyle = {
    topRight: {
      borderRightWidth: edgeBorderWidth,
      borderTopWidth: edgeBorderWidth,
      borderTopRightRadius: edgeRadius,
      top: data.Y||edgePosition,
      right: data.X||edgePosition,
      transform: [
        { rotateX: Math.atan2(data.lastY - data.lastY, data.X - data.lastX) * 180 / Math.PI+"deg" }
      ]
    },
    topLeft: {
      borderLeftWidth: edgeBorderWidth,
      borderTopWidth: edgeBorderWidth,
      borderTopLeftRadius: edgeRadius,
      top: data.Y||edgePosition,
      left: data.X||edgePosition
    },
    bottomRight: {
      borderRightWidth: edgeBorderWidth,
      borderBottomWidth: edgeBorderWidth,
      borderBottomRightRadius: edgeRadius,
      bottom: data.Y||edgePosition,
      right: data.X||edgePosition
    },
    bottomLeft: {
      borderLeftWidth: edgeBorderWidth,
      borderBottomWidth: edgeBorderWidth,
      borderBottomLeftRadius: edgeRadius,
      bottom: data.Y||edgePosition,
      left: data.X||edgePosition
    },
    
  }
  console.log(data)

  return <View style={[defaultStyle, styles[`${position}Edge`], egdeBorderStyle[position]]}/>;
}

export default EdgeQRCode;

const styles = StyleSheet.create({
  
  topLeftEdge: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  topRightEdge: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  bottomLeftEdge: {
    position: 'absolute',
    bottom: 0,
    left: 0
  },
  bottomRightEdge: {
    position: 'absolute',
    bottom: 0,
    right: 0
  }
})