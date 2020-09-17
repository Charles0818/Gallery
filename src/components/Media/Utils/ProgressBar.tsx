import React, { memo, useCallback } from 'react';
import { Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { colors, styles } from '../../../styles';
import { durationFormat } from '../../../helpers';

export interface IProgressBar {
  maxDuration: number;
  onChange: (seconds: number) => void;
}
export const ProgressBar = memo(({ maxDuration, onChange }: IProgressBar) => {
  const trackLength: React.MutableRefObject<string> = React.useRef<string>(
    durationFormat(maxDuration),
  );
  const [durationElapsed, setDurationElapsed] = React.useState<string>('0:00');
  const formatProgress = useCallback((seconds) => {
    setDurationElapsed(durationFormat(seconds));
    onChange(seconds * 1000);
  }, []);
  return (
    <View>
      <View
        style={[
          styles.row,
          styles.alignItems_center,
          styles.justifyContent_between,
          styles.marginBottom_sm,
        ]}>
        <Text style={[styles.font_md, styles.fontWeight_700]}>
          {durationElapsed}
        </Text>
        <Text style={[styles.font_md.styles.fontWeight_700]}>{trackLength}</Text>
      </View>
      <Slider
        minimumValue={0}
        maximumValue={maxDuration}
        thumbTintColor={colors.color1}
        minimumTrackTintColor={colors.color1}
        maximumTrackTintColor={colors.gray_color}
        onValueChange={(seconds) => formatProgress(seconds)}
      />
    </View>
  );
});
