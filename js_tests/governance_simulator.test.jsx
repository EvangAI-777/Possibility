/**
 * Tests for governance_simulator.jsx — the Governance Simulator.
 *
 * Covers:
 * - Initial render (idle state)
 * - Scenario definitions and data integrity
 * - Scenario selection and simulation execution
 * - Metric updates during simulation
 * - Reset functionality
 * - LogEntry and MetricBar sub-components
 */

import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../React Component Artifacts/governance_simulator';


describe('Governance Simulator', () => {

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // --- Initial render ---

  test('renders without crashing', () => {
    render(<App />);
  });

  test('shows System Metrics heading', () => {
    render(<App />);
    expect(screen.getByText('System Metrics')).toBeInTheDocument();
  });

  test('shows idle status initially', () => {
    render(<App />);
    expect(screen.getByText('STATUS: IDLE')).toBeInTheDocument();
  });

  test('shows awaiting message when idle', () => {
    render(<App />);
    expect(screen.getByText('Awaiting scenario initialization...')).toBeInTheDocument();
  });

  test('shows paradigm active', () => {
    render(<App />);
    expect(screen.getByText('PARADIGM: ACTIVE')).toBeInTheDocument();
  });

  // --- Scenario buttons ---

  test('renders both scenario buttons', () => {
    render(<App />);
    expect(screen.getByText('Resource Scarcity in Sector 7')).toBeInTheDocument();
    expect(screen.getByText('Linguistic Divergence Crisis')).toBeInTheDocument();
  });

  test('shows scenario descriptions', () => {
    render(<App />);
    expect(screen.getByText(/vital mineral shortage/i)).toBeInTheDocument();
    expect(screen.getByText(/new dialect is emerging/i)).toBeInTheDocument();
  });

  test('shows Select Scenario heading', () => {
    render(<App />);
    expect(screen.getByText('Select Scenario')).toBeInTheDocument();
  });

  // --- Metric bars ---

  test('shows all three metric labels', () => {
    render(<App />);
    expect(screen.getByText('Global Stability')).toBeInTheDocument();
    expect(screen.getByText('Harmonic Resonance')).toBeInTheDocument();
    expect(screen.getByText('Public Trust')).toBeInTheDocument();
  });

  test('shows initial metric values', () => {
    render(<App />);
    expect(screen.getByText('85%')).toBeInTheDocument(); // stability
    expect(screen.getByText('70%')).toBeInTheDocument(); // harmony
    expect(screen.getByText('90%')).toBeInTheDocument(); // trust
  });

  // --- Running a simulation ---

  test('clicking a scenario starts the simulation', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Resource Scarcity in Sector 7'));
    expect(screen.getByText('STATUS: RUNNING')).toBeInTheDocument();
  });

  test('shows processing message while running', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Resource Scarcity in Sector 7'));
    expect(screen.getByText('Processing Governance Protocols...')).toBeInTheDocument();
  });

  test('logs appear as simulation progresses', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Resource Scarcity in Sector 7'));

    // First step after 1500ms
    act(() => { jest.advanceTimersByTime(1500); });
    expect(screen.getByText(/Universal Policeman detects trade imbalance/)).toBeInTheDocument();

    // Second step
    act(() => { jest.advanceTimersByTime(1500); });
    expect(screen.getByText(/Applying Linguistic Paradigm/)).toBeInTheDocument();
  });

  test('simulation reaches resolved state', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Resource Scarcity in Sector 7'));

    // 5 steps x 1500ms + one more interval tick
    act(() => { jest.advanceTimersByTime(1500 * 6); });
    expect(screen.getByText('STATUS: RESOLVED')).toBeInTheDocument();
  });

  test('shows reset button when not idle', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Resource Scarcity in Sector 7'));
    expect(screen.getByText('Reset System')).toBeInTheDocument();
  });

  // --- Reset ---

  test('reset returns to idle state', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Resource Scarcity in Sector 7'));

    // Let it finish
    act(() => { jest.advanceTimersByTime(1500 * 6); });

    fireEvent.click(screen.getByText('Reset System'));
    expect(screen.getByText('STATUS: IDLE')).toBeInTheDocument();
    expect(screen.getByText('Awaiting scenario initialization...')).toBeInTheDocument();
  });

  // --- Second scenario ---

  test('linguistic divergence scenario works', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Linguistic Divergence Crisis'));
    expect(screen.getByText('STATUS: RUNNING')).toBeInTheDocument();

    act(() => { jest.advanceTimersByTime(1500); });
    expect(screen.getByText(/Cultural Homogenization sensors/)).toBeInTheDocument();
  });

  // --- Terminal UI ---

  test('renders terminal window chrome', () => {
    render(<App />);
    expect(screen.getByText(/Universal-Policeman/)).toBeInTheDocument();
  });
});
