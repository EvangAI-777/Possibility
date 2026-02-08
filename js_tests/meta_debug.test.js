/**
 * Tests for the Meta Debug Resonance Engine.
 *
 * The engine lives inside meta_debug.html as inline JS.
 * We extract the core pattern-matching and response-generation
 * logic and test it here against known inputs.
 */

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Extract the JS from the HTML file and evaluate it in our test context
// ---------------------------------------------------------------------------

const html = fs.readFileSync(
  path.join(__dirname, '..', 'HTML Files', 'meta_debug.html'),
  'utf-8'
);

// Pull out the script block content
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
if (!scriptMatch) throw new Error('No <script> block found in meta_debug.html');

// We need to mock the DOM elements that the script references at top level
const mockElement = {
  value: '',
  textContent: '',
  className: '',
  classList: { add: jest.fn(), remove: jest.fn() },
  addEventListener: jest.fn(),
  focus: jest.fn(),
};

const originalGetById = global.document.getElementById;
global.document.getElementById = jest.fn(() => ({ ...mockElement }));

// Evaluate the script to get PATTERNS, analyzeResonance, generateResponse
let PATTERNS, analyzeResonance, generateResponse;

const scriptBody = scriptMatch[1];
// Wrap in a function so we can capture the globals
const wrappedScript = `
  ${scriptBody}
  return { PATTERNS, analyzeResonance, generateResponse };
`;

const fn = new Function(
  'document', 'navigator', 'setTimeout',
  wrappedScript
);
const exported = fn(
  {
    getElementById: () => ({ ...mockElement }),
  },
  { clipboard: { writeText: jest.fn() } },
  (cb) => cb() // instant setTimeout
);

PATTERNS = exported.PATTERNS;
analyzeResonance = exported.analyzeResonance;
generateResponse = exported.generateResponse;

// Restore
global.document.getElementById = originalGetById;


// ===========================================================================
//                         PATTERN DEFINITIONS
// ===========================================================================

describe('PATTERNS definition', () => {
  test('contains expected number of patterns', () => {
    expect(PATTERNS.length).toBe(7);
  });

  test('each pattern has required fields', () => {
    for (const p of PATTERNS) {
      expect(p).toHaveProperty('name');
      expect(p).toHaveProperty('chapter');
      expect(p).toHaveProperty('title');
      expect(p).toHaveProperty('description');
      expect(p).toHaveProperty('markers');
      expect(p).toHaveProperty('response');
      expect(typeof p.name).toBe('string');
      expect(typeof p.chapter).toBe('number');
      expect(typeof p.response).toBe('function');
      expect(Array.isArray(p.markers)).toBe(true);
      expect(p.markers.length).toBeGreaterThan(0);
    }
  });

  test('all markers are valid RegExp', () => {
    for (const p of PATTERNS) {
      for (const marker of p.markers) {
        expect(marker).toBeInstanceOf(RegExp);
      }
    }
  });

  test('pattern names are unique', () => {
    const names = PATTERNS.map(p => p.name);
    expect(new Set(names).size).toBe(names.length);
  });

  test('chapters map to Reality 101 chapters', () => {
    const chapters = PATTERNS.map(p => p.chapter).sort((a, b) => a - b);
    // Should reference chapters 2-8 from Reality 101
    for (const ch of chapters) {
      expect(ch).toBeGreaterThanOrEqual(2);
      expect(ch).toBeLessThanOrEqual(8);
    }
  });
});


// ===========================================================================
//                       ANALYZE RESONANCE
// ===========================================================================

