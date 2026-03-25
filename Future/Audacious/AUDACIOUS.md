# AUDACIOUS: Audacity in the Browser

*The world's most popular open-source audio editor. Compiled to WebAssembly. Running in your browser. No install. No download. Just open a tab and edit audio.*

---

## Vision

Audacity has been the default audio editor for twenty years. It runs on every desktop operating system. It has been downloaded hundreds of millions of times. It is the tool people reach for when they need to cut a podcast. Clean up a recording. Apply an effect. Export to MP3.

But it does not run in the browser.

AUDACIOUS changes that.

This is not a "web-based audio editor inspired by Audacity." This is not a JavaScript reimplementation that borrows the name. This is **Audacity itself** — the actual C++ codebase, the actual audio engine, the actual effects pipeline — compiled to WebAssembly via Emscripten and running natively in any modern browser.

The insight: Audacity 4 is being rewritten right now. The old wxWidgets UI is being replaced with Qt 6 and QML. Qt 6 has an official WebAssembly target. The architecture is being re-modularized. The legacy code is being wrapped behind clean abstraction layers. For the first time in Audacity's history, a browser port is not just theoretically possible — it is architecturally aligned with the direction the project is already moving.

The window is open. The build system is CMake. The UI framework supports WASM. The audio engine is pure C++. The effects are DSP math. Everything that matters compiles.

What does not compile — native plugin loading, system audio device enumeration, CD burning — does not matter for a browser-first experience. Those are desktop features. The browser has its own equivalents. Web Audio API. MediaStream. Drag-and-drop file import. Browser download for export.

AUDACIOUS is the project that walks through that window.

### The Competitive Position

The existing landscape of browser audio editors — Soundtrap, BandLab, AudioMass, wavacity — represents two approaches:

1. **Commercial DAWs rebuilt for the web** (Soundtrap, BandLab) — full-featured but proprietary, subscription-based, and not Audacity.
2. **Lightweight web editors** (AudioMass, wavacity) — open-source but limited. JavaScript-based. Missing the deep effects pipeline, the multi-track editing, the format support that makes Audacity what it is.

Wavacity deserves specific mention — it was an early attempt to compile Audacity 3.x to WebAssembly. It proved the concept was viable but hit the wxWidgets wall. wxWidgets has no browser rendering backend. Wavacity worked around this with heroic effort, but the result was fragile.

**Audacity 4 removes the wxWidgets wall entirely.** Qt 6 replaces it. Qt 6 has a production-grade WebAssembly platform plugin. The rendering pipeline flows through OpenGL ES, which maps to WebGL2. The QML UI renders to a canvas element. The event system translates browser input automatically.

AUDACIOUS does not fight the architecture. It flows with it.

---
