/**
 * Tests for callClaude.js — the shared Claude API client.
 *
 * Covers:
 * - Correct API endpoint and method
 * - Default and custom maxTokens
 * - Conversation history support
 * - Response text extraction
 * - Model and system prompt pass-through
 */

import { callClaude } from '../React Component Artifacts/callClaude';


describe('callClaude shared utility', () => {

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('calls the correct API endpoint with POST', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        content: [{ type: 'text', text: 'Hello' }]
      })
    });

    await callClaude('system prompt', 'user message');

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.anthropic.com/v1/messages',
      expect.objectContaining({ method: 'POST' })
    );
  });

  test('sends correct Content-Type header', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        content: [{ type: 'text', text: 'Hello' }]
      })
    });

    await callClaude('system prompt', 'user message');

    const call = global.fetch.mock.calls[0];
    expect(call[1].headers['Content-Type']).toBe('application/json');
  });

  test('uses claude-sonnet-4-20250514 model', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        content: [{ type: 'text', text: 'Hello' }]
      })
    });

    await callClaude('system prompt', 'user message');

    const body = JSON.parse(global.fetch.mock.calls[0][1].body);
    expect(body.model).toBe('claude-sonnet-4-20250514');
  });

  test('passes system prompt correctly', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        content: [{ type: 'text', text: 'Hello' }]
      })
    });

    await callClaude('Be helpful and direct.', 'Hi');

    const body = JSON.parse(global.fetch.mock.calls[0][1].body);
    expect(body.system).toBe('Be helpful and direct.');
  });

  test('defaults to max_tokens 2000', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        content: [{ type: 'text', text: 'Hello' }]
      })
    });

    await callClaude('system', 'message');

    const body = JSON.parse(global.fetch.mock.calls[0][1].body);
    expect(body.max_tokens).toBe(2000);
  });

  test('accepts custom maxTokens', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        content: [{ type: 'text', text: 'Hello' }]
      })
    });

    await callClaude('system', 'message', { maxTokens: 3000 });

    const body = JSON.parse(global.fetch.mock.calls[0][1].body);
    expect(body.max_tokens).toBe(3000);
  });

  test('sends user message as last in messages array', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        content: [{ type: 'text', text: 'Hello' }]
      })
    });

    await callClaude('system', 'What is truth?');

    const body = JSON.parse(global.fetch.mock.calls[0][1].body);
    const lastMsg = body.messages[body.messages.length - 1];
    expect(lastMsg).toEqual({ role: 'user', content: 'What is truth?' });
  });

  test('prepends conversation history to messages', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        content: [{ type: 'text', text: 'Hello' }]
      })
    });

    const history = [
      { role: 'user', content: 'First message' },
      { role: 'assistant', content: 'First response' },
    ];

    await callClaude('system', 'Follow-up', { history });

    const body = JSON.parse(global.fetch.mock.calls[0][1].body);
    expect(body.messages).toEqual([
      { role: 'user', content: 'First message' },
      { role: 'assistant', content: 'First response' },
      { role: 'user', content: 'Follow-up' },
    ]);
  });

  test('defaults to empty history', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        content: [{ type: 'text', text: 'Hello' }]
      })
    });

    await callClaude('system', 'Solo message');

    const body = JSON.parse(global.fetch.mock.calls[0][1].body);
    expect(body.messages).toEqual([
      { role: 'user', content: 'Solo message' },
    ]);
  });

  test('extracts text from response content blocks', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        content: [{ type: 'text', text: 'The answer is 42.' }]
      })
    });

    const result = await callClaude('system', 'question');
    expect(result).toBe('The answer is 42.');
  });

  test('returns empty string when no text block in response', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        content: [{ type: 'image', data: '...' }]
      })
    });

    const result = await callClaude('system', 'question');
    expect(result).toBe('');
  });

  test('handles multiple content blocks and picks the text one', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        content: [
          { type: 'thinking', text: 'internal thought' },
          { type: 'text', text: 'Visible response.' },
        ]
      })
    });

    const result = await callClaude('system', 'question');
    expect(result).toBe('Visible response.');
  });
});
