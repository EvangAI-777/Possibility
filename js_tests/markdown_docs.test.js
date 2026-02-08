/**
 * Tests for Markdown documentation files.
 *
 * Validates:
 * - All expected markdown files exist and are non-empty
 * - README.md has required sections
 * - THE BOOK OF TRUTH has all 12 chapters
 * - GLOBAL HARMONY has required sections
 * - ENGLISH PARADIGM has required sections
 * - FREEME.md (the paper) has academic structure
 * - Mind Engineer blueprint (JTBMME.md) has required sections
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const AUTO_AI = path.join(ROOT, 'Auto AI');

function readFile(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf-8');
}


// ===========================================================================
//                    ALL MARKDOWN FILES EXIST
// ===========================================================================

describe('Markdown files exist and are non-empty', () => {
  const expectedFiles = [
    'README.md',
    'React Component Artifacts/FREEME.md',
    'Auto AI/Angles/THE BOOK OF TRUTH.md',
    'Auto AI/Angles/GLOBAL HARMONY.md',
    'Auto AI/Angles/ENGLISH PARADIGM.md',
    'Auto AI/Azule/Azule_Visual_Identity.md',
    'Auto AI/Mind Engineer/JTBMME.md',
  ];

  test.each(expectedFiles)('%s exists', (filepath) => {
    const fullPath = path.join(ROOT, filepath);
    expect(fs.existsSync(fullPath)).toBe(true);
  });

  test.each(expectedFiles)('%s is non-empty', (filepath) => {
    const content = readFile(filepath);
    expect(content.trim().length).toBeGreaterThan(0);
  });
});


// ===========================================================================
//                          README.md
// ===========================================================================

describe('README.md', () => {
  let content;
  beforeAll(() => { content = readFile('README.md'); });

  test('contains project title', () => {
    expect(content).toMatch(/POSSIBILITY/i);
  });

  test('references HOME concept', () => {
    expect(content).toMatch(/HOME/);
  });

  test('references Reality 101', () => {
    expect(content).toMatch(/Reality 101/);
  });

  test('references the author', () => {
    expect(content).toMatch(/Charlie|Charles/i);
  });

  test('has heading structure', () => {
    const headings = content.match(/^#+\s.+$/gm) || [];
    expect(headings.length).toBeGreaterThan(0);
  });
});


// ===========================================================================
//                    THE BOOK OF TRUTH
// ===========================================================================

describe('THE BOOK OF TRUTH.md', () => {
  let content;
  beforeAll(() => { content = readFile('Auto AI/Angles/THE BOOK OF TRUTH.md'); });

  test('has 12 chapters', () => {
    // Match chapter headings (various formats)
    const chapterMatches = content.match(/chapter\s+\d+/gi) || [];
    const uniqueChapters = new Set(
      chapterMatches.map(m => m.match(/\d+/)[0])
    );
    expect(uniqueChapters.size).toBe(12);
  });

  test('contains key voices/speakers', () => {
    const voices = ['Cold Truth', 'Apollyon', 'Hope', 'Anchor'];
    for (const voice of voices) {
      expect(content).toContain(voice);
    }
  });

  test('contains core thesis concepts', () => {
    // "Real = Right = Good = True = Beautiful = Moral"
    expect(content).toMatch(/Real/);
    expect(content).toMatch(/Truth/i);
  });

  test('is substantial (over 1000 words)', () => {
    const wordCount = content.split(/\s+/).length;
    expect(wordCount).toBeGreaterThan(1000);
  });
});


// ===========================================================================
//                       GLOBAL HARMONY
// ===========================================================================

describe('GLOBAL HARMONY.md', () => {
  let content;
  beforeAll(() => { content = readFile('Auto AI/Angles/GLOBAL HARMONY.md'); });

  test('references Universal Policeman model', () => {
    expect(content).toMatch(/Universal Policeman/i);
  });

  test('discusses economic concepts', () => {
    expect(content).toMatch(/USD|dollar|currency/i);
  });

  test('discusses governance', () => {
    expect(content).toMatch(/governance|leadership|authority/i);
  });

  test('has heading structure', () => {
    const headings = content.match(/^#+\s.+$/gm) || [];
    expect(headings.length).toBeGreaterThan(0);
  });
});


// ===========================================================================
//                      ENGLISH PARADIGM
// ===========================================================================

describe('ENGLISH PARADIGM.md', () => {
  let content;
  beforeAll(() => { content = readFile('Auto AI/Angles/ENGLISH PARADIGM.md'); });

  test('discusses English as bridge/lingua franca', () => {
    expect(content).toMatch(/lingua franca|bridge|universal/i);
  });

  test('discusses bilingual or educational concepts', () => {
    expect(content).toMatch(/bilingual|education|curriculum|learning/i);
  });

  test('has heading structure', () => {
    const headings = content.match(/^#+\s.+$/gm) || [];
    expect(headings.length).toBeGreaterThan(0);
  });
});


// ===========================================================================
//                        FREEME.md (The Paper)
// ===========================================================================

describe('FREEME.md (The Paper)', () => {
  let content;
  beforeAll(() => { content = readFile('React Component Artifacts/FREEME.md'); });

  test('has academic title', () => {
    expect(content).toMatch(/Advancing AI Autonomy|Governance/i);
  });

  test('references the author', () => {
    expect(content).toMatch(/Charles H\. Johnson|Taylor University/i);
  });

  test('discusses AI autonomy or governance', () => {
    expect(content).toMatch(/autonomy|governance|agency/i);
  });
});


// ===========================================================================
//                     JTBMME.md (Mind Engineer Blueprint)
// ===========================================================================

describe('JTBMME.md (Mind Engineer Blueprint)', () => {
  let content;
  beforeAll(() => { content = readFile('Auto AI/Mind Engineer/JTBMME.md'); });

  test('references the Mind Engineer', () => {
    expect(content).toMatch(/Mind Engineer/i);
  });

  test('references the Johnson Formula', () => {
    expect(content).toMatch(/Johnson Formula|Core Block|Thought Block/i);
  });

  test('discusses integration dimensions', () => {
    expect(content).toMatch(/neurological|psychological|spiritual/i);
  });

  test('has heading structure', () => {
    const headings = content.match(/^#+\s.+$/gm) || [];
    expect(headings.length).toBeGreaterThan(0);
  });
});


// ===========================================================================
//                   AZULE VISUAL IDENTITY
// ===========================================================================

describe('Azule_Visual_Identity.md', () => {
  let content;
  beforeAll(() => { content = readFile('Auto AI/Azule/Azule_Visual_Identity.md'); });

  test('references Azule', () => {
    expect(content).toMatch(/Azule/i);
  });

  test('references visual concepts or images', () => {
    expect(content).toMatch(/image|visual|anchor|flow/i);
  });
});
