import { ViewStyle } from 'react-native';

export interface PaddingProps extends ViewStyle {
  padding_sm: {
    paddingHorizontal: 5;
    paddingVertical: 4;
  };
  padding_md: {
    paddingHorizontal: 15;
    paddingVertical: 10;
  };
  padding_xsm: {
    padding: 4;
  };
  padding_lg: {
    paddingHorizontal: 40;
    paddingVertical: 50;
  };
  paddingBottom_sm: {
    paddingBottom: 10;
  };
  paddingBottom_xsm: {
    paddingBottom: 5;
  };
  paddingBottom_md: {
    paddingBottom: 30;
  };
  paddingBottom_lg: {
    paddingBottom: 50;
  };
  paddingTop_xsm: {
    paddingTop: 5;
  };
  paddingTop_sm: {
    paddingTop: 10;
  };
  paddingTop_lg: {
    paddingTop: 50;
  };
  paddingTop_md: {
    paddingTop: 30;
  };
  paddingLeft_xsm: {
    paddingLeft: 5;
  };
  paddingLeft_sm: {
    paddingLeft: 10;
  };
  paddingLeft_md: {
    paddingLeft: 30;
  };
  paddingLeft_lg: {
    paddingLeft: 50;
  };
  paddingRight_xsm: ViewStyle;
  paddingRight_sm: {
    paddingRight: 10;
  };
  paddingRight_md: {
    paddingRight: 30;
  };
  paddingRight_lg: {
    paddingRight: 50;
  };
  paddingHorizontal_sm: {
    paddingHorizontal: 10;
  };
  paddingHorizontal_md: {
    paddingHorizontal: 30;
  };
  paddingVertical_sm: {
    paddingVertical: 10;
  };
  paddingVertical_md: {
    paddingVertical: 30;
  };
}
