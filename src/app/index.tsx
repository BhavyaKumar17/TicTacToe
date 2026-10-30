import * as Device from "expo-device";
import { Platform, StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import XOBoard from "@/components/XOBoard";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <XOBoard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7F2",
    alignItems: "center",
    justifyContent: "center",
  },
});
