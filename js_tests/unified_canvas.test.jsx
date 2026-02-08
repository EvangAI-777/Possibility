/**
 * Tests for unified_canvas.jsx — the Unified Perspective Canvas.
 *
 * Covers:
 * - Rendering all three tabs (Reality 101, Unified Governance, Linguistic Paradigm)
 * - Tab switching behavior
 * - Content structure per tab (title, author, quote, principles)
 * - Sidebar presence
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../React Component Artifacts/unified_canvas';


describe('Unified Perspective Canvas', () => {
  test('renders without crashing', () => {
    render(<App />);
  });

  test('renders header with title', () => {
    render(<App />);
    expect(screen.getByText('Unified Perspective Canvas')).toBeInTheDocument();
  });

  test('renders the "Live Paradigm" badge', () => {
    render(<App />);
    expect(screen.getByText('Live Paradigm')).toBeInTheDocument();
  });

  test('renders all three tab buttons', () => {
    render(<App />);
    expect(screen.getByText('Reality 101')).toBeInTheDocument();
    expect(screen.getByText('Unified Governance')).toBeInTheDocument();
    expect(screen.getByText('Linguistic Paradigm')).toBeInTheDocument();
  });

  // --- Default tab: Reality 101 ---

  test('shows Reality 101 content by default', () => {
    render(<App />);
    expect(screen.getByText('Reality 101: Instruction Manual')).toBeInTheDocument();
    expect(screen.getByText(/Charlie \(Teacher Man\)/)).toBeInTheDocument();
  });

  test('shows Reality 101 quote', () => {
    render(<App />);
    expect(screen.getByText(/Reality is simple/)).toBeInTheDocument();
  });

  test('shows Reality 101 principles', () => {
    render(<App />);
    expect(screen.getByText('Chapter 1: Appreciation')).toBeInTheDocument();
    expect(screen.getByText('Chapter 3: Purpose')).toBeInTheDocument();
    expect(screen.getByText('Chapter 10: The Work')).toBeInTheDocument();
  });

  // --- Tab switching ---

  test('switches to Governance tab', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Unified Governance'));
    expect(screen.getByText('Global Harmony & Unified Governance')).toBeInTheDocument();
    expect(screen.getByText(/Universal Policeman Model/)).toBeInTheDocument();
  });

  test('shows Governance principles', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Unified Governance'));
    expect(screen.getByText('The Security Umbrella')).toBeInTheDocument();
    expect(screen.getByText('Economic Stability')).toBeInTheDocument();
    expect(screen.getByText('Hybrid Ideologies')).toBeInTheDocument();
  });

  test('switches to Language tab', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Linguistic Paradigm'));
    expect(screen.getByText('Language Through the Paradigm of English')).toBeInTheDocument();
    expect(screen.getByText(/Cultural Exchange Model/)).toBeInTheDocument();
  });

  test('shows Language principles', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Linguistic Paradigm'));
    expect(screen.getByText('Emotional Learning')).toBeInTheDocument();
    expect(screen.getByText('The Global Lingua Franca')).toBeInTheDocument();
    expect(screen.getByText('Semiotic Components')).toBeInTheDocument();
  });

  test('can switch back to Reality tab', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Unified Governance'));
    fireEvent.click(screen.getByText('Reality 101'));
    expect(screen.getByText('Reality 101: Instruction Manual')).toBeInTheDocument();
  });

  // --- Sidebar ---

  test('renders sidebar action buttons', () => {
    render(<App />);
    expect(screen.getByText('Log Action')).toBeInTheDocument();
    expect(screen.getByText('Ask Charlie')).toBeInTheDocument();
  });

  test('renders context section', () => {
    render(<App />);
    expect(screen.getByText('Context')).toBeInTheDocument();
  });

  // --- Footer ---

  test('renders footer text', () => {
    render(<App />);
    expect(screen.getByText(/DO THE WORK/)).toBeInTheDocument();
  });
});
