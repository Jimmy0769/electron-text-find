const { app, BrowserWindow, globalShortcut } = require("electron");
const path = require("node:path");
require("@electron/remote/main").initialize();

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  // 允许preload.js访问remote模块
  require("@electron/remote/main").enable(win.webContents);

  win.loadFile("index.html");

  win.webContents.openDevTools();

  win.on("focus", () => {
    globalShortcut.register("CommandOrControl+F", function () {
      if (win && win.webContents) {
        win.webContents.send("open-find");
      }
    });
  });

  win.on("blur", () => {
    globalShortcut.unregister("CommandOrControl+F");
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
