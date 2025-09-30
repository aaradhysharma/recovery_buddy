import React, { useState } from 'react';
import { BookOpen, ExternalLink, Search } from 'lucide-react';
import { contentArticles } from '../data/content';

function Content() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'posture', 'exercises', 'ergonomics', 'prevention', 'recovery'];

  const filteredArticles = contentArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (selectedArticle) {
    return (
      <div className="p-8">
        <button
          onClick={() => setSelectedArticle(null)}
          className="mb-6 text-blue-600 dark:text-blue-400 hover:underline flex items-center"
        >
          ← Back to Articles
        </button>

        <article className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
              {selectedArticle.category}
            </span>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {selectedArticle.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {selectedArticle.readTime} • By ErgoWellness Team
            </p>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            {selectedArticle.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {selectedArticle.externalLinks && selectedArticle.externalLinks.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Additional Resources
              </h3>
              <ul className="space-y-2">
                {selectedArticle.externalLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <ExternalLink size={16} className="mr-2" />
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-sm text-yellow-900 dark:text-yellow-300">
              ⚠️ <strong>Disclaimer:</strong> This content is for informational purposes only and is not a substitute for professional medical advice. Consult a healthcare provider for persistent or severe symptoms.
            </p>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Health & Wellness Content
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Evidence-based articles and guides for better ergonomics
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedArticle(article)}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">
                  {article.category}
                </span>
                <BookOpen className="text-gray-400" size={20} />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {article.title}
              </h3>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {article.summary}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
                <span>{article.readTime}</span>
                <span className="text-blue-600 dark:text-blue-400 hover:underline">
                  Read more →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="mx-auto text-gray-400 mb-4" size={64} />
          <p className="text-gray-500 dark:text-gray-400">No articles found matching your search.</p>
        </div>
      )}
    </div>
  );
}

export default Content;
