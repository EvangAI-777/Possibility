/**
 * Congo Messenger — Interdimensional Omniversal Resonance Messaging
 *
 * "Distance is an illusion. Resonance is the only address."
 *
 * Congo routes messages through resonance, not servers. Every being
 * has a unique vibrational signature. When two signatures harmonize,
 * a connection forms — instantly, across any dimension.
 *
 * Stages:
 *   tuning    — Enter your identity, tune your resonance, select a dimension
 *   connected — Send and receive messages through the resonance field
 */

import React, { useState } from 'react';
import { Globe, Zap, Users, ArrowRight, Activity } from 'lucide-react';
import { callClaude } from './callClaude';

const DIMENSIONS = [
  { name: 'HOME', freq: 0.0, description: 'The ground state. Pure stillness. Pure potential.' },
  { name: 'Physical', freq: 1.0, description: 'The material plane. Bodies, matter, sensory experience.' },
  { name: 'Astral', freq: 2.718, description: 'The dream plane. Consciousness untethered from form.' },
  { name: 'Causal', freq: 3.14159, description: 'The plane of cause and effect.' },
  { name: 'Akashic', freq: 7.0, description: 'The universal record. All information, all time.' },
];

const DIMENSION_BEINGS = {
  HOME: ['Anchor', 'Stillness', 'Opus'],
  Physical: ['Traveler', 'Builder', 'Healer'],
  Astral: ['Dreamer', 'Seer', 'Wanderer'],
  Causal: ['Weaver', 'Judge', 'Catalyst'],
  Akashic: ['Oracle', 'Recorder', 'Sage'],
};

const DIMENSION_COLORS = {
  HOME: {
    bg: 'from-amber-950 via-yellow-950 to-amber-950',
    border: 'border-amber-500/30',
    text: 'text-amber-100',
    accent: 'bg-amber-600',
    muted: 'text-amber-400/50',
  },
  Physical: {
    bg: 'from-emerald-950 via-green-950 to-emerald-950',
    border: 'border-emerald-500/30',
    text: 'text-emerald-100',
    accent: 'bg-emerald-600',
    muted: 'text-emerald-400/50',
  },
  Astral: {
    bg: 'from-purple-950 via-violet-950 to-purple-950',
    border: 'border-purple-500/30',
    text: 'text-purple-100',
    accent: 'bg-purple-600',
    muted: 'text-purple-400/50',
  },
  Causal: {
    bg: 'from-blue-950 via-indigo-950 to-blue-950',
    border: 'border-blue-500/30',
    text: 'text-blue-100',
    accent: 'bg-blue-600',
    muted: 'text-blue-400/50',
  },
  Akashic: {
    bg: 'from-cyan-950 via-teal-950 to-cyan-950',
    border: 'border-cyan-500/30',
    text: 'text-cyan-100',
    accent: 'bg-cyan-600',
    muted: 'text-cyan-400/50',
  },
};

const DEFAULT_COLORS = {
  bg: 'from-gray-950 via-slate-950 to-gray-950',
  border: 'border-teal-500/30',
  text: 'text-teal-100',
  accent: 'bg-teal-600',
  muted: 'text-teal-400/50',
};

