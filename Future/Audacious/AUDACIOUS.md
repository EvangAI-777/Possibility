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

## Porting Strategy

AUDACIOUS does not attempt to compile all of Audacity in one pass. That would fail. The codebase is too large, the dependency graph too deep, the platform differences too numerous. Instead, the port proceeds in six stages — each stage producing a deployable artifact, each stage building on the last, each stage proving something that the next stage depends on.

This is not a waterfall plan. It is a progressive proof-of-concept chain. Each stage can be demonstrated, tested, and validated independently. If Stage 3 reveals that the audio pipeline approach is wrong, the rearchitecting does not propagate backward to Stages 1 and 2.

### Stage 1: The Shell (Build System + UI Bootstrap)

**Goal:** Audacity 4 launches in a browser tab and renders a QML UI shell. No audio. No file loading. Just the application frame, menus, toolbars, and empty track view — proof that the build system, MuseScore framework, and Qt WASM integration all work end-to-end.

**What gets built:**
- Emscripten toolchain integration with Audacity's CMake build system
- `emcmake cmake` wrapper configuration for the three-layer build (MuseScore framework → Audacity CMake → au3 CMake)
- Host-vs-target build separation for code generators and asset processors
- MuseScore framework compiled to WASM with `if(EMSCRIPTEN)` stubs for `QProcess`, native platform code, and POSIX-specific paths
- Qt 6.9 WASM platform plugin driving the QML UI
- Application shell rendering: main window, menu bar, toolbar, status bar, empty track area
- All au3 dependencies stubbed behind `au3wrap` — no legacy code compiles in this stage

**Why this is Stage 1:**
This is the gating stage. If the MuseScore framework does not compile under Emscripten, the entire port is blocked. If Qt WASM cannot render the QML UI, there is no visual target. Every other stage assumes this works. Stage 1 absorbs the highest technical risk in the entire project.

**Deliverable:** A URL that loads Audacity 4's UI in a browser. Empty. Non-functional. But structurally complete. The build system works. The framework compiles. The UI renders.

**Effort:** XL. The MuseScore framework has never been compiled for WASM. Expect weeks of `#ifdef EMSCRIPTEN` patches, build system debugging, and Qt WASM configuration. This is the stage where the project either proves itself or discovers a hard blocker.

### Stage 2: The Editor (File I/O + Track Display + Editing)

**Goal:** Users can import audio files, see waveforms, and perform non-destructive editing operations. Cut. Copy. Paste. Select. Delete. Zoom. Scroll. No playback — the waveform is visual only. But the core editing workflow works.

**What gets built:**
- `src/projectscene` waveform rendering connected to real audio data
- `src/trackedit` operations — selection, cut/copy/paste, split, join, trim
- File import via HTML5 drag-and-drop and `<input type="file">`
- Audio file decoding through au3-file-formats (compiled to WASM)
- Emscripten VFS (MEMFS) for in-memory file storage during a session
- SQLite-WASM for `.aup3` project file read/write
- `au3-wave-track` and `au3-wave-track-paint` compiled and connected to the QML waveform view
- File export via browser download (`<a download>`)

**Why this is Stage 2:**
Once the shell renders, the next question is: can it display real audio data and let users manipulate it? This stage proves that the audio data model, the waveform renderer, and the editing operations all work in WASM. Playback is deferred — this is the visual and structural proof.

**Deliverable:** Drag a `.wav` file onto the browser tab. See its waveform. Select a region. Cut it. Paste it elsewhere. Export the result. All without hearing a single sample.

**Effort:** L. The waveform renderer and track editor are pure C++/QML. The heavy lifting is file format decoding and SQLite integration, both of which are well-proven WASM compilation targets.

### Stage 3: The Player (Audio Playback)

**Goal:** Press play and hear audio. The Web Audio API backend replaces PortAudio. The audio processing graph runs in an AudioWorklet. Real-time mixing works. Transport controls (play, pause, stop, seek) function correctly.

**What gets built:**
- Custom Web Audio API backend replacing PortAudio in the `au3wrap` layer
- AudioWorklet processor hosting the compiled-to-WASM audio graph
- SharedArrayBuffer bridge between main thread (UI) and AudioWorklet thread (audio)
- Transport control integration (play/pause/stop/seek) connected to Web Audio API state
- Autoplay policy handling — AudioContext creation on first user interaction
- `au3-mixer` compiled and running inside the AudioWorklet
- COOP/COEP HTTP headers configured on the hosting server
- Playback cursor synchronized between AudioWorklet timeline and QML waveform view

