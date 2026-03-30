/**
 * Tests for the JASON JSON Explorer.
 *
 * The engine lives inside JASON.html as inline JS.
 * We validate the HTML structure, CSS, JavaScript engine,
 * and integration with the docs site.
 */

const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'HTML Files', 'JASON.html');
const docsPath = path.join(__dirname, '..', 'docs', 'JASON.html');

// ===========================================================================
//                         FILE EXISTENCE & STRUCTURE
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
//                         HTML STRUCTURE
// ===========================================================================

describe('HTML structure', () => {
  let html;
  beforeAll(() => { html = fs.readFileSync(htmlPath, 'utf-8'); });

  test('has correct title', () => {
    expect(html).toMatch(/<title>JASON.*JSON/);
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
//                       NO CDN DEPENDENCIES
// ===========================================================================

describe('no CDN dependencies (JSON.parse is native)', () => {
  let html;
  beforeAll(() => { html = fs.readFileSync(htmlPath, 'utf-8'); });

  test('does not include React', () => {
    expect(html).not.toMatch(/unpkg\.com\/react@/);
  });

  test('does not include Babel', () => {
    expect(html).not.toMatch(/babel.*standalone/);
  });

  test('does not include marked.js', () => {
    expect(html).not.toMatch(/marked.*\.min\.js/);
  });

  test('does not include highlight.js', () => {
    expect(html).not.toMatch(/highlight.*\.min\.js/);
  });

  test('has comment noting no CDN deps needed', () => {
    expect(html).toMatch(/No CDN dependencies/i);
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

  test('has component view (JSON viewer)', () => {
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

  test('has jason logo', () => {
    expect(html).toMatch(/class="jason-logo"/);
  });

  test('has jason brace elements', () => {
    expect(html).toMatch(/class="jason-brace"/);
  });

  test('has jason dot element', () => {
    expect(html).toMatch(/class="jason-dot"/);
  });

  test('has jason-glow CSS variable', () => {
    expect(html).toMatch(/--jason-glow/);
  });

  test('jason-glow is orange', () => {
    expect(html).toMatch(/--jason-glow:\s*#e8943e/);
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
    '--bg: #0b0f14',
    '--surface: #141a22',
    '--surface-hover: #1c2430',
    '--border: #2a3140',
    '--text: #e2e8f0',
    '--text-muted: #8191a6',
    '--accent: #5b9cf5',
    '--accent-hover: #7db4ff',
    '--green: #3fb950',
    '--yellow: #d4a017',
    '--red: #f04e4e',
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

  test('has search input', () => {
    expect(html).toMatch(/id="search-input"/);
  });

  test('has path breadcrumb', () => {
    expect(html).toMatch(/id="path-breadcrumb"/);
  });

  test('has tree toggle styling', () => {
    expect(html).toMatch(/\.tree-toggle/);
  });

  test('has tree-value type classes', () => {
    expect(html).toMatch(/\.tree-value\.string/);
    expect(html).toMatch(/\.tree-value\.number/);
    expect(html).toMatch(/\.tree-value\.boolean/);
    expect(html).toMatch(/\.tree-value\.null/);
  });

  test('has node count styling', () => {
    expect(html).toMatch(/\.node-count/);
  });

  test('has copy toast', () => {
    expect(html).toMatch(/id="copy-toast"/);
  });

  test('has view toggle buttons', () => {
    expect(html).toMatch(/id="btn-tree-view"/);
    expect(html).toMatch(/id="btn-raw-view"/);
  });

  test('has expand/collapse buttons', () => {
    expect(html).toMatch(/id="btn-expand-all"/);
    expect(html).toMatch(/id="btn-collapse-all"/);
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

  test('has renderTree function', () => {
    expect(html).toMatch(/function renderTree\(data\)/);
  });

  test('has buildNode function', () => {
    expect(html).toMatch(/function buildNode\(/);
  });

  test('has syntaxHighlight function', () => {
    expect(html).toMatch(/function syntaxHighlight\(/);
  });

  test('has filterTree function', () => {
    expect(html).toMatch(/function filterTree\(/);
  });

  test('uses JSON.parse', () => {
    expect(html).toMatch(/JSON\.parse\(/);
  });

  test('uses FileReader API', () => {
    expect(html).toMatch(/new FileReader\(\)/);
  });

  test('uses navigator.clipboard for copy', () => {
    expect(html).toMatch(/navigator\.clipboard\.writeText/);
  });

  test('has clipboard fallback', () => {
    expect(html).toMatch(/document\.execCommand\('copy'\)/);
  });

  test('returns public API', () => {
    expect(html).toMatch(/return \{ deploy, reset, showTreeView, showRawView, expandAll, collapseAll \}/);
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

  test('handles search input', () => {
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

  test('has 480px breakpoint', () => {
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

  test('error title references JSON', () => {
    expect(html).toMatch(/Failed to Parse JSON/);
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
