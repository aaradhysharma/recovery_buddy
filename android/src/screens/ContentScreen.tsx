import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { contentArticles } from '../data/content';

const ContentScreen: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [filter, setFilter] = useState('all');

  const categories = ['all', 'posture', 'exercises', 'ergonomics', 'prevention', 'recovery'];

  const filteredArticles = filter === 'all' 
    ? contentArticles 
    : contentArticles.filter(article => article.category === filter);

  const getCategoryEmoji = (category: string) => {
    const emojis: { [key: string]: string } = {
      posture: '🧍',
      exercises: '🤸',
      ergonomics: '🪑',
      prevention: '🛡️',
      recovery: '💪',
    };
    return emojis[category] || '📄';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📚 Educational Content</Text>
        <Text style={styles.subtitle}>Learn about workspace health and ergonomics</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[styles.filterButton, filter === category && styles.filterButtonActive]}
            onPress={() => setFilter(category)}
          >
            <Text style={[styles.filterText, filter === category && styles.filterTextActive]}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.content}>
        {filteredArticles.map((article) => (
          <TouchableOpacity
            key={article.id}
            style={styles.articleCard}
            onPress={() => setSelectedArticle(article)}
          >
            <View style={styles.articleHeader}>
              <Text style={styles.categoryBadge}>
                {getCategoryEmoji(article.category)} {article.category}
              </Text>
              <Text style={styles.readTime}>{article.readTime}</Text>
            </View>
            <Text style={styles.articleTitle}>{article.title}</Text>
            <Text style={styles.articleSummary}>{article.summary}</Text>
            <Text style={styles.readMore}>Read more →</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal visible={!!selectedArticle} animationType="slide">
        {selectedArticle && (
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setSelectedArticle(null)}>
                <Text style={styles.closeButton}>✕ Close</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalContent}>
              <Text style={styles.modalCategory}>
                {getCategoryEmoji(selectedArticle.category)} {selectedArticle.category}
              </Text>
              <Text style={styles.modalTitle}>{selectedArticle.title}</Text>
              <Text style={styles.modalReadTime}>{selectedArticle.readTime}</Text>
              <Text style={styles.modalText}>{selectedArticle.content}</Text>
              
              {selectedArticle.externalLinks && selectedArticle.externalLinks.length > 0 && (
                <View style={styles.linksSection}>
                  <Text style={styles.linksTitle}>📖 Learn More:</Text>
                  {selectedArticle.externalLinks.map((link: any, index: number) => (
                    <Text key={index} style={styles.linkItem}>
                      • {link.title}
                    </Text>
                  ))}
                </View>
              )}
            </ScrollView>
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
  header: {
    padding: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
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
  filterContainer: {
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#6366F1',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
  },
  filterTextActive: {
    color: '#FFF',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  articleCard: {
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
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6366F1',
    textTransform: 'capitalize',
  },
  readTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  articleSummary: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  readMore: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366F1',
  },
  modal: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  modalHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  closeButton: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6366F1',
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  modalCategory: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366F1',
    textTransform: 'capitalize',
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  modalReadTime: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 24,
  },
  modalText: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 28,
  },
  linksSection: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  linksTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  linkItem: {
    fontSize: 14,
    color: '#6366F1',
    marginBottom: 8,
  },
});

export default ContentScreen;

