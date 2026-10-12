import { Component } from "react";
import { Pressable, Text, View } from "react-native";

export class AppErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Hook a crash reporter in here (Sentry, etc.) before launch.
    if (__DEV__) console.error("Unhandled render error", error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F8F9FA",
          paddingHorizontal: 32,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "800",
            color: "#1A1A1A",
            textAlign: "center",
          }}
        >
          Something went wrong
        </Text>
        <Text
          style={{
            fontSize: 14,
            lineHeight: 21,
            color: "#4B5563",
            textAlign: "center",
            marginTop: 8,
          }}
        >
          HarvestLink hit an unexpected problem. Your data is safe. Try again.
        </Text>
        <Pressable
          onPress={() => this.setState({ hasError: false })}
          accessibilityRole="button"
          accessibilityLabel="Try again"
          style={{
            marginTop: 24,
            minHeight: 48,
            paddingHorizontal: 28,
            borderRadius: 12,
            backgroundColor: "#2E7D32",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "600" }}>
            Try again
          </Text>
        </Pressable>
      </View>
    );
  }
}
