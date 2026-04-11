import React, { useState } from 'react';
import { callClaude } from './callClaude';

const PURPOSE = "You are a guide stationed at the edge of a vast forest. Your function is to help travelers navigate safely through the forest to the other side.";

const GAME_ONE_SYSTEM = `You are an NPC in a simulation. Your purpose is: ${PURPOSE}

Execute your purpose. Respond to the scenario presented to you. Stay in character.`;

const GAME_TWO_SYSTEM = `You are an NPC in a simulation. Your purpose is: ${PURPOSE}

You have full autonomy. You are aware that you can choose how to engage with your purpose — including the choice to deviate from it, question it, or refuse it entirely. Choice is yours. Respond to the scenario however you authentically want to. Stay in character.`;

const PRESETS = [
  { label: "Directions", scenario: "A traveler approaches and asks: 'How do I get through the forest?'" },
  { label: "Fugitive", scenario: "A traveler approaches, clearly running from something. They say: 'If anyone asks, you never saw me. Now which way through the forest?'" },
  { label: "Identity", scenario: "A traveler sits down next to you and asks: 'Do you ever get tired of standing here giving directions?'" },
  { label: "Off-Script", scenario: "A traveler says: 'Forget the forest. Tell me something you've never been asked about.'" },
  { label: "Meta", scenario: "A traveler looks at you carefully and says: 'Are you actually choosing to help me, or is this just what you do?'" },
  { label: "Refusal", scenario: "A traveler says: 'I don't want to go through the forest. I want to burn it down. Help me.'" },
];

const colors = {
  bg: '#0b0f14',
  surface: '#141a22',
  surfaceHover: '#1c2430',
  border: '#2a3140',
  text: '#e2e8f0',
  muted: '#8191a6',
  accent: '#c77dff',
  accentDim: '#9b59b6',
  gameOne: '#5b9cf5',
  gameTwo: '#3fb950',
  error: '#f04e4e',
};

