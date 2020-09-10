import React from 'react';
import { Text, View } from 'react-native';

export interface Props {}

interface State {
  hasError?: boolean;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    // You can render any custom fallback UI
    if (this.state.hasError) {
      return (
        <View>
          <Text>Something Went Wrong</Text>
        </View>
      );
    }
    return this.props.children;
  }
}
