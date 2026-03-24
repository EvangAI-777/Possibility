**TEMPLATE.md — 3D-to-Web Porting Template**

## **Context**

A new master document called TEMPLATE.md that serves as a reusable, running-entry schema for porting large native applications (Audacity, Unreal Engine, Roblox, Roblox Studio, whole games, etc.) to the browser via WebAssembly.  
Key requirements:

* Generic enough for any native app, specific enough to include real technical guidance  
* Uses the existing doc patterns: philosophical quotes, status markers, tables, code snippets, cross-references, AI guidance sections

## **Implementation**

Write the full document with these sections (matching the existing repo markdown style):  
---

#### **Header / Meta**

* Title: "3D-to-Web Porting Template"  
* Opening quote: "Belief shapes reality"  
* Purpose statement: this is a running-entry schema for porting native apps to the browser  
* Fill-in fields: \[PROJECT\_NAME\], \[SOURCE\_APP\], target browsers

#### **Section 1: Philosophy Alignment**

* Restate the core principles adapted for any port (appreciate existing code, do the work, don't create complexity)  
* Table mapping each principle to porting relevance

#### **Section 2: Source Application Inventory**

* Subsystem audit checklist (GPU, audio, file I/O, networking, scripting, threading, input)  
* Dependency audit table (extern libs, system calls, platform APIs)  
* GPU API identification (OpenGL, DirectX, Vulkan, Metal → WebGL2/WebGPU)  
* Threading model assessment

#### **Section 3: Build System Translation**

* Native build → Emscripten cross-compilation  
* Build-tool / browser-target separation  
* CMake/Makefile adaptation patterns  
* Code snippets for emcmake, build tool flags, SINGLE\_FILE  
* Global flag safety rules (from WARNINGS.md pitfalls)

#### **Section 4: GPU / Graphics Translation Layer**

* Desktop API → WebGL2 mapping table (GL 4.3 features vs ES 3.0)  
* Shader language translation (GLSL version rewriting, sampler emulation)  
* Feature gap strategies: CPU fallbacks, no-op stubs, emulation layers  
* Compute shader → CPU fallback pattern (from Blended's 6 dispatch sites)  
* SSBO → UBO rewriting pattern  
* Compatibility shim architecture (epoxy pattern)  
* WebGPU as future path

#### **Section 5: Audio Translation**

* Native audio APIs → Web Audio API / Emscripten SDL audio bridge  
* AudioWorklet for real-time processing  
* Autoplay policy handling (user gesture requirement)

#### **Section 6: File I/O Translation**

* Native filesystem → Emscripten virtual FS (MEMFS, IDBFS, WORKERFS)  
* Browser download API for export  
* Drag-and-drop file ingestion  
* IndexedDB for persistent storage

#### **Section 7: Threading Model**

* Native threads → Web Workers \+ SharedArrayBuffer  
* Atomics constraints and COOP/COEP headers  
* \-pthread scoping rules (NEVER global — from WARNINGS.md)  
* coi-serviceworker pattern for GitHub Pages  
* Single-threaded fallback strategy

#### **Section 8: Networking**

* Native sockets → WebSocket / WebRTC / Fetch API  
* Real-time multiplayer considerations (WebRTC data channels)  
* Server-mediated vs peer-to-peer

#### **Section 9: Input Handling**

* Native input → browser events (mouse, keyboard, touch, gamepad)  
* Pointer Lock API for FPS-style input  
* Touch event → mouse event mapping  
* Gamepad API integration  
* SDL2 in Emscripten handles most of this

#### **Section 10: Scripting / Plugin Systems**

* Native scripting (Python, Lua, C\#) → WASM alternatives  
* Pyodide (Python), QuickJS (JavaScript), Lua-WASM  
* Plugin architecture adaptation

#### **Section 11: Staged Deployment Plan**

* Template for phased porting  
* Stage template with: Status, Features, What's Disabled, Technical Challenges, Effort  
* Priority ordering rationale (quick wins first, dependencies second)  
* Tier/feature-gate alignment

#### **Section 12: Performance & Optimization**

* WASM SIMD (\-msimd128)  
* Streaming compilation (Content-Type: application/wasm)  
* Module splitting / lazy loading  
* wasm-opt passes (and OOM avoidance)  
* Brotli/gzip compression  
* IndexedDB caching for repeat visits  
* Web Workers for background computation

#### **Section 13: Known Pitfalls (Generalized)**

* Generalized versions of pitfalls:  
  * Global flag contamination  
  * OOM on CI (use \--parallel 2)  
  * wasm-opt OOM on large binaries  
  * 32-bit pointer/size\_t assumptions  
  * UNIX=true false matches  
  * Build tools need SINGLE\_FILE and crosscompiling emulator  
  * Don't shadow real WebGL2 functions in shims  
  * Library version mismatches in Emscripten ports  
  * Type system differences (libjpeg boolean, etc.)  
* Each pitfall: What happened → Rule → Correct approach

#### **Section 14: Web Shell / UI Chrome**

* HTML/CSS/JS loading overlay pattern  
* Progress reporting via Module.setStatus  
* Feature detection checkmarks  
* Drag-and-drop zone  
* Responsive layout considerations

#### **Section 15: CI/CD Pipeline**

* GitHub Actions workflow template for WASM builds  
* Emscripten SDK setup  
* Build parallelism (OOM avoidance)  
* GitHub Pages deployment  
* Artifact management

#### **Section 16: Browser Compatibility Matrix**

* Template table: Browser × Feature (WebGL2, SharedArrayBuffer, WASM, WebGPU)  
* COOP/COEP header requirements  
* Mobile considerations

#### **Section 17: For AI Assistants**

* Read existing docs before proposing changes  
* Trust documented pitfalls  
* Don't re-add known-bad flags  
* One subsystem per PR  
* Believe user observations over theories

#### **Section 18: Document Map**

* Cross-reference pattern for derivative projects

#### **Section 19: Validation & Early Detection**

\*\*Purpose:\*\* Catch failures before deployment. A successful build can produce a corrupted or incomplete binary without reporting errors.

\*\*Subsection 19.1: Binary Validation\*\*

Install the WebAssembly Binary Toolkit (WABT):  
\`\`\`bash  
\# macOS  
brew install wabt

\# Ubuntu/Debian  
sudo apt-get install wabt

\# Windows  
\# Download from https://github.com/WebAssembly/wabt/releases  
\`\`\`

After your build completes, validate the output binary:  
\`\`\`bash  
wasm-validate output.wasm  
wasm-objdump \-h output.wasm  
\`\`\`

\*\*Success criteria:\*\*  
\- \`wasm-validate\` exits with code 0  
\- \`wasm-objdump \-h\` displays expected sections  
\- File size is within expected range (establish baseline from first successful build)

\*\*Failure criteria:\*\*  
\- Either command fails or exits with error code  
\- File size is unexpectedly small (truncation)  
\- Sections appear incomplete or malformed

Do not deploy if validation fails. Rebuild before attempting deployment.

\*\*Subsection 19.2: Staged Testing Before Deployment\*\*

Test through progressive environments:

\*\*Stage 1: Local machine, local server\*\*  
\- Build locally using your cross-compiler  
\- Serve via local HTTP server  
\- Open in your primary target browser  
\- Verify: no console errors, app initializes, responds to basic input

\*\*Stage 2: Local machine, different browser\*\*  
\- Test same local server in a different browser  
\- If only one browser fails, suspect GPU or driver issue, not binary corruption

\*\*Stage 3: Different machine, staging URL\*\*  
\- Deploy to non-production environment  
\- Access from a machine other than your development machine  
\- If staging works but local also worked, suspect deployment process (missing files, incorrect paths)

\*\*Stage 4: Production\*\*  
\- Only proceed after Stages 1–3 pass

\*\*Subsection 19.3: Health Check Matrix\*\*

Before marking a build ready for production:

| Check | Expected | If Failed |  
|-------|----------|-----------|  
| \`wasm-validate\` exit code | 0 | Do not deploy; rebuild |  
| Binary file size | Within 10% of baseline | Investigate truncation |  
| Browser console at startup | No red errors | Fix before deploy |  
| App responds to input | User interaction works | Debug event handling |  
| Initialization completes | Within timeout window | Investigate slow startup |  
| Behavior consistent across target browsers | Same result in all | Document browser-specific issues |

\*\*Subsection 19.4: Initialization Instrumentation\*\*

Add logging to your initialization sequence that writes to both console and page:

\`\`\`javascript  
Module.print \= function(text) {  
  console.log("\[YourApp\] " \+ text);  
  var logDiv \= document.getElementById('app-diagnostic-log');  
  if (logDiv) logDiv.innerHTML \+= text \+ '\<br\>';  
};

Module.printErr \= function(text) {  
  console.warn("\[YourApp\] " \+ text);  
  var logDiv \= document.getElementById('app-diagnostic-log');  
  if (logDiv) logDiv.innerHTML \+= '\<span style="color:red"\>' \+ text \+ '\</span\>\<br\>';  
};  
\`\`\`

Log these checkpoints:  
\- Module initialization started  
\- Each major subsystem initialized  
\- Ready for user input  
\- Any allocation or loading failures

\*\*Subsection 19.5: CI Artifact Validation\*\*

After CI pipeline completes, before merging or deploying:

1\. Download the built artifact  
2\. Run \`wasm-validate artifact.wasm\` on your local machine  
3\. Verify file size is in expected range  
4\. Only proceed if validation passes

CI systems report "build succeeded" but can produce truncated or incomplete artifacts silently.

#### **Section 20: When It Goes Silent — Diagnostic Flowchart**

\*\*Scenario:\*\* Build reports success, deployment completes, but the app produces a blank screen or hangs indefinitely with no error messages visible.

\*\*20.1: Binary Is Corrupted\*\*

\*Observable symptoms:\*  
\- Blank screen immediately after page load  
\- No output in browser console  
\- Timeout fires reliably if you have one implemented

\*Diagnostic step:\*  
\`\`\`bash  
wasm-validate your-app.wasm  
\`\`\`

If this fails, the binary is corrupted and cannot run.

\*Possible root causes:\*  
\- Build system ran out of memory during linking  
\- Post-processing tool was killed mid-operation  
\- Disk full or I/O error during artifact write  
\- CI runner crashed after build but before artifact saved

\*What to do:\*  
\- Rebuild with reduced resource usage  
\- Check build logs for out-of-memory or crash messages  
\- Do not deploy until binary validates successfully

\*\*20.2: Initialization Sequence Hangs\*\*

\*Observable symptoms:\*  
\- Console shows some output from startup, then stops  
\- Timeout fires after your defined duration  
\- App is partially initialized but blocked on something specific

\*Diagnostic steps:\*  
\- Examine console output: at what point does it stop?  
\- Add logging at each step of initialization  
\- Test in all target browsers to see if this is consistent  
\- Watch CPU and memory usage during startup (infinite loop would show high CPU; memory exhaustion would show heap growth)

\*Possible root causes:\*  
\- Initialization code contains an infinite loop or blocking call  
\- Deadlock in synchronization or threading code  
\- Memory allocation fails and error is not handled  
\- Filesystem setup tries to load or populate large amounts of data synchronously  
\- Graphics context creation is blocking

\*What to do:\*  
\- Break initialization into smaller steps, log after each one  
\- Move non-critical startup work to happen after app is interactive  
\- Reduce initial memory allocation and test  
\- Simplify filesystem initialization  
\- Test with threading disabled to rule out synchronization issues

\*\*20.3: Silent Failure — No Output, No Errors\*\*

\*Observable symptoms:\*  
\- Page is completely blank  
\- Browser console is empty  
\- No network errors or security warnings visible  
\- Page appears to be frozen

\*Diagnostic steps:\*  
\- Open DevTools and check Console tab explicitly  
\- Check Network tab for failed requests (404 errors on .wasm, .js, or .css files)  
\- Try the same URL in a different browser  
\- Inspect the page source to verify HTML is rendering at all

\*Possible root causes:\*  
\- Network policy (CORS) preventing asset load  
\- Content security policy (CSP) blocking script execution  
\- Missing HTTP headers required for certain WASM features  
\- Asset file not deployed or served with wrong file type declaration  
\- JavaScript error in your web shell code before the app prints its first message  
\- GPU or graphics API not supported on this machine

\*What to do:\*  
\- Verify all required asset files are present in deployment  
\- Check HTTP response headers are correct  
\- Test in browser with full diagnostics enabled  
\- Check GPU support on target machine  
\- Wrap initialization code in try/catch to surface errors

\*\*20.4: Works on Your Machine, Fails When Deployed\*\*

\*Observable symptoms:\*  
\- App works correctly when run from localhost  
\- Same binary deployed to hosting fails  
\- No code was changed between local and deployed versions

\*Diagnostic steps:\*  
\- Compare HTTP response headers between localhost and deployed version  
\- Check Network tab in deployed version to verify all assets downloaded  
\- Verify .wasm file is being served with correct file type  
\- Compare file sizes: deployed .wasm should match local .wasm

\*Possible root causes:\*  
\- Asset paths are hardcoded as absolute paths (work on localhost, break on hosting)  
\- Hosting is missing HTTP headers required for your app  
\- .wasm or .js files are not included in deployment  
\- Hosting is serving cached old version  
\- Hosting platform is not configured to serve WASM files

\*What to do:\*  
\- Change asset paths to relative paths (use \`./app.wasm\` instead of \`/app.wasm\`)  
\- Add required HTTP headers to your hosting configuration  
\- Verify deployment process includes all asset files  
\- Clear browser cache on hosted URL  
\- Verify hosting platform supports serving WASM

\*\*20.5: Works in One Browser, Not Others\*\*

\*Observable symptoms:\*  
\- App runs in Chrome but fails in Firefox or Safari  
\- Console output differs between browsers  
\- Same URL, same machine, different result

\*Diagnostic steps:\*  
\- Check what graphics APIs are available in failing browser  
\- Compare console output line-by-line between working and failing browser  
\- Verify failing browser supports required features (threading, WASM features, graphics APIs)  
\- Test rendering features individually if applicable

\*Possible root causes:\*  
\- GPU driver differences between browsers  
\- Graphics API support varies by browser and operating system  
\- Shader syntax compatibility issues  
\- Browser security policy blocking threading or other features  
\- Missing feature detection code

\*What to do:\*  
\- Implement feature detection at startup to check what's available  
\- Provide fallback code paths for optional features  
\- Test on target browser's hardware  
\- Document which browsers are supported and why

\*\*20.6: Memory Exhaustion During Startup\*\*

\*Observable symptoms:\*  
\- App prints startup messages  
\- Browser tab becomes unresponsive after a few seconds  
\- System memory usage grows continuously  
\- App eventually crashes

\*Diagnostic steps:\*  
\- Open DevTools Memory tab  
\- Take heap snapshot at start  
\- Wait 5 seconds, take another snapshot  
\- Compare the two: is heap growing linearly, exponentially, or unbounded?  
\- Check console for allocation failure messages

\*Possible root causes:\*  
\- Initial memory allocation is too large for target machines  
\- Startup code allocates memory in a loop without freeing it (memory leak)  
\- Large files or data structures are being loaded entirely into memory  
\- Startup initialization performs expensive computations repeatedly

\*What to do:\*  
\- Start with smaller initial memory allocation, increase if needed  
\- Stream large files instead of loading them all at once  
\- Add memory usage logging to find where growth happens  
\- Profile startup to identify expensive operations

\*\*20.7: Diagnostic Decision Tree\*\*

\`\`\`  
App is blank or hung after deployment  
│  
├─ Does wasm-validate pass?  
│  ├─ NO → Section 20.1 (Binary Corrupted)  
│  └─ YES → Continue  
│  
├─ Does browser console show any output?  
│  ├─ YES, but stops partway through → Section 20.2 (Initialization Hangs)  
│  ├─ NO, console is empty → Section 20.3 (Silent Failure)  
│  └─ YES, complete output but page blank → Check page HTML/CSS  
│  
├─ Does it work on localhost but not on deployed host?  
│  └─ YES → Section 20.4 (Local vs Deployed)  
│  
├─ Does it work in some browsers but not others?  
│  └─ YES → Section 20.5 (Browser Specific)  
│  
├─ Is system memory growing without stopping?  
│  └─ YES → Section 20.6 (Memory Exhaustion)  
│  
└─ None of the above → Review your build logs, compiler output, and CI pipeline for warnings you may have missed  
\`\`\`

\*\*20.8: When to Escalate\*\*

If you have worked through 20.1–20.7 and still cannot identify the problem:

\*Gather:\*  
1\. Complete build log from CI (not just final line)  
2\. Full browser console output from startup to failure  
3\. Network tab showing all requests and responses  
4\. Memory profiler graph showing heap over time  
5\. The exact steps to reproduce (URL, browser, operating system)

\*Next steps:\*  
\- Search for similar issues in your build tool's issue tracker  
\- Search for similar issues in the WebAssembly community resources  
\- Post in your project's issue tracker with all the information above  
\- Consider if a simpler version (fewer features, less complex) would help identify where the problem is