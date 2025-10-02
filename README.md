# ErgoWellness v0.0.9

[![Build Status](https://img.shields.io/github/actions/workflow/status/aaradhysharma/recovery_buddy/build.yml?branch=master)](https://github.com/aaradhysharma/recovery_buddy/actions)
[![Release](https://img.shields.io/github/v/release/aaradhysharma/recovery_buddy)](https://github.com/aaradhysharma/recovery_buddy/releases)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Web%20%7C%20Windows%20%7C%20macOS%20%7C%20Linux%20%7C%20Android%20%7C%20iOS-lightgrey.svg)](https://github.com/aaradhysharma/recovery_buddy)
[![Deploy with Vercel](https://img.shields.io/badge/deploy-vercel-black)](https://vercel.com/new/clone?repository-url=https://github.com/aaradhysharma/recovery_buddy/tree/master/web)

**AI-Powered Desk Health Monitor - Available as Web, Desktop & Mobile App**

ErgoWellness uses computer vision and AI to monitor your posture, prevent carpal tunnel, reduce eye strain, and address all desk work health issues. Privacy-first with local processing.

## 🎯 Choose Your Version

| Version | Best For | Link |
|---------|----------|------|
| **🌐 Web App** | Instant access, works everywhere | [Try Now](#) / [Deploy on Vercel](#vercel-deployment) |
| **💻 Desktop App** | Advanced features, system integration | [Download from Releases](https://github.com/aaradhysharma/recovery_buddy/releases) |
| **📱 Android App** | On-the-go health tracking | [Build from Source](#android-setup) |

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
- **Mobile**: React Native + Expo
- **Styling**: Tailwind CSS
- **Charts**: Chart.js
- **Storage**: SQLite + electron-store + AsyncStorage
- **Animations**: Framer Motion

## 📁 Monorepo Structure

```
recovery_buddy/
├── web/              # 🌐 Web App (Vercel)
│   ├── src/          # React components
│   ├── public/       # Static assets
│   ├── vercel.json   # Vercel config
│   └── package.json
├── desktop/          # 💻 Desktop App (Electron)
│   ├── src/          # React components
│   ├── electron/     # Electron main process
│   ├── public/       # Static assets
│   └── package.json
├── android/          # 📱 Android App (React Native)
│   ├── src/          # React Native components
│   ├── assets/       # Mobile assets
│   ├── app.json      # Expo config
│   └── package.json
├── shared/           # 🔄 Shared components & data
├── .github/          # CI/CD workflows
│   └── workflows/
│       ├── build.yml    # Desktop builds
│       └── quality.yml  # Code quality
└── package.json      # Root workspace config
```

## 🚀 Vercel Deployment

### Option 1: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/aaradhysharma/recovery_buddy/tree/master/web)

### Option 2: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Set **Root Directory** to `web/`
4. Click Deploy!

### Option 3: CLI
```bash
npm install -g vercel
cd web
vercel --prod
```

**That's it!** Auto-deploys on every push to master! 🎉

## 📱 Android Setup

### Prerequisites
- Node.js 18+
- Expo CLI
- Android Studio (optional, for emulator)

### Development
```bash
cd android
npm install
npm start
```

Scan the QR code with Expo Go app on your Android device!

### Build APK
```bash
cd android
npx expo build:android
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

**Version**: 0.0.9  
**Last Updated**: October 2, 2025
