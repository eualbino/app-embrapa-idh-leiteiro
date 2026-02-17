import React, { useEffect, useRef } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  StatusBar,
} from "react-native";

const { width, height } = Dimensions.get("window");

interface CustomSplashScreenProps {
  isVisible: boolean;
  onAnimationEnd?: () => void;
}

export function CustomSplashScreen({
  isVisible,
  onAnimationEnd,
}: CustomSplashScreenProps) {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!isVisible) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        onAnimationEnd?.();
      });
    }
  }, [isVisible, fadeAnim, onAnimationEnd]);

  if (!isVisible) {
    return null;
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Image
        source={require("@/src/assets/images/splash-screen.png")}
        style={styles.image}
        resizeMode="cover"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    backgroundColor: "#097E47",
  },
  image: {
    width: width,
    height: height + (StatusBar.currentHeight || 0),
    position: "absolute",
    top: 0,
    left: 0,
  },
});
