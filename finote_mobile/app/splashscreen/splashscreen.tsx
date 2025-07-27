import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Dimensions, Image, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');
const logo = require('../../assets/images/logo.png');

export default function SplashScreen() {
    const router = useRouter();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        // Start animation
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }),
        ]).start();

        // Navigate to signin after 3 seconds
        const timer = setTimeout(() => {
            router.replace('/signin');
        }, 3000);

        return () => clearTimeout(timer);
    }, [router, fadeAnim, scaleAnim]);

    return (
        <ThemedView style={styles.container} lightColor="#ffffff" darkColor="#ffffff">
            <Animated.View
                style={[
                    styles.logoContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }]
                    }
                ]}
            >
                <Image
                    source={logo}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <ThemedText style={styles.appName} lightColor="#6d0b24" darkColor="#6d0b24">
                    Finote
                </ThemedText>
            </Animated.View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 20,
    },
    appName: {
        fontSize: 24,
        fontWeight: '600',
        color: '#6d0b24',
        letterSpacing: 0.5,
    },
});