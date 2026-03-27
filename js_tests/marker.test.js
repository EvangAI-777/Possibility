/**
 * Tests for the MARKER Markdown Viewer & Renderer.
 *
 * The engine lives inside MARKER.html as inline JS.
 * We extract the core screen management and helper logic
 * and test it here, plus validate the HTML structure.
 */

const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'HTML Files', 'MARKER.html');
const docsPath = path.join(__dirname, '..', 'docs', 'MARKER.html');

// ===========================================================================
//                         FILE EXISTENCE & STRUCTURE
// ===========================================================================

describe('MARKER.html files exist', () => {
  test('source file exists in HTML Files/', () => {
    expect(fs.existsSync(htmlPath)).toBe(true);
  });

  test('deployed file exists in docs/', () => {
    expect(fs.existsSync(docsPath)).toBe(true);
  });

  test('source and docs copies are identical', () => {
    const source = fs.readFileSync(htmlPath, 'utf-8');
    const docs = fs.readFileSync(docsPath, 'utf-8');
    expect(source).toBe(docs);
  });
});

// ===========================================================================
//                         HTML STRUCTURE
// ===========================================================================

describe('HTML structure', () => {
  let html;
  beforeAll(() => { html = fs.readFileSync(htmlPath, 'utf-8'); });

  test('has correct title', () => {
    expect(html).toMatch(/<title>MARKER.*Markdown/);
  });

  test('has DOCTYPE declaration', () => {
    expect(html).toMatch(/<!DOCTYPE html>/i);
  });

  test('has lang attribute', () => {
    expect(html).toMatch(/<html lang="en">/);
  });

  test('has viewport meta tag', () => {
    expect(html).toMatch(/<meta name="viewport"/);
  });
});

// ===========================================================================
//                       CDN DEPENDENCIES
// ===========================================================================

describe('CDN dependencies', () => {
  let html;
  beforeAll(() => { html = fs.readFileSync(htmlPath, 'utf-8'); });

  test('includes marked.js', () => {
    expect(html).toMatch(/marked.*\.min\.js/);
  });

  test('includes highlight.js library', () => {
    expect(html).toMatch(/highlight.*\.min\.js/);
  });

  test('includes highlight.js github-dark theme', () => {
    expect(html).toMatch(/github-dark.*\.min\.css/);
  });

  test('does not include React (not needed)', () => {
    expect(html).not.toMatch(/unpkg\.com\/react@/);
  });

  test('does not include Babel (not needed)', () => {
    expect(html).not.toMatch(/babel.*standalone/);
  });
});

// ===========================================================================
//                         FOUR-SCREEN ARCHITECTURE
// ===========================================================================

describe('four-screen architecture', () => {
  let html;
  beforeAll(() => { html = fs.readFileSync(htmlPath, 'utf-8'); });

  test('has upload screen', () => {
    expect(html).toMatch(/id="upload-screen"/);
  });

  test('has loading screen', () => {
    expect(html).toMatch(/id="loading-screen"/);
  });

  test('has error screen', () => {
    expect(html).toMatch(/id="error-screen"/);
  });

  test('has component view (rendered markdown)', () => {
    expect(html).toMatch(/id="component-view"/);
  });

  test('upload screen has drop zone', () => {
    expect(html).toMatch(/id="drop-zone"/);
  });

  test('file input accepts markdown files', () => {
    expect(html).toMatch(/accept="\.md,\.markdown,\.txt"/);
  });
});

// ===========================================================================
//                        MARKER BRANDING
// ===========================================================================

describe('MARKER branding', () => {
  let html;
  beforeAll(() => { html = fs.readFileSync(htmlPath, 'utf-8'); });

  test('has MARKER title', () => {
    expect(html).toMatch(/class="upload-title">MARKER</);
  });

  test('has markdown subtitle', () => {
    expect(html).toMatch(/Markdown Viewer.*Renderer/);
  });

  test('has marker logo animation', () => {
    expect(html).toMatch(/class="marker-logo"/);
  });

  test('has marker pen element', () => {
    expect(html).toMatch(/class="marker-pen"/);
  });

  test('has marker stroke animation', () => {
    expect(html).toMatch(/class="marker-stroke"/);
  });

  test('has marker-glow CSS variable', () => {
    expect(html).toMatch(/--marker-glow/);
  });
});

// ===========================================================================
//                     LOADING PIPELINE STEPS
// ===========================================================================

describe('loading pipeline', () => {
  let html;
  beforeAll(() => { html = fs.readFileSync(htmlPath, 'utf-8'); });

  test('has step-read', () => {
    expect(html).toMatch(/id="step-read"/);
  });

  test('has step-parse', () => {
    expect(html).toMatch(/id="step-parse"/);
  });

  test('has step-render', () => {
    expect(html).toMatch(/id="step-render"/);
  });

  test('step labels are markdown-specific', () => {
    expect(html).toMatch(/Reading file/);
    expect(html).toMatch(/Parsing Markdown/);
    expect(html).toMatch(/Rendering document/);
  });
});

