#!/bin/bash

# ErgoWellness Deployment Script
# Automates version bump, commit, tag, and push

set -e  # Exit on error

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 ErgoWellness Deployment Script${NC}\n"

# Check if git is clean
if [[ -n $(git status -s) ]]; then
    echo -e "${RED}Error: Git working directory is not clean${NC}"
    echo "Please commit or stash your changes first"
    exit 1
fi

# Get version bump type (default: patch)
BUMP_TYPE=${1:-patch}

if [[ ! "$BUMP_TYPE" =~ ^(major|minor|patch)$ ]]; then
    echo -e "${RED}Error: Invalid version type${NC}"
    echo "Usage: ./deploy.sh [major|minor|patch]"
    exit 1
fi

echo -e "${YELLOW}Version bump type: $BUMP_TYPE${NC}\n"

# Get current version
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo -e "Current version: ${GREEN}$CURRENT_VERSION${NC}"

# Bump version
echo -e "\n${YELLOW}Bumping version...${NC}"
node scripts/bump-version.js $BUMP_TYPE

# Get new version
NEW_VERSION=$(node -p "require('./package.json').version")
echo -e "New version: ${GREEN}$NEW_VERSION${NC}"

# Confirm
read -p "Continue with deployment? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}Deployment cancelled${NC}"
    exit 1
fi

# Git operations
echo -e "\n${YELLOW}Committing changes...${NC}"
git add .
git commit -m "chore: bump version to $NEW_VERSION"

echo -e "${YELLOW}Creating tag v$NEW_VERSION...${NC}"
git tag "v$NEW_VERSION"

echo -e "${YELLOW}Pushing to GitHub...${NC}"
git push origin master
git push origin "v$NEW_VERSION"

echo -e "\n${GREEN}✓ Deployment complete!${NC}"
echo -e "\nGitHub Actions will now:"
echo -e "  1. Build for Windows, macOS, and Linux"
echo -e "  2. Run tests and quality checks"
echo -e "  3. Create GitHub release"
echo -e "  4. Upload installers"
echo -e "\nCheck status at: https://github.com/YOUR_USERNAME/ergowellness/actions"

