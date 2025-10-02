import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useStore } from '../hooks/useStore';

const AssessmentScreen: React.FC = () => {
  const { setStore } = useStore();
  const [painLevel, setPainLevel] = useState(0);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  const painAreas = [
    { id: 'neck', label: '🧍 Neck', emoji: '🧍' },
    { id: 'shoulders', label: '💪 Shoulders', emoji: '💪' },
    { id: 'upper-back', label: '🦴 Upper Back', emoji: '🦴' },
    { id: 'lower-back', label: '🔻 Lower Back', emoji: '🔻' },
    { id: 'wrists', label: '✋ Wrists', emoji: '✋' },
    { id: 'eyes', label: '👁️ Eyes', emoji: '👁️' },
  ];

  const toggleArea = (areaId: string) => {
    if (selectedAreas.includes(areaId)) {
      setSelectedAreas(selectedAreas.filter((id) => id !== areaId));
    } else {
      setSelectedAreas([...selectedAreas, areaId]);
    }
  };

  const handleSubmit = async () => {
    await setStore('currentPainLevel', painLevel);
    await setStore('painAreas', selectedAreas);
    await setStore('lastAssessment', Date.now());
    
    setPainLevel(0);
    setSelectedAreas([]);
    alert('Assessment saved! Check your tracking page to see progress over time.');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>📋 Pain Assessment</Text>
          <Text style={styles.subtitle}>Track your discomfort levels and problem areas</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Current Pain Level</Text>
          <Text style={styles.cardSubtitle}>
            Rate your overall discomfort (0 = none, 10 = severe)
          </Text>
          
          <View style={styles.painLevelContainer}>
            <Text style={styles.painLevelNumber}>{painLevel}</Text>
            <Text style={styles.painLevelLabel}>
              {painLevel === 0 && 'No Pain'}
              {painLevel > 0 && painLevel <= 3 && 'Mild'}
              {painLevel > 3 && painLevel <= 6 && 'Moderate'}
              {painLevel > 6 && painLevel <= 8 && 'Severe'}
              {painLevel > 8 && 'Very Severe'}
            </Text>
          </View>

          <View style={styles.painScale}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.painButton,
                  painLevel === level && styles.painButtonActive,
                  level > 6 && styles.painButtonHigh,
                  level > 3 && level <= 6 && styles.painButtonMedium,
                ]}
                onPress={() => setPainLevel(level)}
              >
                <Text
                  style={[
                    styles.painButtonText,
                    painLevel === level && styles.painButtonTextActive,
                  ]}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Problem Areas</Text>
          <Text style={styles.cardSubtitle}>Select all areas with discomfort</Text>
          
          <View style={styles.areaGrid}>
            {painAreas.map((area) => (
              <TouchableOpacity
                key={area.id}
                style={[
                  styles.areaButton,
                  selectedAreas.includes(area.id) && styles.areaButtonActive,
                ]}
                onPress={() => toggleArea(area.id)}
              >
                <Text style={styles.areaEmoji}>{area.emoji}</Text>
                <Text style={styles.areaLabel}>{area.label.replace(/[^\w\s]/g, '')}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.submitButton, (!painLevel && !selectedAreas.length) && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={!painLevel && !selectedAreas.length}
        >
          <Text style={styles.submitButtonText}>Save Assessment</Text>
        </TouchableOpacity>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>⚕️ When to Seek Medical Help</Text>
          <Text style={styles.infoText}>
            • Pain that persists despite rest and ergonomic improvements{'\n'}
            • Sudden severe pain or numbness{'\n'}
            • Pain that radiates down arms or legs{'\n'}
            • Weakness or loss of function{'\n'}
            • Pain accompanied by other symptoms
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },
  painLevelContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  painLevelNumber: {
    fontSize: 64,
    fontWeight: '700',
    color: '#6366F1',
  },
  painLevelLabel: {
    fontSize: 18,
    color: '#6B7280',
    marginTop: 8,
  },
  painScale: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  painButton: {
    width: '8%',
    aspectRatio: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  painButtonMedium: {
    backgroundColor: '#FEF3C7',
  },
  painButtonHigh: {
    backgroundColor: '#FEE2E2',
  },
  painButtonActive: {
    backgroundColor: '#6366F1',
  },
  painButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
  },
  painButtonTextActive: {
    color: '#FFF',
  },
  areaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  areaButton: {
    width: '48%',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  areaButtonActive: {
    backgroundColor: '#EEF2FF',
    borderColor: '#6366F1',
  },
  areaEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  areaLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  submitButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  submitButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#78350F',
    lineHeight: 22,
  },
});

export default AssessmentScreen;

