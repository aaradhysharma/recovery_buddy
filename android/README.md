# ErgoWellness Android App

React Native (Expo) mobile application for workspace health and ergonomics.

## Features

- ✅ **Dashboard** - Track breaks, hydration, pain levels, and streaks
- ✅ **Stretches & Exercises** - Guided shoulder and posture exercises
- ✅ **Pain Assessment** - Log discomfort levels and problem areas
- ✅ **Progress Tracking** - Monitor your workspace health journey
- ✅ **Educational Content** - Learn about ergonomics and posture
- ✅ **Settings** - Customize reminders and app behavior
- ✅ **Dark Mode** - System theme support
- ✅ **Onboarding** - Personalized setup flow

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI
- Android Studio (for Android) or Xcode (for iOS)

### Installation

```bash
cd android
npm install
```

### Development

```bash
# Start Expo dev server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

### Build

```bash
# Build for Android
npx expo build:android

# Build for iOS
npx expo build:ios
```

## Project Structure

```
android/
├── src/
│   ├── components/        # Reusable UI components
│   ├── screens/           # App screens
│   ├── hooks/             # Custom React hooks
│   ├── data/              # Static data and content
│   ├── App.tsx            # Root component
│   └── AppNavigator.tsx   # Navigation setup
├── assets/                # Images, icons, fonts
├── app.json               # Expo configuration
└── package.json           # Dependencies
```

## Tech Stack

- **React Native** - Mobile framework
- **Expo** - Development platform
- **TypeScript** - Type safety
- **React Navigation** - Routing and navigation
- **AsyncStorage** - Persistent data storage

## Version

Current version: **0.0.1**

## License

See LICENSE file in project root.

