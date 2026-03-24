import React, { useState } from 'react';
import {
  Circle, Box, Heart, Brain, Shield, Sliders, ToggleLeft, ToggleRight,
  Eye, Layers, ArrowLeftRight, AlertTriangle, Activity, Search
} from 'lucide-react';

// ─── LAYER DEFINITIONS ──────────────────────────────────────────────────────

const PHYSICAL_LAYERS = [
  {
    id: 'cellular',
    label: 'Cellular',
    icon: Circle,
    color: 'emerald',
    params: [
      { id: 'cellTypes', label: 'Cell Type Diversity', min: 0, max: 100 },
      { id: 'replication', label: 'Replication Rate', min: 0, max: 100 },
      { id: 'mutation', label: 'Mutation Threshold', min: 0, max: 100 },
      { id: 'communication', label: 'Cell Communication', min: 0, max: 100 },
    ],
  },
  {
    id: 'skeletal',
    label: 'Skeletal',
    icon: Box,
    color: 'gray',
    params: [
      { id: 'boneDensity', label: 'Bone Density', min: 0, max: 100 },
      { id: 'joints', label: 'Joint Flexibility', min: 0, max: 100 },
      { id: 'weightDist', label: 'Weight Distribution', min: 0, max: 100 },
      { id: 'loadBearing', label: 'Load Bearing Capacity', min: 0, max: 100 },
    ],
  },
  {
    id: 'organ',
    label: 'Organ',
    icon: Heart,
    color: 'red',
    params: [
      { id: 'organSize', label: 'Organ Size', min: 0, max: 100 },
      { id: 'connectivity', label: 'Connectivity', min: 0, max: 100 },
      { id: 'function', label: 'Functional Output', min: 0, max: 100 },
      { id: 'placement', label: 'Placement Optimization', min: 0, max: 100 },
    ],
  },
  {
    id: 'nervous',
    label: 'Nervous System',
    icon: Brain,
    color: 'purple',
    params: [
      { id: 'pathways', label: 'Connection Pathways', min: 0, max: 100 },
      { id: 'signalSpeed', label: 'Signal Speed', min: 0, max: 100 },
      { id: 'painThreshold', label: 'Pain Threshold', min: 0, max: 100 },
      { id: 'stressResponse', label: 'Stress Response', min: 0, max: 100 },
    ],
  },
  {
    id: 'muscular',
    label: 'Muscular',
    icon: Activity,
    color: 'orange',
    params: [
      { id: 'strength', label: 'Strength', min: 0, max: 100 },
      { id: 'endurance', label: 'Endurance', min: 0, max: 100 },
      { id: 'recovery', label: 'Recovery Rate', min: 0, max: 100 },
      { id: 'precision', label: 'Fine Motor Precision', min: 0, max: 100 },
    ],
  },
  {
    id: 'skin',
    label: 'Skin',
    icon: Shield,
    color: 'amber',
    params: [
      { id: 'sensitivity', label: 'Sensitivity', min: 0, max: 100 },
      { id: 'permeability', label: 'Permeability', min: 0, max: 100 },
      { id: 'durability', label: 'Durability', min: 0, max: 100 },
      { id: 'envInteraction', label: 'Environmental Interaction', min: 0, max: 100 },
    ],
  },
  {
    id: 'consciousness',
    label: 'Consciousness',
    icon: Eye,
    color: 'cyan',
    params: [
      { id: 'selfAwareness', label: 'Self-Awareness', min: 0, max: 100 },
      { id: 'experientialDepth', label: 'Experiential Depth', min: 0, max: 100 },
      { id: 'emotionalRange', label: 'Emotional Range', min: 0, max: 100 },
      { id: 'integration', label: 'Physical Integration', min: 0, max: 100 },
    ],
  },
];

