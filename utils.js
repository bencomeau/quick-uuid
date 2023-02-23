const { app, clipboard } = require('electron');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

const dataPath = app.getPath('userData');
const filePath = path.join(dataPath, 'config.json');

function parseData() {
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch (e) {
    return {};
  }
}

function writeData(key, value) {
  const contents = parseData();
  contents[key] = value;
  fs.writeFileSync(filePath, JSON.stringify(contents));
}

function readData(key) {
  const contents = parseData();
  return contents[key];
}

async function generateUUID() {
  const resetClipboardSeconds = readData('resetClipboardSeconds');

  const uuid = crypto.randomUUID();

  const previousClipboardText = clipboard.readText();

  clipboard.writeText(uuid);

  // I wonder if I can tap into the system's clipboard events
  // and give the option to reset it upon next paste?
  // https://github.com/sudhakar3697/node-clipboard-event seems like an option
  if (resetClipboardSeconds) {
    setTimeout(() => {
      clipboard.writeText(previousClipboardText);
    }, resetClipboardSeconds * 1000);
  }

  return uuid;
}

module.exports = { writeData, readData, generateUUID };
