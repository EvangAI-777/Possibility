/**
 * Tests for the JASON JSON Explorer.
 *
 * The engine lives inside JASON.html as inline JS.
 * We validate the HTML structure, CSS, and JS engine patterns
 * following the same approach as marker.test.js.
 */

const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'HTML Files', 'JASON.html');
const docsPath = path.join(__dirname, '..', 'docs', 'JASON.html');

// ===========================================================================
//                         FILE EXISTENCE & DEPLOYMENT
// ===========================================================================

describe('JASON.html files exist', () => {
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
//                         HTML DOCUMENT STRUCTURE
// ===========================================================================

describe('HTML structure', () => {
  let html;
  beforeAll(() => { html = fs.readFileSync(htmlPath, 'utf-8'); });

  test('has DOCTYPE declaration', () => {
    expect(html).toMatch(/<!DOCTYPE html>/i);
  });

  test('has lang attribute', () => {
    expect(html).toMatch(/<html lang="en">/);
  });

  test('has viewport meta tag', () => {
    expect(html).toMatch(/<meta name="viewport"/);
  });

  test('has correct title containing JASON', () => {
    expect(html).toMatch(/<title>JASON.*JSON/);
  });
});

// ===========================================================================
//                       CDN DEPENDENCIES
// ===========================================================================

describe('CDN dependencies', () => {
  let html;
  beforeAll(() => { html = fs.readFileSync(htmlPath, 'utf-8'); });

  test('does not include React (not needed)', () => {
    expect(html).not.toMatch(/unpkg\.com\/react@/);
  });

  test('does not include Babel (not needed)', () => {
    expect(html).not.toMatch(/babel.*standalone/);
  });

  test('does not include marked.js (not needed)', () => {
    expect(html).not.toMatch(/marked.*\.min\.js/);
  });

  test('uses native JSON.parse (no external parser)', () => {
    expect(html).toMatch(/JSON\.parse\(/);
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

  test('has component view', () => {
    expect(html).toMatch(/id="component-view"/);
  });

  test('upload screen has drop zone', () => {
    expect(html).toMatch(/id="drop-zone"/);
  });

  test('file input accepts JSON files', () => {
    expect(html).toMatch(/accept="\.json"/);
  });
});

// ===========================================================================
//                        JASON BRANDING
// ===========================================================================

describe('JASON branding', () => {
  let html;
  beforeAll(() => { html = fs.readFileSync(htmlPath, 'utf-8'); });

  test('has JASON title', () => {
    expect(html).toMatch(/class="upload-title">JASON</);
  });

  test('has JSON Explorer subtitle', () => {
    expect(html).toMatch(/JSON Explorer/);
  });

  test('has jason logo element', () => {
    expect(html).toMatch(/class="jason-logo"/);
  });

  test('has jason brace elements', () => {
    expect(html).toMatch(/class="jason-brace/);
  });

  test('has jason dot animation', () => {
    expect(html).toMatch(/class="jason-dot"/);
  });

  test('has --jason-glow CSS variable', () => {
    expect(html).toMatch(/--jason-glow/);
  });

  test('jason-glow is orange', () => {
    expect(html).toMatch(/--jason-glow:\s*#f0883e/);
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

  test('step labels are JSON-specific', () => {
    expect(html).toMatch(/Reading file/);
    expect(html).toMatch(/Parsing JSON/);
    expect(html).toMatch(/Rendering tree/);
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
//                       JSON-SPECIFIC FEATURES
// ===========================================================================

describe('JSON-specific features', () => {
  let html;
  beforeAll(() => { html = fs.readFileSync(htmlPath, 'utf-8'); });

  test('has tree view container', () => {
    expect(html).toMatch(/id="json-tree"/);
  });

  test('has raw view container', () => {
    expect(html).toMatch(/id="json-raw"/);
  });

  test('has raw output element', () => {
    expect(html).toMatch(/id="json-raw-output"/);
  });

  test('has view toggle buttons', () => {
    expect(html).toMatch(/id="btn-tree"/);
    expect(html).toMatch(/id="btn-raw"/);
  });

  test('has search input', () => {
    expect(html).toMatch(/id="json-search"/);
  });

  test('has path breadcrumb', () => {
    expect(html).toMatch(/id="json-path"/);
  });

  test('has stats display', () => {
    expect(html).toMatch(/id="json-stats"/);
  });

  test('has JSON value type CSS classes', () => {
    expect(html).toMatch(/\.json-string/);
    expect(html).toMatch(/\.json-number/);
    expect(html).toMatch(/\.json-boolean/);
    expect(html).toMatch(/\.json-null/);
  });

  test('has collapsible tree nodes', () => {
    expect(html).toMatch(/\.json-toggle/);
    expect(html).toMatch(/\.json-children/);
    expect(html).toMatch(/\.collapsed/);
  });

  test('has node count display class', () => {
    expect(html).toMatch(/\.json-count/);
  });
});

// ===========================================================================
//                       JAVASCRIPT ENGINE
// ===========================================================================

describe('JavaScript engine', () => {
  let html;
  beforeAll(() => { html = fs.readFileSync(htmlPath, 'utf-8'); });

  test('defines JASON IIFE', () => {
    expect(html).toMatch(/const JASON = \(\(\) =>/);
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

  test('has $ helper', () => {
    expect(html).toMatch(/const \$ = \(id\) => document\.getElementById\(id\)/);
  });

  test('uses JSON.parse for parsing', () => {
    expect(html).toMatch(/JSON\.parse\(/);
  });

  test('uses navigator.clipboard for copy', () => {
    expect(html).toMatch(/navigator\.clipboard\.writeText/);
  });

  test('has clipboard fallback', () => {
    expect(html).toMatch(/document\.execCommand\('copy'\)/);
  });

  test('has renderTree function', () => {
    expect(html).toMatch(/function renderTree\(/);
  });

  test('has buildNode function', () => {
    expect(html).toMatch(/function buildNode\(/);
  });

  test('has setView function', () => {
    expect(html).toMatch(/function setView\(/);
  });

  test('has computeStats function', () => {
    expect(html).toMatch(/function computeStats\(/);
  });

  test('has filterTree function', () => {
    expect(html).toMatch(/function filterTree\(/);
  });

  test('returns public API with deploy, reset, setView', () => {
    expect(html).toMatch(/return \{ deploy, reset, setView \}/);
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

  test('calls JASON.deploy on file select', () => {
    expect(html).toMatch(/JASON\.deploy\(file\)/);
  });

  test('calls JASON.reset on back pill click', () => {
    expect(html).toMatch(/onclick="JASON\.reset\(\)"/);
  });

  test('handles search input events', () => {
    expect(html).toMatch(/searchInput\.addEventListener\('input'/);
  });
});

// ===========================================================================
//                    RESPONSIVE DESIGN
// ===========================================================================

describe('responsive design', () => {
  let html;
  beforeAll(() => { html = fs.readFileSync(htmlPath, 'utf-8'); });

  test('has 768px breakpoint', () => {
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
//          UNIVERSAL BACK-LINK VALIDATION (JASON included)
// ===========================================================================

describe('all HTML tools in docs/ have back-to-home links (including JASON)', () => {
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
//               INDEX.HTML REFERENCES JASON
// ===========================================================================

describe('docs/index.html includes JASON', () => {
  let indexHtml;
  beforeAll(() => {
    indexHtml = fs.readFileSync(path.join(__dirname, '..', 'docs', 'index.html'), 'utf-8');
  });

  test('has link to JASON.html', () => {
    expect(indexHtml).toMatch(/href="JASON\.html"/);
  });

  test('has JASON card title', () => {
    expect(indexHtml).toMatch(/>JASON</);
  });

  test('has JASON description', () => {
    expect(indexHtml).toMatch(/JSON Explorer/);
  });

  test('JASON card has live badge', () => {
    const jasonCard = indexHtml.match(/JASON[\s\S]*?<\/div>\s*<\/div>/);
    expect(jasonCard).toBeTruthy();
  });
});
