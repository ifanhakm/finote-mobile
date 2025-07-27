import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BudgetCard } from '@/components/BudgetCard';
import { CategoryCard } from '@/components/CategoryCard';
import { Header } from '@/components/Header';
import { SectionHeader } from '@/components/SectionHeader';
import { ThemedView } from '@/components/ThemedView';
import { TransactionItem } from '@/components/TransactionItem';

export default function HomeScreen() {
  const handleProfilePress = () => {
    console.log('Profile pressed');
  };

  const handleAddCategory = () => {
    console.log('Add category pressed');
  };

  const handleViewAllTransactions = () => {
    console.log('View all transactions pressed');
  };

  const handleCategoryPress = (category: string) => {
    console.log(`${category} category pressed`);
  };

  const handleTransactionPress = (transaction: string) => {
    console.log(`${transaction} transaction pressed`);
  };

  return (
    <ThemedView style={styles.container} lightColor="#f8f9fa" darkColor="#f8f9fa">
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <Header
          title="FINOTE"
          showProfile={true}
          onProfilePress={handleProfilePress}
        />

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Budget Card */}
          <BudgetCard
            title="Monthly Budget"
            amount="Rp 2,500,000"
            spent="Rp 1,225,000 spent"
            statusTitle="Status"
            status="Normal"
            percentage={49}
            remaining="Rp 1,275,000"
            dailyAvg="Rp 40,830"
          />

          {/* Categories Section */}
          <SectionHeader
            title="Categories"
            actionText="Add New"
            onActionPress={handleAddCategory}
          />

          <View style={styles.categoriesGrid}>
            <CategoryCard
              title="Food"
              amount="Rp 450,000"
              icon="restaurant"
              color="#6d0b24"
              onPress={() => handleCategoryPress('Food')}
            />
            <CategoryCard
              title="Transport"
              amount="Rp 320,000"
              icon="car"
              color="#6d0b24"
              onPress={() => handleCategoryPress('Transport')}
            />
            <CategoryCard
              title="Health"
              amount="Rp 180,000"
              icon="medical"
              color="#6d0b24"
              onPress={() => handleCategoryPress('Health')}
            />
            <CategoryCard
              title="Shopping"
              amount="Rp 275,000"
              icon="bag"
              color="#6d0b24"
              onPress={() => handleCategoryPress('Shopping')}
            />
          </View>

          {/* Recent Transactions */}
          <SectionHeader
            title="Recent"
            actionText="View All"
            onActionPress={handleViewAllTransactions}
          />

          <View style={styles.transactionsContainer}>
            <TransactionItem
              title="Lunch at cafe"
              subtitle="Dec 01, 09:14"
              amount="-Rp 25,000"
              icon="restaurant"
              iconColor="#6d0b24"
              onPress={() => handleTransactionPress('Lunch at cafe')}
            />
            <TransactionItem
              title="Groceries"
              subtitle="Nov 30, 18:22"
              amount="-Rp 85,000"
              icon="basket"
              iconColor="#4ECDC4"
              onPress={() => handleTransactionPress('Groceries')}
            />
            <TransactionItem
              title="Pharmacy"
              subtitle="Nov 29, 14:30"
              amount="-Rp 45,000"
              icon="medical"
              iconColor="#45B7D1"
              onPress={() => handleTransactionPress('Pharmacy')}
            />
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: -6,
    marginBottom: 24,
  },
  transactionsContainer: {
    marginBottom: 20,
  },
  veryEconomical: {
    fontWeight: 'bold',
    color: 'black',
    marginTop: 8,
  },
});
