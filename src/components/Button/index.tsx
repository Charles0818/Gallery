import * as React from 'react';
import {
  ColorValue,
  LayoutAnimation,
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  TouchableOpacity,
  TouchableOpacityProps,
  UIManager,
  View,
} from 'react-native';
import { colors } from '../../styles';

type IButton = TouchableOpacityProps &
  TouchableNativeFeedbackProps & {
    rippleColor?: ColorValue;
    children: React.ReactNode;
  };
export const Button: React.FC<IButton> = ({
  activeOpacity = 0.8,
  rippleColor = colors.dark_opacity,
  children,
  style,
  ...rest
}): JSX.Element => {
  switch (Platform.OS) {
    case 'ios': {
      return (
        <TouchableOpacity
          style={style}
          delayPressIn={0}
          delayPressOut={0}
          activeOpacity={activeOpacity}
          {...rest}
        >
          {children}
        </TouchableOpacity>
      );
    }
    case 'android': {
      return (
        <TouchableNativeFeedback
          delayPressIn={0}
          delayPressOut={0}
          background={TouchableNativeFeedback.Ripple(rippleColor, false)}
          useForeground={TouchableNativeFeedback.canUseNativeForeground()}
          {...rest}
        >
          <View
            style={[
              style,
              {
                overflow: 'hidden',
              },
            ]}
          >
            {children}
          </View>
        </TouchableNativeFeedback>
      );
    }
    default:
      return (
        <TouchableOpacity {...rest} activeOpacity={activeOpacity}>
          <View>{children}</View>
        </TouchableOpacity>
      );
  }
};

type ISwitchButton = {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};
export const SwitchButton = ({ isActive, setIsActive }: ISwitchButton) => {
  console.log('was isActive rendered?', isActive);
  return (
    <TouchableNativeFeedback onPress={() => setIsActive(!isActive)}>
      <View
        style={[
          toggleStyle.viewToggle,
          !isActive
            ? {
                backgroundColor: colors.gray_color,
              }
            : {
                backgroundColor: colors.google_green,
                alignItems: 'flex-end',
              },
        ]}
      >
        <View style={toggleStyle.circleToggle} />
      </View>
    </TouchableNativeFeedback>
  );
};

export const useToggleButton = (
  value: boolean = false,
  callback: (value: boolean) => void,
) => {
  const [isActive, setIsActive] = React.useState<boolean>(value);
  React.useEffect(() => {
    setIsActive(value);
  }, [value]);
  const handleChange = React.useCallback(
    (value) => {
      if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental &&
          UIManager.setLayoutAnimationEnabledExperimental(true);
      }
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      callback ? callback(value) : setIsActive(value);
    },
    [value],
  );
  const ToggleButton = (
    <SwitchButton setIsActive={handleChange} isActive={isActive} />
  );
  return {
    isActive,
    handleChange,
    ToggleButton,
  };
};

const toggleStyle = StyleSheet.create({
  viewToggle: {
    height: 27,
    width: 55,
    borderRadius: 20,
    justifyContent: 'center',
    paddingRight: 3,
  },
  circleToggle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
});
