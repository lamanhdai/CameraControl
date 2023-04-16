import { Button, StyleSheet, Text, View, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';

const EdgeQRCode = ({position, data}) => {
  const edgeWidth = 20;
  const edgeHeight = 20;
  const edgeColor = 'green'
  const edgeBorderWidth = 4
  const edgeRadius = 0
  const edgePosition = 4
  const [boundary, setBoundary] = useState({
    x: 0,
    y: 0,
    maxX: 0,
    maxY: 0,
    width: 0,
    height: 0
  })
  // const theta = () => {
  //   let result = Math.atan2(boundary.maxY - boundary.y, boundary.maxX - boundary.x);
  //   if (result < 0)
  //     result += 2 * Math.PI;
  //   return Math.floor(result * 180 / Math.PI);
  // }

  // Function to convert radians to degrees
  function radians_to_degrees(radians) {
    return radians * (180 / Math.PI);
  }

  // Function to find the distance between 2 points in a 3D plane
  function dist(p1, p2) {
    return Math.sqrt(
        Math.pow(p1.x - p2.x, 2) +
        Math.pow(p1.y - p2.y, 2)
    ); 
  }
  function find_angle(A,B,C) {
    var AB = dist(A,B);    
    var BC = dist(B,C); 
    var AC = dist(C,A);
    
    return Math.acos((BC*BC+AB*AB-AC*AC) / (2*BC*AB)) * (180 / Math.PI);   
  }
  const calculateAxis = () => {
    if(!data.cornerPointValue?.length) return;
    let minX = 0, maxX = 0, minY = 0, maxY = 0;
    data.cornerPointValue.map(item => {
      minX = minX > Math.floor(item.x) || !minX ? Math.floor(item.x) : minX;
      maxX = maxX < Math.floor(item.x) ? Math.floor(item.x) : maxX;
      minY = minY > Math.floor(item.y) || !minY ? Math.floor(item.y) : minY;
      maxY = maxY < Math.floor(item.y) ? Math.floor(item.y) : maxY;
    });
    setBoundary({
      x: minX,
      y: minY,
      maxX,
      maxY,
      width: (maxX - minX),
      height: (maxY - minY),
    })
  }

  const defaultStyle = {
    width: boundary.width||edgeWidth,
    height: boundary.height||edgeHeight,
    borderColor: edgeColor
  };
  const egdeBorderStyle = {
    topRight: {
      borderRightWidth: edgeBorderWidth,
      borderTopWidth: edgeBorderWidth,
      borderTopRightRadius: edgeRadius,
      top: boundary.y||edgePosition,
      right: boundary.x||edgePosition,
      transform: [
        { rotate: "30deg" }
      ]
    },
    topLeft: {
      borderLeftWidth: edgeBorderWidth,
      borderTopWidth: edgeBorderWidth,
      borderTopColor: 'red',
      borderBottomWidth: edgeBorderWidth,
      borderRightWidth: edgeBorderWidth,
      borderTopLeftRadius: edgeRadius,
      top: boundary.y||edgePosition,
      left: boundary.x||edgePosition,
      // transform: [
      //   { rotateZ: (
      //     Math.floor(find_angle(
      //       {x: data.lastX, y: data.lastY},
      //       {x: boundary.x, y: boundary.maxY},
      //       {x: boundary.maxX, y: boundary.maxY},
      //     )) <= 90 ? 0 :Math.floor(find_angle(
      //       {x: data.lastX, y: data.lastY},
      //       {x: boundary.x, y: boundary.maxY},
      //       {x: boundary.maxX, y: boundary.maxY},
      //     )) )+"deg" }
      // ]
    },
    bottomRight: {
      borderRightWidth: edgeBorderWidth,
      borderBottomWidth: edgeBorderWidth,
      borderBottomRightRadius: edgeRadius,
      bottom: data.Y||edgePosition,
      right: data.X||edgePosition,
      transform: [
        { rotateZ:  0+"deg" }
      ]
    },
    bottomLeft: {
      borderLeftWidth: edgeBorderWidth,
      borderBottomWidth: edgeBorderWidth,
      borderBottomLeftRadius: edgeRadius,
      bottom: data.Y||edgePosition,
      left: data.X||edgePosition,
      transform: [
        { rotateZ:  0+"deg" }
      ]
    },
    
  }
  useEffect(() => {
    calculateAxis();
    console.log('boundary', boundary)
    console.log(Math.floor(find_angle(
      {x: data.lastX, y: data.lastY},
      {x: boundary.x, y: boundary.maxY},
      {x: boundary.maxX, y: boundary.maxY},
          )))
  }, [data.cornerPointValue])
  

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