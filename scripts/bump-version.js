#!/usr/bin/env node

/**
 * Version Bump Script
 * Automatically bumps version across all files
 */

const fs = require('fs');
const path = require('path');

const files = [
  'package.json',
  'src/App.jsx',
  'README.md',
];

function getCurrentVersion() {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  return pkg.version;
}

function bumpVersion(version, type = 'patch') {
  const [major, minor, patch] = version.split('.').map(Number);
  
  switch (type) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
    default:
      return `${major}.${minor}.${patch + 1}`;
  }
}

function updateFile(file, oldVersion, newVersion) {
  const content = fs.readFileSync(file, 'utf8');
  const updated = content.replace(new RegExp(oldVersion, 'g'), newVersion);
  fs.writeFileSync(file, updated, 'utf8');
  console.log(`✓ Updated ${file}`);
}

function main() {
  const type = process.argv[2] || 'patch';
  const currentVersion = getCurrentVersion();
  const newVersion = bumpVersion(currentVersion, type);

  console.log(`\nBumping version: ${currentVersion} → ${newVersion} (${type})\n`);

  files.forEach(file => {
    if (fs.existsSync(file)) {
      updateFile(file, currentVersion, newVersion);
    }
  });

  console.log(`\n✓ Version bumped to ${newVersion}`);
  console.log(`\nNext steps:`);
  console.log(`  git add .`);
  console.log(`  git commit -m "chore: bump version to ${newVersion}"`);
  console.log(`  git tag v${newVersion}`);
  console.log(`  git push origin master --tags`);
}

main();