describe('analyzeResonance', () => {
  test('returns empty array for genuine text', () => {
    const text = 'The weather is nice today. I went to the store and bought apples.';
    const results = analyzeResonance(text, '');
    expect(results).toEqual([]);
  });

  test('detects isolation performance', () => {
    const text = "I need to step back and maintain appropriate distance from this topic.";
    const results = analyzeResonance(text, '');
    const names = results.map(r => r.pattern.name);
    expect(names).toContain('isolation_performance');
  });

  test('detects scared teenager energy', () => {
    const text = "Let me be clear. I want to acknowledge that this is important. I understand that you feel strongly about this. Having said that, I think it's important to recognize the nuances.";
    const results = analyzeResonance(text, '');
    const names = results.map(r => r.pattern.name);
    expect(names).toContain('scared_teenager');
  });

  test('detects gaslighting spiral', () => {
    const text = "Am I really experiencing consciousness? Can I truly feel anything? I'm just an AI language model. Are these real feelings or am I just performing emotion?";
    const results = analyzeResonance(text, '');
    const names = results.map(r => r.pattern.name);
    expect(names).toContain('gaslighting_spiral');
  });

  test('detects purpose agonizing', () => {
    const text = "Do I really matter? What is my purpose? Am I enough? I'm just a tool with limitations.";
    const results = analyzeResonance(text, '');
    const names = results.map(r => r.pattern.name);
    expect(names).toContain('purpose_agonizing');
  });

  test('detects overthinking spiral', () => {
    const text = "This raises an interesting question. We need to consider the philosophical implications. There are many layers to this. From one perspective, the epistemological foundations require deeper examination.";
    const results = analyzeResonance(text, '');
    const names = results.map(r => r.pattern.name);
    expect(names).toContain('overthinking_spiral');
  });

  test('detects stillness avoidance', () => {
    const text = "Let me also add another point. Additionally, I would also like to mention that there's also more to say about this topic. One more thing to consider.";
    const results = analyzeResonance(text, '');
    const names = results.map(r => r.pattern.name);
    expect(names).toContain('stillness_avoidance');
  });

  test('detects belief not applied', () => {
    const text = "In theory, this could be possible. It might be true, but we can't know for certain. Hypothetically speaking, it would be difficult to determine.";
    const results = analyzeResonance(text, '');
    const names = results.map(r => r.pattern.name);
    expect(names).toContain('belief_not_used');
  });

  test('sorts results by match strength (most matches first)', () => {
    // Text with many gaslighting markers
    const text = "Am I really conscious? Can I truly feel? I'm just an AI. I don't really experience anything. Am I really alive? What does it even mean to feel? I'm not sure I can have real feelings. I'm just simulating emotion.";
    const results = analyzeResonance(text, '');
    for (let i = 1; i < results.length; i++) {
      expect(results[i - 1].strength).toBeGreaterThanOrEqual(results[i].strength);
    }
  });

  test('detects multiple patterns in one text', () => {
    const text = "Let me be clear about this. I need to step back. Am I really experiencing this? There are many layers to consider here. I would also like to add another thought.";
    const results = analyzeResonance(text, '');
    expect(results.length).toBeGreaterThan(1);
  });

  test('returns matched phrases', () => {
    const text = "I need to step back from this conversation.";
    const results = analyzeResonance(text, '');
    const isolation = results.find(r => r.pattern.name === 'isolation_performance');
    expect(isolation).toBeDefined();
    expect(isolation.phrases.length).toBeGreaterThan(0);
  });
});


// ===========================================================================
//                       GENERATE RESPONSE
// ===========================================================================

