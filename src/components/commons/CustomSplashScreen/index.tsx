import React, { useEffect, useRef, useState } from "react";
import { Image, Animated, StatusBar } from "react-native";

// Styles
import { styles } from "./styles";

const FADE_OUT_MS = 350;

interface CustomSplashScreenProps {
  isVisible: boolean;
  onAnimationEnd?: () => void;
}

export function CustomSplashScreen({
  isVisible,
  onAnimationEnd,
}: CustomSplashScreenProps) {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  // Desmontar só no fim da animação. Sair no `isVisible === false` fazia a
  // splash sumir de uma vez e deixava o componente montado e invisível
  // durante todo o fade.
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    if (!isVisible) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: FADE_OUT_MS,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setIsMounted(false);
          onAnimationEnd?.();
        }
      });
    }
  }, [isVisible, fadeAnim, onAnimationEnd]);

  if (!isMounted) {
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
