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

## Source Application Architecture

### The Audacity 4 Overhaul

Audacity 4 is not a point release. It is a full architectural overhaul. The README says it plainly:

> "We're currently working on Audacity 4, which means an entirely new UI and also refactorings aplenty."

This matters for AUDACIOUS because the overhaul is doing three things simultaneously that make a browser port feasible:

1. **Replacing wxWidgets with Qt 6 + QML.** wxWidgets was the blocker. Qt 6 is the unlocker.
2. **Re-modularizing the codebase.** Clean module boundaries enable staged porting.
3. **Wrapping legacy code behind abstraction layers.** The `au3wrap` bridge means the new architecture does not depend on au3 internals directly.

### The Dual Codebase

Audacity 4 lives in two directories:

```
audacity/
├── src/                    ← The NEW Audacity 4 code (Qt 6 / QML)
│   ├── app/                Application entry point
│   ├── appshell/           Application shell and window management
│   ├── au3audio/           Audio subsystem (new layer over au3)
│   ├── au3wrap/            Bridge to legacy Audacity 3 code
│   ├── audio/              New audio infrastructure
│   ├── effects/            Effects management
│   ├── importexport/       File import/export
│   ├── playback/           Playback engine
│   ├── projectscene/       Waveform display and track UI
│   ├── record/             Recording engine
│   ├── spectrogram/        Spectrogram visualization
│   ├── trackedit/          Track editing operations
│   ├── uicomponents/       Shared UI components
│   └── preferences/        Settings and configuration
│
├── au3/                    ← The LEGACY Audacity 3 code (still C++, formerly wxWidgets)
│   ├── src/                Core audio processing source
│   ├── libraries/          50+ internal libraries (audio-io, effects, tracks, etc.)
│   ├── lib-src/            Third-party dependencies (PortAudio, SQLite, etc.)
│   └── modules/            Plugin module system
│
└── muse_framework/         ← MuseScore's application framework (submodule)
```

This dual structure is the key architectural fact for AUDACIOUS. The new `src/` tree is Qt 6 native. The old `au3/` tree is legacy C++ with POSIX and wxWidgets assumptions. The bridge between them — `src/au3wrap/` — is the seam where the WASM port can operate.

### The MuseScore Framework

Audacity 4 is built on top of MuseScore Studio's application framework (`muse_framework`). This framework provides:

- Application lifecycle management
- Module loading and dependency injection
- UI infrastructure (Qt/QML integration)
- Actions and shortcuts system
- Cloud services integration
- Diagnostics and crash reporting
- Multi-window support
- Extension and plugin architecture
- Workspace management

This is both an opportunity and a risk:

**Opportunity:** The framework is Qt-based and well-architected. If the framework compiles to WASM, a huge portion of Audacity 4 comes along for free — app shell, UI, settings, cloud, extensions.

**Risk:** The framework has never been compiled for WebAssembly. It likely contains POSIX assumptions, `QProcess` usage (which does not exist in WASM), and platform-specific code paths. Getting the framework to build under Emscripten is the gating challenge for the entire port.

### The Legacy Libraries

The `au3/libraries/` directory contains 50+ internal libraries that form the backbone of Audacity's audio engine:

```
au3-audio-devices          Audio device enumeration and management
au3-audio-graph            Audio processing graph
au3-audio-io               Audio input/output (PortAudio backend)
au3-builtin-effects        Built-in audio effects
au3-channel                Audio channel management
au3-concurrency            Threading and synchronization
au3-dynamic-range-processor Dynamic range compression/expansion
au3-effects                Effects infrastructure
au3-fft                    Fast Fourier Transform
au3-file-formats           Audio file format support
au3-import-export          Import/export pipeline
au3-mixer                  Audio mixing engine
au3-project-file-io        Project file (.aup3) I/O via SQLite
au3-realtime-effects       Real-time effects processing chain
au3-sample-track           Sample-based audio tracks
au3-stretching-sequence    Time-stretching infrastructure
au3-time-and-pitch         Time and pitch manipulation
au3-track                  Track data model
au3-transactions           Undo/redo transaction system
au3-vst / au3-vst3         VST/VST3 plugin hosting
au3-lv2                    LV2 plugin hosting (Linux)
au3-ladspa                 LADSPA plugin hosting
au3-audio-unit             Audio Unit hosting (macOS)
au3-wave-track             Waveform track data
au3-wave-track-paint       Waveform rendering
au3-wave-track-fft         FFT for waveform analysis
au3-wx-init                wxWidgets initialization (LEGACY)
au3-wx-wrappers            wxWidgets compatibility wrappers (LEGACY)
au3-sqlite-helpers         SQLite utility functions
au3-xml                    XML parsing
```

