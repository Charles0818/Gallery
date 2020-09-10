import * as React from 'react';
import Video, { VideoProperties } from 'react-native-video';
import { Screen, Section } from '../components';
import { colors, styles } from '../../styles';

export const VideoPlayer = (): JSX.Element => {
  const playState = React.useRef(null);
  return (
    <Screen>
      <Video
        source={{
          uri: 'background',
        }}
        ref={playState}
        style={styles.absoluteOverlay}
      />
    </Screen>
  );
};