**Why this is Stage 3:**
Audio playback is the moment AUDACIOUS becomes Audacity. Without it, Stage 2 is a waveform viewer. With it, the application can play, pause, seek — the fundamental audio editing workflow loop. This stage is where the audio pipeline translation from Section 3 gets implemented.

**Deliverable:** Import a file. Press play. Hear it. Seek to a position. Press play again. Hear it from there. The audio editor works.

**Effort:** XL. The Web Audio API backend is a from-scratch implementation. The AudioWorklet integration requires careful memory management with SharedArrayBuffer. The thread synchronization between UI and audio is the hardest real-time programming challenge in the entire port.

### Stage 4: The Processor (Effects + DSP)

**Goal:** Apply effects to audio. Built-in effects (normalize, amplify, EQ, reverb, noise reduction) run in real time. The spectrogram view renders. The effects UI (QML dialogs with preview) works end-to-end.

**What gets built:**
- `au3-builtin-effects` compiled to WASM and registered in the effects system
- `au3-realtime-effects` running in the AudioWorklet alongside the mixer
- `src/effects` module connected to the QML UI for effect selection and parameter control
- Effect preview — apply an effect temporarily, hear the result, accept or cancel
- `src/spectrogram` visualization connected to `au3-wave-track-fft` and `pffft`
- `au3-dynamic-range-processor` for compression/expansion
- Time-stretching via `libsbsms` and pitch shifting via `SoundTouch`
- `libsoxr` sample rate conversion

**Why this is Stage 4:**
Effects processing is what separates Audacity from a simple audio player. The built-in effects are pure DSP math — they compile to WASM without platform dependencies. But the integration — real-time preview, UI feedback, effect chaining — requires the audio pipeline from Stage 3 to be working first.

**Deliverable:** Import a file. Select a region. Apply noise reduction. Hear the preview. Accept. Apply EQ. Export the processed result. The full audio editing workflow.

**Effort:** L. The effects themselves are pure C++ math. The integration work is connecting QML UI to the effects system. Most of this is already wired in Audacity 4's `src/effects` module — the WASM port inherits the integration.

### Stage 5: The Studio (Recording + Persistence)

**Goal:** Record audio from the microphone. Save projects to persistent browser storage. Resume work across sessions. Export to multiple formats (WAV, MP3, OGG, FLAC).

**What gets built:**
- Microphone input via `getUserMedia()` feeding into the Web Audio API backend
- Recording engine (`src/record`) connected to the browser's MediaStream API
- Input level monitoring and device selection via `navigator.mediaDevices.enumerateDevices()`
- IDBFS persistent storage — projects survive browser refresh and tab close
- Export pipeline: WAV (native), MP3 (via LAME compiled to WASM or existing au3 encoder), OGG (libvorbis), FLAC
- `twolame` for MP2 export if needed
- Project auto-save to IDBFS on a timer
- Storage quota management — warn users when IndexedDB is running low

**Why this is Stage 5:**
Recording requires the audio pipeline from Stage 3 to work bidirectionally. Persistence requires the file I/O from Stage 2 to integrate with IDBFS. Both are extensions of existing infrastructure, not new architectures. That is why they come after the foundations are proved.

**Deliverable:** Open the browser. Record your voice. Edit the recording. Apply effects. Save the project. Close the tab. Open it again. The project is still there. Export to MP3. Done.

**Effort:** L. The `getUserMedia` → Web Audio API → AudioWorklet pipeline is well-documented. IDBFS is a standard Emscripten feature. The export codecs are pure C libraries that compile to WASM.

### Stage 6: The Platform (Advanced Features)

**Goal:** Everything else. Nyquist scripting. Cloud audiocom integration. Keyboard customization. Accessibility. Advanced UI features.

**What gets built:**
- Nyquist interpreter compiled to WASM — custom Lisp runtime running in the browser
- Nyquist script editor integrated into the QML UI
- Cloud audiocom integration for sharing and collaboration
- Full keyboard shortcut customization
- Accessibility: screen reader support via ARIA on the Qt WASM canvas
- Multi-tab project support (multiple projects open simultaneously)
- Offline support via Service Worker (PWA)
- Web-native audio analysis plugins (replacing native Vamp plugins with JavaScript or WASM-based analysis modules)

**Why this is Stage 6:**
These features are individually valuable but none of them are required for the core audio editing workflow. Stages 1-5 deliver a fully functional audio editor. Stage 6 makes it a platform.

**Deliverable:** A complete browser-based Audacity that matches the desktop version's core functionality and adds web-native capabilities that the desktop version cannot offer — instant sharing via URL, zero-install access, cross-platform consistency, and progressive web app installation.

