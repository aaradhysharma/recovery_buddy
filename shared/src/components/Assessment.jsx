import React, { useState } from 'react';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';
import { ergonomicTips } from '../data/ergonomicTips';
import { useStore } from '../hooks/useStore';

function Assessment() {
  const [assessment, setAssessment] = useState({
    monitorHeight: '',
    chairSupport: '',
    keyboardPosition: '',
    mousePosition: '',
    lighting: '',
    breaks: '',
  });
  const [results, setResults] = useState(null);
  const { setStore } = useStore();

  const questions = [
    {
      id: 'monitorHeight',
      question: 'Is your monitor at eye level?',
      options: ['At eye level', 'Too low', 'Too high'],
    },
    {
      id: 'chairSupport',
      question: 'Does your chair provide good lumbar support?',
      options: ['Yes, excellent', 'Somewhat', 'No support'],
    },
    {
      id: 'keyboardPosition',
      question: 'Are your elbows at 90 degrees when typing?',
      options: ['Yes', 'No, too high', 'No, too low'],
    },
    {
      id: 'mousePosition',
      question: 'Is your mouse within easy reach?',
      options: ['Yes, close by', 'Somewhat far', 'Very far'],
    },
    {
      id: 'lighting',
      question: 'Is your workspace well-lit without glare?',
      options: ['Yes', 'Some glare', 'Too dark/bright'],
    },
    {
      id: 'breaks',
      question: 'Do you take regular breaks?',
      options: ['Every 20-30 min', 'Every hour', 'Rarely'],
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Calculate score
    const scores = {
      monitorHeight: { 'At eye level': 10, 'Too low': 5, 'Too high': 5 },
      chairSupport: { 'Yes, excellent': 10, 'Somewhat': 5, 'No support': 0 },
      keyboardPosition: { 'Yes': 10, 'No, too high': 5, 'No, too low': 5 },
      mousePosition: { 'Yes, close by': 10, 'Somewhat far': 5, 'Very far': 0 },
      lighting: { 'Yes': 10, 'Some glare': 5, 'Too dark/bright': 0 },
      breaks: { 'Every 20-30 min': 10, 'Every hour': 5, 'Rarely': 0 },
    };

    let totalScore = 0;
    let maxScore = 60;
    
    Object.keys(assessment).forEach((key) => {
      if (assessment[key] && scores[key]) {
        totalScore += scores[key][assessment[key]] || 0;
      }
    });

    const percentage = Math.round((totalScore / maxScore) * 100);
    
    let grade, message, recommendations;
    if (percentage >= 80) {
      grade = 'Excellent';
      message = 'Your ergonomic setup is great! Keep up the good habits.';
      recommendations = ergonomicTips.filter(tip => tip.category === 'maintenance');
    } else if (percentage >= 60) {
      grade = 'Good';
      message = 'Your setup is decent but has room for improvement.';
      recommendations = ergonomicTips.filter(tip => 
        assessment.monitorHeight !== 'At eye level' && tip.category === 'monitor' ||
        assessment.chairSupport !== 'Yes, excellent' && tip.category === 'chair'
      );
    } else {
      grade = 'Needs Improvement';
      message = 'Several ergonomic issues detected. Let\'s fix them!';
      recommendations = ergonomicTips;
    }

    const assessmentResults = {
      score: percentage,
      grade,
      message,
      recommendations: recommendations.slice(0, 5),
      timestamp: new Date().toISOString(),
    };

    setResults(assessmentResults);
    
    // Save assessment
    const assessmentHistory = await useStore().getStore('assessmentHistory', []);
    assessmentHistory.push(assessmentResults);
    await setStore('assessmentHistory', assessmentHistory);
  };

  const resetAssessment = () => {
    setAssessment({
      monitorHeight: '',
      chairSupport: '',
      keyboardPosition: '',
      mousePosition: '',
      lighting: '',
      breaks: '',
    });
    setResults(null);
  };

  if (results) {
    return (
      <div className="p-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <div className="text-center mb-8">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
                results.score >= 80 ? 'bg-green-100 dark:bg-green-900/20' :
                results.score >= 60 ? 'bg-yellow-100 dark:bg-yellow-900/20' :
                'bg-red-100 dark:bg-red-900/20'
              }`}>
                {results.score >= 80 ? (
                  <CheckCircle className="text-green-600 dark:text-green-400" size={48} />
                ) : (
                  <AlertCircle className={results.score >= 60 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'} size={48} />
                )}
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {results.grade}
              </h2>
              <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {results.score}%
              </div>
              <p className="text-gray-600 dark:text-gray-400">{results.message}</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Info size={20} className="mr-2" />
                Recommendations for You
              </h3>
              <ul className="space-y-3">
                {results.recommendations.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                      {index + 1}
                    </span>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{tip.title}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{tip.description}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={resetAssessment}
              className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
            >
              Take Another Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Ergonomic Assessment
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Answer these questions to get personalized workspace recommendations
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <div className="space-y-8">
            {questions.map((q, index) => (
              <div key={q.id}>
                <label className="block text-lg font-medium text-gray-900 dark:text-white mb-3">
                  {index + 1}. {q.question}
                </label>
                <div className="space-y-2">
                  {q.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setAssessment({ ...assessment, [q.id]: option })}
                      className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-colors ${
                        assessment[q.id] === option
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={Object.values(assessment).some(v => !v)}
            className="w-full mt-8 py-3 px-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
          >
            Get My Results
          </button>
        </form>
      </div>
    </div>
  );
}

export default Assessment;
