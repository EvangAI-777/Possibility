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

## Subsystem Translation Map

Every native subsystem in Audacity has a browser equivalent. Some translations are direct. Some require significant rearchitecting. Some have no browser equivalent at all and must be disabled. This section maps every subsystem from its native implementation to its WebAssembly target — what translates, what transforms, and what gets left behind.

### The Translation Table

| Subsystem | Native Implementation | Browser Target | Translation Difficulty | Notes |
|-----------|----------------------|----------------|----------------------|-------|
| **UI Rendering** | Qt 6.9 / QML (OpenGL ES) | WebGL2 via Qt WASM platform plugin | **Medium** | Qt's official WASM backend handles the entire rendering pipeline. QML renders to a `<canvas>` element. The UI framework is the one subsystem where the translation is nearly automatic — Qt did the work for us. |
| **Audio I/O** | PortAudio → au3-audio-devices → au3-audio-io | Web Audio API + AudioWorklet | **Hard** | The core challenge. PortAudio has no browser backend. The entire audio pipeline — from device enumeration to sample delivery — must be replaced. Web Audio API provides the primitives. AudioWorklet provides the real-time thread. But the integration surface is large. |
| **Audio Processing Graph** | au3-audio-graph (native threads) | AudioWorklet + SharedArrayBuffer | **Hard** | The real-time effects chain runs on dedicated threads in native Audacity. In the browser, this maps to AudioWorklet processors running in their own thread context. SharedArrayBuffer enables the zero-copy shared memory that real-time audio demands. COOP/COEP headers are mandatory. |
| **File I/O** | Native filesystem (POSIX / Win32) | Emscripten VFS (MEMFS + IDBFS) | **Medium** | Emscripten provides a virtual filesystem that implements POSIX file operations in memory. MEMFS for runtime storage, IDBFS for persistent storage via IndexedDB. File import happens through drag-and-drop or `<input type="file">`. Export happens through browser download. The abstraction is clean. |
| **Project Storage** | SQLite → `.aup3` files on disk | SQLite-WASM → `.aup3` in Emscripten VFS | **Easy** | SQLite compiles to WASM with zero drama. This is one of the most well-proven WASM compilation targets in existence. The `.aup3` format is just a SQLite database. It works identically in the browser. |
| **Networking** | Qt Network / libcurl | Fetch API / WebSocket (via Qt WASM) | **Easy** | Qt Network has WASM support. HTTP requests translate to Fetch API calls. WebSocket support is native in all browsers. Cloud audiocom integration translates naturally. |
| **Threading** | pthreads / Qt Concurrent / au3-concurrency | Web Workers + SharedArrayBuffer | **Hard** | Native Audacity uses pthreads extensively — audio processing, waveform rendering, file I/O, effect computation. Emscripten's pthread support maps these to Web Workers with SharedArrayBuffer. This works, but requires COOP/COEP headers and has performance characteristics that differ from native threading. |
| **Input Handling** | Qt event system (keyboard, mouse, touch) | Browser events via Qt WASM platform plugin | **Easy** | Qt's WASM backend translates browser input events to Qt events automatically. Keyboard shortcuts, mouse interactions, touch gestures — all handled by the platform plugin. No custom work needed. |
| **Clipboard** | System clipboard via Qt | Async Clipboard API | **Easy** | Qt's WASM backend implements clipboard operations through the browser's Clipboard API. Copy/paste of audio data works within the application. Cross-application clipboard has browser security restrictions but the core workflow is preserved. |
| **Drag-and-Drop** | Qt DnD framework | HTML5 Drag and Drop API | **Easy** | Qt WASM supports drag-and-drop natively. File import via drag-and-drop is the primary way users will load audio files in the browser version. |
| **Scripting (Nyquist)** | libnyquist — custom Lisp dialect interpreter | Compile interpreter to WASM | **Hard** | Nyquist is Audacity's built-in scripting language. It is a custom Lisp dialect with audio DSP primitives. The interpreter is written in C — technically compilable to WASM, but the language runtime is substantial. Recommend deferring to Stage 6. |
| **Plugin Systems** | VST/VST3/LV2/LADSPA/AudioUnit — native `.dll`/`.so`/`.dylib` | **Not possible** | **Blocker** | Native plugin loading is fundamentally incompatible with WebAssembly. Plugins are compiled native binaries that must be dynamically loaded into the process address space. WASM cannot do this. Must be disabled entirely. |
| **Audio Device Selection** | portmixer — OS-level mixer control | MediaDevices API | **Medium** | Native Audacity enumerates and controls system audio devices. In the browser, `navigator.mediaDevices.enumerateDevices()` provides device listing. `getUserMedia()` handles device selection for recording. The API surface is smaller but sufficient. |
| **CD Burning** | portburn — native CD drive access | **Not applicable** | **Disabled** | Browsers cannot access CD drives. This feature is desktop-only and will not be ported. It does not need to be ported. Nobody is burning CDs from a browser tab. |
| **Sample Rate Conversion** | libsoxr — pure C math | Compiles directly | **Easy** | Pure C library with no platform dependencies. Cross-compiles to WASM cleanly. WASM SIMD can accelerate the math. |
| **FFT** | pffft — pure C | Compiles directly | **Easy** | Pure C, SIMD-friendly. WASM SIMD support maps well. Spectrogram rendering and frequency analysis work identically. |
| **Time Stretching** | libsbsms — pure C++ DSP | Compiles directly | **Easy** | No platform dependencies. Pure algorithmic code. Compiles to WASM. |
| **Pitch/Tempo** | SoundTouch — pure C++ | Compiles directly | **Easy** | Has been compiled to WASM in other projects. Proven path. |
| **Undo/Redo** | au3-transactions — in-memory + SQLite | Works identically in WASM | **Easy** | Pure application logic backed by SQLite. Both work in WASM. No translation needed. |

