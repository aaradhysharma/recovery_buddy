import { app, BrowserWindow, Tray, Menu, ipcMain, Notification } from 'electron';
import Store from 'electron-store';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const store = new Store();
let mainWindow;
let tray;
let reminderInterval;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
    icon: path.join(__dirname, '../public/icon.png'),
    show: false
  });

  // Load app - check if dev server is available
  const isDev = !app.isPackaged;
  
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Minimize to tray instead of closing
  mainWindow.on('close', (event) => {
    if (!app.isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
  });
}

function createTray() {
  // Try to create tray icon, but don't fail if image doesn't exist
  try {
    const iconPath = path.join(__dirname, '../public/tray-icon.png');
    if (require('fs').existsSync(iconPath)) {
      tray = new Tray(iconPath);
    } else {
      // Create tray without icon for now
      console.log('Tray icon not found, skipping tray creation');
      return;
    }
  } catch (error) {
    console.log('Could not create tray:', error);
    return;
  }
  
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Open ErgoWellness', click: () => mainWindow.show() },
    { type: 'separator' },
    { label: 'Take a Break', click: () => sendBreakReminder() },
    { label: 'Quick Stretch', click: () => sendQuickStretch() },
    { type: 'separator' },
    { label: 'Settings', click: () => { mainWindow.show(); mainWindow.webContents.send('navigate', '/settings'); } },
    { type: 'separator' },
    { label: 'Quit', click: () => { app.isQuitting = true; app.quit(); } }
  ]);

  tray.setToolTip('ErgoWellness');
  tray.setContextMenu(contextMenu);
  
  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  });
}

function sendBreakReminder() {
  if (Notification.isSupported()) {
    new Notification({
      title: '⏰ Break Time!',
      body: 'Time to stretch and rest your shoulders.',
      silent: false
    }).show();
  }
  
  if (mainWindow) {
    mainWindow.webContents.send('show-reminder', { type: 'break' });
  }
}

function sendQuickStretch() {
  if (mainWindow) {
    mainWindow.webContents.send('show-reminder', { type: 'stretch' });
  }
}

function setupReminderScheduler() {
  const settings = store.get('settings', {
    breakInterval: 20, // minutes
    hydrationInterval: 120, // minutes
    strictMode: false
  });

  if (reminderInterval) clearInterval(reminderInterval);

  // Check every minute
  reminderInterval = setInterval(() => {
    const now = Date.now();
    const lastBreak = store.get('lastBreakTime', now);
    const lastHydration = store.get('lastHydrationTime', now);

    const minutesSinceBreak = (now - lastBreak) / 60000;
    const minutesSinceHydration = (now - lastHydration) / 60000;

    if (minutesSinceBreak >= settings.breakInterval) {
      sendBreakReminder();
      store.set('lastBreakTime', now);
    }

    if (minutesSinceHydration >= settings.hydrationInterval) {
      if (Notification.isSupported()) {
        new Notification({
          title: '💧 Hydration Reminder',
          body: 'Time to drink some water!',
          silent: false
        }).show();
      }
      store.set('lastHydrationTime', now);
    }
  }, 60000); // Check every minute
}

// IPC Handlers
ipcMain.handle('get-store', (event, key, defaultValue) => {
  return store.get(key, defaultValue);
});

ipcMain.handle('set-store', (event, key, value) => {
  store.set(key, value);
  return true;
});

ipcMain.handle('delete-store', (event, key) => {
  store.delete(key);
  return true;
});

ipcMain.handle('get-all-store', () => {
  return store.store;
});

ipcMain.on('update-reminder-schedule', () => {
  setupReminderScheduler();
});

ipcMain.on('snooze-reminder', (event, minutes) => {
  const now = Date.now();
  store.set('lastBreakTime', now - ((store.get('settings.breakInterval', 20) - minutes) * 60000));
});

ipcMain.on('dismiss-reminder', () => {
  store.set('lastBreakTime', Date.now());
});

// App lifecycle
app.whenReady().then(() => {
  createWindow();
  createTray();
  setupReminderScheduler();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  app.isQuitting = true;
  if (reminderInterval) clearInterval(reminderInterval);
});
