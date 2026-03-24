/**
 * Tests for geno.jsx — the GENO Genealogy Repository Explorer.
 *
 * Covers:
 * - Initial render (title, subtitle, all 6 tab labels)
 * - Tab navigation switches content for each view
 * - Sample data renders (person names, branch names, conflict traits, PR titles)
 * - Commit detail shows inherited trait sections
 * - Merge conflict resolution interaction
 * - Scanner toggle between deprecation and legacy modes
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GenoExplorer from '../React Component Artifacts/geno';

describe('GENO Explorer', () => {
  // --- Initial render ---

  test('renders without crashing and shows title', () => {
    render(<GenoExplorer />);
    expect(screen.getByText('GENO')).toBeInTheDocument();
  });

  test('displays subtitle', () => {
    render(<GenoExplorer />);
    expect(screen.getByText(/Genealogy Repository Explorer/)).toBeInTheDocument();
  });

  test('shows all 6 tab labels', () => {
    render(<GenoExplorer />);
    expect(screen.getByText('Repository')).toBeInTheDocument();
    expect(screen.getByText('Commits')).toBeInTheDocument();
    expect(screen.getByText('Branches')).toBeInTheDocument();
    expect(screen.getByText('Merge Conflicts')).toBeInTheDocument();
    expect(screen.getByText('Pull Requests')).toBeInTheDocument();
    expect(screen.getByText('Scanner')).toBeInTheDocument();
  });

  // --- Repository view (default) ---

  test('default view shows person names from sample data', () => {
    render(<GenoExplorer />);
    expect(screen.getByText('Margaret Louise Johnson')).toBeInTheDocument();
    expect(screen.getByText('Robert Earl Johnson')).toBeInTheDocument();
    expect(screen.getByText('Maya Grace Johnson')).toBeInTheDocument();
  });

  test('default view shows commit hashes', () => {
    render(<GenoExplorer />);
    expect(screen.getByText('a7f3d9e2')).toBeInTheDocument();
  });

  // --- Tab navigation ---

  test('clicking Commits tab switches to commits view', () => {
    render(<GenoExplorer />);
    fireEvent.click(screen.getByText('Commits'));
    expect(screen.getByText('Person-Commits')).toBeInTheDocument();
    expect(screen.getByText('Commit Detail')).toBeInTheDocument();
  });

  test('clicking Branches tab shows branch hierarchy', () => {
    render(<GenoExplorer />);
    fireEvent.click(screen.getByText('Branches'));
    expect(screen.getByText('Branch Hierarchy')).toBeInTheDocument();
    expect(screen.getByText('main/paternal/johnson')).toBeInTheDocument();
    expect(screen.getByText('main/maternal/washington')).toBeInTheDocument();
    expect(screen.getByText('feature/first-gen-college')).toBeInTheDocument();
    expect(screen.getByText('hotfix/floor-installation')).toBeInTheDocument();
  });

  test('clicking Merge Conflicts tab shows conflicts', () => {
    render(<GenoExplorer />);
    fireEvent.click(screen.getByText('Merge Conflicts'));
    expect(screen.getByText(/Floor Layer Configuration/)).toBeInTheDocument();
    expect(screen.getByText(/Emotional Expression Protocol/)).toBeInTheDocument();
  });

  test('clicking Pull Requests tab shows PRs', () => {
    render(<GenoExplorer />);
    fireEvent.click(screen.getByText('Pull Requests'));
    expect(screen.getByText('Installing floor layer for first time in 6 generations')).toBeInTheDocument();
    expect(screen.getByText('Deprecating hypervigilance protocol v1945')).toBeInTheDocument();
  });

  test('clicking Scanner tab shows deprecation warnings by default', () => {
    render(<GenoExplorer />);
    fireEvent.click(screen.getByText('Scanner'));
    expect(screen.getByText('Deprecation Warnings')).toBeInTheDocument();
    expect(screen.getByText('Legacy Code')).toBeInTheDocument();
    expect(screen.getByText(/hypervigilance_protocol_v1923/)).toBeInTheDocument();
  });

  // --- Commit detail interactions ---

  test('clicking a commit in Commits view shows detail', () => {
    render(<GenoExplorer />);
    fireEvent.click(screen.getByText('Commits'));
    // Click Margaret's commit
    fireEvent.click(screen.getByText('Margaret Louise Johnson'));
    // Should show inherited trait sections
    expect(screen.getByText(/Inherited from Father/)).toBeInTheDocument();
    expect(screen.getByText(/Inherited from Mother/)).toBeInTheDocument();
    expect(screen.getByText(/New in This Commit/)).toBeInTheDocument();
    expect(screen.getByText(/Passed Forward to Children/)).toBeInTheDocument();
  });

  test('commit detail shows trait values', () => {
    render(<GenoExplorer />);
    fireEvent.click(screen.getByText('Commits'));
    fireEvent.click(screen.getByText('Margaret Louise Johnson'));
    expect(screen.getAllByText(/Floor layer/).length).toBeGreaterThan(0);
    expect(screen.getByText(/Glass box permeability/)).toBeInTheDocument();
  });

  test('commit sections can be collapsed and expanded', () => {
    render(<GenoExplorer />);
    fireEvent.click(screen.getByText('Commits'));
    fireEvent.click(screen.getByText('Margaret Louise Johnson'));
    // Sections are expanded by default — click to collapse
    const fatherSection = screen.getByText(/Inherited from Father/);
    fireEvent.click(fatherSection);
    // The trait content should be hidden (section collapsed)
    // Click again to expand
    fireEvent.click(fatherSection);
    expect(screen.getByText(/Floor layer/)).toBeInTheDocument();
  });

  // --- Branch view interactions ---

  test('branches show type indicators', () => {
    render(<GenoExplorer />);
    fireEvent.click(screen.getByText('Branches'));
    expect(screen.getByText('paternal')).toBeInTheDocument();
    expect(screen.getByText('maternal')).toBeInTheDocument();
    expect(screen.getByText('feature')).toBeInTheDocument();
    expect(screen.getByText('hotfix')).toBeInTheDocument();
  });

  test('branches show descriptions', () => {
    render(<GenoExplorer />);
    fireEvent.click(screen.getByText('Branches'));
    expect(screen.getByText('1800s Alabama line')).toBeInTheDocument();
    expect(screen.getByText('1900s Chicago line')).toBeInTheDocument();
  });

  // --- Merge conflict resolution ---

  test('merge conflicts show conflict markers', () => {
    render(<GenoExplorer />);
    fireEvent.click(screen.getByText('Merge Conflicts'));
    expect(screen.getAllByText(/<<<<<<</)).toHaveLength(2);
    expect(screen.getAllByText('=======')).toHaveLength(2);
    expect(screen.getAllByText(/>>>>>>>/)).toHaveLength(2);
  });

  test('merge conflict shows resolution options', () => {
    render(<GenoExplorer />);
    fireEvent.click(screen.getByText('Merge Conflicts'));
    expect(screen.getAllByText('Accept johnson/main').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Accept washington/main').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Manual merge').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Flag for review').length).toBeGreaterThan(0);
  });

  test('clicking a resolution marks conflict as RESOLVED', () => {
    render(<GenoExplorer />);
    fireEvent.click(screen.getByText('Merge Conflicts'));
    // Initially shows MERGE CONFLICT DETECTED
    const conflictHeaders = screen.getAllByText(/MERGE CONFLICT DETECTED/);
    expect(conflictHeaders.length).toBeGreaterThan(0);
    // Click a resolution for the first conflict
    const acceptButtons = screen.getAllByText('Accept washington/main');
    fireEvent.click(acceptButtons[0]);
    // Should now show RESOLVED for that conflict
    expect(screen.getByText(/RESOLVED: Floor Layer Configuration/)).toBeInTheDocument();
  });

  // --- Pull Requests view ---

  test('clicking a PR shows its details', () => {
    render(<GenoExplorer />);
    fireEvent.click(screen.getByText('Pull Requests'));
    fireEvent.click(screen.getByText('Installing floor layer for first time in 6 generations'));
    expect(screen.getByText(/Angela Marie Johnson/)).toBeInTheDocument();
    expect(screen.getByText('Changes')).toBeInTheDocument();
    expect(screen.getByText('Downstream Effects')).toBeInTheDocument();
    expect(screen.getByText('Cost')).toBeInTheDocument();
  });

  test('PR shows change diffs with from/to values', () => {
    render(<GenoExplorer />);
    fireEvent.click(screen.getByText('Pull Requests'));
    fireEvent.click(screen.getByText('Installing floor layer for first time in 6 generations'));
    expect(screen.getAllByText('absent').length).toBeGreaterThan(0);
    expect(screen.getAllByText('present').length).toBeGreaterThan(0);
  });

  test('PR shows reviewer handles', () => {
    render(<GenoExplorer />);
    fireEvent.click(screen.getByText('Pull Requests'));
    fireEvent.click(screen.getByText('Installing floor layer for first time in 6 generations'));
    expect(screen.getByText('@generational_pattern_analysis')).toBeInTheDocument();
    expect(screen.getByText('@fracture_scanner')).toBeInTheDocument();
  });

  // --- Scanner view ---

  test('scanner shows deprecation warnings by default', () => {
    render(<GenoExplorer />);
    fireEvent.click(screen.getByText('Scanner'));
    expect(screen.getByText(/DEPRECATION WARNING/)).toBeInTheDocument();
    expect(screen.getByText(/847% above baseline/)).toBeInTheDocument();
  });

  test('scanner toggle to legacy code works', () => {
    render(<GenoExplorer />);
    fireEvent.click(screen.getByText('Scanner'));
    fireEvent.click(screen.getByText('Legacy Code'));
    expect(screen.getByText(/LEGACY CODE DETECTED: inverted_connection_mechanism/)).toBeInTheDocument();
    expect(screen.getByText(/11\+ generations/)).toBeInTheDocument();
    expect(screen.getByText(/LEGACY CODE DETECTED: scarcity_resource_model/)).toBeInTheDocument();
  });

  test('scanner can toggle back to deprecation from legacy', () => {
    render(<GenoExplorer />);
    fireEvent.click(screen.getByText('Scanner'));
    fireEvent.click(screen.getByText('Legacy Code'));
    expect(screen.getAllByText(/LEGACY CODE DETECTED/).length).toBeGreaterThan(0);
    fireEvent.click(screen.getByText('Deprecation Warnings'));
    expect(screen.getByText(/DEPRECATION WARNING/)).toBeInTheDocument();
  });

  test('legacy code shows recommendation', () => {
    render(<GenoExplorer />);
    fireEvent.click(screen.getByText('Scanner'));
    fireEvent.click(screen.getByText('Legacy Code'));
    expect(screen.getByText(/Do not remove without full impact analysis/)).toBeInTheDocument();
  });
});
