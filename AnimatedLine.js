import { useEffect } from "react";
import {
  vec,
  Line,
} from "@shopify/react-native-skia";

import {
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
  interpolate,
  Easing
} from "react-native-reanimated";

export default function AnimatedLine({cornerPointValue}) {
  const positionX1 = useSharedValue(0)
  const positionY1 = useSharedValue(0)
  const positionX2 = useSharedValue(0)
  const positionY2 = useSharedValue(0)

  // const updateAnimationAxis = (Position) => {
  //   Position.setValue(0);
  //   Animated.timing(Position, {
  //     toValue: 1,
  //     duration: 8000,
  //     useNativeDriver: false,
  //   }).start(() => updateAnimationAxis(Position));
  // }

  const transformX1 = useDerivedValue(() => interpolate(positionX1.value,
    [0, 1],
    [Number.parseInt(cornerPointValue[0]?.x??0), Number.parseInt(cornerPointValue[3]?.x??0)],
  ), [cornerPointValue]);

  const transformX2 = useDerivedValue(() => interpolate(positionX2.value,
    [0, 1],
    [Number.parseInt(cornerPointValue[1]?.x??0), Number.parseInt(cornerPointValue[2]?.x??0)],
  ), [cornerPointValue]);

  const transformY1 = useDerivedValue(() => interpolate(positionY1.value,
    [0, 1],
    [Number.parseInt(cornerPointValue[0]?.y??0), Number.parseInt(cornerPointValue[3]?.y??0)],
  ), [cornerPointValue]);

  const transformY2 = useDerivedValue(() => interpolate(positionY2.value,
    [0, 1],
    [Number.parseInt(cornerPointValue[1]?.y??0), Number.parseInt(cornerPointValue[2]?.y??0)],
  ), [cornerPointValue]);

  useEffect(() => {
    positionX1.value = withRepeat(withTiming(1, {duration:10000, easing: Easing.bezier(0.25, 0.1, 0.25, 1),}), -1, true);
    positionY1.value = withRepeat(withTiming(1, {duration:10000, easing: Easing.bezier(0.25, 0.1, 0.25, 1),}), -1, true);
    positionX2.value = withRepeat(withTiming(1, {duration:10000, easing: Easing.bezier(0.25, 0.1, 0.25, 1),}), -1, true);
    positionY2.value = withRepeat(withTiming(1, {duration:10000, easing: Easing.bezier(0.25, 0.1, 0.25, 1),}), -1, true);
  }, [positionY1, positionY2, positionX1, positionX2])

  return (
    <Line
      p1={vec(Number.parseInt(transformX1.value??10), Number.parseInt(transformY1.value??10))}
      p2={vec(Number.parseInt(transformX2.value??100), Number.parseInt(transformY2.value??20))}
      color="orange"
      style="stroke"
      strokeWidth={2}
    />
  )
}