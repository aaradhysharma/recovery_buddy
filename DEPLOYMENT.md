# 🚀 ErgoWellness Deployment Guide

## 📋 Overview

ErgoWellness is now a **monorepo** with two versions:
- **🌐 Web App** - Deploy to Vercel (free)
- **💻 Desktop App** - Distribute via GitHub Releases

---

## 🌐 Deploy Web App to Vercel

### ✅ **Method 1: Vercel Dashboard (Easiest)**

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub

2. **Import Project**
   - Click **"New Project"**
   - Select your repository: `aaradhysharma/recovery_buddy`

3. **Configure Project**
   - **Root Directory:** `web/`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

4. **Deploy!**
   - Click **"Deploy"**
   - Wait 2-3 minutes
   - Your app will be live at `https://your-app.vercel.app`

### ⚡ **Method 2: One-Click Deploy**

Click this button:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/aaradhysharma/recovery_buddy/tree/master/web)

### 🔧 **Method 3: Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to web directory
cd web

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

---

## 🎯 Auto-Deploy Setup

### **GitHub Integration**

Once deployed, Vercel automatically deploys on every git push!

```bash
git add .
git commit -m "update: improved UI"
git push origin master
```

✅ **Vercel detects the push**  
✅ **Builds automatically**  
✅ **Deploys to production**  
✅ **Live in 2 minutes!**

---

## 💻 Desktop App Distribution

### **GitHub Releases**

Your GitHub Actions already build desktop apps!

1. **Create a Release Tag**
   ```bash
   git tag v0.0.4
   git push origin v0.0.4
   ```

2. **GitHub Actions Builds**
   - Windows `.exe`
   - macOS `.dmg`
   - Linux `.AppImage`

3. **Download from Releases**
   - Users go to: https://github.com/aaradhysharma/recovery_buddy/releases
   - Download for their platform
   - Install and use!

---

## 🔄 Development Workflow

### **Web App Development**

```bash
# Navigate to web directory
cd web

# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### **Desktop App Development**

```bash
# Navigate to desktop directory
cd desktop

# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Start Electron app
npm run electron:dev

# Build desktop app
npm run electron:build
```

### **From Root (Both Apps)**

```bash
# Install all workspaces
npm install

# Start web dev server
npm run dev:web

# Start desktop dev server
npm run dev:desktop

# Build both
npm run build:all
```

---

## 🎨 Customization

### **Update Vercel Domain**

1. Go to Vercel Dashboard
2. Select your project
3. Settings → Domains
4. Add custom domain (e.g., `ergowellness.com`)

### **Environment Variables**

Web app doesn't need any! Everything runs client-side.

If you add backend features later:
1. Vercel Dashboard → Settings → Environment Variables
2. Add your variables
3. Redeploy

---

## 📊 Post-Deployment Checklist

### **Web App**

- [ ] Deployed to Vercel
- [ ] Custom domain set (optional)
- [ ] HTTPS working (automatic with Vercel)
- [ ] Camera permissions working
- [ ] Browser notifications enabled
- [ ] Mobile responsive
- [ ] PWA installable (optional enhancement)

### **Desktop App**

- [ ] GitHub Actions building successfully
- [ ] Release created with installers
- [ ] Windows `.exe` working
- [ ] macOS `.dmg` working
- [ ] Linux `.AppImage` working
- [ ] Auto-updates configured (optional)

---

## 🐛 Troubleshooting

### **Vercel Build Fails**

```bash
# Check build locally first
cd web
npm install
npm run build

# If it works locally, check Vercel build logs
```

### **Camera Not Working on Web**

- Ensure you're using HTTPS (Vercel provides this)
- Check browser permissions
- Test on Chrome/Firefox first

### **Desktop App Not Building**

```bash
# Clean and rebuild
cd desktop
rm -rf node_modules dist
npm install
npm run electron:build
```

---

## 📈 Analytics (Optional)

### **Add Vercel Analytics**

1. Vercel Dashboard → Your Project
2. Analytics tab
3. Enable Analytics
4. View real-time visitor data

### **Add Google Analytics**

Add to `web/index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

---

## 🚀 Next Steps

1. **Deploy Web App** (5 minutes)
2. **Test on mobile devices**
3. **Share with users**
4. **Create desktop release** (when ready)
5. **Promote on social media**
6. **Collect feedback**
7. **Iterate and improve**

---

## 📞 Support

- **GitHub Issues:** https://github.com/aaradhysharma/recovery_buddy/issues
- **Vercel Docs:** https://vercel.com/docs
- **Electron Docs:** https://www.electronjs.org/docs

---

**✨ Your app is ready to ship! Let's deploy! 🚀**

**Web URL:** Coming soon!  
**Desktop Downloads:** https://github.com/aaradhysharma/recovery_buddy/releases  
**Version:** 0.0.3

