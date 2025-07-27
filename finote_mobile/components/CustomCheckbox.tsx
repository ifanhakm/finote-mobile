import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CustomCheckboxProps {
    checked: boolean;
    onPress: () => void;
    label: string;
    size?: 'small' | 'medium' | 'large';
}

export function CustomCheckbox({
    checked,
    onPress,
    label,
    size = 'medium',
}: CustomCheckboxProps) {
    const getCheckboxSize = () => {
        switch (size) {
            case 'small':
                return 16;
            case 'large':
                return 24;
            default:
                return 20;
        }
    };

    const getIconSize = () => {
        switch (size) {
            case 'small':
                return 12;
            case 'large':
                return 18;
            default:
                return 14;
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={[
                styles.checkbox,
                { width: getCheckboxSize(), height: getCheckboxSize() },
                checked && styles.checkedBox
            ]}>
                {checked && (
                    <Ionicons
                        name="checkmark"
                        size={getIconSize()}
                        color="#fff"
                    />
                )}
            </View>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        flex: 1,
    },
    checkbox: {
        borderWidth: 2,
        borderColor: '#ddd',
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    checkedBox: {
        backgroundColor: '#6d0b24',
        borderColor: '#6d0b24',
    },
    label: {
        fontSize: 14,
        color: '#333',
        flex: 1,
        flexWrap: 'wrap',
    },
});
