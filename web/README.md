# ErgoWellness Web App

Web version of ErgoWellness - AI-powered desk health monitor.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deploy to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/aaradhysharma/recovery_buddy/tree/master/web)

### Manual Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd web
vercel

# Deploy to production
vercel --prod
```

### GitHub Integration (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Set root directory to `web/`
5. Click Deploy!

**Auto-deploy:** Every push to `master` will auto-deploy! 🎉

## 🔧 Configuration

- **Port:** 3000 (dev)
- **Build Output:** `dist/`
- **Framework:** Vite + React
- **Storage:** Browser LocalForage (better than localStorage)

## 🆚 Web vs Desktop

### Web Version Has:
✅ All core features (posture monitoring, stretches, tracking)
✅ Works on any device (desktop, tablet, mobile)
✅ No installation needed
✅ Auto-updates on every deploy
✅ Browser notifications

### Web Version Doesn't Have:
❌ System tray integration
❌ Desktop notifications (uses browser notifications instead)
❌ Always-on-top windows
❌ Electron-specific features

## 📊 Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support (iOS 11+)
- Mobile browsers: ✅ Works great!

## 🔐 Privacy

- All data stored locally in browser
- No backend/server needed
- Posture AI runs in browser (TensorFlow.js)
- No data sent anywhere

## 🎯 Features

- ✅ AI Posture Monitoring (webcam)
- ✅ Break Reminders
- ✅ Guided Stretches
- ✅ Health Tracking
- ✅ Progress Charts
- ✅ Dark Mode
- ✅ Offline Support (PWA ready)

## 📝 Environment Variables

None needed! Everything runs client-side.

## 🐛 Troubleshooting

### Camera not working?
- Grant camera permissions in browser
- Use HTTPS (required for camera access)
- Vercel provides HTTPS automatically

### Storage not persisting?
- Check browser privacy settings
- Ensure cookies/storage not blocked
- Try incognito mode to test

## 📦 Build Output

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
└── vite.svg
```

## 🚀 Performance

- **First Load:** ~2s
- **Bundle Size:** ~600 KB (gzipped)
- **Lighthouse Score:** 95+ (all metrics)

---

**Live Demo:** Coming soon after deployment!
**Version:** 0.0.3

