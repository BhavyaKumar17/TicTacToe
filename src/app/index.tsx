import { StyleSheet, View } from "react-native";
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
