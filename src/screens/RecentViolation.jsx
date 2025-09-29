import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Card, Chip } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

export default function RecentViolation() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const violations = [
    {
      id: 1,
      type: 'No Helmet',
      location: 'Gate A',
      date: '2025-09-29',
      time: '14:30',
      worker: 'John Doe',
      status: 'pending',
    },
    {
      id: 2,
      type: 'No Helmet',
      location: 'Floor B',
      date: '2025-09-29',
      time: '13:15',
      worker: 'Jane Smith',
      status: 'resolved',
    },
    {
      id: 3,
      type: 'No Helmet',
      location: 'Warehouse',
      date: '2025-09-28',
      time: '16:45',
      worker: 'Mike Johnson',
      status: 'pending',
    },
    {
      id: 4,
      type: 'Safety Violation',
      location: 'Production',
      date: '2025-09-28',
      time: '11:20',
      worker: 'Sarah Wilson',
      status: 'resolved',
    },
  ];

  const stats = [
    { label: 'Today', value: '12', icon: 'calendar-today' },
    { label: 'This Week', value: '47', icon: 'calendar-week' },
    { label: 'Pending', value: '8', icon: 'clock-alert-outline' },
  ];

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'resolved', label: 'Resolved' },
  ];

  const getStatusColor = (status) => {
    return status === 'pending' ? '#FFA726' : '#66BB6A';
  };

  const filteredViolations = selectedFilter === 'all' 
    ? violations 
    : violations.filter(v => v.status === selectedFilter);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Violations</Text>
        <TouchableOpacity style={styles.exportButton}>
          <MaterialCommunityIcons name="download" size={20} color="#00D9FF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <MaterialCommunityIcons name={stat.icon} size={24} color="#00D9FF" />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Filters */}
        <View style={styles.filtersContainer}>
          {filters.map((filter) => (
            <Chip
              key={filter.key}
              selected={selectedFilter === filter.key}
              onPress={() => setSelectedFilter(filter.key)}
              style={[
                styles.filterChip,
                selectedFilter === filter.key && styles.filterChipSelected,
              ]}
              textStyle={[
                styles.filterText,
                selectedFilter === filter.key && styles.filterTextSelected,
              ]}
            >
              {filter.label}
            </Chip>
          ))}
        </View>

        {/* Violations List */}
        <Text style={styles.sectionTitle}>Recent Reports</Text>
        
        {filteredViolations.map((violation) => (
          <TouchableOpacity key={violation.id} activeOpacity={0.8}>
            <Card style={styles.violationCard}>
              <View style={styles.cardHeader}>
                <View style={styles.violationIcon}>
                  <MaterialCommunityIcons name="shield-alert" size={24} color="#FF3B5C" />
                </View>
                <View style={styles.violationMain}>
                  <Text style={styles.violationType}>{violation.type}</Text>
                  <Text style={styles.worker}>{violation.worker}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(violation.status)}30` }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(violation.status) }]}>
                    {violation.status}
                  </Text>
                </View>
              </View>

              <View style={styles.cardFooter}>
                <View style={styles.footerItem}>
                  <MaterialCommunityIcons name="map-marker" size={14} color="#888" />
                  <Text style={styles.footerText}>{violation.location}</Text>
                </View>
                <View style={styles.footerItem}>
                  <MaterialCommunityIcons name="calendar" size={14} color="#888" />
                  <Text style={styles.footerText}>{violation.date}</Text>
                </View>
                <View style={styles.footerItem}>
                  <MaterialCommunityIcons name="clock-outline" size={14} color="#888" />
                  <Text style={styles.footerText}>{violation.time}</Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        ))}

        <View style={styles.emptySpace} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFF',
    letterSpacing: 0.5,
  },
  exportButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 217, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#14141E',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 217, 255, 0.2)',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFF',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 11,
    color: '#888',
    marginTop: 4,
    textAlign: 'center',
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 8,
  },
  filterChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  filterChipSelected: {
    backgroundColor: '#00D9FF',
    borderColor: '#00D9FF',
  },
  filterText: {
    color: '#AAA',
    fontSize: 13,
    fontWeight: '600',
  },
  filterTextSelected: {
    color: '#000',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  violationCard: {
    backgroundColor: '#14141E',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    elevation: 0,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  violationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 59, 92, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  violationMain: {
    flex: 1,
  },
  violationType: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 4,
  },
  worker: {
    fontSize: 13,
    color: '#AAA',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  cardFooter: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    paddingTop: 12,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  footerText: {
    fontSize: 12,
    color: '#888',
    marginLeft: 4,
  },
  emptySpace: {
    height: 20,
  },
});