**Effort:** XL. The Nyquist interpreter alone is a major compilation target. But each sub-feature in this stage is independent — they can be developed in parallel and shipped incrementally.

### What Is NOT Ported

Some features are explicitly excluded. Not deferred — excluded. They have no browser equivalent and no value in a browser context:

| Feature | Why It Is Excluded |
|---------|--------------------|
| **VST/VST3 plugins** | Native binary loading. Fundamentally incompatible with WASM sandboxing. |
| **LV2/LADSPA plugins** | Same as VST. Native shared library loading. |
| **AudioUnit plugins** | macOS-only. Native binary loading. |
| **CD burning** | portburn requires OS-level CD drive access. Browsers cannot do this. |
| **System mixer control** | portmixer requires OS-level audio device control. Browsers expose a simpler device model. |
| **Multiple simultaneous audio devices** | PortAudio can address multiple devices. Web Audio API addresses the system default. |
| **ASIO driver support** | Windows-specific low-latency audio. Not applicable in browsers. |

These exclusions do not reduce the value of AUDACIOUS. They are desktop-specific features that solve desktop-specific problems. The browser has its own equivalents where equivalents matter, and gracefully omits the rest.

---

## Risk Assessment

Every technical project has risks. The honest ones name them. AUDACIOUS has five categories of risk: architectural, performance, dependency, browser platform, and project management. Each risk is rated by likelihood, impact, and mitigation clarity.

### Risk 1: The MuseScore Framework Does Not Compile

**Likelihood:** High
**Impact:** Critical — blocks the entire port
**Stage Affected:** Stage 1

The MuseScore framework (`muse_framework`) has never been compiled for WebAssembly. It is a large Qt-based application framework originally built for MuseScore Studio. It almost certainly contains:

- `QProcess` usage (spawning native processes — impossible in WASM)
- Platform-specific code paths guarded by `#ifdef Q_OS_WIN` / `Q_OS_MAC` / `Q_OS_LINUX` without an `EMSCRIPTEN` branch
- Native file dialog calls that bypass Qt's abstraction
- System tray, dock, and native window management APIs
- Native crash reporting and diagnostics hooks

**Mitigation:** This is why Stage 1 exists in isolation. The entire first stage is dedicated to getting the framework to compile. The mitigation strategy is `#ifdef __EMSCRIPTEN__` stubs for every platform-specific call, a dedicated Emscripten platform module in the framework, and upstream contribution of these changes if the Audacity/MuseScore team is receptive. The framework is Qt-based, which means the core architecture is WASM-compatible — the risk is in the edges, not the center.

**Worst case:** If the framework proves fundamentally incompatible, AUDACIOUS could bypass it by building a minimal application shell directly on Qt WASM, using only the framework's module interfaces without the framework's lifecycle management. This loses some infrastructure but preserves the port.

### Risk 2: Audio Latency Is Unacceptable

**Likelihood:** Medium
**Impact:** High — degrades the core user experience
**Stage Affected:** Stage 3

Web Audio API introduces latency that native PortAudio does not. The AudioWorklet thread scheduling is controlled by the browser, not the application. The round-trip from user action → audio graph processing → output has more hops in the browser than in a native application.

For playback-only workflows, this is manageable. Users press play and hear audio with a few milliseconds of additional latency. Imperceptible.

For real-time monitoring during recording — hearing your microphone input with effects applied in real time — the latency may be perceptible and annoying. Native Audacity with ASIO drivers can achieve <5ms round-trip. Browser audio typically achieves 20-50ms.

**Mitigation:** AudioWorklet was specifically designed to address this. The worklet runs on a dedicated high-priority thread with predictable timing. `AudioContext.baseLatency` and `AudioContext.outputLatency` provide precise measurement. The `latencyHint: "interactive"` option on AudioContext creation requests the lowest latency the browser can provide. For monitoring during recording, a direct pass-through from input to output (bypassing the WASM processing graph) can achieve near-native latency.

**Worst case:** Real-time monitoring with effects has noticeable latency. This is acceptable — most browser audio applications live with this constraint. The core workflow (record → edit → apply effects → export) is unaffected.

### Risk 3: Binary Size Exceeds Browser Tolerance

**Likelihood:** High
**Impact:** Medium — affects first-load time, not functionality
**Stage Affected:** All stages

The full Audacity 4 binary compiled to WASM will be large. Qt alone adds 30-50MB to a WASM build. Add the audio engine, effects library, DSP dependencies, SQLite, and the MuseScore framework, and the total uncompressed WASM binary could reach 80-120MB. Even with Brotli compression (typically 60-70% reduction), the download could be 30-50MB.