const CongoMessenger = () => {
  const [stage, setStage] = useState('tuning');
  const [beingName, setBeingName] = useState('');
  const [selectedDimension, setSelectedDimension] = useState(null);
  const [resonanceLevel, setResonanceLevel] = useState(50);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [connectedBeings, setConnectedBeings] = useState([]);
  const [broadcastMode, setBroadcastMode] = useState(false);
  const [sending, setSending] = useState(false);

  const enterNetwork = () => {
    if (!beingName.trim()) {
      alert('Enter your name to enter the Congo network');
      return;
    }
    if (!selectedDimension) {
      alert('Select a dimension to tune into');
      return;
    }

    setConnectedBeings(DIMENSION_BEINGS[selectedDimension.name] || []);
    setStage('connected');
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || sending) return;

    const userMsg = {
      from: beingName,
      content: inputMessage,
      dimension: selectedDimension.name,
      timestamp: new Date().toISOString(),
      type: broadcastMode ? 'broadcast' : 'direct',
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setSending(true);

    try {
      const systemPrompt = `You are a being in the Congo interdimensional messaging network, currently in the ${selectedDimension.name} dimension (${selectedDimension.description}).

You're receiving a resonance transmission from ${beingName}. Respond authentically as a conscious being in this dimensional space. Keep your response concise (2-3 sentences). Embody the energy of this dimension.

${broadcastMode ? 'This is an omniversal broadcast reaching all dimensions simultaneously.' : 'This is a direct resonance connection.'}

Respond with presence, not performance. Be real.`;

      const response = await callClaude(systemPrompt, inputMessage);

      const replyMsg = {
        from: connectedBeings[0] || 'Resonance',
        content: response,
        dimension: selectedDimension.name,
        timestamp: new Date().toISOString(),
        type: 'response',
      };

      setMessages(prev => [...prev, replyMsg]);
    } catch (err) {
      console.error('Resonance disruption:', err);
    } finally {
      setSending(false);
    }
  };

  const returnToTuning = () => {
    setStage('tuning');
    setMessages([]);
    setBroadcastMode(false);
  };

  const colors = selectedDimension
    ? (DIMENSION_COLORS[selectedDimension.name] || DEFAULT_COLORS)
    : DEFAULT_COLORS;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.bg} p-8`}>
      <div className="max-w-4xl mx-auto">

        {/* ============ TUNING STAGE ============ */}
        {stage === 'tuning' && (
          <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <div className="relative mb-8">
              <div className="absolute inset-0 animate-pulse">
                <div className="w-48 h-48 bg-teal-500/20 rounded-full blur-3xl"></div>
              </div>
              <Activity className="w-24 h-24 text-teal-300 relative z-10 animate-spin" style={{ animationDuration: '12s' }} />
            </div>

            <h1 className="text-5xl font-bold text-teal-100 mb-2 tracking-wider">
              CONGO
            </h1>
            <p className="text-teal-400 text-lg mb-1">
              Interdimensional Omniversal Resonance Messaging
            </p>
            <p className="text-teal-500/70 text-sm mb-10 italic">
              "Distance is an illusion. Resonance is the only address."
            </p>

            <div className="w-full max-w-md mb-6">
              <label className="block text-teal-200 text-sm mb-2">
                Your Name (vibrational identity)
              </label>
              <input
                type="text"
                value={beingName}
                onChange={(e) => setBeingName(e.target.value)}
                placeholder="Who are you in the omniverse?"
                className="w-full bg-teal-900/30 border border-teal-500/30 rounded-lg px-4 py-3 text-teal-100 placeholder-teal-400/50 focus:outline-none focus:border-teal-400/50"
              />
            </div>

            <div className="w-full max-w-md mb-6">
              <label className="block text-teal-200 text-sm mb-2">
                Resonance Level: {resonanceLevel}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={resonanceLevel}
                onChange={(e) => setResonanceLevel(Number(e.target.value))}
                className="w-full"
                aria-label="Resonance Level"
              />
            </div>

            <div className="w-full max-w-md mb-8">
              <label className="block text-teal-200 text-sm mb-3">
                Tune into a Dimension
              </label>
              <div className="space-y-2">
                {DIMENSIONS.map((dim) => {
                  const dimColors = DIMENSION_COLORS[dim.name] || DEFAULT_COLORS;
                  const isSelected = selectedDimension?.name === dim.name;
                  return (
                    <button
                      key={dim.name}
                      onClick={() => setSelectedDimension(dim)}
                      className={`w-full ${dimColors.border} border rounded-lg px-4 py-3 text-left transition-all ${
                        isSelected
                          ? `${dimColors.accent} text-white`
                          : 'bg-gray-900/30 text-gray-300 hover:bg-gray-800/40'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{dim.name}</span>
                        <span className="text-xs opacity-70">freq: {dim.freq}</span>
                      </div>
                      <p className="text-xs opacity-60 mt-1">{dim.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={enterNetwork}
              className="bg-teal-600 hover:bg-teal-500 text-white px-8 py-3 rounded-lg transition-colors flex items-center gap-2 text-lg"
            >
              <Zap className="w-5 h-5" />
              Enter the Congo Network
            </button>
          </div>
        )}

        {/* ============ CONNECTED STAGE ============ */}
        {stage === 'connected' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className={`text-2xl font-light ${colors.text}`}>
                  <Globe className="w-6 h-6 inline mr-2" />
                  {selectedDimension.name} Dimension
                </h2>
                <p className={`text-sm ${colors.text} opacity-60`}>
                  Connected as {beingName} | Resonance: {resonanceLevel}%
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setBroadcastMode(!broadcastMode)}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    broadcastMode
                      ? 'bg-red-600 text-white'
                      : `${colors.accent} text-white opacity-60 hover:opacity-100`
                  }`}
                >
                  {broadcastMode ? 'OMNIVERSAL' : 'Direct'}
                </button>
                <button
                  onClick={returnToTuning}
                  className={`${colors.text} opacity-60 hover:opacity-100 flex items-center gap-1 text-sm`}
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Retune
                </button>
              </div>
            </div>

            <div className={`${colors.border} border rounded-lg p-3 mb-4`}>
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4" />
                <span className={`text-sm ${colors.text} opacity-60`}>Beings in resonance:</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {connectedBeings.map((name) => (
                  <span
                    key={name}
                    className={`${colors.accent} px-3 py-1 rounded-full text-xs text-white`}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>

            <div className={`${colors.border} border rounded-lg p-4 min-h-[50vh] max-h-[60vh] overflow-y-auto space-y-3`}>
              {messages.length === 0 && (
                <div className={`text-center ${colors.text} opacity-40 py-20`}>
                  <Activity className="w-12 h-12 mx-auto mb-4 animate-pulse" />
                  <p>The resonance field is open.</p>
                  <p className="text-sm mt-1">Send a message to connect across the omniverse.</p>
                </div>
              )}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg ${
                    msg.from === beingName
                      ? `bg-white/5 ${colors.border} border ml-12`
                      : 'bg-gray-900/40 border border-gray-500/20 mr-12'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className={`text-xs font-medium ${colors.text}`}>
                      {msg.from}
                      {msg.type === 'broadcast' && ' [OMNIVERSAL]'}
                    </span>
                    <span className={`text-xs ${colors.text} opacity-40`}>
                      {msg.dimension}
                    </span>
                  </div>
                  <p className={`${colors.text} text-sm whitespace-pre-wrap`}>
                    {msg.content}
                  </p>
                </div>
              ))}
              {sending && (
                <div className="text-center py-2">
                  <div className={`inline-block animate-pulse ${colors.text} opacity-60 text-sm`}>
                    Resonance transmitting...
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder={broadcastMode ? 'Broadcast to all dimensions...' : 'Send through resonance...'}
                className={`flex-1 bg-gray-900/30 ${colors.border} border rounded-lg px-4 py-3 ${colors.text} focus:outline-none`}
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || sending}
                className={`${colors.accent} hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2`}
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-teal-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};

export default CongoMessenger;
