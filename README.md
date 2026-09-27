# The Shifting Mansion — Horror Game Development Dashboard

Browser-based development dashboard prototype for the original horror game project.

## Current prototype

- Animated mansion background
- Original faceless silhouette walking through the scene
- Atmospheric moon, fog, trees and window lighting
- Survival-horror inspired interface without copying existing game assets
- Development tabs for:
  - Overview
  - Mansion
  - Room Shifting
  - Entities
  - Botanical Garden
  - Audio
  - Source Assets
  - Build / Test
- Responsive desktop/tablet/mobile layout
- No framework or build process required

## Run

Open `index.html` in a modern browser.

## Suggested project structure

```text
your-horror-game-repo/
├── Design_and_Production/
├── Source_Assets/
│   ├── Entities/
│   ├── Audio/
│   └── Textures/
├── UE5_Project/
├── index.html
├── style.css
├── app.js
└── README.md
```

This dashboard is deliberately separate from the eventual game engine/project. It is intended to become the browser-based development control centre.

## v0.2 Android build
This version is an installable Progressive Web App (PWA). It runs on Android Chrome and supports offline loading after the first visit. The Play Mansion screen includes touch movement, room shifting and a lightweight playable prototype.

### Android
1. Serve the folder from HTTPS (GitHub Pages, Cloudflare Pages, Vercel, etc.).
2. Open the site in Chrome on Android.
3. Use Chrome's **Add to Home screen / Install app** option.
4. Launch **The Shifting Mansion** from the Android home screen.

The service worker caches the core game files for offline startup. This is not yet a native APK; it is the Android-compatible web/PWA build.
