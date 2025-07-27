import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CustomButton } from '@/components/CustomButton';
import { CustomCheckbox } from '@/components/CustomCheckbox';
import { CustomInput } from '@/components/CustomInput';
import { ThemedView } from '@/components/ThemedView';

export default function SignInScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSignIn = async () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            // Navigate to main app
            router.replace('/(tabs)');
        }, 2000);
    };

    const handleSignUp = () => {
        // For now, just log - we'll create signup later
        console.log('Sign up pressed');
    };

    const handleForgotPassword = () => {
        // Handle forgot password
        console.log('Forgot password pressed');
    };

    return (
        <ThemedView style={styles.container} lightColor="#f8f9fa" darkColor="#f8f9fa">
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    style={styles.keyboardView}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                    >
                        {/* Header */}
                        <View style={styles.header}>
                            <Text style={styles.title}>Welcome Back</Text>
                            <Text style={styles.subtitle}>Sign in to your FINOTE account</Text>
                        </View>

                        {/* Form */}
                        <View style={styles.form}>
                            {/* Email Input */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Email Address</Text>
                                <CustomInput
                                    placeholder="Enter your email"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>

                            {/* Password Input */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Password</Text>
                                <CustomInput
                                    placeholder="Enter your password"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={true}
                                    showPasswordToggle={true}
                                />
                            </View>

                            {/* Remember Me & Forgot Password */}
                            <View style={styles.optionsRow}>
                                <View style={styles.rememberMeContainer}>
                                    <CustomCheckbox
                                        checked={rememberMe}
                                        onPress={() => setRememberMe(!rememberMe)}
                                        label="Remember me"
                                    />
                                </View>
                                <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPasswordButton}>
                                    <Text style={styles.forgotPassword}>Forgot password?</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Sign In Button */}
                            <CustomButton
                                title="Sign in"
                                onPress={handleSignIn}
                                loading={loading}
                                icon={<Ionicons name="log-in-outline" size={18} color="#fff" />}
                            />

                            {/* Sign Up Link */}
                            <View style={styles.signUpRow}>
                                <Text style={styles.signUpText}>Don't have an account? </Text>
                                <TouchableOpacity onPress={handleSignUp}>
                                    <Text style={styles.signUpLink}>Sign up</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Security Notice */}
                        <View style={styles.securityNotice}>
                            <Ionicons name="shield-checkmark-outline" size={16} color="#666" />
                            <Text style={styles.securityText}>Your data is secure and encrypted</Text>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    safeArea: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 40,
        paddingBottom: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    form: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 24,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 24,
        minHeight: 24,
    },
    rememberMeContainer: {
        flex: 0.6,
        marginRight: 5,
    },
    forgotPasswordButton: {
        flex: 0.4,
        alignItems: 'flex-end',
    },
    forgotPassword: {
        fontSize: 14,
        color: '#6d0b24',
        fontWeight: '500',
        textAlign: 'right',
        flexWrap: 'wrap',
    },
    signUpRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    signUpText: {
        fontSize: 14,
        color: '#666',
    },
    signUpLink: {
        fontSize: 14,
        color: '#6d0b24',
        fontWeight: '600',
    },
    securityNotice: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginTop: 20,
    },
    securityText: {
        fontSize: 12,
        color: '#666',
    },
});