// ===========================================================================
//                    GITHUB DARK THEME (CSS VARIABLES)
// ===========================================================================

describe('GitHub Dark theme consistency', () => {
  let html;
  beforeAll(() => { html = fs.readFileSync(htmlPath, 'utf-8'); });

  const expectedVars = [
    '--bg: #0d1117',
    '--surface: #161b22',
    '--surface-hover: #1c2129',
    '--border: #30363d',
    '--text: #e6edf3',
    '--text-muted: #8b949e',
    '--accent: #58a6ff',
    '--accent-hover: #79b8ff',
    '--green: #3fb950',
    '--yellow: #d29922',
    '--red: #f85149',
  ];

  test.each(expectedVars)('contains CSS variable %s', (cssVar) => {
    expect(html).toContain(cssVar);
  });
});

// ===========================================================================
//                       MARKDOWN RENDERING FEATURES
// ===========================================================================

describe('markdown rendering features', () => {
  let html;
  beforeAll(() => { html = fs.readFileSync(htmlPath, 'utf-8'); });

  test('has markdown output container', () => {
    expect(html).toMatch(/id="markdown-output"/);
  });

  test('has markdown-body class for styling', () => {
    expect(html).toMatch(/class="markdown-body"/);
  });

  test('has table of contents sidebar', () => {
    expect(html).toMatch(/id="toc-sidebar"/);
  });

  test('has TOC list container', () => {
    expect(html).toMatch(/id="toc-list"/);
  });

  test('has TOC toggle for mobile', () => {
    expect(html).toMatch(/id="toc-toggle"/);
  });

  test('styles code blocks', () => {
    expect(html).toMatch(/\.markdown-body pre/);
  });

  test('styles blockquotes', () => {
    expect(html).toMatch(/\.markdown-body blockquote/);
  });

  test('styles tables', () => {
    expect(html).toMatch(/\.markdown-body table/);
  });

  test('has copy code button styling', () => {
    expect(html).toMatch(/\.copy-code-btn/);
  });

  test('has code language label styling', () => {
    expect(html).toMatch(/\.code-lang-label/);
  });
});

// ===========================================================================
//                       JAVASCRIPT ENGINE
// ===========================================================================

