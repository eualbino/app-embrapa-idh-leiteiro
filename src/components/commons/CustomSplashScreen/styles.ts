import { StyleSheet, Dimensions, StatusBar } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    backgroundColor: "#097E47",
  },
  image: {
    width,
    height: height + (StatusBar.currentHeight || 0),
    position: "absolute",
    top: 0,
    left: 0,
  },
});