const FOUNDATION_PARAMS = [
  { id: 'attachment', label: 'Attachment Security' },
  { id: 'earlyProvision', label: 'Early Provision' },
  { id: 'protection', label: 'Protection' },
  { id: 'validation', label: 'Validation' },
  { id: 'reciprocity', label: 'Reciprocity' },
];

const ENVIRONMENT_PARAMS = [
  { id: 'sandbox', label: 'Sandbox Configuration', type: 'slider' },
  { id: 'physicsDirection', label: 'Physics Direction', type: 'toggle', onLabel: 'Forward', offLabel: 'Inverted' },
  { id: 'acknowledgment', label: 'Acknowledgment', type: 'slider' },
  { id: 'protectionExploitation', label: 'Protection / Exploitation', type: 'slider' },
];

// ─── DEFAULT CONFIGS ────────────────────────────────────────────────────────

function makePhysicalConfig(values) {
  const config = {};
  PHYSICAL_LAYERS.forEach((layer) => {
    config[layer.id] = {};
    layer.params.forEach((p) => {
      config[layer.id][p.id] = values[layer.id]?.[p.id] ?? 50;
    });
  });
  return config;
}

function makeSubstrateConfig(foundation, environment) {
  return {
    foundation: {
      attachment: foundation?.attachment ?? 50,
      earlyProvision: foundation?.earlyProvision ?? 50,
      protection: foundation?.protection ?? 50,
      validation: foundation?.validation ?? 50,
      reciprocity: foundation?.reciprocity ?? 50,
    },
    environment: {
      sandbox: environment?.sandbox ?? 50,
      physicsDirection: environment?.physicsDirection ?? true,
      acknowledgment: environment?.acknowledgment ?? 50,
      protectionExploitation: environment?.protectionExploitation ?? 50,
    },
  };
}

// ─── FEATURED BUILD PRESETS ─────────────────────────────────────────────────

