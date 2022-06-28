import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export default function App() {
  const progress = useRef(new Animated.Value(0.5)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // withTiming, withSpring,
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(progress, { toValue: 1, useNativeDriver: true }),
          Animated.timing(progress, { toValue: 0.5, useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.spring(scale, { toValue: 2, useNativeDriver: true }),
          Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
        ])
      ]), { iterations: 3 }
    ).start()
  }, [])

  const SIZE = 100.0

  return (
    <View style={styles.container}>
      <Animated.View

        style={[styles.square, {
          borderRadius: progress.interpolate({
            inputRange: [0.5, 1],
            outputRange: [(SIZE) / 4, SIZE / 2],
          }), opacity: progress,
          transform: [
            { scale },
            {
              rotate: progress.interpolate(
                {
                  inputRange: [0.5, 1],
                  outputRange: [Math.PI, 2 * Math.PI],
                }
              )
            }]
        }]}

      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    width: 100.0,
    height: 100.0,
    backgroundColor: 'rgba(0, 0, 250, 0.5)'
  }
});
