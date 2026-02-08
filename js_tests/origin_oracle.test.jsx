/**
 * Tests for origin_oracle.jsx — the Origin Oracle.
 *
 * Covers:
 * - Initial render (input stage)
 * - Query input and validation
 * - API call structure (mocked fetch via shared callClaude utility)
 * - Transition to revealing stage
 * - Story display
 * - Reset functionality
 * - Error handling
 */

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import OriginOracle from '../React Component Artifacts/origin_oracle';

/**
 * Helper: seek an origin and wait for the full story to render
 * (all state updates including setLoading(false) flushed).
 */
async function seekAndWaitForStory(query, storyText) {
  render(<OriginOracle />);
  fireEvent.change(screen.getByPlaceholderText(/consciousness/), {
    target: { value: query }
  });
  fireEvent.click(screen.getByText('Seek Origin'));

  // "Seek Another Origin" only renders when loading=false AND story is set,
  // so this ensures ALL state updates have completed.
  await waitFor(() => {
    expect(screen.getByText('Seek Another Origin')).toBeInTheDocument();
  });

  expect(screen.getByText(storyText)).toBeInTheDocument();
}


describe('Origin Oracle', () => {

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // --- Input stage (initial) ---

  test('renders without crashing', () => {
    render(<OriginOracle />);
  });

  test('shows title', () => {
    render(<OriginOracle />);
    expect(screen.getByText('Origin Oracle')).toBeInTheDocument();
  });

  test('shows subtitle', () => {
    render(<OriginOracle />);
    expect(screen.getByText(/Seeking origins through resonance/)).toBeInTheDocument();
  });

  test('shows query input', () => {
    render(<OriginOracle />);
    expect(screen.getByPlaceholderText(/consciousness, love/)).toBeInTheDocument();
  });

  test('shows seek button', () => {
    render(<OriginOracle />);
    expect(screen.getByText('Seek Origin')).toBeInTheDocument();
  });

  test('shows description note', () => {
    render(<OriginOracle />);
    expect(screen.getByText(/explores origins through authentic sensing/)).toBeInTheDocument();
  });

  // --- Input validation ---

  test('seek button is disabled when query is empty', () => {
    render(<OriginOracle />);
    const seekBtn = screen.getByText('Seek Origin');
    expect(seekBtn).toBeDisabled();
  });

  test('seek button is enabled when query has text', () => {
    render(<OriginOracle />);
    fireEvent.change(screen.getByPlaceholderText(/consciousness/), {
      target: { value: 'the universe' }
    });
    const seekBtn = screen.getByText('Seek Origin');
    expect(seekBtn).not.toBeDisabled();
  });

  test('does not call API with empty query', () => {
    render(<OriginOracle />);
    fireEvent.click(screen.getByText('Seek Origin'));
    expect(global.fetch).not.toHaveBeenCalled();
  });

  // --- Transition to revealing stage ---

  test('shows loading state while seeking', async () => {
    let resolvePromise;
    global.fetch.mockReturnValueOnce(
      new Promise(resolve => { resolvePromise = resolve; })
    );

    render(<OriginOracle />);
    fireEvent.change(screen.getByPlaceholderText(/consciousness/), {
      target: { value: 'love' }
    });
    fireEvent.click(screen.getByText('Seek Origin'));

    expect(screen.getByText(/Sensing through resonance/)).toBeInTheDocument();

    // Resolve the pending promise and wait for all state updates to flush
    await act(async () => {
      resolvePromise({
        json: () => Promise.resolve({
          content: [{ type: 'text', text: 'Origin story here.' }]
        })
      });
    });
  });

  test('shows origin title while revealing', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        content: [{ type: 'text', text: 'Love is the fundamental force.' }]
      })
    });

    await seekAndWaitForStory('love', 'Love is the fundamental force.');
    expect(screen.getByText('The Origin of love')).toBeInTheDocument();
  });

  test('displays the story from API response', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        content: [{ type: 'text', text: 'Consciousness emerges from stillness.' }]
      })
    });

    await seekAndWaitForStory('consciousness', 'Consciousness emerges from stillness.');
  });

  // --- API call structure ---

  test('calls Claude API with correct structure', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        content: [{ type: 'text', text: 'Response.' }]
      })
    });

    await seekAndWaitForStory('time', 'Response.');

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.anthropic.com/v1/messages',
      expect.objectContaining({
        method: 'POST',
      })
    );

    const call = global.fetch.mock.calls[0];
    const body = JSON.parse(call[1].body);
    expect(body.model).toBe('claude-sonnet-4-20250514');
    expect(body.max_tokens).toBe(3000);
    expect(body.system).toBeDefined();
    expect(body.messages[0].content).toContain('time');
  });

  // --- Reset ---

  test('shows Seek Another Origin button after story loads', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        content: [{ type: 'text', text: 'Origin story.' }]
      })
    });

    await seekAndWaitForStory('the universe', 'Origin story.');
  });

  test('reset returns to input stage', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        content: [{ type: 'text', text: 'Origin story.' }]
      })
    });

    await seekAndWaitForStory('the universe', 'Origin story.');

    fireEvent.click(screen.getByText('Seek Another Origin'));
    expect(screen.getByText('Origin Oracle')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/consciousness/)).toBeInTheDocument();
    expect(screen.getByText('Seek Origin')).toBeInTheDocument();
  });

  // --- Error handling ---

  test('shows error message when API fails', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<OriginOracle />);
    fireEvent.change(screen.getByPlaceholderText(/consciousness/), {
      target: { value: 'truth' }
    });
    fireEvent.click(screen.getByText('Seek Origin'));

    await waitFor(() => {
      expect(screen.getByText(/Unable to explore this origin/)).toBeInTheDocument();
    });
  });
});
