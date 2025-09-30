# ErgoWellness Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Git Remote (if needed)
```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/ergowellness.git

# Or use SSH
git remote add origin git@github.com:YOUR_USERNAME/ergowellness.git

# Push to remote
git push -u origin master
```

### 3. Development Mode
```bash
# Run in development mode (hot reload)
npm run electron:dev
```

This will:
- Start Vite dev server on http://localhost:5173
- Launch Electron app with DevTools
- Enable hot module replacement

### 4. Build for Production
```bash
npm run electron:build
```

This creates distributable packages in `dist-electron/` for your platform:
- Windows: `.exe` installer
- macOS: `.dmg` installer
- Linux: `.AppImage` installer

## 📝 Important Notes

### Icon Files
Replace placeholder icon files with actual PNG images:
- `public/icon.png` - App icon (512x512px recommended)
- `public/tray-icon.png` - System tray icon (16x16 or 32x32px)

You can create icons using:
- [Figma](https://figma.com) (free design tool)
- [GIMP](https://gimp.org) (free image editor)
- [IconKitchen](https://icon.kitchen) (online icon generator)

### First Run
On first launch, the app will guide you through:
1. Personal information setup
2. Ergonomic workspace assessment
3. Reminder preferences configuration

### Data Storage
All data is stored locally in:
- **Windows**: `%APPDATA%\ergowellness`
- **macOS**: `~/Library/Application Support/ergowellness`
- **Linux**: `~/.config/ergowellness`

## 🔧 Development Tips

### Debugging
- Press `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Option+I` (macOS) to open DevTools
- Check `electron/main.js` for main process logs
- Check browser console for renderer process logs

### Testing Changes
The dev server auto-reloads React changes. For Electron main process changes:
1. Stop the app (Ctrl+C in terminal)
2. Restart with `npm run electron:dev`

### Common Issues

**Issue**: "Cannot find module 'electron'"
**Solution**: Run `npm install`

**Issue**: App doesn't start
**Solution**: Make sure port 5173 is not in use, or change port in `vite.config.js`

**Issue**: Icons not showing
**Solution**: Replace placeholder files in `public/` with actual PNG images

## 📦 Distribution

### Code Signing (Optional but Recommended)
For production builds, consider code signing:
- **Windows**: Requires a code signing certificate
- **macOS**: Requires Apple Developer account ($99/year)
- See [electron-builder docs](https://www.electron.build/code-signing)

### Auto-Updates (Future Enhancement)
Consider implementing auto-updates with:
- [electron-updater](https://www.electron.build/auto-update)
- GitHub Releases for hosting updates

## 🎨 Customization

### Branding
- Update `package.json` → name, description, author
- Replace icon files in `public/`
- Modify color scheme in `tailwind.config.js`

### Features
All components are modular. To add/modify:
- **Pages**: Add routes in `src/App.jsx`
- **Components**: Create in `src/components/`
- **Data**: Modify content in `src/data/`
- **Styling**: Update `tailwind.config.js` or `src/index.css`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

---

**Need Help?** Create an issue on GitHub or check the README.md file.