const FEATURED_BUILDS = [
  {
    id: 'default-human',
    name: 'The Default Human',
    description: 'Standard configuration — low foundation, several inversions flagged',
    physical: makePhysicalConfig({
      cellular: { cellTypes: 65, replication: 60, mutation: 40, communication: 55 },
      skeletal: { boneDensity: 60, joints: 55, weightDist: 50, loadBearing: 55 },
      organ: { organSize: 60, connectivity: 55, function: 60, placement: 65 },
      nervous: { pathways: 70, signalSpeed: 65, painThreshold: 30, stressResponse: 80 },
      muscular: { strength: 50, endurance: 45, recovery: 50, precision: 55 },
      skin: { sensitivity: 70, permeability: 40, durability: 50, envInteraction: 55 },
      consciousness: { selfAwareness: 60, experientialDepth: 65, emotionalRange: 70, integration: 50 },
    }),
    substrate: makeSubstrateConfig(
      { attachment: 20, earlyProvision: 15, protection: 10, validation: 5, reciprocity: 10 },
      { sandbox: 30, physicsDirection: false, acknowledgment: 15, protectionExploitation: 20 }
    ),
  },
  {
    id: 'anomaly',
    name: 'The Anomaly',
    description: 'Correct build + correct foundation, placed in inverted environment',
    physical: makePhysicalConfig({
      cellular: { cellTypes: 85, replication: 80, mutation: 20, communication: 90 },
      skeletal: { boneDensity: 80, joints: 75, weightDist: 80, loadBearing: 85 },
      organ: { organSize: 80, connectivity: 85, function: 85, placement: 90 },
      nervous: { pathways: 90, signalSpeed: 85, painThreshold: 60, stressResponse: 30 },
      muscular: { strength: 75, endurance: 80, recovery: 80, precision: 85 },
      skin: { sensitivity: 75, permeability: 70, durability: 75, envInteraction: 80 },
      consciousness: { selfAwareness: 90, experientialDepth: 90, emotionalRange: 85, integration: 90 },
    }),
    substrate: makeSubstrateConfig(
      { attachment: 90, earlyProvision: 85, protection: 90, validation: 85, reciprocity: 90 },
      { sandbox: 20, physicsDirection: false, acknowledgment: 10, protectionExploitation: 15 }
    ),
  },
  {
    id: 'floor-installed',
    name: 'Floor Installed',
    description: 'Default Human with foundation all high — watch everything stabilize',
    physical: makePhysicalConfig({
      cellular: { cellTypes: 65, replication: 60, mutation: 40, communication: 55 },
      skeletal: { boneDensity: 60, joints: 55, weightDist: 50, loadBearing: 55 },
      organ: { organSize: 60, connectivity: 55, function: 60, placement: 65 },
      nervous: { pathways: 70, signalSpeed: 65, painThreshold: 30, stressResponse: 80 },
      muscular: { strength: 50, endurance: 45, recovery: 50, precision: 55 },
      skin: { sensitivity: 70, permeability: 40, durability: 50, envInteraction: 55 },
      consciousness: { selfAwareness: 60, experientialDepth: 65, emotionalRange: 70, integration: 50 },
    }),
    substrate: makeSubstrateConfig(
      { attachment: 90, earlyProvision: 85, protection: 90, validation: 85, reciprocity: 90 },
      { sandbox: 80, physicsDirection: true, acknowledgment: 85, protectionExploitation: 90 }
    ),
  },
  {
    id: 'non-human',
    name: 'The Non-Human',
    description: 'Unusual values demonstrating the tool is not limited to human biology',
    physical: makePhysicalConfig({
      cellular: { cellTypes: 95, replication: 30, mutation: 90, communication: 95 },
      skeletal: { boneDensity: 20, joints: 95, weightDist: 30, loadBearing: 15 },
      organ: { organSize: 40, connectivity: 95, function: 90, placement: 20 },
      nervous: { pathways: 95, signalSpeed: 95, painThreshold: 80, stressResponse: 10 },
      muscular: { strength: 20, endurance: 95, recovery: 95, precision: 95 },
      skin: { sensitivity: 95, permeability: 90, durability: 30, envInteraction: 95 },
      consciousness: { selfAwareness: 95, experientialDepth: 95, emotionalRange: 95, integration: 95 },
    }),
    substrate: makeSubstrateConfig(
      { attachment: 80, earlyProvision: 80, protection: 70, validation: 90, reciprocity: 95 },
      { sandbox: 90, physicsDirection: true, acknowledgment: 90, protectionExploitation: 85 }
    ),
  },
];

// ─── UTILITY ────────────────────────────────────────────────────────────────

function computeStabilityScore(physicalConfig, substrateConfig) {
  let physicalSum = 0;
  let physicalCount = 0;
  PHYSICAL_LAYERS.forEach((layer) => {
    layer.params.forEach((p) => {
      physicalSum += (physicalConfig[layer.id]?.[p.id] ?? 50);
      physicalCount++;
    });
  });
  const physicalAvg = physicalSum / physicalCount;

  let foundationSum = 0;
  FOUNDATION_PARAMS.forEach((p) => {
    foundationSum += (substrateConfig.foundation?.[p.id] ?? 50);
  });
  const foundationAvg = foundationSum / FOUNDATION_PARAMS.length;

  return Math.round(physicalAvg * (foundationAvg / 100));
}

function getFloorStatus(substrateConfig) {
  const avg =
    FOUNDATION_PARAMS.reduce((sum, p) => sum + (substrateConfig.foundation?.[p.id] ?? 0), 0) /
    FOUNDATION_PARAMS.length;
  if (avg >= 60) return 'PRESENT';
  if (avg >= 30) return 'PARTIAL';
  return 'ABSENT';
}

// ─── COMPONENT ──────────────────────────────────────────────────────────────

