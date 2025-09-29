import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Badge, Avatar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function LiveAlerts() {
  const alerts = [
    {
      id: 1,
      type: 'No Helmet',
      location: 'Gate A - Entrance',
      time: '2 mins ago',
      severity: 'high',
      camera: 'CAM-01',
    },
    {
      id: 2,
      type: 'No Helmet',
      location: 'Production Floor B',
      time: '5 mins ago',
      severity: 'high',
      camera: 'CAM-04',
    },
    {
      id: 3,
      type: 'Suspicious Activity',
      location: 'Parking Lot',
      time: '12 mins ago',
      severity: 'medium',
      camera: 'CAM-08',
    },
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return '#FF3B5C';
      case 'medium':
        return '#FFA726';
      case 'low':
        return '#66BB6A';
      default:
        return '#00D9FF';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Live Alerts</Text>
        <Badge style={styles.badge}>3</Badge>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {alerts.map((alert) => (
          <TouchableOpacity key={alert.id} activeOpacity={0.8}>
            <Card style={styles.card}>
              <View style={styles.cardContent}>
                <View style={[styles.severityBar, { backgroundColor: getSeverityColor(alert.severity) }]} />
                
                <View style={styles.iconContainer}>
                  <Avatar.Icon 
                    size={48} 
                    icon="alert-circle" 
                    style={[styles.avatar, { backgroundColor: `${getSeverityColor(alert.severity)}30` }]}
                    color={getSeverityColor(alert.severity)}
                  />
                </View>

                <View style={styles.alertInfo}>
                  <Text style={styles.alertType}>{alert.type}</Text>
                  <View style={styles.locationRow}>
                    <MaterialCommunityIcons name="map-marker" size={14} color="#888" />
                    <Text style={styles.location}>{alert.location}</Text>
                  </View>
                  <View style={styles.metaRow}>
                    <View style={styles.metaItem}>
                      <MaterialCommunityIcons name="camera" size={12} color="#00D9FF" />
                      <Text style={styles.metaText}>{alert.camera}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <MaterialCommunityIcons name="clock-outline" size={12} color="#888" />
                      <Text style={styles.metaText}>{alert.time}</Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity style={styles.actionButton}>
                  <MaterialCommunityIcons name="chevron-right" size={24} color="#666" />
                </TouchableOpacity>
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
  badge: {
    backgroundColor: '#FF3B5C',
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#14141E',
    borderRadius: 16,
    marginBottom: 15,
    elevation: 0,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    position: 'relative',
  },
  severityBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  iconContainer: {
    marginLeft: 8,
    marginRight: 12,
  },
  avatar: {
    backgroundColor: 'rgba(255, 59, 92, 0.2)',
  },
  alertInfo: {
    flex: 1,
  },
  alertType: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  location: {
    fontSize: 13,
    color: '#AAA',
    marginLeft: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  metaText: {
    fontSize: 11,
    color: '#888',
    marginLeft: 4,
  },
  actionButton: {
    padding: 4,
  },
  emptySpace: {
    height: 20,
  },
});