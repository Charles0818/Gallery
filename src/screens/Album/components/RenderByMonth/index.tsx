import React from 'react';
import { FlatList } from 'react-native';
import {
  AssetCard,
  IHasSelection,
  IRemoveAsset,
  IAssetIsSelected,
  IAddAsset,
  ThemeText,
} from '../../../../components';
import { styles } from '../../../../styles';
import { PhotoIdentifier } from '../../../../../node_modules/@react-native-community/cameraroll';

type RenderAssetsByMonthProps = IHasSelection &
  IRemoveAsset &
  IAssetIsSelected &
  IAddAsset & {
    groupedMonth: [string, PhotoIdentifier[]];
  };
export const RenderAssetsByMonth: React.FC<RenderAssetsByMonthProps> = ({
  groupedMonth,
  ...rest
}): JSX.Element => {
  const [publishDate, assets] = groupedMonth;
  return (
    <FlatList
      data={assets}
      ListHeaderComponent={(): JSX.Element => (
        <ThemeText
          style={[styles.font_lg, styles.paddingBottom_sm, styles.fontWeight_700]}>
          {publishDate}
        </ThemeText>
      )}
      ListHeaderComponentStyle={{ padding: 10 }}
      renderItem={({ item, index }) => (
        <AssetCard asset={item} key={index} {...rest} />
      )}
      listKey={publishDate}
      keyExtractor={(item) => item.node.image.uri}
      numColumns={4}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={[
        {
          justifyContent: 'flex-start',
        },
        styles.paddingHorizontal_sm,
      ]}
      initialNumToRender={100}
      onEndReachedThreshold={0.75}
      contentContainerStyle={[styles.marginBottom_sm]}
    />
  );
};
