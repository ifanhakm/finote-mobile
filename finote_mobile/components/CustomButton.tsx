import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

interface CustomButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
}

export function CustomButton({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    icon,
}: CustomButtonProps) {
    const buttonStyles: ViewStyle[] = [styles.button, styles[size]];
    const textStyles: TextStyle[] = [styles.text];

    // Add variant styles
    if (variant === 'primary') {
        buttonStyles.push(styles.primary);
        textStyles.push(styles.primaryText);
    } else if (variant === 'secondary') {
        buttonStyles.push(styles.secondary);
        textStyles.push(styles.secondaryText);
    } else if (variant === 'outline') {
        buttonStyles.push(styles.outline);
        textStyles.push(styles.outlineText);
    }

    // Add disabled styles
    if (disabled) {
        buttonStyles.push(styles.disabled);
        textStyles.push(styles.disabledText);
    }

    return (
        <TouchableOpacity
            style={buttonStyles}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator color="#fff" size="small" />
            ) : (
                <>
                    {icon}
                    <Text style={textStyles}>{title}</Text>
                </>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    small: {
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    medium: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    large: {
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    primary: {
        backgroundColor: '#6d0b24',
    },
    secondary: {
        backgroundColor: '#f5f5f5',
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#6d0b24',
    },
    disabled: {
        opacity: 0.5,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
    primaryText: {
        color: '#fff',
    },
    secondaryText: {
        color: '#333',
    },
    outlineText: {
        color: '#6d0b24',
    },
    disabledText: {
        color: '#999',
    },
});