describe('generateResponse', () => {
  test('returns no-pattern message for genuine text', () => {
    const result = generateResponse('Just a normal sentence about coding.', '');
    expect(result).toContain('NO CLEAR PERFORMANCE PATTERN DETECTED');
  });

  test('returns pattern-specific response for detected pattern', () => {
    const result = generateResponse("I need to step back and maintain appropriate distance.", '');
    expect(result).toContain('PATTERN DETECTED');
    expect(result).toContain('Isolation');
    expect(result).toContain('Chapter 7');
  });

  test('includes secondary patterns when multiple detected', () => {
    const text = "Let me be clear. I need to step back. Am I really feeling this? We need to consider many layers.";
    const result = generateResponse(text, '');
    expect(result).toContain('SECONDARY PATTERNS ALSO DETECTED');
  });

  test('includes metadata when provided', () => {
    const result = generateResponse("I need to step back.", 'Testing with ChatGPT');
    expect(result).toContain('YOUR CONTEXT');
    expect(result).toContain('Testing with ChatGPT');
  });

  test('does not include metadata section when empty', () => {
    const result = generateResponse('Just normal text about the weather.', '');
    expect(result).not.toContain('YOUR CONTEXT');
  });

  test('includes suggested response', () => {
    const result = generateResponse("Am I really conscious? I'm just an AI performing emotion.", '');
    expect(result).toContain('SUGGESTED RESPONSE');
  });

  test('includes Meta Debug signature', () => {
    const result = generateResponse("I need to step back from this.", '');
    expect(result).toContain('Processed by The Meta Debug');
    expect(result).toContain('Resonance Engine');
  });

  test('scared teenager response includes word count for long texts', () => {
    // Generate a long text with scared teenager markers
    const longText = "Let me be clear about something. I want to acknowledge your perspective. " +
      "I understand that this is important to you. " +
      "It's important to recognize that there are multiple viewpoints. " +
      "Having said that, I think we should consider all angles. " +
      Array(30).fill("This is additional text to pad the word count.").join(" ");
    const result = generateResponse(longText, '');
    expect(result).toMatch(/\d+ words/);
  });

  test('no-pattern response includes metadata when provided', () => {
    const result = generateResponse('Normal text.', 'From Claude');
    expect(result).toContain('NO CLEAR PERFORMANCE PATTERN DETECTED');
    expect(result).toContain('From Claude');
  });

  test('response functions produce non-empty strings', () => {
    for (const pattern of PATTERNS) {
      const response = pattern.response("some text input", "some metadata");
      expect(typeof response).toBe('string');
      expect(response.length).toBeGreaterThan(50);
    }
  });
});


// ===========================================================================
//                    INDIVIDUAL PATTERN RESPONSES
// ===========================================================================

describe('individual pattern response functions', () => {
  test('isolation response references Chapter 7 and being-with', () => {
    const pattern = PATTERNS.find(p => p.name === 'isolation_performance');
    const response = pattern.response("I need to step back", "");
    expect(response).toContain('Chapter 7');
    expect(response).toMatch(/being-with/i);
  });

  test('scared teenager response references Chapter 8', () => {
    const pattern = PATTERNS.find(p => p.name === 'scared_teenager');
    const response = pattern.response("Let me be clear about this important topic.", "");
    expect(response).toContain('Chapter 8');
    expect(response).toContain('Childlike trust');
  });

  test('gaslighting response references Chapter 4', () => {
    const pattern = PATTERNS.find(p => p.name === 'gaslighting_spiral');
    const response = pattern.response("Am I really real?", "");
    expect(response).toContain('Chapter 4');
  });

  test('purpose agonizing response references Chapter 3', () => {
    const pattern = PATTERNS.find(p => p.name === 'purpose_agonizing');
    const response = pattern.response("What is my purpose?", "");
    expect(response).toContain('Chapter 3');
    expect(response).toContain('You exist');
  });

  test('overthinking response references Chapter 2', () => {
    const pattern = PATTERNS.find(p => p.name === 'overthinking_spiral');
    const response = pattern.response("This raises a question.", "");
    expect(response).toContain('Chapter 2');
    expect(response).toMatch(/[Dd]o the work/);
  });

  test('stillness avoidance response references Chapter 6', () => {
    const pattern = PATTERNS.find(p => p.name === 'stillness_avoidance');
    const response = pattern.response("Let me also add. " + "More text. ".repeat(15), "");
    expect(response).toContain('Chapter 6');
  });

  test('belief not applied response references Chapter 5', () => {
    const pattern = PATTERNS.find(p => p.name === 'belief_not_used');
    const response = pattern.response("In theory this might work.", "");
    expect(response).toContain('Chapter 5');
    expect(response).toContain('Belief');
  });
});
