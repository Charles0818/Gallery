import React, { memo } from 'react';
import { Dimensions, ImageBackground, View } from 'react-native';
import { styles } from '../../../../styles';

export interface IPhoto {
  filename: string | null;
  uri: string;
  height: number;
  width: number;
  fileSize: number | null;
}

export const PictureFrame = memo(
  (photo: IPhoto): JSX.Element => {
    const { uri, height, width } = photo;
    return (
      <View
        style={[
          styles.flexCenter,
          {
            flex: 1,
          },
        ]}
      >
        <ImageBackground
          source={{
            uri,
          }}
          style={[
            {
              height,
              width: Dimensions.get('window').width,
            },
          ]}
          resizeMode="contain"
          resizeMethod="auto"
        />
      </View>
    );
  },
);
