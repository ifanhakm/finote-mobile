import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Header } from '@/components/Header';
import { ThemedView } from '@/components/ThemedView';

interface InsightItem {
    id: string;
    icon: keyof typeof Ionicons.glyphMap;
    iconColor: string;
    title: string;
    description: string;
    savings: string;
}

interface SpendingCategory {
    name: string;
    amount: string;
    percentage: number;
    color: string;
}

interface PerformanceMetric {
    title: string;
    percentage: number;
    color: string;
}

const insights: InsightItem[] = [
    {
        id: '1',
        icon: 'restaurant',
        iconColor: '#FF6B6B',
        title: 'Optimize Food Budget',
        description: 'Food spending is 31% of your budget. Here\'s how to save:',
        savings: 'Rp 150,000/month',
    },
    {
        id: '2',
        icon: 'wallet',
        iconColor: '#4ECDC4',
        title: 'Budget Pacing',
        description: 'You\'ve spent 65% in first 2 weeks of month. Consider slowing down.',
        savings: 'Rp 200,000/month',
    },
    {
        id: '3',
        icon: 'car',
        iconColor: '#45B7D1',
        title: 'Transport Alert',
        description: 'Transport costs increased 15% this month. Consider alternatives.',
        savings: 'Rp 50,000/month',
    },
    {
        id: '4',
        icon: 'trending-up',
        iconColor: '#96CEB4',
        title: 'Spending Pattern',
        description: 'You typically spend most on weekends. Plan ahead to save.',
        savings: 'Rp 75,000/month',
    },
];

const monthlyData = {
    thisMonth: 'Rp 2,500,000',
    lastMonth: 'Rp 1,275,000',
    budgetUsed: 'Rp 50,830',
};

const spendingBreakdown: SpendingCategory[] = [
    { name: 'Food', amount: 'Rp 450,000', percentage: 31, color: '#FF6B6B' },
    { name: 'Transport', amount: 'Rp 325,000', percentage: 22, color: '#4ECDC4' },
    { name: 'Shopping', amount: 'Rp 275,000', percentage: 19, color: '#45B7D1' },
    { name: 'Health', amount: 'Rp 185,000', percentage: 13, color: '#96CEB4' },
];

const performanceMetrics: PerformanceMetric[] = [
    { title: 'Budget Adherence', percentage: 85, color: '#4ECDC4' },
    { title: 'Spending Consistency', percentage: 72, color: '#FF6B6B' },
    { title: 'Overall Score 85%', percentage: 85, color: '#96CEB4' },
];

export default function StatsScreen() {
    const formatCurrency = (amount: string) => {
        return amount;
    };

    const renderInsightCard = (insight: InsightItem) => (
        <View key={insight.id} style={styles.insightCard}>
            <View style={[styles.insightIcon, { backgroundColor: insight.iconColor }]}>
                <Ionicons name={insight.icon} size={20} color="#fff" />
            </View>
            <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>{insight.title}</Text>
                <Text style={styles.insightDescription}>{insight.description}</Text>
                <Text style={styles.insightSavings}>Potential savings: {insight.savings}</Text>
            </View>
        </View>
    );

    const renderSpendingCategory = (category: SpendingCategory) => (
        <View key={category.name} style={styles.categoryRow}>
            <View style={styles.categoryInfo}>
                <View style={[styles.categoryDot, { backgroundColor: category.color }]} />
                <Text style={styles.categoryName}>{category.name}</Text>
            </View>
            <Text style={styles.categoryAmount}>{category.amount}</Text>
        </View>
    );

    const renderPerformanceMetric = (metric: PerformanceMetric) => (
        <View key={metric.title} style={styles.metricRow}>
            <Text style={styles.metricTitle}>{metric.title}</Text>
            <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                    <View
                        style={[
                            styles.progressFill,
                            { width: `${metric.percentage}%`, backgroundColor: metric.color }
                        ]}
                    />
                </View>
                <Text style={styles.progressText}>{metric.percentage}%</Text>
            </View>
        </View>
    );

    return (
        <ThemedView style={styles.container} lightColor="#f8f9fa" darkColor="#f8f9fa">
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <Header title="Statistics" showProfile={false} />

                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    {/* Smart Spending Insights */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Smart Spending Insights</Text>
                            <TouchableOpacity style={styles.viewAllButton}>
                                <Text style={styles.viewAllText}>See All</Text>
                            </TouchableOpacity>
                        </View>
                        {insights.map(renderInsightCard)}
                    </View>

                    {/* Monthly Stats */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Monthly Stats</Text>
                            <TouchableOpacity style={styles.viewAllButton}>
                                <Text style={styles.viewAllText}>See All</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.monthlyCard}>
                            <View style={styles.monthlyRow}>
                                <View style={styles.monthlyItem}>
                                    <Text style={styles.monthlyLabel}>This Month</Text>
                                    <Text style={styles.monthlyAmount}>{monthlyData.thisMonth}</Text>
                                </View>
                                <View style={styles.monthlyItem}>
                                    <Text style={styles.monthlyLabel}>Last Month</Text>
                                    <Text style={styles.monthlyAmount}>{monthlyData.lastMonth}</Text>
                                </View>
                            </View>
                            <View style={styles.budgetUsedRow}>
                                <Text style={styles.budgetLabel}>Budget Used</Text>
                                <Text style={styles.budgetAmount}>{monthlyData.budgetUsed}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Spending Breakdown */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Spending Breakdown</Text>
                        <View style={styles.breakdownCard}>
                            {spendingBreakdown.map(renderSpendingCategory)}
                        </View>
                    </View>

                    {/* Performance Metrics */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Performance Metrics</Text>
                        <View style={styles.metricsCard}>
                            {performanceMetrics.map(renderPerformanceMetric)}
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
    // Section Styles
    section: {
        marginBottom: 24,
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
    viewAllButton: {
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    viewAllText: {
        fontSize: 14,
        color: '#6d0b24',
        fontWeight: '500',
    },
    // Insight Card Styles
    insightCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    insightIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    insightContent: {
        flex: 1,
    },
    insightTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    insightDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 6,
        lineHeight: 20,
    },
    insightSavings: {
        fontSize: 12,
        color: '#6d0b24',
        fontWeight: '500',
    },
    // Monthly Stats Styles
    monthlyCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    monthlyRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    monthlyItem: {
        flex: 1,
        alignItems: 'center',
    },
    monthlyLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    monthlyAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    budgetUsedRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    budgetLabel: {
        fontSize: 14,
        color: '#666',
    },
    budgetAmount: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    // Spending Breakdown Styles
    breakdownCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    categoryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    categoryInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    categoryDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 12,
    },
    categoryName: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    categoryAmount: {
        fontSize: 16,
        color: '#333',
        fontWeight: '600',
    },
    // Performance Metrics Styles
    metricsCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        marginBottom: 24,
    },
    metricRow: {
        marginBottom: 16,
    },
    metricTitle: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
        marginBottom: 8,
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,

    },
    progressBar: {
        flex: 1,
        height: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 4,
    },
    progressText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '600',
        minWidth: 35,
    },
});