For comparison:
- Google Earth (WASM) loads ~30MB
- AutoCAD Web loads ~40MB
- Figma loads ~25MB

AUDACIOUS would be in the same class as these applications — large but not unprecedented.

**Mitigation:**

1. **Aggressive dead-code elimination.** Emscripten's `-flto` (link-time optimization) and `wasm-opt` can strip unreachable code. Disabling VST/LV2/LADSPA/AudioUnit/Nyquist in early stages significantly reduces binary size.
2. **Module splitting.** WASM supports dynamic module loading via `dlopen` emulation. The effects library, spectrogram module, and recording module can be loaded on demand rather than upfront.
3. **Streaming compilation.** Modern browsers compile WASM while downloading it. A 50MB WASM file does not mean 50MB of download-then-wait — the browser begins compilation during the download.
4. **Caching.** Service Worker caching means the large download happens once. Subsequent visits load from cache.
5. **Progressive loading UI.** Show a meaningful loading screen with progress indication. Users tolerate a 10-second load if they can see it progressing.

**Worst case:** First load takes 15-20 seconds on a fast connection. Subsequent loads are instant from cache. This is the same experience as any large web application.

### Risk 4: SharedArrayBuffer / COOP-COEP Requirements

**Likelihood:** Certain (this is a known requirement, not a risk)
**Impact:** Medium — affects deployment configuration
**Stage Affected:** Stage 3+

SharedArrayBuffer is required for threading (audio processing, UI responsiveness during heavy computation). SharedArrayBuffer requires Cross-Origin-Opener-Policy (COOP) and Cross-Origin-Embedder-Policy (COEP) HTTP headers on every response.

This means:
- AUDACIOUS cannot be hosted on a simple static file server without header configuration
- AUDACIOUS cannot be embedded in an `<iframe>` on a page that does not set these headers
- All subresources (scripts, WASM modules, workers) must be served with correct CORS headers
- Third-party CDN resources may not work without `crossorigin` attributes

**Mitigation:** This is a deployment configuration issue, not a code issue. The headers are:

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

Every modern hosting platform (Vercel, Netlify, Cloudflare Pages, AWS S3+CloudFront) supports custom headers. This is a one-time configuration task documented in the deployment guide.

**Worst case:** No worst case. This is a solved problem. Every WASM application with threading uses these headers. The only risk is forgetting to configure them.

### Risk 5: Audacity 4 Is a Moving Target

**Likelihood:** Certain
**Impact:** Medium — affects maintenance, not feasibility
**Stage Affected:** All stages

Audacity 4 is in active development. The codebase changes daily. The MuseScore framework integration is still being refined. Module boundaries are still shifting. Building AUDACIOUS against `master` means building against a moving target.

**Mitigation:**

1. **Pin to a specific commit or tag.** AUDACIOUS should track a specific Audacity 4 release or commit hash, not `HEAD`. Update deliberately, not continuously.
2. **The `au3wrap` boundary is stable.** Even as the internals of `src/` and `au3/` evolve, the wrapper interface between them is designed to be stable. AUDACIOUS's modifications live primarily at this boundary.
3. **Upstream-first approach.** Where possible, contribute Emscripten compatibility changes upstream to the Audacity repository. `#ifdef __EMSCRIPTEN__` branches in the framework and build system benefit both projects. If upstream accepts them, AUDACIOUS stays compatible automatically.
4. **Track the release cadence.** Audacity 4.0.0 is pre-release. Once it stabilizes (4.0 release), the API surface will be more reliable. AUDACIOUS development should intensify after the first stable release.

**Worst case:** A major architectural change in Audacity 4 breaks AUDACIOUS's assumptions. The six-stage structure limits the blast radius — only the affected stage needs rework, and earlier stages remain valid.

### Risk Summary Matrix

| Risk | Likelihood | Impact | Mitigation Clarity | Overall |
|------|-----------|--------|-------------------|---------|
| MuseScore framework compilation | High | Critical | Medium — requires exploration | **High risk** |
| Audio latency | Medium | High | High — AudioWorklet is designed for this | **Medium risk** |
| Binary size | High | Medium | High — known techniques, proven precedents | **Medium risk** |
| COOP/COEP headers | Certain | Medium | High — solved problem | **Low risk** |
| Moving target codebase | Certain | Medium | Medium — pin versions, upstream changes | **Medium risk** |

The risk profile is front-loaded. The highest-risk item (MuseScore framework compilation) is addressed in Stage 1. If Stage 1 succeeds, the remaining risks are all manageable with known techniques. This is the correct structure — fail fast on the hardest problem, then execute on proven ground.

---
