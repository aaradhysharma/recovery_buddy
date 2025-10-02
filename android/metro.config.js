const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);

config.watchFolders = [...config.watchFolders, path.resolve(workspaceRoot, 'shared')];
config.resolver.sourceExts = [...config.resolver.sourceExts, 'cjs', 'mjs'];
config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== 'svg');
config.resolver.sourceExts.push('svg');

module.exports = config;

