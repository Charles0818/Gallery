import React, { memo, useRef, FC, Dispatch, SetStateAction } from 'react';
import { Dimensions, View, Animated, TouchableWithoutFeedback } from 'react-native';
// import Animated, { Value } from 'react-native-reanimated';
import {
  TapGestureHandler,
  TapGestureHandlerStateChangeEvent,
  PinchGestureHandler,
  State,
  PinchGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';
import { styles } from '../../../../styles';

export interface IPhoto {
  filename: string | null;
  uri: string;
  height: number;
  width: number;
  fileSize: number | null;
}

type PictureFrameType = IPhoto & {
  toggleOverlay: () => void;
};
export const PictureFrame: FC<PictureFrameType> = memo(
  ({ toggleOverlay, uri, height, width }): JSX.Element => {
    const pinchRef = useRef<PinchGestureHandler>(null);
    const doubleTapRef = useRef<TapGestureHandler>(null);
    const baseScale = useRef(new Animated.Value(1)).current;
    const pinchScale = useRef(new Animated.Value(1)).current;
    const scale = useRef(Animated.multiply(baseScale, pinchScale)).current;
    let lastScale = 1;
    const toggleOverlayHandler = (event: TapGestureHandlerStateChangeEvent) => {
      if (event.nativeEvent.oldState === State.ACTIVE) {
        toggleOverlay();
      }
    };
    const tapHandlerStateChange = (event: TapGestureHandlerStateChangeEvent) => {
      if (event.nativeEvent.oldState === State.ACTIVE) {
        // event.nativeEvent.handlerTag
        if (lastScale === 1) {
          lastScale = 1.5;
        } else {
          lastScale = 1;
        }
        Animated.spring(baseScale, {
          toValue: lastScale,
          useNativeDriver: true,
        }).start();
        pinchScale.setValue(1);
      }
    };
    const onPinchGestureEvent = Animated.event(
      [{ nativeEvent: { scale: pinchScale } }],
      { useNativeDriver: false },
    );
    const onPinchGestureHandler = (event: PinchGestureHandlerStateChangeEvent) => {
      if (event.nativeEvent.oldState === State.ACTIVE) {
        const { scale } = event.nativeEvent;
        lastScale = lastScale * scale < 1 ? 1 : lastScale * scale;
        baseScale.setValue(lastScale);
        pinchScale.setValue(1);
      }
    };
    return (
      <TapGestureHandler
        onHandlerStateChange={toggleOverlayHandler}
        numberOfTaps={1}
        waitFor={[doubleTapRef]}>
        <PinchGestureHandler
          ref={pinchRef}
          simultaneousHandlers={doubleTapRef}
          onGestureEvent={onPinchGestureEvent}
          onHandlerStateChange={onPinchGestureHandler}>
          <Animated.View>
            <TapGestureHandler
              ref={doubleTapRef}
              simultaneousHandlers={pinchRef}
              onHandlerStateChange={tapHandlerStateChange}
              numberOfTaps={2}
              maxDurationMs={1000}
              maxDist={40}>
              <View style={[styles.flexCenter, { flex: 1 }]}>
                <Animated.Image
                  source={{ uri }}
                  style={[
                    {
                      height,
                      width: Dimensions.get('window').width,
                      transform: [{ scale }, { perspective: 200 }],
                    },
                  ]}
                  resizeMode="contain"
                  resizeMethod="auto"
                />
              </View>
            </TapGestureHandler>
          </Animated.View>
        </PinchGestureHandler>
      </TapGestureHandler>
    );
  },
);
