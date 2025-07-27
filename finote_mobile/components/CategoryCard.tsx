import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CategoryCardProps {
    title: string;
    amount: string;
    icon: keyof typeof Ionicons.glyphMap;
    color: string;
    onPress?: () => void;
}

export function CategoryCard({
    title,
    amount,
    icon,
    color,
    onPress,
}: CategoryCardProps) {
    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: color }]} onPress={onPress}>
            <View style={styles.iconContainer}>
                <Ionicons name={icon} size={24} color="#fff" />
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.amount}>{amount}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        padding: 16,
        margin: 6,
        minHeight: 110,
        width: '45%',
        justifyContent: 'space-between',
    },
    iconContainer: {
        alignSelf: 'flex-start',
        marginBottom: 12,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 4,
    },
    amount: {
        fontSize: 12,
        color: '#fff',
        opacity: 0.9,
    },
});
