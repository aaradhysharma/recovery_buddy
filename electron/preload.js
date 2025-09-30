import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  // Store operations
  getStore: (key, defaultValue) => ipcRenderer.invoke('get-store', key, defaultValue),
  setStore: (key, value) => ipcRenderer.invoke('set-store', key, value),
  deleteStore: (key) => ipcRenderer.invoke('delete-store', key),
  getAllStore: () => ipcRenderer.invoke('get-all-store'),
  
  // Reminder operations
  updateReminderSchedule: () => ipcRenderer.send('update-reminder-schedule'),
  snoozeReminder: (minutes) => ipcRenderer.send('snooze-reminder', minutes),
  dismissReminder: () => ipcRenderer.send('dismiss-reminder'),
  
  // Listeners
  onShowReminder: (callback) => ipcRenderer.on('show-reminder', (event, data) => callback(data)),
  onNavigate: (callback) => ipcRenderer.on('navigate', (event, route) => callback(route)),
  
  // Remove listeners
  removeListener: (channel) => ipcRenderer.removeAllListeners(channel)
});
