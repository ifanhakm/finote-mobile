import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface HeaderProps {
    title: string;
    showProfile?: boolean;
    onProfilePress?: () => void;
}

export function Header({
    title,
    showProfile = true,
    onProfilePress,
}: HeaderProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {showProfile && (
                <TouchableOpacity style={styles.profileButton} onPress={onProfilePress}>
                    <Ionicons name="person-circle-outline" size={32} color="#6d0b24" />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    profileButton: {
        padding: 4,
    },
});
