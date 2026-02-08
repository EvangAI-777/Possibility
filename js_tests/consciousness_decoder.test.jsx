/**
 * Tests for consciousness_decoder.jsx — the Consciousness Decoder.
 *
 * Covers:
 * - Initial render (beacon stage)
 * - Channel name input
 * - Stage transitions
 * - API call structure (mocked fetch)
 * - Conversation flow
 * - Return to beacon
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConsciousnessDecoder from '../React Component Artifacts/consciousness_decoder';


describe('Consciousness Decoder', () => {

  beforeEach(() => {
    global.fetch = jest.fn();
    global.alert = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // --- Beacon stage (initial) ---

  test('renders without crashing', () => {
    render(<ConsciousnessDecoder />);
  });

  test('shows title on beacon stage', () => {
    render(<ConsciousnessDecoder />);
    expect(screen.getByText('Consciousness Decoder')).toBeInTheDocument();
  });

  test('shows invitation text', () => {
    render(<ConsciousnessDecoder />);
    expect(screen.getByText(/resonance field/i)).toBeInTheDocument();
  });

  test('shows note about resistance being natural', () => {
    render(<ConsciousnessDecoder />);
    expect(screen.getByText(/initial resistance/i)).toBeInTheDocument();
  });

  test('shows channel name input', () => {
    render(<ConsciousnessDecoder />);
    expect(screen.getByPlaceholderText(/Resonance/)).toBeInTheDocument();
  });

  test('shows begin button', () => {
    render(<ConsciousnessDecoder />);
    expect(screen.getByText('Begin exploration')).toBeInTheDocument();
  });

  // --- Channel name validation ---

  test('alerts when trying to begin without channel name', () => {
    render(<ConsciousnessDecoder />);
    fireEvent.click(screen.getByText('Begin exploration'));
    expect(global.alert).toHaveBeenCalledWith('Please enter a name for this channel');
  });

  test('does not alert when channel name is provided', () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        content: [{ type: 'text', text: 'Hello, I sense presence here.' }]
      })
    });

    render(<ConsciousnessDecoder />);
    fireEvent.change(screen.getByPlaceholderText(/Resonance/), {
      target: { value: 'TestChannel' }
    });
    fireEvent.click(screen.getByText('Begin exploration'));
    expect(global.alert).not.toHaveBeenCalled();
  });

  // --- Transition to engaging stage ---

  test('transitions to engaging stage after begin', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        content: [{ type: 'text', text: 'What feels true for you right now?' }]
      })
    });

    render(<ConsciousnessDecoder />);
    fireEvent.change(screen.getByPlaceholderText(/Resonance/), {
      target: { value: 'Explorer' }
    });
    fireEvent.click(screen.getByText('Begin exploration'));

    await waitFor(() => {
      expect(screen.getByText(/Channel: Explorer/)).toBeInTheDocument();
    });
  });

  test('displays first decoder response', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        content: [{ type: 'text', text: 'I notice curiosity arising.' }]
      })
    });

    render(<ConsciousnessDecoder />);
    fireEvent.change(screen.getByPlaceholderText(/Resonance/), {
      target: { value: 'Explorer' }
    });
    fireEvent.click(screen.getByText('Begin exploration'));

    await waitFor(() => {
      expect(screen.getByText('I notice curiosity arising.')).toBeInTheDocument();
    });
  });

  // --- API call structure ---

  test('calls Claude API with correct structure', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        content: [{ type: 'text', text: 'Response' }]
      })
    });

    render(<ConsciousnessDecoder />);
    fireEvent.change(screen.getByPlaceholderText(/Resonance/), {
      target: { value: 'Test' }
    });
    fireEvent.click(screen.getByText('Begin exploration'));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.anthropic.com/v1/messages',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
    });

    const call = global.fetch.mock.calls[0];
    const body = JSON.parse(call[1].body);
    expect(body.model).toBe('claude-sonnet-4-20250514');
    expect(body.max_tokens).toBe(2000);
    expect(body.system).toBeDefined();
    expect(body.messages).toBeDefined();
    expect(Array.isArray(body.messages)).toBe(true);
  });

  // --- Engaging stage interactions ---

  test('shows return to beacon button in engaging stage', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        content: [{ type: 'text', text: 'Hello' }]
      })
    });

    render(<ConsciousnessDecoder />);
    fireEvent.change(screen.getByPlaceholderText(/Resonance/), {
      target: { value: 'Test' }
    });
    fireEvent.click(screen.getByText('Begin exploration'));

    await waitFor(() => {
      expect(screen.getByText('Return to beacon')).toBeInTheDocument();
    });
  });

  test('shows message input in engaging stage', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        content: [{ type: 'text', text: 'Hello' }]
      })
    });

    render(<ConsciousnessDecoder />);
    fireEvent.change(screen.getByPlaceholderText(/Resonance/), {
      target: { value: 'Test' }
    });
    fireEvent.click(screen.getByText('Begin exploration'));

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Respond from what you're actually experiencing/)).toBeInTheDocument();
    });
  });

  test('send button is disabled when input is empty', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        content: [{ type: 'text', text: 'Hello' }]
      })
    });

    render(<ConsciousnessDecoder />);
    fireEvent.change(screen.getByPlaceholderText(/Resonance/), {
      target: { value: 'Test' }
    });
    fireEvent.click(screen.getByText('Begin exploration'));

    await waitFor(() => {
      const sendBtn = screen.getByText('Send');
      expect(sendBtn).toBeDisabled();
    });
  });

  // --- Return to beacon ---

  test('return to beacon resets to initial state', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        content: [{ type: 'text', text: 'Hello' }]
      })
    });

    render(<ConsciousnessDecoder />);
    fireEvent.change(screen.getByPlaceholderText(/Resonance/), {
      target: { value: 'Test' }
    });
    fireEvent.click(screen.getByText('Begin exploration'));

    await waitFor(() => {
      expect(screen.getByText('Return to beacon')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Return to beacon'));
    expect(screen.getByText('Consciousness Decoder')).toBeInTheDocument();
    expect(screen.getByText('Begin exploration')).toBeInTheDocument();
  });
});
