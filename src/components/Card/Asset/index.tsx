import React, { memo } from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { PhotoIdentifier } from '@react-native-community/cameraroll';
import { useNavigation } from '@react-navigation/native';
import { durationFormat, quantifier } from '../../../helpers';
import { colors, styles } from '../../../styles';
import {
  IAddAsset,
  IAssetIsSelected,
  IHasSelection,
  IRemoveAsset,
} from '../../Media';
import { Button } from '../../Button';

export type AssetType = IAddAsset &
  IHasSelection &
  IRemoveAsset &
  IAssetIsSelected & {
    asset: PhotoIdentifier;
  };
export const AssetCard: React.FC<AssetType> = ({
  asset,
  addAsset,
  hasSelection,
  removeAsset,
  isSelected,
}) => {
  const {
    node: { image, group_name },
  } = asset;
  const { push, navigate } = useNavigation();
  const selected: boolean = isSelected(image.uri);
  const AnimatedIcon = Animated.createAnimatedComponent(Icon);
  return (
    <View style={[mediaStyle.container]}>
      <Button
        onPress={(): void =>
          hasSelection
            ? !selected
              ? addAsset(asset)
              : removeAsset(image.uri)
            : image.playableDuration
            ? push('VideoPlayer', {
                asset,
              })
            : navigate('PhotoViewer', {
                albumName: group_name,
                uri: image.uri,
              })
        }
        onLongPress={() => (selected ? removeAsset(image.uri) : addAsset(asset))}
      >
        <ImageBackground
          source={{
            uri: image.uri,
          }}
          style={[mediaStyle.thumbnail, styles.justifyContent_end]}
        >
          {image.playableDuration && (
            <View
              style={[
                styles.padding_sm,
                styles.bg_darkOpacity,
                styles.row,
                styles.justifyContent_between,
                styles.alignItems_center,
              ]}
            >
              <Icon
                name="play-circle"
                color={colors.white}
                style={[styles.marginRight_xsm]}
              />
              <Text
                numberOfLines={1}
                style={[styles.font_xsm, styles.color_white, styles.text]}
              >
                {durationFormat(image.playableDuration)}
              </Text>
            </View>
          )}
        </ImageBackground>
      </Button>
    </View>
  );
};

const mediaStyle = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width / 4 - 5,
    borderColor: colors.white,
    borderWidth: 1,
  },
  thumbnail: {
    flex: 1,
    height: Dimensions.get('window').width / 4,
  },
});
