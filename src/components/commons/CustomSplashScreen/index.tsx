import React, { useEffect, useRef } from "react";
import { Image, Animated, StatusBar } from "react-native";

// Styles
import { styles } from "./styles";

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
        duration: 3000,
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
