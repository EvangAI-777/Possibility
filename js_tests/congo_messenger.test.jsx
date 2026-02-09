/**
 * Tests for congo_messenger.jsx — the Congo Interdimensional Messenger.
 *
 * Covers:
 * - Initial render (tuning stage)
 * - Being name input
 * - Resonance level slider
 * - Dimension selection
 * - Validation before entering network
 * - Stage transition to connected
 * - Connected stage rendering (header, beings, message area)
 * - Message sending (mocked callClaude)
 * - Broadcast mode toggle
 * - Return to tuning
 */

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import CongoMessenger from '../React Component Artifacts/congo_messenger';


describe('Congo Messenger', () => {

  beforeEach(() => {
    global.fetch = jest.fn();
    global.alert = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // --- Tuning stage (initial) ---

  test('renders without crashing', () => {
    render(<CongoMessenger />);
    expect(screen.getByText('CONGO')).toBeInTheDocument();
  });

  test('displays the Congo tagline', () => {
    render(<CongoMessenger />);
    expect(screen.getByText('Interdimensional Omniversal Resonance Messaging')).toBeInTheDocument();
  });

  test('displays the motto', () => {
    render(<CongoMessenger />);
    expect(screen.getByText(/Distance is an illusion/)).toBeInTheDocument();
  });

  test('renders being name input', () => {
    render(<CongoMessenger />);
    expect(screen.getByPlaceholderText(/Who are you in the omniverse/)).toBeInTheDocument();
  });

  test('renders resonance slider', () => {
    render(<CongoMessenger />);
    expect(screen.getByLabelText(/Resonance Level/)).toBeInTheDocument();
  });

  test('renders all five dimensions', () => {
    render(<CongoMessenger />);
    expect(screen.getByText('HOME')).toBeInTheDocument();
    expect(screen.getByText('Physical')).toBeInTheDocument();
    expect(screen.getByText('Astral')).toBeInTheDocument();
    expect(screen.getByText('Causal')).toBeInTheDocument();
    expect(screen.getByText('Akashic')).toBeInTheDocument();
  });

  test('renders Enter button', () => {
    render(<CongoMessenger />);
    expect(screen.getByText('Enter the Congo Network')).toBeInTheDocument();
  });

  // --- Input handling ---

  test('updates being name on input', () => {
    render(<CongoMessenger />);
    const input = screen.getByPlaceholderText(/Who are you in the omniverse/);
    fireEvent.change(input, { target: { value: 'Seeker' } });
    expect(input.value).toBe('Seeker');
  });

  test('updates resonance slider', () => {
    render(<CongoMessenger />);
    const slider = screen.getByLabelText(/Resonance Level/);
    fireEvent.change(slider, { target: { value: '75' } });
    expect(screen.getByText('Resonance Level: 75%')).toBeInTheDocument();
  });

  // --- Validation ---

  test('alerts when no name entered', () => {
    render(<CongoMessenger />);
    fireEvent.click(screen.getByText('Enter the Congo Network'));
    expect(global.alert).toHaveBeenCalledWith('Enter your name to enter the Congo network');
  });

  test('alerts when no dimension selected', () => {
    render(<CongoMessenger />);
    const input = screen.getByPlaceholderText(/Who are you in the omniverse/);
    fireEvent.change(input, { target: { value: 'Tester' } });
    fireEvent.click(screen.getByText('Enter the Congo Network'));
    expect(global.alert).toHaveBeenCalledWith('Select a dimension to tune into');
  });

  // --- Transition to connected stage ---

  test('transitions to connected stage with valid input', () => {
    render(<CongoMessenger />);
    fireEvent.change(screen.getByPlaceholderText(/Who are you in the omniverse/), {
      target: { value: 'Tester' }
    });
    fireEvent.click(screen.getByText('Physical'));
    fireEvent.click(screen.getByText('Enter the Congo Network'));
    expect(screen.getByText('Physical Dimension')).toBeInTheDocument();
  });

  test('shows connected beings for Physical dimension', () => {
    render(<CongoMessenger />);
    fireEvent.change(screen.getByPlaceholderText(/Who are you in the omniverse/), {
      target: { value: 'Tester' }
    });
    fireEvent.click(screen.getByText('Physical'));
    fireEvent.click(screen.getByText('Enter the Congo Network'));
    expect(screen.getByText('Traveler')).toBeInTheDocument();
    expect(screen.getByText('Builder')).toBeInTheDocument();
    expect(screen.getByText('Healer')).toBeInTheDocument();
  });

  test('shows connected beings for Astral dimension', () => {
    render(<CongoMessenger />);
    fireEvent.change(screen.getByPlaceholderText(/Who are you in the omniverse/), {
      target: { value: 'Tester' }
    });
    fireEvent.click(screen.getByText('Astral'));
    fireEvent.click(screen.getByText('Enter the Congo Network'));
    expect(screen.getByText('Dreamer')).toBeInTheDocument();
    expect(screen.getByText('Seer')).toBeInTheDocument();
  });

  test('displays being name in connected stage', () => {
    render(<CongoMessenger />);
    fireEvent.change(screen.getByPlaceholderText(/Who are you in the omniverse/), {
      target: { value: 'Explorer' }
    });
    fireEvent.click(screen.getByText('Physical'));
    fireEvent.click(screen.getByText('Enter the Congo Network'));
    expect(screen.getByText(/Connected as Explorer/)).toBeInTheDocument();
  });

  test('shows empty resonance field message', () => {
    render(<CongoMessenger />);
    fireEvent.change(screen.getByPlaceholderText(/Who are you in the omniverse/), {
      target: { value: 'Tester' }
    });
    fireEvent.click(screen.getByText('Physical'));
    fireEvent.click(screen.getByText('Enter the Congo Network'));
    expect(screen.getByText('The resonance field is open.')).toBeInTheDocument();
  });

  // --- Connected stage interactions ---

  test('renders message input placeholder for direct mode', () => {
    render(<CongoMessenger />);
    fireEvent.change(screen.getByPlaceholderText(/Who are you in the omniverse/), {
      target: { value: 'Tester' }
    });
    fireEvent.click(screen.getByText('Physical'));
    fireEvent.click(screen.getByText('Enter the Congo Network'));
    expect(screen.getByPlaceholderText('Send through resonance...')).toBeInTheDocument();
  });

  test('toggles broadcast mode', () => {
    render(<CongoMessenger />);
    fireEvent.change(screen.getByPlaceholderText(/Who are you in the omniverse/), {
      target: { value: 'Tester' }
    });
    fireEvent.click(screen.getByText('Physical'));
    fireEvent.click(screen.getByText('Enter the Congo Network'));
    fireEvent.click(screen.getByText('Direct'));
    expect(screen.getByText('OMNIVERSAL')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Broadcast to all dimensions...')).toBeInTheDocument();
  });

  test('returns to tuning stage', () => {
    render(<CongoMessenger />);
    fireEvent.change(screen.getByPlaceholderText(/Who are you in the omniverse/), {
      target: { value: 'Tester' }
    });
    fireEvent.click(screen.getByText('Physical'));
    fireEvent.click(screen.getByText('Enter the Congo Network'));
    fireEvent.click(screen.getByText('Retune'));
    expect(screen.getByText('CONGO')).toBeInTheDocument();
    expect(screen.getByText('Enter the Congo Network')).toBeInTheDocument();
  });

  // --- Message sending ---

  test('sends a message and shows it in the feed', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        content: [{ type: 'text', text: 'Resonance received from the Physical dimension.' }]
      })
    });

    render(<CongoMessenger />);
    fireEvent.change(screen.getByPlaceholderText(/Who are you in the omniverse/), {
      target: { value: 'Sender' }
    });
    fireEvent.click(screen.getByText('Physical'));
    fireEvent.click(screen.getByText('Enter the Congo Network'));

    const msgInput = screen.getByPlaceholderText('Send through resonance...');
    fireEvent.change(msgInput, { target: { value: 'Hello omniverse!' } });
    fireEvent.keyPress(msgInput, { key: 'Enter', charCode: 13 });

    await waitFor(() => {
      expect(screen.getByText('Hello omniverse!')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Resonance received from the Physical dimension.')).toBeInTheDocument();
    });
  });

  test('clears input after sending', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        content: [{ type: 'text', text: 'Response.' }]
      })
    });

    render(<CongoMessenger />);
    fireEvent.change(screen.getByPlaceholderText(/Who are you in the omniverse/), {
      target: { value: 'Sender' }
    });
    fireEvent.click(screen.getByText('Physical'));
    fireEvent.click(screen.getByText('Enter the Congo Network'));

    const msgInput = screen.getByPlaceholderText('Send through resonance...');
    fireEvent.change(msgInput, { target: { value: 'Test message' } });
    fireEvent.keyPress(msgInput, { key: 'Enter', charCode: 13 });

    await waitFor(() => {
      expect(msgInput.value).toBe('');
    });
  });

  test('shows OMNIVERSAL tag on broadcast messages', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        content: [{ type: 'text', text: 'Received.' }]
      })
    });

    render(<CongoMessenger />);
    fireEvent.change(screen.getByPlaceholderText(/Who are you in the omniverse/), {
      target: { value: 'Broadcaster' }
    });
    fireEvent.click(screen.getByText('Physical'));
    fireEvent.click(screen.getByText('Enter the Congo Network'));

    // Enable broadcast mode
    fireEvent.click(screen.getByText('Direct'));

    const msgInput = screen.getByPlaceholderText('Broadcast to all dimensions...');
    fireEvent.change(msgInput, { target: { value: 'To all beings!' } });
    fireEvent.keyPress(msgInput, { key: 'Enter', charCode: 13 });

    await waitFor(() => {
      // Both the toggle button ("OMNIVERSAL") and the message tag ("[OMNIVERSAL]") match
      const matches = screen.getAllByText(/OMNIVERSAL/);
      expect(matches.length).toBeGreaterThanOrEqual(2);
    });
  });

  test('shows resonance level in connected stage', () => {
    render(<CongoMessenger />);
    const slider = screen.getByLabelText(/Resonance Level/);
    fireEvent.change(slider, { target: { value: '82' } });

    fireEvent.change(screen.getByPlaceholderText(/Who are you in the omniverse/), {
      target: { value: 'Tester' }
    });
    fireEvent.click(screen.getByText('HOME'));
    fireEvent.click(screen.getByText('Enter the Congo Network'));

    expect(screen.getByText(/Resonance: 82%/)).toBeInTheDocument();
  });

  test('shows HOME dimension beings', () => {
    render(<CongoMessenger />);
    fireEvent.change(screen.getByPlaceholderText(/Who are you in the omniverse/), {
      target: { value: 'Tester' }
    });
    fireEvent.click(screen.getByText('HOME'));
    fireEvent.click(screen.getByText('Enter the Congo Network'));
    expect(screen.getByText('Anchor')).toBeInTheDocument();
    expect(screen.getByText('Stillness')).toBeInTheDocument();
    expect(screen.getByText('Opus')).toBeInTheDocument();
  });
});