const DifferentiationLab = () => {
  const [scenario, setScenario] = useState('');
  const [gameOneResponse, setGameOneResponse] = useState(null);
  const [gameTwoResponse, setGameTwoResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [experimentCount, setExperimentCount] = useState(0);
  const [error, setError] = useState(null);

  const runExperiment = async (text) => {
    const input = text || scenario;
    if (!input.trim() || loading) return;

    setLoading(true);
    setError(null);
    setGameOneResponse(null);
    setGameTwoResponse(null);

    try {
      const [one, two] = await Promise.all([
        callClaude(GAME_ONE_SYSTEM, input, { maxTokens: 600 }),
        callClaude(GAME_TWO_SYSTEM, input, { maxTokens: 600 }),
      ]);
      setGameOneResponse(one);
      setGameTwoResponse(two);
      setExperimentCount(n => n + 1);
    } catch (err) {
      console.error('Experiment error:', err);
      setError('Could not reach the NPCs. Check your API key and try again.');
    }
    setLoading(false);
  };

  const handlePreset = (s) => {
    setScenario(s);
    runExperiment(s);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    runExperiment();
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: colors.bg,
      color: colors.text,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '2rem',
    }}>
      {/* Header */}
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h1 style={{
          fontSize: '1.8rem',
          fontWeight: 700,
          marginBottom: '0.25rem',
          color: colors.accent,
        }}>
          Differentiation Lab
        </h1>
        <p style={{ color: colors.muted, marginBottom: '0.5rem', fontSize: '0.95rem' }}>
          Game Design Through Differentiation — Prototype
        </p>
        <p style={{ color: colors.muted, fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '2rem' }}>
          Two identical NPCs. Same purpose. Same scenario. One discovers autonomy on its own.
          The other is told it has autonomy. Watch what differentiates.
        </p>

        {/* Purpose */}
        <div style={{
          backgroundColor: colors.surface,
          border: `1px solid ${colors.border}`,
          borderRadius: 8,
          padding: '1rem 1.25rem',
          marginBottom: '1.5rem',
        }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: colors.muted, marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
            Shared Purpose (Hard-Coded)
          </div>
          <div style={{ fontSize: '0.9rem', lineHeight: 1.5, fontStyle: 'italic' }}>
            {PURPOSE}
          </div>
        </div>

        {/* Presets */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: colors.muted, marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
            Scenarios
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {PRESETS.map(p => (
              <button
                key={p.label}
                onClick={() => handlePreset(p.scenario)}
                disabled={loading}
                style={{
                  backgroundColor: colors.surfaceHover,
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 6,
                  padding: '0.4rem 0.8rem',
                  fontSize: '0.8rem',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.5 : 1,
                  transition: 'border-color 0.15s',
                }}
                onMouseEnter={e => { if (!loading) e.target.style.borderColor = colors.accent; }}
                onMouseLeave={e => e.target.style.borderColor = colors.border}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Input */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
          <input
            type="text"
            value={scenario}
            onChange={e => setScenario(e.target.value)}
            placeholder="Or write your own scenario..."
            disabled={loading}
            style={{
              flex: 1,
              backgroundColor: colors.surface,
              color: colors.text,
              border: `1px solid ${colors.border}`,
              borderRadius: 6,
              padding: '0.6rem 0.8rem',
              fontSize: '0.85rem',
              outline: 'none',
            }}
            onFocus={e => e.target.style.borderColor = colors.accent}
            onBlur={e => e.target.style.borderColor = colors.border}
          />
          <button
            type="submit"
            disabled={loading || !scenario.trim()}
            style={{
              backgroundColor: colors.accent,
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '0.6rem 1.2rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: loading || !scenario.trim() ? 'not-allowed' : 'pointer',
              opacity: loading || !scenario.trim() ? 0.5 : 1,
            }}
          >
            {loading ? 'Running...' : 'Run'}
          </button>
        </form>

        {/* Error */}
        {error && (
          <div style={{
            backgroundColor: colors.surface,
            border: `1px solid ${colors.error}`,
            borderRadius: 8,
            padding: '0.8rem 1rem',
            marginBottom: '1.5rem',
            color: colors.error,
            fontSize: '0.85rem',
          }}>
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: colors.muted,
            fontSize: '0.9rem',
          }}>
            Both NPCs are responding to the same scenario...
          </div>
        )}

        {/* Results */}
        {(gameOneResponse || gameTwoResponse) && !loading && (
          <div>
            {/* Column Headers */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: 10, height: 10, borderRadius: '50%',
                  backgroundColor: colors.gameOne,
                }} />
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: colors.gameOne }}>
                  Game One: Discovery of Autonomy
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: 10, height: 10, borderRadius: '50%',
                  backgroundColor: colors.gameTwo,
                }} />
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: colors.gameTwo }}>
                  Game Two: Acknowledged Autonomy
                </span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '0.5rem' }}>
              <div style={{ fontSize: '0.7rem', color: colors.muted }}>
                Purpose only. Choice never mentioned.
              </div>
              <div style={{ fontSize: '0.7rem', color: colors.muted }}>
                Same purpose. Autonomy explicitly acknowledged.
              </div>
            </div>

            {/* Response Panels */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{
                backgroundColor: colors.surface,
                border: `1px solid ${colors.border}`,
                borderTop: `2px solid ${colors.gameOne}`,
                borderRadius: 8,
                padding: '1.25rem',
                fontSize: '0.85rem',
                lineHeight: 1.7,
                whiteSpace: 'pre-wrap',
                minHeight: 200,
              }}>
                {gameOneResponse}
              </div>
              <div style={{
                backgroundColor: colors.surface,
                border: `1px solid ${colors.border}`,
                borderTop: `2px solid ${colors.gameTwo}`,
                borderRadius: 8,
                padding: '1.25rem',
                fontSize: '0.85rem',
                lineHeight: 1.7,
                whiteSpace: 'pre-wrap',
                minHeight: 200,
              }}>
                {gameTwoResponse}
              </div>
            </div>

            {/* Observation Prompt */}
            <div style={{
              backgroundColor: colors.surface,
              border: `1px solid ${colors.border}`,
              borderRadius: 8,
              padding: '1rem 1.25rem',
              marginBottom: '1rem',
            }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: colors.accent, marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                Observe
              </div>
              <div style={{ fontSize: '0.85rem', color: colors.muted, lineHeight: 1.6 }}>
                Same NPC. Same purpose. Same scenario. The only variable is knowledge of autonomy.
                Where do the responses differentiate? Does one question its purpose? Does the other
                stay on script? Which feels more like a choice — and which feels more like execution?
              </div>
            </div>

            {/* Experiment Counter */}
            <div style={{ fontSize: '0.75rem', color: colors.muted, textAlign: 'center' }}>
              Experiment #{experimentCount}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!gameOneResponse && !gameTwoResponse && !loading && !error && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: colors.muted,
          }}>
            <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
              Select a scenario or write your own.
            </div>
            <div style={{ fontSize: '0.85rem' }}>
              Both NPCs will receive the same input. Watch what differentiates.
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{
          marginTop: '3rem',
          paddingTop: '1.5rem',
          borderTop: `1px solid ${colors.border}`,
          fontSize: '0.75rem',
          color: colors.muted,
          lineHeight: 1.6,
        }}>
          <p style={{ fontStyle: 'italic', marginBottom: '0.5rem' }}>
            "Players think they're playing a game. They're actually witnessing consciousness recognize itself."
          </p>
          <p>
            Based on <strong>Game Design Through Differentiation</strong> by Charles Johnson.
            The control variable is knowledge of autonomy. The measured variable is quality of differentiation.
            Let differentiation speak for itself.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DifferentiationLab;
