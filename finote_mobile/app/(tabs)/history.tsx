import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Header } from '@/components/Header';
import { ThemedView } from '@/components/ThemedView';
import { TransactionItem } from '@/components/TransactionItem';

interface Transaction {
    id: string;
    title: string;
    date: string;
    amount: string;
    category: string;
    icon: keyof typeof Ionicons.glyphMap;
    iconColor: string;
}

const categories = ['All', 'Food', 'Transport', 'Shopping', 'Health'];

const sampleTransactions: Transaction[] = [
    {
        id: '1',
        title: 'Lunch at cafe',
        date: '2024-01-18',
        amount: '-Rp 25,000',
        category: 'Food',
        icon: 'restaurant',
        iconColor: '#FF6B6B',
    },
    {
        id: '2',
        title: 'Bus fare',
        date: '2024-01-18',
        amount: '-Rp 15,000',
        category: 'Transport',
        icon: 'bus',
        iconColor: '#4ECDC4',
    },
    {
        id: '3',
        title: 'Groceries',
        date: '2024-01-17',
        amount: '-Rp 85,000',
        category: 'Shopping',
        icon: 'bag',
        iconColor: '#45B7D1',
    },
    {
        id: '4',
        title: 'Pharmacy',
        date: '2024-01-17',
        amount: '-Rp 45,000',
        category: 'Health',
        icon: 'medical',
        iconColor: '#96CEB4',
    },
    {
        id: '5',
        title: 'Coffee shop',
        date: '2024-01-16',
        amount: '-Rp 8,500',
        category: 'Food',
        icon: 'cafe',
        iconColor: '#FF6B6B',
    },
    {
        id: '6',
        title: 'Metro card',
        date: '2024-01-16',
        amount: '-Rp 50,000',
        category: 'Transport',
        icon: 'card',
        iconColor: '#4ECDC4',
    },
    {
        id: '7',
        title: 'Doctor visit',
        date: '2024-01-15',
        amount: '-Rp 80,000',
        category: 'Health',
        icon: 'medical',
        iconColor: '#96CEB4',
    },
    {
        id: '8',
        title: 'Restaurant dinner',
        date: '2024-01-15',
        amount: '-Rp 95,000',
        category: 'Food',
        icon: 'restaurant',
        iconColor: '#FF6B6B',
    },
    {
        id: '9',
        title: 'Taxi ride',
        date: '2024-01-14',
        amount: '-Rp 22,000',
        category: 'Transport',
        icon: 'car',
        iconColor: '#4ECDC4',
    },
    {
        id: '10',
        title: 'Clothing store',
        date: '2024-01-14',
        amount: '-Rp 95,000',
        category: 'Shopping',
        icon: 'shirt',
        iconColor: '#45B7D1',
    },
    {
        id: '11',
        title: 'Vitamins',
        date: '2024-01-13',
        amount: '-Rp 35,000',
        category: 'Health',
        icon: 'fitness',
        iconColor: '#96CEB4',
    },
];

export default function HistoryScreen() {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredTransactions = selectedCategory === 'All'
        ? sampleTransactions
        : sampleTransactions.filter(transaction => transaction.category === selectedCategory);

    const totalSpent = sampleTransactions.reduce((total, transaction) => {
        const amount = parseInt(transaction.amount.replace(/[^\d]/g, ''));
        return total + amount;
    }, 0);

    const formatCurrency = (amount: number) => {
        return `Rp ${amount.toLocaleString('id-ID')}`;
    };

    return (
        <ThemedView style={styles.container} lightColor="#f8f9fa" darkColor="#f8f9fa">
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <Header title="Transaction History" showProfile={true} />

                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    {/* Filter Categories */}
                    <View style={styles.filterContainer}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScrollView}>
                            {categories.map((category) => (
                                <TouchableOpacity
                                    key={category}
                                    style={[
                                        styles.filterButton,
                                        selectedCategory === category && styles.filterButtonActive,
                                    ]}
                                    onPress={() => setSelectedCategory(category)}
                                >
                                    <Text style={[
                                        styles.filterText,
                                        selectedCategory === category && styles.filterTextActive,
                                    ]}>
                                        {category}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Total Spent Card */}
                    <View style={styles.totalCard}>
                        <Text style={styles.totalLabel}>Total Spent</Text>
                        <Text style={styles.totalAmount}>{formatCurrency(totalSpent)}</Text>
                    </View>

                    {/* Transactions List */}
                    <View style={styles.transactionsSection}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>All Transactions</Text>
                            <Text style={styles.itemCount}>{filteredTransactions.length} Items</Text>
                        </View>

                        <View style={styles.transactionsList}>
                            {filteredTransactions.map((transaction) => (
                                <TransactionItem
                                    key={transaction.id}
                                    title={transaction.title}
                                    subtitle={transaction.date}
                                    amount={transaction.amount}
                                    icon={transaction.icon}
                                    iconColor={transaction.iconColor}
                                    onPress={() => console.log('Transaction pressed:', transaction.id)}
                                />
                            ))}
                        </View>
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
    content: {
        flex: 1,
        padding: 20,
    },
    // Filter Section
    filterContainer: {
        marginBottom: 20,
    },
    filterScrollView: {
        paddingHorizontal: 4,
    },
    filterButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginHorizontal: 4,
        borderRadius: 20,
        backgroundColor: '#e0e0e0',
        minWidth: 60,
        alignItems: 'center',
    },
    filterButtonActive: {
        backgroundColor: '#6d0b24',
    },
    filterText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#666',
    },
    filterTextActive: {
        color: '#fff',
    },
    // Total Card
    totalCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    totalLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    totalAmount: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    // Transactions Section
    transactionsSection: {
        flex: 1,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    itemCount: {
        fontSize: 14,
        color: '#666',
    },
    transactionsList: {
        flex: 1,
        marginBottom: 30,
    },
});
