import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CustomButton } from '@/components/CustomButton';
import { CustomInput } from '@/components/CustomInput';
import { Header } from '@/components/Header';
import { ThemedView } from '@/components/ThemedView';

interface Category {
    id: string;
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
}

const categories: Category[] = [
    { id: '1', title: 'Food', icon: 'restaurant' },
    { id: '2', title: 'Transport', icon: 'car' },
    { id: '3', title: 'Health', icon: 'medical' },
    { id: '4', title: 'Shopping', icon: 'bag' },
    { id: '5', title: 'Entertainment', icon: 'game-controller' },
    { id: '6', title: 'Bills', icon: 'receipt' },
    { id: '7', title: 'Gas', icon: 'car-sport' },
    { id: '8', title: 'Other', icon: 'ellipsis-horizontal' },
];

const quickPickAmounts = ['Rp 10.000', 'Rp 50.000', 'Rp 100.000', 'Rp 200.000'];

export default function AddScreen() {
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [date, setDate] = useState<Date>(new Date());
    const [showDateModal, setShowDateModal] = useState<boolean>(false);

    const handleCategorySelect = (categoryId: string) => {
        setSelectedCategory(categoryId);
    };

    const handleQuickPick = (quickAmount: string) => {
        setAmount(quickAmount.replace('Rp ', '').replace('.', ''));
    };

    const handleAddExpense = () => {
        // Handle add expense logic here
        console.log('Add expense:', { selectedCategory, amount, date });
    };

    const showDatePickerModal = () => {
        setShowDateModal(true);
    };

    const hideDatePickerModal = () => {
        setShowDateModal(false);
    };

    const selectDate = (selectedDate: Date) => {
        setDate(selectedDate);
        setShowDateModal(false);
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const generateDateOptions = () => {
        const dates = [];
        const today = new Date();

        // Generate last 30 days and next 30 days
        for (let i = -30; i <= 30; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dates.push(date);
        }

        return dates;
    };

    const generateMonthCalendar = () => {
        const currentMonth = date.getMonth();
        const currentYear = date.getFullYear();
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const calendar = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            calendar.push(null);
        }

        // Add all days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            calendar.push(new Date(currentYear, currentMonth, day));
        }

        return calendar;
    };

    const navigateMonth = (direction: 'prev' | 'next') => {
        const newDate = new Date(date);
        if (direction === 'prev') {
            newDate.setMonth(newDate.getMonth() - 1);
        } else {
            newDate.setMonth(newDate.getMonth() + 1);
        }
        setDate(new Date(newDate.getFullYear(), newDate.getMonth(), 1));
    };

    const getMonthYearString = () => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
        });
    };

    return (
        <ThemedView style={styles.container} lightColor="#f8f9fa" darkColor="#f8f9fa">
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <Header title="Add Expense" showProfile={false} />
                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    {/* Select Category Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Select Category</Text>
                        <View style={styles.categoriesContainer}>
                            {/* Row 1 */}
                            <View style={styles.categoryRow}>
                                <TouchableOpacity
                                    style={[
                                        styles.categoryCard,
                                        selectedCategory === categories[0].id && styles.categoryCardSelected,
                                    ]}
                                    onPress={() => handleCategorySelect(categories[0].id)}
                                >
                                    <Ionicons
                                        name={categories[0].icon}
                                        size={24}
                                        color="#fff"
                                        style={styles.categoryIcon}
                                    />
                                    <Text style={styles.categoryTitle}>{categories[0].title}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.categoryCard,
                                        selectedCategory === categories[1].id && styles.categoryCardSelected,
                                    ]}
                                    onPress={() => handleCategorySelect(categories[1].id)}
                                >
                                    <Ionicons
                                        name={categories[1].icon}
                                        size={24}
                                        color="#fff"
                                        style={styles.categoryIcon}
                                    />
                                    <Text style={styles.categoryTitle}>{categories[1].title}</Text>
                                </TouchableOpacity>
                            </View>
                            {/* Row 2 */}
                            <View style={styles.categoryRow}>
                                <TouchableOpacity
                                    style={[
                                        styles.categoryCard,
                                        selectedCategory === categories[2].id && styles.categoryCardSelected,
                                    ]}
                                    onPress={() => handleCategorySelect(categories[2].id)}
                                >
                                    <Ionicons
                                        name={categories[2].icon}
                                        size={24}
                                        color="#fff"
                                        style={styles.categoryIcon}
                                    />
                                    <Text style={styles.categoryTitle}>{categories[2].title}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.categoryCard,
                                        selectedCategory === categories[3].id && styles.categoryCardSelected,
                                    ]}
                                    onPress={() => handleCategorySelect(categories[3].id)}
                                >
                                    <Ionicons
                                        name={categories[3].icon}
                                        size={24}
                                        color="#fff"
                                        style={styles.categoryIcon}
                                    />
                                    <Text style={styles.categoryTitle}>{categories[3].title}</Text>
                                </TouchableOpacity>
                            </View>
                            {/* Row 3 */}
                            <View style={styles.categoryRow}>
                                <TouchableOpacity
                                    style={[
                                        styles.categoryCard,
                                        selectedCategory === categories[4].id && styles.categoryCardSelected,
                                    ]}
                                    onPress={() => handleCategorySelect(categories[4].id)}
                                >
                                    <Ionicons
                                        name={categories[4].icon}
                                        size={24}
                                        color="#fff"
                                        style={styles.categoryIcon}
                                    />
                                    <Text style={styles.categoryTitle}>{categories[4].title}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.categoryCard,
                                        selectedCategory === categories[5].id && styles.categoryCardSelected,
                                    ]}
                                    onPress={() => handleCategorySelect(categories[5].id)}
                                >
                                    <Ionicons
                                        name={categories[5].icon}
                                        size={24}
                                        color="#fff"
                                        style={styles.categoryIcon}
                                    />
                                    <Text style={styles.categoryTitle}>{categories[5].title}</Text>
                                </TouchableOpacity>
                            </View>
                            {/* Row 4 */}
                            <View style={styles.categoryRow}>
                                <TouchableOpacity
                                    style={[
                                        styles.categoryCard,
                                        selectedCategory === categories[6].id && styles.categoryCardSelected,
                                    ]}
                                    onPress={() => handleCategorySelect(categories[6].id)}
                                >
                                    <Ionicons
                                        name={categories[6].icon}
                                        size={24}
                                        color="#fff"
                                        style={styles.categoryIcon}
                                    />
                                    <Text style={styles.categoryTitle}>{categories[6].title}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.categoryCard,
                                        selectedCategory === categories[7].id && styles.categoryCardSelected,
                                    ]}
                                    onPress={() => handleCategorySelect(categories[7].id)}
                                >
                                    <Ionicons
                                        name={categories[7].icon}
                                        size={24}
                                        color="#fff"
                                        style={styles.categoryIcon}
                                    />
                                    <Text style={styles.categoryTitle}>{categories[7].title}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Amount Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Amount</Text>
                        <CustomInput
                            placeholder="Rp 0"
                            value={amount}
                            onChangeText={setAmount}
                            keyboardType="numeric"
                        />

                        <Text style={styles.quickPickLabel}>Quick Pick</Text>
                        <View style={styles.quickPickGrid}>
                            {quickPickAmounts.map((quickAmount, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.quickPickButton}
                                    onPress={() => handleQuickPick(quickAmount)}
                                >
                                    <Text style={styles.quickPickText}>{quickAmount}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Date Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Date</Text>
                        <TouchableOpacity style={styles.dateInput} onPress={showDatePickerModal}>
                            <Ionicons name="calendar" size={20} color="#666" />
                            <Text style={styles.dateText}>{formatDate(date)}</Text>
                            <Ionicons name="chevron-down" size={16} color="#666" />
                        </TouchableOpacity>
                    </View>

                    {/* Add Expense Button */}
                    <View style={styles.buttonContainer}>
                        <CustomButton
                            title="Add Expense"
                            onPress={handleAddExpense}
                            variant="primary"
                            size="large"
                        />
                    </View>
                </ScrollView>

                {/* Date Picker Modal */}
                <Modal
                    visible={showDateModal}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={hideDatePickerModal}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Select Date</Text>
                                <TouchableOpacity onPress={hideDatePickerModal}>
                                    <Ionicons name="close" size={24} color="#333" />
                                </TouchableOpacity>
                            </View>

                            {/* Calendar Navigation */}
                            <View style={styles.calendarHeader}>
                                <TouchableOpacity onPress={() => navigateMonth('prev')}>
                                    <Ionicons name="chevron-back" size={24} color="#6d0b24" />
                                </TouchableOpacity>
                                <Text style={styles.monthYearText}>{getMonthYearString()}</Text>
                                <TouchableOpacity onPress={() => navigateMonth('next')}>
                                    <Ionicons name="chevron-forward" size={24} color="#6d0b24" />
                                </TouchableOpacity>
                            </View>

                            {/* Days of Week Header */}
                            <View style={styles.daysHeader}>
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                    <Text key={day} style={styles.dayHeaderText}>{day}</Text>
                                ))}
                            </View>

                            {/* Calendar Grid */}
                            <View style={styles.calendarGrid}>
                                {generateMonthCalendar().map((day, index) => {
                                    if (!day) {
                                        return <View key={index} style={styles.emptyDay} />;
                                    }

                                    const isSelected = day.toDateString() === date.toDateString();
                                    const isToday = day.toDateString() === new Date().toDateString();

                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            style={[
                                                styles.dayButton,
                                                isSelected && styles.dayButtonSelected,
                                                isToday && styles.dayButtonToday,
                                            ]}
                                            onPress={() => selectDate(day)}
                                        >
                                            <Text style={[
                                                styles.dayText,
                                                isSelected && styles.dayTextSelected,
                                                isToday && !isSelected && styles.dayTextToday,
                                            ]}>
                                                {day.getDate()}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>

                            {/* Quick Date Options */}
                            <View style={styles.quickDateSection}>
                                <Text style={styles.quickDateTitle}>Quick Select</Text>
                                <View style={styles.quickDateGrid}>
                                    <TouchableOpacity
                                        style={styles.quickDateButton}
                                        onPress={() => selectDate(new Date())}
                                    >
                                        <Text style={styles.quickDateText}>Today</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.quickDateButton}
                                        onPress={() => {
                                            const tomorrow = new Date();
                                            tomorrow.setDate(tomorrow.getDate() + 1);
                                            selectDate(tomorrow);
                                        }}
                                    >
                                        <Text style={styles.quickDateText}>Tomorrow</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.quickDateButton}
                                        onPress={() => {
                                            const yesterday = new Date();
                                            yesterday.setDate(yesterday.getDate() - 1);
                                            selectDate(yesterday);
                                        }}
                                    >
                                        <Text style={styles.quickDateText}>Yesterday</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
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
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 16,
    },
    categoriesContainer: {
        gap: 8,
    },
    categoryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        gap: 8,
    },
    categoryCard: {
        backgroundColor: '#6d0b24',
        borderRadius: 12,
        padding: 16,
        flex: 1,
        minHeight: 90,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    categoryCardSelected: {
        backgroundColor: '#6d0b24',
        transform: [{ scale: 0.95 }],
    },
    categoryIcon: {
        marginBottom: 4,
    },
    categoryTitle: {
        fontSize: 12,
        fontWeight: '500',
        color: '#fff',
        textAlign: 'center',
    },
    quickPickLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginTop: 16,
        marginBottom: 12,
    },
    quickPickGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    quickPickButton: {
        backgroundColor: '#666',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 10,
        flex: 1,
        minWidth: '47%',
    },
    quickPickText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
    },
    dateInput: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        gap: 12,
    },
    dateText: {
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    buttonContainer: {
        marginTop: 32,
        marginBottom: 30,
    },
    // Modal styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '80%',
        paddingBottom: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    // Calendar styles
    calendarHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    monthYearText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    daysHeader: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    dayHeaderText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 12,
        fontWeight: '500',
        color: '#666',
    },
    calendarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 20,
    },
    emptyDay: {
        width: '14.28%',
        height: 40,
    },
    dayButton: {
        width: '14.28%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginVertical: 2,
    },
    dayButtonSelected: {
        backgroundColor: '#6d0b24',
    },
    dayButtonToday: {
        backgroundColor: '#f0f0f0',
    },
    dayText: {
        fontSize: 16,
        color: '#333',
    },
    dayTextSelected: {
        color: '#fff',
        fontWeight: '600',
    },
    dayTextToday: {
        color: '#6d0b24',
        fontWeight: '600',
    },
    // Quick Date Section
    quickDateSection: {
        paddingHorizontal: 20,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        marginTop: 20,
    },
    quickDateTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
    },
    quickDateGrid: {
        flexDirection: 'row',
        gap: 12,
    },
    quickDateButton: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    quickDateText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#666',
    },
});
