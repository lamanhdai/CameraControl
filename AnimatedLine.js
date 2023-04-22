import { useEffect,useRef } from "react";
import {Animated} from 'react-native';
import {
  Canvas,
  Points,
  vec,
  Line,
  runSpring,
  useValue,
  useSharedValueEffect,
} from "@shopify/react-native-skia";

import {
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export default function AnimatedLine({cornerPointValue}) {
  const positionX1 = useRef(new Animated.Value(Number.parseInt(0))).current
  const positionY1 = useRef(new Animated.Value(Number.parseInt(0))).current
  const positionX2 = useRef(new Animated.Value(Number.parseInt(0))).current
  const positionY2 = useRef(new Animated.Value(Number.parseInt(0))).current

  const updateAnimationAxis = (Position) => {
    Position.setValue(0);
    Animated.timing(Position, {
      toValue: 1,
      duration: 8000,
      useNativeDriver: false,
    }).start(() => updateAnimationAxis(Position));
  }

  const transformX1 = positionX1.interpolate({
    inputRange: [0, 1],
    outputRange: [cornerPointValue[0]?.x, cornerPointValue[2]?.x],
  });

  const transformX2 = positionX2.interpolate({
    inputRange: [0, 1],
    outputRange: [cornerPointValue[1]?.x, cornerPointValue[3]?.x],
  });

  const transformY1 = positionY1.interpolate({
    inputRange: [0, 1],
    outputRange: [cornerPointValue[0]?.y, cornerPointValue[2]?.y],
  });

  const transformY2 = positionY2.interpolate({
    inputRange: [0, 1],
    outputRange: [cornerPointValue[1]?.y, cornerPointValue[3]?.y],
  });

  useEffect(() => {
    updateAnimationAxis(positionX1);
    updateAnimationAxis(positionY1);
    updateAnimationAxis(positionX2);
    updateAnimationAxis(positionY2);
  }, [positionY1, positionY2, positionX1, positionX2, cornerPointValue])

  return (
    <Line
      p1={vec(Number.parseInt(transformX1??10), Number.parseInt(transformY1??10))}
      p2={vec(Number.parseInt(transformX2??100), Number.parseInt(transformY2??20))}
      color="orange"
      style="stroke"
      strokeWidth={2}
    />
  )
}