### The Three Categories

Looking at the translation table, every subsystem falls into one of three categories:

**Category 1: Direct Translation (60% of subsystems)**
These subsystems either compile directly to WASM with no changes or are handled automatically by Qt's WASM platform plugin. UI rendering, input handling, clipboard, drag-and-drop, project storage, sample rate conversion, FFT, time stretching, pitch/tempo, undo/redo, networking. The majority of Audacity's functionality falls here. This is the structural argument for feasibility.

**Category 2: Significant Rearchitecting (30% of subsystems)**
These subsystems have browser equivalents, but the translation requires real engineering. Audio I/O (PortAudio → Web Audio API), the audio processing graph (native threads → AudioWorklet), threading (pthreads → Web Workers), file I/O (native filesystem → Emscripten VFS), Nyquist scripting (compile interpreter to WASM), audio device selection (portmixer → MediaDevices API). Each of these is a well-understood problem with known solutions, but the implementation work is substantial.

**Category 3: Not Portable (10% of subsystems)**
Native plugin loading (VST/VST3/LV2/LADSPA/AudioUnit) and CD burning. These are desktop-only features with no browser equivalent. They must be disabled, not translated. This is not a loss — it is a scope reduction that simplifies the port without reducing the value of the browser experience. Nobody expects to load a VST plugin in a browser tab. Nobody expects to burn a CD from Firefox.

### The Audio Pipeline: The Critical Translation

The single most important translation is the audio pipeline. In native Audacity, audio flows through this stack:

```
User action (play/record)
    → au3-audio-io (PortAudio backend)
        → au3-audio-graph (processing graph on dedicated thread)
            → au3-realtime-effects (effects chain)
                → au3-mixer (mixing engine)
                    → PortAudio output device
```

In AUDACIOUS, this becomes:

```
User action (play/record)
    → audacious-audio-io (Web Audio API backend)
        → AudioWorklet processor (processing graph in worklet thread)
            → au3-realtime-effects (effects chain — compiled to WASM, running in worklet)
                → au3-mixer (mixing engine — compiled to WASM, running in worklet)
                    → AudioContext destination (browser audio output)
```

The key insight: the middle of the pipeline — effects processing, mixing, DSP math — does not change. It is pure C++ computation. It compiles to WASM and runs identically. Only the endpoints change: PortAudio at the bottom becomes Web Audio API. The native audio thread becomes an AudioWorklet thread.

The `au3wrap` boundary in Audacity 4's architecture is exactly where this translation happens. The wrapper isolates the legacy audio subsystem behind an interface. AUDACIOUS replaces the implementation behind that interface with Web Audio API calls. The rest of the audio engine does not know the difference.

### The Autoplay Policy Problem

Browsers do not allow audio output until the user has interacted with the page. This is the autoplay policy. It affects AUDACIOUS directly: the audio context cannot be created or resumed until a user click or keypress.

The solution is standard: create the AudioContext on the first user interaction, then resume it on subsequent interactions if it gets suspended. This is a one-time initialization pattern, not an ongoing concern. But it must be handled — attempting to play audio before user interaction will silently fail.

---