describe('JavaScript engine', () => {
  let html;
  beforeAll(() => { html = fs.readFileSync(htmlPath, 'utf-8'); });

  test('defines MARKER IIFE', () => {
    expect(html).toMatch(/const MARKER = \(\(\) =>/);
  });

  test('has deploy function', () => {
    expect(html).toMatch(/async function deploy\(file\)/);
  });

  test('has reset function', () => {
    expect(html).toMatch(/function reset\(\)/);
  });

  test('has showScreen function', () => {
    expect(html).toMatch(/function showScreen\(name\)/);
  });

  test('has wrapCodeBlocks function', () => {
    expect(html).toMatch(/function wrapCodeBlocks\(container\)/);
  });

  test('has buildTableOfContents function', () => {
    expect(html).toMatch(/function buildTableOfContents\(container\)/);
  });

  test('has renderTOC function', () => {
    expect(html).toMatch(/function renderTOC\(toc\)/);
  });

  test('has setupScrollSpy function', () => {
    expect(html).toMatch(/function setupScrollSpy\(\)/);
  });

  test('has toggleTOC function', () => {
    expect(html).toMatch(/function toggleTOC\(\)/);
  });

  test('uses FileReader API', () => {
    expect(html).toMatch(/new FileReader\(\)/);
  });

  test('uses marked.parse for rendering', () => {
    expect(html).toMatch(/marked\.parse\(/);
  });

  test('uses hljs for syntax highlighting', () => {
    expect(html).toMatch(/hljs\.highlight\(/);
    expect(html).toMatch(/hljs\.highlightAuto\(/);
  });

  test('uses IntersectionObserver for scroll spy', () => {
    expect(html).toMatch(/new IntersectionObserver/);
  });

  test('uses navigator.clipboard for copy', () => {
    expect(html).toMatch(/navigator\.clipboard\.writeText/);
  });

  test('has clipboard fallback for non-HTTPS', () => {
    expect(html).toMatch(/document\.execCommand\('copy'\)/);
  });

  test('returns public API with deploy, reset, toggleTOC', () => {
    expect(html).toMatch(/return \{ deploy, reset, toggleTOC \}/);
  });
});

// ===========================================================================
//                    EVENT WIRING
// ===========================================================================

describe('event wiring', () => {
  let html;
  beforeAll(() => { html = fs.readFileSync(htmlPath, 'utf-8'); });

  test('listens for DOMContentLoaded', () => {
    expect(html).toMatch(/DOMContentLoaded/);
  });

  test('handles file input change', () => {
    expect(html).toMatch(/fileInput\.addEventListener\('change'/);
  });

  test('handles dragover', () => {
    expect(html).toMatch(/dropZone\.addEventListener\('dragover'/);
  });

  test('handles dragleave', () => {
    expect(html).toMatch(/dropZone\.addEventListener\('dragleave'/);
  });

  test('handles drop', () => {
    expect(html).toMatch(/dropZone\.addEventListener\('drop'/);
  });

  test('calls MARKER.deploy on file select', () => {
    expect(html).toMatch(/MARKER\.deploy\(file\)/);
  });

  test('calls MARKER.reset on back pill click', () => {
    expect(html).toMatch(/onclick="MARKER\.reset\(\)"/);
  });

  test('calls MARKER.toggleTOC on toggle click', () => {
    expect(html).toMatch(/onclick="MARKER\.toggleTOC\(\)"/);
  });
});

// ===========================================================================
//                    RESPONSIVE DESIGN
// ===========================================================================

describe('responsive design', () => {
  let html;
  beforeAll(() => { html = fs.readFileSync(htmlPath, 'utf-8'); });

  test('has 768px breakpoint for TOC', () => {
    expect(html).toMatch(/max-width:\s*768px/);
  });

  test('has 480px breakpoint for mobile', () => {
    expect(html).toMatch(/max-width:\s*480px/);
  });

  test('uses clamp() for fluid typography', () => {
    expect(html).toMatch(/clamp\(/);
  });

  test('uses min() for responsive widths', () => {
    expect(html).toMatch(/min\(90vw/);
  });
});

// ===========================================================================
//                    ERROR HANDLING
// ===========================================================================

describe('error handling', () => {
  let html;
  beforeAll(() => { html = fs.readFileSync(htmlPath, 'utf-8'); });

  test('has error message container', () => {
    expect(html).toMatch(/id="error-message"/);
  });

  test('has error detail container', () => {
    expect(html).toMatch(/id="error-detail"/);
  });

  test('has retry button', () => {
    expect(html).toMatch(/Try Another/);
  });

  test('has showError function', () => {
    expect(html).toMatch(/function showError\(message, detail\)/);
  });
});

// ===========================================================================
//                    BACK-TO-HOME NAVIGATION
// ===========================================================================

describe('back-to-home navigation', () => {
  let html;
  beforeAll(() => { html = fs.readFileSync(htmlPath, 'utf-8'); });

  test('has back-link element', () => {
    expect(html).toMatch(/class="back-link"/);
  });

  test('links to index.html', () => {
    expect(html).toMatch(/href="index\.html".*class="back-link"/);
  });

  test('has left arrow and Possibility text', () => {
    expect(html).toMatch(/&larr;.*Possibility/);
  });

  test('back-link is position fixed', () => {
    expect(html).toMatch(/\.back-link\s*\{[^}]*position:\s*fixed/);
  });

  test('back-link has high z-index', () => {
    expect(html).toMatch(/\.back-link\s*\{[^}]*z-index:\s*9999/);
  });
});

// ===========================================================================
//          ALL HTML TOOLS HAVE BACK-TO-HOME LINKS
// ===========================================================================

describe('all HTML tools in docs/ have back-to-home links', () => {
  const toolFiles = [
    'meta_debug.html',
    'periodic-table-of-meaning.html',
    'compound_interest_explainer.html',
    'REACTOR.html',
    'MARKER.html',
    'JASON.html',
  ];

  test.each(toolFiles)('%s has a link to index.html', (file) => {
    const content = fs.readFileSync(path.join(__dirname, '..', 'docs', file), 'utf-8');
    expect(content).toMatch(/href="index\.html"/);
  });

  test.each(toolFiles)('%s has back-link class', (file) => {
    const content = fs.readFileSync(path.join(__dirname, '..', 'docs', file), 'utf-8');
    expect(content).toMatch(/class="back-link"/);
  });
});

// ===========================================================================
//               INDEX.HTML REFERENCES MARKER
// ===========================================================================

describe('docs/index.html includes MARKER', () => {
  let indexHtml;
  beforeAll(() => {
    indexHtml = fs.readFileSync(path.join(__dirname, '..', 'docs', 'index.html'), 'utf-8');
  });

  test('has link to MARKER.html', () => {
    expect(indexHtml).toMatch(/href="MARKER\.html"/);
  });

  test('has MARKER card title', () => {
    expect(indexHtml).toMatch(/>MARKER</);
  });

  test('has MARKER description', () => {
    expect(indexHtml).toMatch(/Markdown Viewer.*Renderer/);
  });

  test('MARKER card has live badge', () => {
    // Check that the MARKER link appears after a "Live" badge within the same card
    const markerCard = indexHtml.match(/MARKER[\s\S]*?<\/div>\s*<\/div>/);
    expect(markerCard).toBeTruthy();
  });
});
