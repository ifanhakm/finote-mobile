import { StyleSheet, Text, View } from 'react-native';

interface BudgetCardProps {
    title: string;
    amount: string;
    spent: string;
    statusTitle?: string;
    status: string;
    percentage: number;
    dailyAvg?: string;
    remaining?: string;
}

export function BudgetCard({
    title,
    amount,
    spent,
    statusTitle,
    status,
    percentage,
    dailyAvg,
    remaining,
}: BudgetCardProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.amount}>{amount}</Text>
            <Text style={styles.spent}>{spent}</Text>
            {statusTitle ? <Text style={styles.statusTitle}>{statusTitle}</Text> : null}
            {status ? <Text style={styles.status}>{status}</Text> : null}

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
                <Text style={styles.usageLabel}>Budget Usage</Text>
                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${percentage}%` }]} />
                </View>
                <Text style={styles.percentage}>{percentage}%</Text>
            </View>

            {/* Bottom Info */}
            <View style={styles.bottomInfo}>
                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Remaining</Text>
                    <Text style={styles.infoValue}>{remaining}</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Daily Avg</Text>
                    <Text style={styles.infoValue}>{dailyAvg}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    amount: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    spent: {
        fontSize: 14,
        color: '#666',
        marginBottom: 15,
    },
    statusTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 0,
    },
    status: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#76B041',
        marginBottom: 15,
    },
    progressContainer: {
        marginBottom: 16,
    },
    usageLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    progressBar: {
        height: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 8,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#6d0b24',
        borderRadius: 4,
    },
    percentage: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6d0b24',
        textAlign: 'right',
    },
    bottomInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    infoItem: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
});
