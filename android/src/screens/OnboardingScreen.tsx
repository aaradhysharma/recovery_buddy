import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useStore } from '../hooks/useStore';

interface OnboardingScreenProps {
  onComplete: () => void;
}

interface FormData {
  hasShoulderPain: boolean;
  hasNeckPain: boolean;
  hasBackPain: boolean;
  hasCarpalTunnel: boolean;
  hasEyeStrain: boolean;
  hasHeadaches: boolean;
  hasWristPain: boolean;
  hasPoorCirculation: boolean;
  hasOther: string;
  hoursPerDay: string;
  breaksFrequency: string;
  monitorSetup: string;
  breakInterval: number;
  reminderStyle: string;
  enableCamera: boolean;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    hasShoulderPain: false,
    hasNeckPain: false,
    hasBackPain: false,
    hasCarpalTunnel: false,
    hasEyeStrain: false,
    hasHeadaches: false,
    hasWristPain: false,
    hasPoorCirculation: false,
    hasOther: '',
    hoursPerDay: '',
    breaksFrequency: '',
    monitorSetup: '',
    breakInterval: 30,
    reminderStyle: 'gentle',
    enableCamera: false,
  });
  const { setStore } = useStore();

  const healthIssues = [
    { id: 'hasShoulderPain' as keyof FormData, label: 'Shoulder Pain', desc: 'Tension or pain in shoulders' },
    { id: 'hasNeckPain' as keyof FormData, label: 'Neck Pain', desc: 'Stiffness or soreness in neck' },
    { id: 'hasBackPain' as keyof FormData, label: 'Back Pain', desc: 'Lower or upper back discomfort' },
    { id: 'hasCarpalTunnel' as keyof FormData, label: 'Carpal Tunnel', desc: 'Numbness, tingling in hands' },
    { id: 'hasEyeStrain' as keyof FormData, label: 'Eye Strain', desc: 'Tired, dry eyes' },
    { id: 'hasHeadaches' as keyof FormData, label: 'Tension Headaches', desc: 'Frequent headaches' },
  ];

  const handleNext = async () => {
    if (step === 2) {
      await setStore('userData', formData);
      await setStore('settings', {
        breakInterval: formData.breakInterval,
        hydrationInterval: 120,
        notifications: true,
        strictMode: formData.reminderStyle === 'strict',
        cameraEnabled: formData.enableCamera,
      });
      await setStore('lastBreakTime', Date.now());
      await setStore('lastHydrationTime', Date.now());
      onComplete();
    } else {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const canProceed = () => {
    if (step === 1) {
      return Object.keys(formData).some(
        (key) => key.startsWith('has') && formData[key as keyof FormData] === true
      ) || formData.hasOther;
    }
    if (step === 2) {
      return formData.hoursPerDay && formData.breaksFrequency;
    }
    return true;
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${((step + 1) / 3) * 100}%` }]} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.stepIndicator}>Step {step + 1} of 3</Text>

        {step === 0 && (
          <View>
            <Text style={styles.title}>Welcome to ErgoWellness</Text>
            <Text style={styles.subtitle}>Let's understand your desk work health</Text>
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>What we help with:</Text>
              <Text style={styles.infoItem}>• Posture correction</Text>
              <Text style={styles.infoItem}>• Carpal tunnel prevention</Text>
              <Text style={styles.infoItem}>• Eye strain relief</Text>
              <Text style={styles.infoItem}>• Back pain management</Text>
            </View>
          </View>
        )}

        {step === 1 && (
          <View>
            <Text style={styles.title}>What issues do you experience?</Text>
            <Text style={styles.subtitle}>Select all that apply</Text>
            {healthIssues.map((issue) => (
              <TouchableOpacity
                key={issue.id}
                style={[
                  styles.optionCard,
                  formData[issue.id] && styles.optionCardSelected,
                ]}
                onPress={() => setFormData({ ...formData, [issue.id]: !formData[issue.id] })}
              >
                <View style={styles.optionContent}>
                  <View>
                    <Text style={styles.optionLabel}>{issue.label}</Text>
                    <Text style={styles.optionDesc}>{issue.desc}</Text>
                  </View>
                  <View style={[styles.checkbox, formData[issue.id] && styles.checkboxSelected]}>
                    {formData[issue.id] && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
            <TextInput
              style={styles.textInput}
              placeholder="Other issues? (optional)"
              value={formData.hasOther}
              onChangeText={(text) => setFormData({ ...formData, hasOther: text })}
            />
          </View>
        )}

        {step === 2 && (
          <View>
            <Text style={styles.title}>Your Work Environment</Text>
            <Text style={styles.subtitle}>Help us understand your setup</Text>
            
            <Text style={styles.label}>Hours at desk per day</Text>
            <View style={styles.buttonGrid}>
              {['<2', '2-4', '4-6', '6-8', '8-10', '10+'].map((hours) => (
                <TouchableOpacity
                  key={hours}
                  style={[
                    styles.gridButton,
                    formData.hoursPerDay === hours && styles.gridButtonSelected,
                  ]}
                  onPress={() => setFormData({ ...formData, hoursPerDay: hours })}
                >
                  <Text style={styles.gridButtonText}>{hours}h</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Current break frequency</Text>
            {[
              { value: 'rare', label: 'Rarely (< once per hour)' },
              { value: 'hourly', label: 'Once per hour' },
              { value: 'halfhour', label: 'Every 30 minutes' },
            ].map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.optionCard,
                  formData.breaksFrequency === option.value && styles.optionCardSelected,
                ]}
                onPress={() => setFormData({ ...formData, breaksFrequency: option.value })}
              >
                <Text style={styles.optionLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      <View style={styles.navigation}>
        {step > 0 && (
          <TouchableOpacity style={styles.backButton} onPress={handlePrev}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.nextButton, !canProceed() && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={!canProceed()}
        >
          <Text style={styles.nextButtonText}>
            {step === 2 ? 'Start Using ErgoWellness' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
  },
  progressFill: {
    height: 4,
    backgroundColor: '#FB923C',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
  },
  stepIndicator: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  infoBox: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#111827',
  },
  infoItem: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 4,
  },
  optionCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    marginBottom: 12,
  },
  optionCardSelected: {
    borderColor: '#FB923C',
    backgroundColor: '#FFF7ED',
  },
  optionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  optionDesc: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#FB923C',
    borderColor: '#FB923C',
  },
  checkmark: {
    color: '#FFF',
    fontSize: 16,
  },
  textInput: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    fontSize: 16,
    marginTop: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 12,
    marginTop: 16,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  gridButton: {
    width: '30%',
    padding: 12,
    margin: '1.5%',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  gridButtonSelected: {
    borderColor: '#FB923C',
    backgroundColor: '#FFF7ED',
  },
  gridButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
  },
  nextButton: {
    flex: 1,
    marginLeft: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#FB923C',
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});

export default OnboardingScreen;