Of these 50+ libraries:

- **~35 are pure C++ with no platform dependencies.** They compile to anything. They will compile to WASM.
- **~8 depend on native audio/plugin APIs.** These need replacement or stubbing (PortAudio, VST, LV2, LADSPA, AudioUnit).
- **~4 depend on wxWidgets.** These are legacy wrappers that can be bypassed entirely since the new Qt UI replaces them.
- **~3 depend on POSIX/platform specifics.** These need `if(EMSCRIPTEN)` branches.

### Third-Party Dependencies

| Library | Location | Purpose | WASM Compilable | Strategy |
|---------|----------|---------|-----------------|----------|
| **SQLite** | `au3/lib-src/sqlite` | Project file storage (.aup3 format) | **Yes — proven** | Compiles cleanly to WASM. Well-tested path. |
| **libsoxr** | `au3/lib-src/libsoxr` | Sample rate conversion | **Yes — likely** | Pure C math library. No platform dependencies. |
| **libsbsms** | `au3/lib-src/libsbsms` | Time-stretching (SBSMS algorithm) | **Yes — likely** | Pure C++ DSP. Should cross-compile cleanly. |
| **SoundTouch** | `au3/lib-src/soundtouch` | Pitch shifting and tempo change | **Yes — proven** | Has been compiled to WASM in other projects. |
| **pffft** | `au3/lib-src/pffft` | Fast Fourier Transform | **Yes — likely** | Pure C. SIMD-friendly. WASM SIMD support available. |
| **twolame** | `au3/lib-src/twolame` | MP2 audio encoding | **Yes — likely** | Pure C encoder. No platform dependencies. |
| **libvamp** | `au3/lib-src/libvamp` | Audio analysis plugin framework | **Partial** | Core library compilable. Native plugins cannot load. |
| **portmixer** | `au3/lib-src/portmixer` | Audio device mixer control | **No** | OS-specific. Must be stubbed entirely. |
| **portburn** | `au3/lib-src/portburn` | CD burning | **No** | Not applicable in browser. Disable completely. |
| **portsmf** | `au3/lib-src/portsmf` | Standard MIDI file I/O | **Yes — likely** | Pure C++. No platform dependencies. |
| **libnyquist** | `thirdparty/libnyquist` | Nyquist scripting language interpreter | **Complex** | Custom Lisp interpreter. Technically compilable but large effort. |
| **rapidjson** | `thirdparty/rapidjson` | JSON parsing | **Yes — trivial** | Header-only C++. Zero compilation issues. |
| **Qt 6.9** | External dependency | UI framework | **Yes — official** | Qt for WebAssembly is production-ready. Official Emscripten target. |

### Build System

Audacity 4 uses CMake throughout. The top-level `CMakeLists.txt` orchestrates three layers:

1. **MuseScore Framework CMake** — `muse_framework/framework/cmake/`
2. **Audacity-specific CMake** — `buildscripts/cmake/`
3. **Legacy au3 CMake** — `au3/au3defs.cmake`

CMake is the build system Emscripten was designed for. `emcmake cmake` wraps it. The path from native CMake to Emscripten CMake is well-documented.

The critical pattern from TEMPLATE.md Section 3 applies directly:

```bash
# Standard Emscripten cross-compilation
emcmake cmake .. \
  -DCMAKE_BUILD_TYPE=Release \
  -DCMAKE_INSTALL_PREFIX=/path/to/install

emmake make -j2  # Keep -j2 to avoid OOM
```

But the build-tool separation warning is paramount. Audacity's build generates code and processes assets. Those tools must run on the HOST machine, not the WASM target. The `muse_framework` build system likely has code generators that need native compilation.

---
