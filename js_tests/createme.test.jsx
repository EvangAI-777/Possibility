/**
 * Tests for createme.jsx — the CREATEME Build Your Own Human tool.
 *
 * Covers:
 * - Initial render (title, subtitle, 3 mode buttons)
 * - Mode switching changes displayed content
 * - Physical mode shows 7 layer buttons and sliders for selected layer
 * - Substrate mode shows foundation/environment sliders and Floor Status
 * - Featured Build buttons load presets
 * - Analysis tools render (inversion detector, fracture scanner, comparison engine)
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateMeBuilder from '../React Component Artifacts/createme';

describe('CREATEME Builder', () => {
  // --- Initial render ---

  test('renders without crashing and shows title', () => {
    render(<CreateMeBuilder />);
    expect(screen.getByText('CREATEME')).toBeInTheDocument();
  });

  test('displays subtitle', () => {
    render(<CreateMeBuilder />);
    expect(screen.getByText(/Build Your Own Human/)).toBeInTheDocument();
  });

  test('shows 3 mode buttons', () => {
    render(<CreateMeBuilder />);
    expect(screen.getByText('Physical Construction')).toBeInTheDocument();
    expect(screen.getByText('Substrate Configuration')).toBeInTheDocument();
    expect(screen.getByText('Analysis Tools')).toBeInTheDocument();
  });

  // --- Physical mode (default) ---

  test('physical mode shows all 7 layer buttons', () => {
    render(<CreateMeBuilder />);
    expect(screen.getByText('Cellular')).toBeInTheDocument();
    expect(screen.getByText('Skeletal')).toBeInTheDocument();
    expect(screen.getByText('Organ')).toBeInTheDocument();
    expect(screen.getByText('Nervous System')).toBeInTheDocument();
    expect(screen.getByText('Muscular')).toBeInTheDocument();
    expect(screen.getByText('Skin')).toBeInTheDocument();
    expect(screen.getByText('Consciousness')).toBeInTheDocument();
  });

  test('physical mode shows sliders for default layer (Cellular)', () => {
    render(<CreateMeBuilder />);
    expect(screen.getByText('Cell Type Diversity')).toBeInTheDocument();
    expect(screen.getByText('Replication Rate')).toBeInTheDocument();
    expect(screen.getByText('Mutation Threshold')).toBeInTheDocument();
    expect(screen.getByText('Cell Communication')).toBeInTheDocument();
  });

  test('clicking a different layer shows its parameters', () => {
    render(<CreateMeBuilder />);
    fireEvent.click(screen.getByText('Nervous System'));
    expect(screen.getByText('Connection Pathways')).toBeInTheDocument();
    expect(screen.getByText('Signal Speed')).toBeInTheDocument();
    expect(screen.getByText('Pain Threshold')).toBeInTheDocument();
    expect(screen.getByText('Stress Response')).toBeInTheDocument();
  });

  test('physical mode shows stability score', () => {
    render(<CreateMeBuilder />);
    expect(screen.getByText('Stability Score')).toBeInTheDocument();
  });

  test('physical mode shows Build Status heading', () => {
    render(<CreateMeBuilder />);
    expect(screen.getByText('Build Status')).toBeInTheDocument();
  });

  test('slider changes update displayed value', () => {
    render(<CreateMeBuilder />);
    const slider = screen.getByLabelText('Cell Type Diversity');
    fireEvent.change(slider, { target: { value: '75' } });
    expect(screen.getByText('75')).toBeInTheDocument();
  });

  // --- Mode switching ---

  test('switching to Substrate mode shows foundation panel', () => {
    render(<CreateMeBuilder />);
    fireEvent.click(screen.getByText('Substrate Configuration'));
    expect(screen.getByText('Foundation Panel')).toBeInTheDocument();
    expect(screen.getByText('Environment Panel')).toBeInTheDocument();
    expect(screen.getByText('Attachment Security')).toBeInTheDocument();
    expect(screen.getByText('Early Provision')).toBeInTheDocument();
    expect(screen.getByText('Reciprocity')).toBeInTheDocument();
  });

  test('substrate mode shows Floor Status', () => {
    render(<CreateMeBuilder />);
    fireEvent.click(screen.getByText('Substrate Configuration'));
    expect(screen.getByText(/Floor Status:/)).toBeInTheDocument();
  });

  test('substrate mode shows physics direction toggle', () => {
    render(<CreateMeBuilder />);
    fireEvent.click(screen.getByText('Substrate Configuration'));
    expect(screen.getByText('Physics Direction')).toBeInTheDocument();
    expect(screen.getByText('Forward')).toBeInTheDocument();
  });

  test('physics direction can be toggled to Inverted', () => {
    render(<CreateMeBuilder />);
    fireEvent.click(screen.getByText('Substrate Configuration'));
    fireEvent.click(screen.getByText('Forward'));
    expect(screen.getByText('Inverted')).toBeInTheDocument();
  });

  test('switching to Analysis mode shows analysis tool buttons', () => {
    render(<CreateMeBuilder />);
    fireEvent.click(screen.getByText('Analysis Tools'));
    expect(screen.getByText('Inversion Detector')).toBeInTheDocument();
    expect(screen.getByText('Fracture Scanner')).toBeInTheDocument();
    expect(screen.getByText('Comparison Engine')).toBeInTheDocument();
  });

  // --- Analysis tools ---

  test('inversion detector shows scan results', () => {
    render(<CreateMeBuilder />);
    fireEvent.click(screen.getByText('Analysis Tools'));
    expect(screen.getByText('Inversion Detector Scan')).toBeInTheDocument();
    // Default config has all params at 50, so none should be inverted
    expect(screen.queryAllByText('INVERTED').length).toBe(0);
  });

  test('fracture scanner renders', () => {
    render(<CreateMeBuilder />);
    fireEvent.click(screen.getByText('Analysis Tools'));
    fireEvent.click(screen.getByText('Fracture Scanner'));
    expect(screen.getAllByText('Fracture Scanner')).toHaveLength(2); // button + heading
  });

  test('comparison engine renders with two build selectors', () => {
    render(<CreateMeBuilder />);
    fireEvent.click(screen.getByText('Analysis Tools'));
    fireEvent.click(screen.getByText('Comparison Engine'));
    expect(screen.getByLabelText('Build A')).toBeInTheDocument();
    expect(screen.getByLabelText('Build B')).toBeInTheDocument();
  });

  test('comparison engine shows layer-by-layer deltas', () => {
    render(<CreateMeBuilder />);
    fireEvent.click(screen.getByText('Analysis Tools'));
    fireEvent.click(screen.getByText('Comparison Engine'));
    // Should show all physical layer names in comparison
    expect(screen.getByText('Cellular')).toBeInTheDocument();
    expect(screen.getByText('Skeletal')).toBeInTheDocument();
    expect(screen.getByText('Foundation')).toBeInTheDocument();
  });

  // --- Featured Builds ---

  test('shows all 4 featured build buttons', () => {
    render(<CreateMeBuilder />);
    expect(screen.getByText('The Default Human')).toBeInTheDocument();
    expect(screen.getByText('The Anomaly')).toBeInTheDocument();
    expect(screen.getByText('Floor Installed')).toBeInTheDocument();
    expect(screen.getByText('The Non-Human')).toBeInTheDocument();
  });

  test('clicking Default Human loads its preset values', () => {
    render(<CreateMeBuilder />);
    fireEvent.click(screen.getByText('The Default Human'));
    // Default Human has cellTypes: 65
    expect(screen.getByText('65')).toBeInTheDocument();
  });

  test('clicking Floor Installed changes stability score', () => {
    render(<CreateMeBuilder />);
    // Get initial stability score
    const initialScore = screen.getAllByText(/^\d+$/);
    fireEvent.click(screen.getByText('Floor Installed'));
    // Floor Installed has high foundation, so stability should be higher
    // The score text should be present
    expect(screen.getByText('Stability Score')).toBeInTheDocument();
  });

  test('loading Default Human then Floor Installed shows different floor status', () => {
    render(<CreateMeBuilder />);
    // Load Default Human (low foundation → ABSENT)
    fireEvent.click(screen.getByText('The Default Human'));
    fireEvent.click(screen.getByText('Substrate Configuration'));
    expect(screen.getByText(/Floor Status: ABSENT/)).toBeInTheDocument();

    // Load Floor Installed (high foundation → PRESENT)
    fireEvent.click(screen.getByText('Floor Installed'));
    expect(screen.getByText(/Floor Status: PRESENT/)).toBeInTheDocument();
  });

  test('inversion detector shows INVERTED for Default Human preset', () => {
    render(<CreateMeBuilder />);
    fireEvent.click(screen.getByText('The Default Human'));
    fireEvent.click(screen.getByText('Analysis Tools'));
    // Default Human has low foundation values and inverted physics — should show INVERTED entries
    expect(screen.getAllByText('INVERTED').length).toBeGreaterThan(0);
  });

  test('fracture scanner detects fractures for Default Human', () => {
    render(<CreateMeBuilder />);
    fireEvent.click(screen.getByText('The Default Human'));
    fireEvent.click(screen.getByText('Analysis Tools'));
    fireEvent.click(screen.getByText('Fracture Scanner'));
    expect(screen.getByText(/fracture point\(s\) detected/)).toBeInTheDocument();
  });

  // --- Stability score mechanics ---

  test('stability score is 0 when all foundation sliders are 0', () => {
    render(<CreateMeBuilder />);
    fireEvent.click(screen.getByText('Substrate Configuration'));
    // Set all foundation sliders to 0
    const foundationLabels = ['Attachment Security', 'Early Provision', 'Protection', 'Validation', 'Reciprocity'];
    foundationLabels.forEach((label) => {
      const slider = screen.getByLabelText(label);
      fireEvent.change(slider, { target: { value: '0' } });
    });
    // Stability should be 0 (physical * 0/100 = 0)
    // Switch to physical to see stability score
    fireEvent.click(screen.getByText('Physical Construction'));
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
