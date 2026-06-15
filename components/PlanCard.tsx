import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

interface PlanCardProps {
  name: string;
  price: number;
  features: string[];
  isActive: boolean;
  isCurrent?: boolean;
}

export function PlanCard({ name, price, features, isActive, isCurrent }: PlanCardProps) {
  return (
    <View style={[styles.card, isActive && styles.activeCard]}>
      {isActive && (
        <View style={styles.activeBadge}>
          <Text style={styles.activeBadgeText}>ACTIVE</Text>
        </View>
      )}

      <View style={[styles.header, isActive && { marginTop: 6 }]}>
        <View style={[styles.iconBox, { backgroundColor: isActive ? Colors['primary-light'] : Colors['slate-200'] }]}>
          <Feather
            name={isActive ? 'crown' : 'zap'}
            size={18}
            color={isActive ? Colors.primary : Colors.muted}
          />
        </View>
        {isCurrent && !isActive && (
          <View style={styles.currentBadge}>
            <Text style={styles.currentBadgeText}>Current</Text>
          </View>
        )}
      </View>

      <Text style={styles.name}>{name}</Text>
      <Text style={[styles.price, isActive && { color: Colors.primary }]}>
        RM{price}
        <Text style={styles.perMonth}>/mo</Text>
      </Text>

      <View style={styles.features}>
        {features.map((f, i) => (
          <View key={i} style={styles.featureRow}>
            <Feather name="check" size={14} color={Colors.accent} />
            <Text style={styles.featureText}>{f}</Text>
          </View>
        ))}
      </View>

      {isActive && (
        <View style={styles.currentPlanBtn}>
          <Feather name="crown" size={14} color="#FFF" />
          <Text style={styles.currentPlanBtnText}>Current Plan</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors['slate-200'],
    backgroundColor: '#F8FAFC',
    padding: 16,
    position: 'relative',
  },
  activeCard: {
    borderColor: Colors.primary,
    backgroundColor: '#EEF2FF80',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 4,
  },
  activeBadge: {
    position: 'absolute',
    top: -10,
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 999,
  },
  activeBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 0,
    marginBottom: 12,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: '#E2E8F0',
    borderRadius: 999,
  },
  currentBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.muted,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  price: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.text,
    marginTop: 4,
  },
  perMonth: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors['slate-400'],
  },
  features: {
    marginTop: 12,
    gap: 6,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  featureText: {
    fontSize: 12,
    color: Colors['slate-500'],
    flex: 1,
  },
  currentPlanBtn: {
    marginTop: 16,
    height: 36,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  currentPlanBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFF',
  },
});
