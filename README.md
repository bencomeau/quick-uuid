# Quick UUID

Tray application for quickly copying v4 UUIDs. Behind the scenes, it uses the `crypto` module from node.

## Features

- Easy to copy with a single click
- Able to recover previous clipboard content
  - Option to set recover time (in seconds)
  - Option to disable this feature
- Very few dependencies, around 200mb packaged

## How to start in dev mode

```shell
# Clone the repository
git clone git@github.com:bencomeau/quick-uuid.git

# Install dependencies
cd quick-uuid && yarn

# Start it in development mode
yarn start
```

## How to package

You can package the application for distribution however you'd like; I used [Electron Forge](https://www.electronforge.io/) for simplicity. Without going into specifics, it requires code signing with Apple Developer keys at the very least. I went with signed keys for the authentication againt signing, but again other alternates exist.

Once configured, you can make the application with:

```shell
yarn make
```

This will produce cross-platform applications that you can use to install on your device.

## Built With

- Uses Electron under the hood
- menubar for quicker functionality (https://www.npmjs.com/package/menubar)

## Ideas to try (a roadmap of sorts)

- [x] Bundle for production/download/signing/etc...seems like a good next step
  - [ ] Try a different packager to see if I can reduce application size? Maybe [Electron Builder](https://github.com/electron-userland/electron-builder) is a good one.
- [ ] Would be nice to drop `menubar` since it only needs the tray + context menu
- [ ] Add a preferences window so I can:
  - [ ] Move the clipboard reset options to it
  - [ ] Explain more things
  - [ ] Add options for "default copy" or something
- [ ] Add "copy as" functionality where a user could copy as an array, object, SQL syntax, etc.
  - [ ] Maybe a multiplier here would be useful...copy 20 UUIDs at once into an array.
- [ ] Better state management...I rolled my own to get it going quick but it's not great. No dependencies though!
- [ ] Wouldn't mind checking out Tauri but that's rather wishful and would be a complete rewrite
