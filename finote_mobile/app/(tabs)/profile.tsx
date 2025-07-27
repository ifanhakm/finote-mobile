import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CustomInput } from '@/components/CustomInput';
import { Header } from '@/components/Header';
import { ThemedView } from '@/components/ThemedView';

export default function ProfileScreen() {
    return (
        <ThemedView style={styles.container} lightColor="#f8f9fa" darkColor="#f8f9fa">
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <Header title="Profile" showProfile={false} />
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    {/* Profile Section */}
                    <View style={styles.profileSection}>
                        <View style={styles.avatarContainer}>
                            <View style={styles.avatar}>
                                <Ionicons name="person" size={40} color="#666" />
                            </View>
                        </View>
                        <Text style={styles.userName}>Ifan Surya</Text>
                        <Text style={styles.userEmail}>isuryaipemex.com</Text>
                    </View>

                    {/* Personal Information */}
                    <View style={styles.section}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Full Name</Text>
                            <View style={styles.inputContainer}>
                                <CustomInput
                                    placeholder="Ifan"
                                    value="Ifan"
                                    onChangeText={() => { }}
                                />
                                <TouchableOpacity style={styles.editButton}>
                                    <Text style={styles.editText}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email Address</Text>
                            <View style={styles.inputContainer}>
                                <CustomInput
                                    placeholder="isuryaipemex.com"
                                    value="isuryaipemex.com"
                                    onChangeText={() => { }}
                                />
                                <TouchableOpacity style={styles.editButton}>
                                    <Text style={styles.editText}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Employment Status</Text>
                            <View style={styles.inputContainer}>
                                <CustomInput
                                    placeholder="Unemployed"
                                    value="Unemployed"
                                    onChangeText={() => { }}
                                />
                                <TouchableOpacity style={styles.editButton}>
                                    <Text style={styles.editText}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Budget Settings */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Budget Settings</Text>

                        <View style={styles.settingItem}>
                            <Text style={styles.settingLabel}>Monthly Budget</Text>
                            <TouchableOpacity style={styles.settingAction}>
                                <Text style={styles.editText}>Edit</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.settingItem}>
                            <Text style={styles.settingLabel}>Expense Management</Text>
                            <TouchableOpacity style={styles.settingAction}>
                                <Text style={styles.settingSubtext}>Auto Spending</Text>
                                <Text style={styles.editText}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Log Out Button */}
                    <View style={styles.logoutSection}>
                        <TouchableOpacity style={styles.logoutButton} onPress={() => { }}>
                            <Text style={styles.logoutButtonText}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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
    scrollView: {
        flex: 1,
    },
    // Profile Section
    profileSection: {
        alignItems: 'center',
        paddingVertical: 32,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        marginBottom: 20,
    },
    avatarContainer: {
        marginBottom: 16,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userName: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: '#666',
    },
    // Section Styles
    section: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 12,
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 20,
    },
    // Input Group
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: '#333',
        marginBottom: 8,
        fontWeight: '500',
    },
    inputContainer: {
        position: 'relative',
    },
    editButton: {
        position: 'absolute',
        right: 16,
        top: '50%',
        transform: [{ translateY: -10 }],
    },
    editText: {
        fontSize: 14,
        color: '#6d0b24',
        fontWeight: '500',
    },
    // Setting Items
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    settingLabel: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    settingAction: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    settingSubtext: {
        fontSize: 14,
        color: '#666',
    },
    // Logout Section
    logoutSection: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    logoutButton: {
        backgroundColor: '#6d0b24',
        borderRadius: 12,
        paddingVertical: 16,
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
});
