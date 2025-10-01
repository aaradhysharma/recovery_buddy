# 🚀 ErgoWellness DevOps Guide

Complete CI/CD and deployment documentation for ErgoWellness.

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [CI/CD Pipeline](#cicd-pipeline)
- [Docker Setup](#docker-setup)
- [Release Process](#release-process)
- [Deployment](#deployment)
- [Monitoring](#monitoring)

---

## 🎯 Quick Start

### Using Makefile (Recommended)

```bash
# See all available commands
make help

# Development
make install        # Install dependencies
make dev           # Start dev server
make electron      # Start Electron app

# Docker development
make docker-dev    # Run in Docker

# Build
make build         # Build for current platform
make build-all     # Build for all platforms

# Release workflow
make version-patch # Bump version (0.0.x)
make release       # Push release tag
```

### Manual Commands

```bash
# Install
npm install

# Development
npm run dev              # Vite dev server
npm run electron:dev     # Electron with hot reload

# Build
npm run build           # Build Vite app
npm run electron:build  # Build Electron distributables
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflows

#### 1. **Build & Release** (`.github/workflows/build.yml`)

**Triggers:**
- Push to `master/main` branch
- Pull requests
- Version tags (`v*`)

**What it does:**
- Builds on Windows, macOS, and Linux
- Runs linters and tests
- Creates platform-specific installers
- Uploads artifacts
- Creates GitHub releases for tags

**Platforms:**
- **Windows**: `.exe` installer (NSIS)
- **macOS**: `.dmg` disk image
- **Linux**: `.AppImage` portable

#### 2. **Code Quality** (`.github/workflows/quality.yml`)

**Triggers:**
- Every push and PR

**What it does:**
- Code formatting checks (Prettier)
- Security audits (npm audit)
- Dependency reviews
- Package validation
- Build test

---

## 🐳 Docker Setup

### Development Container

```bash
# Start dev environment
docker-compose up dev

# Access at http://localhost:5173
```

### Build Container

```bash
# Build distributables in Docker
docker-compose up build

# Output in ./dist-electron/
```

### Docker Images

- **Dockerfile**: Development environment
- **Dockerfile.build**: Production build environment
- **docker-compose.yml**: Orchestration

### Dockerfile Features

- Node.js 20
- All Electron dependencies
- System libraries for building
- Hot reload support
- Volume mounting for development

---

## 📦 Release Process

### Semantic Versioning

We follow [SemVer](https://semver.org/):
- **Major** (1.0.0): Breaking changes
- **Minor** (0.1.0): New features
- **Patch** (0.0.1): Bug fixes

### Automated Version Bump

```bash
# Bump version
make version-patch    # 0.0.3 → 0.0.4
make version-minor    # 0.0.3 → 0.1.0
make version-major    # 0.0.3 → 1.0.0

# Or use npm
npm version patch -m "chore: bump to %s"
```

### Manual Release

```bash
# 1. Bump version
node scripts/bump-version.js patch

# 2. Commit changes
git add .
git commit -m "chore: bump version to 0.0.4"

# 3. Create tag
git tag v0.0.4

# 4. Push
git push origin master --tags
```

### Full Automated Release

```bash
# One command to rule them all
make deploy
```

This will:
1. Bump patch version
2. Commit changes
3. Push to GitHub
4. Trigger CI/CD
5. Build for all platforms
6. Create GitHub release

---

## 🌍 Deployment

### GitHub Releases

1. **Tag Format**: `v0.0.3`
2. **Automatic**: Triggered by pushing tags
3. **Artifacts**: Uploaded automatically
4. **Release Notes**: Auto-generated

### Manual GitHub Release

```bash
# Create tag
git tag v0.0.3

# Push tag
git push origin v0.0.3

# GitHub Actions builds and publishes automatically
```

### Download URLs

After release, users can download:
```
https://github.com/YOUR_USERNAME/ergowellness/releases/latest
```

### Distribution Channels

- **GitHub Releases**: Primary distribution
- **Direct download**: From releases page
- **Future**: Microsoft Store, Mac App Store

---

## 📊 Monitoring

### Build Status

Check build status:
- GitHub Actions tab
- README badges (add these later)

### Error Tracking

- Check GitHub Actions logs
- Review failed builds
- npm audit for vulnerabilities

---

## 🛠️ Development Workflow

### Standard Flow

```bash
# 1. Start development
git checkout -b feature/my-feature
make dev

# 2. Make changes
# ... edit code ...

# 3. Test locally
make electron

# 4. Commit
git add .
git commit -m "feat: add my feature"

# 5. Push and create PR
git push origin feature/my-feature
```

### Pre-commit Checks

```bash
# Format code
make format

# Security audit
make audit

# Build test
make build
```

---

## 🔐 Secrets & Environment

### GitHub Secrets Required

- `GITHUB_TOKEN`: Automatically provided
- Add more as needed for:
  - Code signing certificates
  - macOS notarization
  - Windows signing

### Local Environment

Create `.env.local`:
```bash
NODE_ENV=development
VITE_API_URL=http://localhost:5173
```

---

## 📈 Performance

### Build Times

Typical build times:
- **Development**: 2-3 seconds (hot reload)
- **Production build**: 30-60 seconds
- **CI/CD full build**: 5-10 minutes (all platforms)

### Optimization

- npm ci instead of npm install (CI)
- Caching node_modules
- Parallel builds for platforms
- Artifact compression

---

## 🐛 Troubleshooting

### Build Failures

```bash
# Clean everything
make clean
rm -rf node_modules
npm install

# Rebuild
npm run electron:build
```

### Docker Issues

```bash
# Clean Docker
make docker-clean

# Rebuild containers
docker-compose build --no-cache
```

### Release Issues

```bash
# Check git tags
git tag -l

# Delete tag if needed
git tag -d v0.0.3
git push origin :refs/tags/v0.0.3
```

---

## 📚 Resources

- [Electron Builder Docs](https://www.electron.build/)
- [GitHub Actions Docs](https://docs.github.com/actions)
- [Docker Docs](https://docs.docker.com/)
- [Semantic Versioning](https://semver.org/)

---

## 🎯 Quick Reference

### Common Commands

| Command | Description |
|---------|-------------|
| `make dev` | Start development |
| `make electron` | Start Electron app |
| `make build-all` | Build for all platforms |
| `make version-patch` | Bump version |
| `make release` | Create release |
| `make docker-dev` | Run in Docker |
| `make clean` | Clean artifacts |
| `make audit` | Security audit |

### File Structure

```
ergowellness/
├── .github/
│   └── workflows/       # CI/CD pipelines
├── scripts/             # DevOps scripts
├── Dockerfile           # Dev container
├── Dockerfile.build     # Build container
├── docker-compose.yml   # Docker orchestration
├── Makefile            # DevOps commands
└── DEVOPS.md           # This file
```

---

## 🚀 Next Steps

1. **Push to GitHub**: `git push origin master`
2. **Set up repository**: Enable Actions
3. **Create first release**: `make deploy`
4. **Monitor builds**: Check Actions tab
5. **Download installers**: From Releases page

---

**Version**: 0.0.3  
**Last Updated**: October 1, 2025
