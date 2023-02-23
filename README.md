# Quick UUID
Tray application for quickly copying v4 UUIDs. Behind the scenes, it uses the `crypto` module from node.

## Features
- Easy to copy with a single click
- Able to recover previous clipboard content
  - Option to set recover time (in seconds)
  - Option to disable this feature
- Very few dependencies, lightweight

## How to use

Before I get to building/packaging this, it can be used in dev mode...

```shell
# Clone the repository
git clone git@github.com:bencomeau/quick-uuid.git

# Install dependencies
cd quick-uuid && yarn

# Start it (this is dev mode only right now)
yarn start
```

## Built With
- Uses Electron under the hood
- menubar for quicker functionality (https://www.npmjs.com/package/menubar)

## Ideas to try (a roadmap of sorts)
- Bundle for production/download/signing/etc...seems like a good next step
- Would be nice to drop `menubar` since it only needs the tray + context menu
- Add a preferences window so I can:
  - Move the clipboard reset options to it
  - Explain more things
  - Add options for "default copy" or something
- Add "copy as" functionality where a user could copy as an array, object, SQL syntax, etc.
  - Maybe a multiplier here would be useful...copy 20 UUIDs at once into an array.
- Better state management...I rolled my own to get it going quick but it's not great. No dependencies though!
- Wouldn't mind checking out Tauri but that's rather wishful and would be a complete rewrite
