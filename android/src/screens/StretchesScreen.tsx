import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { stretchesData } from '../data/stretches';

const StretchesScreen: React.FC = () => {
  const [selectedStretch, setSelectedStretch] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timer, setTimer] = useState(0);

  const startExercise = (stretch: any) => {
    setSelectedStretch(stretch);
    setIsPlaying(true);
    setTimer(stretch.duration || 30);
  };

  const closeExercise = () => {
    setSelectedStretch(null);
    setIsPlaying(false);
    setTimer(0);
  };

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setIsPlaying(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timer]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Stretches & Exercises</Text>
          <Text style={styles.subtitle}>Shoulder-focused exercises to relieve tension</Text>
        </View>

        {stretchesData.map((stretch) => (
          <View key={stretch.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.icon}>{stretch.icon}</Text>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{stretch.name}</Text>
                <Text style={styles.difficulty}>{stretch.difficulty}</Text>
              </View>
            </View>
            <Text style={styles.description}>{stretch.description}</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.duration}>⏱️ {stretch.duration}s</Text>
              <Text style={styles.reps}>{stretch.repetitions}</Text>
            </View>
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => startExercise(stretch)}
            >
              <Text style={styles.startButtonText}>▶️ Start Exercise</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <Modal visible={!!selectedStretch} animationType="slide" transparent>
        {selectedStretch && (
          <View style={styles.modal}>
            <View style={styles.modalContent}>
              <Text style={styles.modalIcon}>{selectedStretch.icon}</Text>
              <Text style={styles.modalTitle}>{selectedStretch.name}</Text>
              <Text style={styles.modalDescription}>{selectedStretch.description}</Text>

              <View style={styles.timerContainer}>
                <Text style={styles.timerText}>{timer}s</Text>
                <Text style={styles.timerLabel}>Remaining</Text>
              </View>

              <View style={styles.instructionsBox}>
                <Text style={styles.instructionsTitle}>Instructions:</Text>
                {selectedStretch.instructions.map((instruction: string, index: number) => (
                  <Text key={index} style={styles.instructionItem}>
                    {index + 1}. {instruction}
                  </Text>
                ))}
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.playButton}
                  onPress={() => setIsPlaying(!isPlaying)}
                >
                  <Text style={styles.playButtonText}>
                    {isPlaying ? '⏸️ Pause' : '▶️ Resume'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeButton} onPress={closeExercise}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Modal>
    </View>
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
    marginBottom: 16,
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
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    fontSize: 48,
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  difficulty: {
    fontSize: 12,
    color: '#6366F1',
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  duration: {
    fontSize: 14,
    color: '#4B5563',
  },
  reps: {
    fontSize: 14,
    color: '#4B5563',
  },
  startButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 24,
    maxHeight: '90%',
  },
  modalIcon: {
    fontSize: 64,
    textAlign: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  timerText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#6366F1',
  },
  timerLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  instructionsBox: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  instructionItem: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 8,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  playButton: {
    flex: 1,
    backgroundColor: '#6366F1',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  playButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#4B5563',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default StretchesScreen;