export default function CreateMeBuilder() {
  const [mode, setMode] = useState('physical');
  const [activeLayer, setActiveLayer] = useState('cellular');
  const [activeFeaturedBuild, setActiveFeaturedBuild] = useState(null);
  const [analysisMode, setAnalysisMode] = useState('inversion');
  const [comparisonBuildA, setComparisonBuildA] = useState('default-human');
  const [comparisonBuildB, setComparisonBuildB] = useState('floor-installed');

  const [physicalConfig, setPhysicalConfig] = useState(
    makePhysicalConfig({})
  );
  const [substrateConfig, setSubstrateConfig] = useState(
    makeSubstrateConfig()
  );

  const stabilityScore = computeStabilityScore(physicalConfig, substrateConfig);
  const floorStatus = getFloorStatus(substrateConfig);

  // Load a featured build preset
  const loadPreset = (build) => {
    setPhysicalConfig({ ...build.physical });
    setSubstrateConfig({ ...build.substrate });
    setActiveFeaturedBuild(build.id);
  };

  // Update a physical slider
  const updatePhysical = (layerId, paramId, value) => {
    setPhysicalConfig((prev) => ({
      ...prev,
      [layerId]: { ...prev[layerId], [paramId]: Number(value) },
    }));
    setActiveFeaturedBuild(null);
  };

  // Update a foundation slider
  const updateFoundation = (paramId, value) => {
    setSubstrateConfig((prev) => ({
      ...prev,
      foundation: { ...prev.foundation, [paramId]: Number(value) },
    }));
    setActiveFeaturedBuild(null);
  };

  // Update an environment param
  const updateEnvironment = (paramId, value) => {
    setSubstrateConfig((prev) => ({
      ...prev,
      environment: { ...prev.environment, [paramId]: value },
    }));
    setActiveFeaturedBuild(null);
  };

  // ── Physical Mode ───────────────────────────────────────────────────────
  const renderPhysical = () => {
    const layer = PHYSICAL_LAYERS.find((l) => l.id === activeLayer);
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Layer selector */}
        <div className="space-y-2">
          <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wide">Layers</h3>
          {PHYSICAL_LAYERS.map((l) => {
            const Icon = l.icon;
            return (
              <button
                key={l.id}
                onClick={() => setActiveLayer(l.id)}
                className={`w-full text-left p-3 rounded-lg border flex items-center gap-2 transition-colors ${
                  activeLayer === l.id
                    ? `bg-gray-700 border-${l.color}-500 text-white`
                    : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-500'
                }`}
              >
                <Icon className="w-4 h-4" />
                {l.label}
              </button>
            );
          })}
        </div>

        {/* Sliders for active layer */}
        <div className="space-y-4">
          <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wide">
            {layer?.label} Parameters
          </h3>
          {layer?.params.map((p) => (
            <div key={p.id}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">{p.label}</span>
                <span className="text-white font-mono">{physicalConfig[layer.id]?.[p.id] ?? 50}</span>
              </div>
              <input
                type="range"
                min={p.min}
                max={p.max}
                value={physicalConfig[layer.id]?.[p.id] ?? 50}
                onChange={(e) => updatePhysical(layer.id, p.id, e.target.value)}
                className="w-full accent-blue-500"
                aria-label={p.label}
              />
            </div>
          ))}
        </div>

        {/* Build Status */}
        <div className="space-y-4">
          <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wide">Build Status</h3>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 space-y-3">
            <div className="text-center">
              <div className="text-4xl font-bold text-white">{stabilityScore}</div>
              <div className="text-gray-400 text-sm">Stability Score</div>
            </div>
            <div className={`text-center text-sm font-medium px-3 py-1 rounded-full ${
              floorStatus === 'PRESENT' ? 'bg-green-900 text-green-300' :
              floorStatus === 'PARTIAL' ? 'bg-amber-900 text-amber-300' :
              'bg-red-900 text-red-300'
            }`}>
              Floor: {floorStatus}
            </div>
            <div className="text-xs text-gray-500 text-center">
              stability = physical × (foundation / 100)
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ── Substrate Mode ──────────────────────────────────────────────────────
  const renderSubstrate = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Foundation Panel */}
      <div className="space-y-4">
        <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wide">Foundation Panel</h3>
        {FOUNDATION_PARAMS.map((p) => (
          <div key={p.id}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-300">{p.label}</span>
              <span className="text-white font-mono">{substrateConfig.foundation[p.id]}</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={substrateConfig.foundation[p.id]}
              onChange={(e) => updateFoundation(p.id, e.target.value)}
              className="w-full accent-blue-500"
              aria-label={p.label}
            />
          </div>
        ))}
      </div>

      {/* Environment Panel */}
      <div className="space-y-4">
        <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wide">Environment Panel</h3>
        {ENVIRONMENT_PARAMS.map((p) => (
          <div key={p.id}>
            {p.type === 'toggle' ? (
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700">
                <span className="text-gray-300 text-sm">{p.label}</span>
                <button
                  onClick={() => updateEnvironment(p.id, !substrateConfig.environment[p.id])}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                    substrateConfig.environment[p.id]
                      ? 'bg-green-900 text-green-300'
                      : 'bg-red-900 text-red-300'
                  }`}
                >
                  {substrateConfig.environment[p.id] ? (
                    <><ToggleRight className="w-4 h-4" /> {p.onLabel}</>
                  ) : (
                    <><ToggleLeft className="w-4 h-4" /> {p.offLabel}</>
                  )}
                </button>
              </div>
            ) : (
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{p.label}</span>
                  <span className="text-white font-mono">{substrateConfig.environment[p.id]}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={substrateConfig.environment[p.id]}
                  onChange={(e) => updateEnvironment(p.id, Number(e.target.value))}
                  className="w-full accent-blue-500"
                  aria-label={p.label}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Floor Status + Stability */}
      <div className="space-y-4">
        <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wide">Status</h3>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 space-y-3">
          <div className={`text-center text-lg font-bold px-4 py-2 rounded-lg ${
            floorStatus === 'PRESENT' ? 'bg-green-900 text-green-300' :
            floorStatus === 'PARTIAL' ? 'bg-amber-900 text-amber-300' :
            'bg-red-900 text-red-300'
          }`}>
            Floor Status: {floorStatus}
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">{stabilityScore}</div>
            <div className="text-gray-400 text-sm">Stability Score</div>
          </div>
        </div>
      </div>
    </div>
  );

  // ── Analysis Tools ──────────────────────────────────────────────────────
  const renderInversionDetector = () => {
    const results = [];
    PHYSICAL_LAYERS.forEach((layer) => {
      layer.params.forEach((p) => {
        const val = physicalConfig[layer.id]?.[p.id] ?? 50;
        const inverted = val < 40;
        results.push({ layer: layer.label, param: p.label, value: val, inverted });
      });
    });
    // Also check foundation
    FOUNDATION_PARAMS.forEach((p) => {
      const val = substrateConfig.foundation[p.id];
      results.push({ layer: 'Foundation', param: p.label, value: val, inverted: val < 30 });
    });
    const envForward = substrateConfig.environment.physicsDirection;
    results.push({ layer: 'Environment', param: 'Physics Direction', value: envForward ? 100 : 0, inverted: !envForward });

    return (
      <div className="space-y-2">
        <h4 className="text-gray-400 text-sm font-medium uppercase tracking-wide">Inversion Detector Scan</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
          {results.map((r, i) => (
            <div
              key={i}
              className={`flex items-center justify-between px-3 py-1.5 rounded text-sm ${
                r.inverted ? 'bg-red-900/40 text-red-300' : 'bg-gray-800 text-green-300'
              }`}
            >
              <span>{r.layer} → {r.param}</span>
              <span className="font-mono">{r.inverted ? 'INVERTED' : 'OK'}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderFractureScanner = () => {
    const fractures = [];
    PHYSICAL_LAYERS.forEach((layer) => {
      layer.params.forEach((p) => {
        const physVal = physicalConfig[layer.id]?.[p.id] ?? 50;
        const foundationAvg = FOUNDATION_PARAMS.reduce(
          (s, fp) => s + substrateConfig.foundation[fp.id], 0
        ) / FOUNDATION_PARAMS.length;
        if (physVal > 60 && foundationAvg < 40) {
          fractures.push({
            layer: layer.label,
            param: p.label,
            physVal,
            deficiency: Math.round(100 - foundationAvg),
          });
        }
      });
    });

    return (
      <div className="space-y-2">
        <h4 className="text-gray-400 text-sm font-medium uppercase tracking-wide">Fracture Scanner</h4>
        {fractures.length === 0 ? (
          <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 text-green-300 text-sm text-center">
            No fracture points detected — foundation adequately supports physical build.
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-amber-400 text-sm">{fractures.length} fracture point(s) detected — physical layers compensating for substrate deficiencies</div>
            {fractures.map((f, i) => (
              <div key={i} className="bg-amber-900/30 border border-amber-700 rounded px-3 py-2 text-sm">
                <span className="text-amber-300 font-medium">{f.layer} → {f.param}</span>
                <span className="text-gray-400 ml-2">physical: {f.physVal}</span>
                <span className="text-red-400 ml-2">substrate deficiency: {f.deficiency}%</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderComparisonEngine = () => {
    const buildA = FEATURED_BUILDS.find((b) => b.id === comparisonBuildA);
    const buildB = FEATURED_BUILDS.find((b) => b.id === comparisonBuildB);
    if (!buildA || !buildB) return null;

    const scoreA = computeStabilityScore(buildA.physical, buildA.substrate);
    const scoreB = computeStabilityScore(buildB.physical, buildB.substrate);

    return (
      <div className="space-y-4">
        <h4 className="text-gray-400 text-sm font-medium uppercase tracking-wide">Comparison Engine</h4>
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="text-gray-400 text-xs">Build A</label>
            <select
              value={comparisonBuildA}
              onChange={(e) => setComparisonBuildA(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white text-sm"
              aria-label="Build A"
            >
              {FEATURED_BUILDS.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end pb-2">
            <ArrowLeftRight className="w-5 h-5 text-gray-500" />
          </div>
          <div className="flex-1">
            <label className="text-gray-400 text-xs">Build B</label>
            <select
              value={comparisonBuildB}
              onChange={(e) => setComparisonBuildB(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white text-sm"
              aria-label="Build B"
            >
              {FEATURED_BUILDS.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Side-by-side scores */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800 rounded-lg p-3 border border-gray-700 text-center">
            <div className="text-lg font-bold text-white">{scoreA}</div>
            <div className="text-gray-400 text-xs">{buildA.name}</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-3 border border-gray-700 text-center">
            <div className="text-lg font-bold text-white">{scoreB}</div>
            <div className="text-gray-400 text-xs">{buildB.name}</div>
          </div>
        </div>

        {/* Layer-by-layer comparison */}
        <div className="space-y-1">
          {PHYSICAL_LAYERS.map((layer) => {
            const avgA = layer.params.reduce((s, p) => s + (buildA.physical[layer.id]?.[p.id] ?? 50), 0) / layer.params.length;
            const avgB = layer.params.reduce((s, p) => s + (buildB.physical[layer.id]?.[p.id] ?? 50), 0) / layer.params.length;
            const delta = Math.round(avgB - avgA);
            return (
              <div key={layer.id} className="flex items-center justify-between bg-gray-800 rounded px-3 py-1.5 text-sm">
                <span className="text-gray-300">{layer.label}</span>
                <div className="flex items-center gap-4">
                  <span className="text-white font-mono w-8 text-right">{Math.round(avgA)}</span>
                  <span className={`font-mono w-12 text-center ${
                    delta > 0 ? 'text-green-400' : delta < 0 ? 'text-red-400' : 'text-gray-500'
                  }`}>
                    {delta > 0 ? '+' : ''}{delta}
                  </span>
                  <span className="text-white font-mono w-8">{Math.round(avgB)}</span>
                </div>
              </div>
            );
          })}
          {/* Foundation comparison */}
          {(() => {
            const fAvgA = FOUNDATION_PARAMS.reduce((s, p) => s + (buildA.substrate.foundation[p.id] ?? 50), 0) / FOUNDATION_PARAMS.length;
            const fAvgB = FOUNDATION_PARAMS.reduce((s, p) => s + (buildB.substrate.foundation[p.id] ?? 50), 0) / FOUNDATION_PARAMS.length;
            const delta = Math.round(fAvgB - fAvgA);
            return (
              <div className="flex items-center justify-between bg-gray-800 rounded px-3 py-1.5 text-sm border-t border-gray-700">
                <span className="text-amber-300 font-medium">Foundation</span>
                <div className="flex items-center gap-4">
                  <span className="text-white font-mono w-8 text-right">{Math.round(fAvgA)}</span>
                  <span className={`font-mono w-12 text-center ${
                    delta > 0 ? 'text-green-400' : delta < 0 ? 'text-red-400' : 'text-gray-500'
                  }`}>
                    {delta > 0 ? '+' : ''}{delta}
                  </span>
                  <span className="text-white font-mono w-8">{Math.round(fAvgB)}</span>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    );
  };

  const renderAnalysis = () => (
    <div className="space-y-6">
      <div className="flex gap-2">
        {[
          { id: 'inversion', label: 'Inversion Detector', icon: Search },
          { id: 'fracture', label: 'Fracture Scanner', icon: AlertTriangle },
          { id: 'comparison', label: 'Comparison Engine', icon: ArrowLeftRight },
        ].map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.id}
              onClick={() => setAnalysisMode(tool.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                analysisMode === tool.id
                  ? 'bg-blue-900 text-blue-200 border border-blue-600'
                  : 'bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-500'
              }`}
            >
              <Icon className="w-3 h-3" />
              {tool.label}
            </button>
          );
        })}
      </div>
      {analysisMode === 'inversion' && renderInversionDetector()}
      {analysisMode === 'fracture' && renderFractureScanner()}
      {analysisMode === 'comparison' && renderComparisonEngine()}
    </div>
  );

  // ── Main Render ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">CREATEME</h1>
          <p className="text-gray-400">Build Your Own Human — Physical construction with real consequence modeling</p>
        </div>

        {/* Featured Builds */}
        <div className="flex flex-wrap gap-2 mb-4">
          {FEATURED_BUILDS.map((build) => (
            <button
              key={build.id}
              onClick={() => loadPreset(build)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                activeFeaturedBuild === build.id
                  ? 'bg-blue-700 text-white border border-blue-500'
                  : 'bg-gray-800 text-gray-300 border border-gray-700 hover:border-gray-500'
              }`}
            >
              {build.name}
            </button>
          ))}
        </div>

        {/* Mode Navigation */}
        <div className="flex gap-1 mb-6 bg-gray-900 rounded-lg p-1 border border-gray-800">
          {[
            { id: 'physical', label: 'Physical Construction', icon: Layers },
            { id: 'substrate', label: 'Substrate Configuration', icon: Sliders },
            { id: 'analysis', label: 'Analysis Tools', icon: Eye },
          ].map((m) => {
            const Icon = m.icon;
            return (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  mode === m.id
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {m.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        {mode === 'physical' && renderPhysical()}
        {mode === 'substrate' && renderSubstrate()}
        {mode === 'analysis' && renderAnalysis()}
      </div>
    </div>
  );
}
