# ErgoWellness v0.0.1

**Your Digital Ergonomics & Wellness Coach**

ErgoWellness helps prevent and relieve shoulder pain caused by poor posture and prolonged sitting. Perfect for desk workers, students, and anyone who spends long hours at a computer.

## 🎯 Features

- **Smart Break Reminders**: Customizable intervals with screen lock option
- **Guided Stretches**: Shoulder-focused exercises with animations
- **Ergonomic Assessments**: Personalized workspace recommendations
- **Health Tracking**: Monitor pain levels and improvement over time
- **Hydration Reminders**: Stay hydrated throughout the day
- **Gamification**: Streaks, badges, and motivational rewards
- **Privacy-First**: All data stored locally on your device
- **Expert Content**: Evidence-based tips and guidelines

## 🚀 Quick Start

### Installation
```bash
# Install dependencies
npm install

# Run development mode
npm run electron:dev

# Build for production
npm run electron:build
```

### First Time Setup
1. Complete the onboarding questionnaire
2. Set your preferred reminder intervals
3. Start your wellness journey!

## 🛠 Technology

- **Frontend**: React 18 + Vite
- **Desktop**: Electron 28
- **Styling**: Tailwind CSS
- **Charts**: Chart.js
- **Storage**: SQLite + electron-store
- **Animations**: Framer Motion

## 📁 Project Structure

```
ergowellness/
├── electron/          # Electron main process
├── src/
│   ├── components/    # React components
│   ├── services/      # Business logic
│   ├── data/          # Static content
│   ├── hooks/         # Custom React hooks
│   └── utils/         # Helper functions
└── public/            # Static assets
```

## 🔒 Privacy & Security

- **100% Local**: No cloud, no tracking, no data collection
- **Encrypted Storage**: User data stored securely
- **GDPR Compliant**: Full control over your data
- **Medical Disclaimer**: Not a substitute for professional medical advice

## 📝 License

MIT License - See LICENSE file for details

## ⚠️ Disclaimer

This app provides general wellness guidance and is not a substitute for professional medical advice. Consult a healthcare provider for persistent or severe pain.

---

**Version**: 0.0.1  
**Last Updated**: September 30, 2025
