# ErgoWellness v0.0.3

[![Build Status](https://img.shields.io/github/actions/workflow/status/YOUR_USERNAME/ergowellness/build.yml?branch=master)](https://github.com/YOUR_USERNAME/ergowellness/actions)
[![Release](https://img.shields.io/github/v/release/YOUR_USERNAME/ergowellness)](https://github.com/YOUR_USERNAME/ergowellness/releases)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg)](https://github.com/YOUR_USERNAME/ergowellness)

**AI-Powered Desk Health Monitor with Real-Time Posture Detection**

ErgoWellness uses computer vision and AI to monitor your posture, prevent carpal tunnel, reduce eye strain, and address all desk work health issues. Privacy-first with local processing.

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

## 🚀 DevOps & CI/CD

### Automated Build Pipeline
- **GitHub Actions**: Auto-builds for Windows, macOS, Linux
- **Code Quality**: Automated linting and security audits
- **Releases**: Automated version tagging and distribution

### Quick Deploy
```bash
# Using Makefile
make deploy

# Or manually
./scripts/deploy.sh patch
```

### Docker Development
```bash
# Start development environment
docker-compose up dev

# Build distributables
docker-compose up build
```

📖 **Full DevOps Guide**: See [DEVOPS.md](DEVOPS.md)

## 📝 License

MIT License - See LICENSE file for details

## ⚠️ Disclaimer

This app provides general wellness guidance and is not a substitute for professional medical advice. Consult a healthcare provider for persistent or severe pain.

---

**Version**: 0.0.3  
**Last Updated**: October 1, 2025
