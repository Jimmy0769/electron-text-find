const { contextBridge, ipcRenderer } = require('electron');
const { FindInPage } = require('../src/index.js')
const { getCurrentWebContents } = require('@electron/remote')
let findInPage;

window.addEventListener('DOMContentLoaded', () => {
  findInPage = new FindInPage(getCurrentWebContents(), {
    preload: true,
    offsetTop: 6,
    offsetRight: 10,
  });
});

ipcRenderer.on('on-find', () => {
  findInPage.openFindWindow();
});

contextBridge.exposeInMainWorld('versions', {
  
})