import React from 'react';
import { TouchableOpacity, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

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
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
});
