import React from 'react';
import { TouchableOpacity, View, Text, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { Icon } from './Icon';
import { Colors } from '../constants/colors';
import { BoxShadows } from '../constants/shadows';

interface LoadMoreButtonProps {
  loading?: boolean;
  expanded: boolean;
  onToggle: () => void;
}

export function LoadMoreButton({ loading, expanded, onToggle }: LoadMoreButtonProps) {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.button}
        onPress={onToggle}
        activeOpacity={0.7}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#64748B" />
        ) : (
          <>
            <Feather
              name={expanded ? 'chevron-up' : 'chevron-down'}
              size={18}
              color="#64748B"
            />
            <Text style={styles.text}>
              {expanded ? 'Show Less' : 'Load More'}
            </Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 8,
    paddingBottom: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 16,
    ...Platform.select({ web: { boxShadow: BoxShadows.card } }) || {
      shadowColor: '#4F46E5',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 20,
      elevation: 4,
    },
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.muted,
  },
});
