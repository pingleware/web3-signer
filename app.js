
"use strict";

const {app, BrowserWindow, ipcMain} = require("electron");
const path = require("path");

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 750,
    height: 850,
    icon: "assets/logo.png",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, "preload.js")
    }
  });

  mainWindow.loadFile("views/index.html");
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
  mainWindow.setMenu(null);
}

app.on("ready", createWindow);
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
app.on("activate", function () {
  if (mainWindow === null) createWindow();
});
ipcMain.on("error", function(evt, data){
  mainWindow.webContents.send("error", "NOT IMPLEMENTED");
});
