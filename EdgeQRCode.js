import { Button, StyleSheet, Text, View, Dimensions } from 'react-native';

const EdgeQRCode = ({position}) => {
  const edgeWidth = 20;
  const edgeHeight = 20;
  const edgeColor = '#fff'
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
      top: edgePosition,
      right: edgePosition
    },
    topLeft: {
      borderLeftWidth: edgeBorderWidth,
      borderTopWidth: edgeBorderWidth,
      borderTopLeftRadius: edgeRadius,
      top: edgePosition,
      left: edgePosition
    },
    bottomRight: {
      borderRightWidth: edgeBorderWidth,
      borderBottomWidth: edgeBorderWidth,
      borderBottomRightRadius: edgeRadius,
      Bottom: edgePosition,
      right: edgePosition
    },
    bottomLeft: {
      borderLeftWidth: edgeBorderWidth,
      borderBottomWidth: edgeBorderWidth,
      borderBottomLeftRadius: edgeRadius,
      Bottom: edgePosition,
      left: edgePosition
    },
  }

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