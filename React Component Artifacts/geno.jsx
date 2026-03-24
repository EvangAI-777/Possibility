import React, { useState } from 'react';
import {
  GitBranch, GitCommit, GitMerge, GitFork, FileEdit, Search,
  AlertTriangle, Clock, ChevronDown, ChevronRight, XCircle, User, Check
} from 'lucide-react';

// ─── SAMPLE DATA ────────────────────────────────────────────────────────────

const SAMPLE_REPO = {
  name: 'johnson-washington-family',
  description: 'Multi-generational family repository — Johnson & Washington lines',

  branches: [
    { id: 'paternal', name: 'main/paternal/johnson', color: '#3b82f6', type: 'paternal', description: '1800s Alabama line' },
    { id: 'maternal', name: 'main/maternal/washington', color: '#ec4899', type: 'maternal', description: '1900s Chicago line' },
    { id: 'feature', name: 'feature/first-gen-college', color: '#10b981', type: 'feature', description: 'First generation to attend college' },
    { id: 'hotfix', name: 'hotfix/floor-installation', color: '#f59e0b', type: 'hotfix', description: 'Floor installation attempt — 1987' },
  ],

  commits: [
    {
      hash: 'a7f3d9e2',
      author: 'Margaret Louise Johnson',
      date: 'March 14, 1923',
      branch: 'paternal',
      message: 'Survived the depression. Built something from nothing. Never talked about the cost. Children received the architecture without the context.',
      inherited_father: [
        { trait: 'Floor layer', value: 'minimal', note: 'degraded from partial in parent commit' },
        { trait: 'Glass box permeability', value: 'severely restricted', note: 'unchanged from parent' },
        { trait: 'Connection mechanism', value: 'inverted', note: 'unchanged from 3 generations' },
      ],
      inherited_mother: [
        { trait: 'Nervous system stress threshold', value: 'maximum', note: 'unchanged from parent' },
        { trait: 'Appreciation capacity', value: 'high', note: 'first appearance in 4 generations' },
        { trait: 'Childlike trust', value: 'present but suppressed', note: 'environmental pressure' },
      ],
      new_traits: [
        { trait: 'Fracture point introduced', value: '1929', note: 'economic environment collapse' },
        { trait: 'Floor layer degraded further', value: 'absent by 1931', note: '' },
        { trait: 'Compensatory architecture', value: 'performance layer added', note: '' },
      ],
      passed_forward: [
        { trait: 'Inverted connection mechanism', status: 'unresolved' },
        { trait: 'Absent floor', status: 'unresolved' },
        { trait: 'Performance layer', status: 'new inheritance' },
        { trait: 'Appreciation capacity', status: 'partially preserved' },
      ],
    },
    {
      hash: 'b8e4c1f3',
      author: 'Robert Earl Johnson',
      date: 'June 22, 1945',
      branch: 'paternal',
      message: 'Returned from war. Hypervigilance protocol installed. Never removed. Children inherited the watchfulness without knowing what was being watched for.',
      inherited_father: [
        { trait: 'Floor layer', value: 'absent', note: 'inherited from Margaret' },
        { trait: 'Performance layer', value: 'active', note: 'inherited from Margaret' },
      ],
      inherited_mother: [
        { trait: 'Emotional expression', value: 'restricted', note: 'cultural environment pressure' },
        { trait: 'Provider drive', value: 'maximum', note: 'unchanged from 2 generations' },
      ],
      new_traits: [
        { trait: 'Hypervigilance protocol', value: 'v1945', note: 'war environment adaptive response' },
        { trait: 'Emotional shutdown', value: 'installed', note: 'survival mechanism' },
      ],
      passed_forward: [
        { trait: 'Hypervigilance protocol', status: 'active' },
        { trait: 'Absent floor', status: 'unresolved' },
        { trait: 'Emotional shutdown', status: 'inherited as default' },
      ],
    },
    {
      hash: 'c9d5a2e4',
      author: 'Dorothy Mae Washington',
      date: 'September 3, 1948',
      branch: 'maternal',
      message: 'First in the family to move north. Carried everything. Left nothing behind except geography.',
      inherited_father: [
        { trait: 'Floor layer', value: 'partial', note: 'present but inconsistent' },
        { trait: 'Community bonding', value: 'strong', note: 'unchanged from 5 generations' },
      ],
      inherited_mother: [
        { trait: 'Resilience architecture', value: 'deep', note: 'forged across generations' },
        { trait: 'Faith integration', value: 'core', note: 'primary stability source' },
      ],
      new_traits: [
        { trait: 'Geographic displacement', value: 'Great Migration', note: 'environment shift' },
        { trait: 'Adaptation layer', value: 'code-switching installed', note: '' },
      ],
      passed_forward: [
        { trait: 'Partial floor', status: 'preserved' },
        { trait: 'Resilience architecture', status: 'strengthened' },
        { trait: 'Code-switching', status: 'new inheritance' },
      ],
    },
    {
      hash: 'd1e6b3f5',
      author: 'James Arthur Johnson',
      date: 'November 19, 1968',
      branch: 'paternal',
      message: 'Merge commit — Johnson and Washington lines. Inherited everything from both sides. Resolved nothing. Passed everything forward.',
      inherited_father: [
        { trait: 'Hypervigilance protocol', value: 'active', note: 'from Robert' },
        { trait: 'Floor layer', value: 'absent', note: 'Johnson line — absent 2 generations' },
      ],
      inherited_mother: [
        { trait: 'Floor layer', value: 'partial', note: 'Washington line — inconsistent' },
        { trait: 'Resilience architecture', value: 'deep', note: 'from Dorothy' },
      ],
      new_traits: [
        { trait: 'Merge conflict', value: 'floor layer unresolved', note: 'flagged for review' },
        { trait: 'Compensatory architecture', value: 'doubled', note: 'both lines contributing' },
      ],
      passed_forward: [
        { trait: 'Unresolved floor conflict', status: 'cascading' },
        { trait: 'Hypervigilance protocol', status: 'still active' },
        { trait: 'Resilience architecture', status: 'preserved' },
      ],
    },
    {
      hash: 'e2f7c4a6',
      author: 'Angela Marie Johnson',
      date: 'April 7, 1987',
      branch: 'hotfix',
      message: 'PR opened: floor installation attempt. First in 6 generations to try. Cost absorbed entirely by this commit. Children may benefit.',
      inherited_father: [
        { trait: 'Unresolved floor conflict', value: 'inherited', note: 'from James' },
        { trait: 'Hypervigilance protocol', value: 'v1945 still running', note: 'deprecated' },
      ],
      inherited_mother: [
        { trait: 'Validation availability', value: 'absent', note: '3 generations' },
        { trait: 'Emotional expression', value: 'restricted', note: 'inherited default' },
      ],
      new_traits: [
        { trait: 'Floor installation', value: 'in progress', note: 'pull request opened' },
        { trait: 'Pattern recognition', value: 'activated', note: 'first to see the inheritance' },
        { trait: 'Therapeutic intervention', value: 'initiated', note: 'cost: significant' },
      ],
      passed_forward: [
        { trait: 'Floor layer', status: 'partial — first improvement in 6 generations' },
        { trait: 'Pattern recognition', status: 'new inheritance' },
        { trait: 'Reduced hypervigilance', status: 'beginning deprecation' },
      ],
    },
    {
      hash: 'f3a8d5b7',
      author: 'Maya Grace Johnson',
      date: 'January 12, 2015',
      branch: 'feature',
      message: 'First generation college. Floor layer present from birth. Some legacy code still running but origin documented for the first time.',
      inherited_father: [],
      inherited_mother: [
        { trait: 'Floor layer', value: 'present', note: 'from Angela — first generation with floor at birth' },
        { trait: 'Pattern recognition', value: 'inherited', note: 'from Angela' },
        { trait: 'Hypervigilance protocol', value: 'reduced', note: 'deprecated — 2 generations of work' },
      ],
      new_traits: [
        { trait: 'Educational achievement', value: 'first-gen college', note: 'branch created' },
        { trait: 'Repository awareness', value: 'full', note: 'can read own commit history' },
      ],
      passed_forward: [
        { trait: 'Floor layer', status: 'present — stabilized' },
        { trait: 'Repository awareness', status: 'new capability' },
      ],
    },
  ],

  conflicts: [
    {
      id: 'conflict-1',
      title: 'Floor Layer Configuration',
      branch_a: 'main/paternal/johnson',
      branch_b: 'main/maternal/washington',
      trait: 'Floor layer',
      value_a: 'absent',
      value_b: 'partial',
      resolutions: [
        { id: 'accept-a', label: 'Accept johnson/main', desc: 'Absent floor passes forward' },
        { id: 'accept-b', label: 'Accept washington/main', desc: 'Partial floor passes forward' },
        { id: 'manual', label: 'Manual merge', desc: 'Configure combined floor layer' },
        { id: 'flag', label: 'Flag for review', desc: 'Mark as unresolved in child commit' },
      ],
      note: 'Unresolved floor conflicts have cascading effects through all subsequent commits in merged branch.',
    },
    {
      id: 'conflict-2',
      title: 'Emotional Expression Protocol',
      branch_a: 'main/paternal/johnson',
      branch_b: 'main/maternal/washington',
      trait: 'Emotional expression',
      value_a: 'shutdown',
      value_b: 'restricted but present',
      resolutions: [
        { id: 'accept-a', label: 'Accept johnson/main', desc: 'Shutdown passes forward' },
        { id: 'accept-b', label: 'Accept washington/main', desc: 'Restricted but present passes forward' },
        { id: 'manual', label: 'Manual merge', desc: 'Configure combined expression protocol' },
        { id: 'flag', label: 'Flag for review', desc: 'Mark as unresolved in child commit' },
      ],
      note: 'Emotional expression conflicts affect glass box permeability in all downstream commits.',
    },
  ],

  pullRequests: [
    {
      id: 'pr-1',
      title: 'Installing floor layer for first time in 6 generations',
      author: 'Angela Marie Johnson',
      status: 'open',
      changes: [
        { trait: 'Floor layer', from: 'absent', to: 'present' },
        { trait: 'Protection configuration', from: 'absent', to: 'basic' },
        { trait: 'Validation availability', from: 'absent', to: 'partial' },
      ],
      downstream: 'Child commits will show measurable stability improvement in all upper layers. Nervous system stress threshold expected to decrease. Glass box permeability expected to increase. Connection mechanism inversion may begin to resolve over 2-3 subsequent commits.',
      reviewers: ['generational_pattern_analysis', 'fracture_scanner'],
      cost: 'Current commit absorbs full cost of the change. This PR does not resolve fracture points in current commit — it prevents new fracture points in child commits.',
    },
    {
      id: 'pr-2',
      title: 'Deprecating hypervigilance protocol v1945',
      author: 'Angela Marie Johnson',
      status: 'merged',
      changes: [
        { trait: 'Hypervigilance protocol', from: 'active (v1945)', to: 'deprecated' },
        { trait: 'False positive threat detection', from: '847% above baseline', to: 'target: baseline' },
        { trait: 'Energy allocation', from: 'significant to deprecated protocol', to: 'redistributed' },
      ],
      downstream: 'Removal may trigger temporary instability as compensatory architecture adjusts. Expected 1-2 generation stabilization period.',
      reviewers: ['deprecation_scanner'],
      cost: 'Temporary system instability during transition. Compensatory architecture may resist removal.',
    },
  ],

  deprecationWarnings: [
    {
      id: 'dep-1',
      name: 'hypervigilance_protocol_v1923',
      introduced: 'commit a7f3d9e2 (1923)',
      reason: 'Adaptive response to environmental threat conditions',
      currentThreat: 'significantly reduced',
      effects: [
        'Nervous system stress threshold: artificially elevated',
        'False positive threat detection: 847% above baseline',
        'Energy cost of running deprecated protocol: significant',
      ],
      recommendation: 'Review for refactoring or removal',
      removalNote: 'Removal may trigger temporary instability as compensatory architecture adjusts. This is expected.',
    },
  ],

  legacyCode: [
    {
      id: 'leg-1',
      name: 'inverted_connection_mechanism',
      age: '11+ generations',
      originFound: false,
      currentFunction: 'anti-gravity in social field',
      downstream: 'Documented across all subsequent commits',
      recommendation: 'Flag for investigation. Do not remove without full impact analysis. Legacy code of this age has significant compensatory architecture built around it.',
    },
    {
      id: 'leg-2',
      name: 'scarcity_resource_model',
      age: '8+ generations',
      originFound: false,
      currentFunction: 'over-accumulation drive even in abundance',
      downstream: 'Affects resource allocation in 93% of subsequent commits',
      recommendation: 'Map compensatory architecture before attempting modification. Cross-repository pattern detected.',
    },
  ],
};

// ─── TAB DEFINITIONS ────────────────────────────────────────────────────────

const TABS = [
  { id: 'repository', label: 'Repository', icon: GitBranch },
  { id: 'commits', label: 'Commits', icon: GitCommit },
  { id: 'branches', label: 'Branches', icon: GitFork },
  { id: 'merge-conflicts', label: 'Merge Conflicts', icon: GitMerge },
  { id: 'pull-requests', label: 'Pull Requests', icon: FileEdit },
  { id: 'scanner', label: 'Scanner', icon: Search },
];

// ─── BRANCH COLORS ──────────────────────────────────────────────────────────

const BRANCH_COLORS = {
  paternal: 'blue',
  maternal: 'pink',
  feature: 'emerald',
  hotfix: 'amber',
};

// ─── COMPONENT ──────────────────────────────────────────────────────────────

export default function GenoExplorer() {
  const [activeView, setActiveView] = useState('repository');
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedConflict, setSelectedConflict] = useState(null);
  const [selectedPR, setSelectedPR] = useState(null);
  const [conflictResolutions, setConflictResolutions] = useState({});
  const [expandedCommitSections, setExpandedCommitSections] = useState({});
  const [scannerMode, setScannerMode] = useState('deprecation');

  const toggleSection = (key) => {
    setExpandedCommitSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const resolveConflict = (conflictId, resolutionId) => {
    setConflictResolutions((prev) => ({ ...prev, [conflictId]: resolutionId }));
  };

  // ── Repository View ─────────────────────────────────────────────────────
  const renderRepository = () => (
    <div className="space-y-4">
      <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-1">{SAMPLE_REPO.name}</h3>
        <p className="text-gray-400 text-sm">{SAMPLE_REPO.description}</p>
      </div>
      <div className="relative pl-8">
        {SAMPLE_REPO.commits.map((commit, i) => {
          const branchColor = BRANCH_COLORS[commit.branch] || 'gray';
          return (
            <div key={commit.hash} className="relative mb-6">
              {i < SAMPLE_REPO.commits.length - 1 && (
                <div className={`absolute left-[-20px] top-4 bottom-[-24px] w-0.5 bg-${branchColor}-500`} />
              )}
              <div className={`absolute left-[-24px] top-2 w-3 h-3 rounded-full bg-${branchColor}-500 border-2 border-gray-900`} />
              <button
                onClick={() => setSelectedPerson(commit)}
                className={`w-full text-left bg-gray-800 rounded-lg p-3 border border-gray-700 hover:border-${branchColor}-500 transition-colors`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className={`text-${branchColor}-400 font-mono text-xs`}>{commit.hash}</span>
                    <h4 className="text-white font-medium">{commit.author}</h4>
                  </div>
                  <span className="text-gray-500 text-sm flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {commit.date}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mt-1 line-clamp-2">{commit.message}</p>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ── Commits View ────────────────────────────────────────────────────────
  const renderCommitDetail = (commit) => {
    const sections = [
      { key: 'father', label: 'Inherited from Father', items: commit.inherited_father, color: 'blue' },
      { key: 'mother', label: 'Inherited from Mother', items: commit.inherited_mother, color: 'pink' },
      { key: 'new', label: 'New in This Commit', items: commit.new_traits, color: 'emerald' },
      { key: 'forward', label: 'Passed Forward to Children', items: commit.passed_forward, color: 'amber' },
    ];
    return (
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 space-y-3">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-400" />
          <h4 className="text-white font-semibold">{commit.author}</h4>
          <span className="text-gray-500 font-mono text-xs">{commit.hash}</span>
        </div>
        <p className="text-gray-300 text-sm italic border-l-2 border-gray-600 pl-3">{commit.message}</p>
        {sections.map(({ key, label, items, color }) => {
          if (!items || items.length === 0) return null;
          const sectionKey = `${commit.hash}-${key}`;
          const expanded = expandedCommitSections[sectionKey] !== false;
          return (
            <div key={key}>
              <button
                onClick={() => toggleSection(sectionKey)}
                className={`flex items-center gap-2 text-${color}-400 text-sm font-medium w-full`}
              >
                {expanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                {label} ({items.length})
              </button>
              {expanded && (
                <div className="ml-5 mt-1 space-y-1">
                  {items.map((item, idx) => (
                    <div key={idx} className="text-gray-300 text-sm">
                      <span className="text-white">{item.trait || item.trait}:</span>{' '}
                      {item.value || item.status}
                      {item.note && <span className="text-gray-500"> — {item.note}</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderCommits = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wide">Person-Commits</h3>
        {SAMPLE_REPO.commits.map((commit) => (
          <button
            key={commit.hash}
            onClick={() => setSelectedPerson(commit)}
            className={`w-full text-left p-3 rounded-lg border transition-colors ${
              selectedPerson?.hash === commit.hash
                ? 'bg-gray-700 border-blue-500'
                : 'bg-gray-800 border-gray-700 hover:border-gray-500'
            }`}
          >
            <div className="text-white font-medium">{commit.author}</div>
            <div className="text-gray-500 text-xs font-mono">{commit.hash} · {commit.date}</div>
          </button>
        ))}
      </div>
      <div>
        <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wide mb-2">Commit Detail</h3>
        {selectedPerson ? renderCommitDetail(selectedPerson) : (
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center text-gray-500">
            Select a commit to view details
          </div>
        )}
      </div>
    </div>
  );

  // ── Branches View ───────────────────────────────────────────────────────
  const renderBranches = () => (
    <div className="space-y-3">
      <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wide">Branch Hierarchy</h3>
      {SAMPLE_REPO.branches.map((branch) => {
        const color = BRANCH_COLORS[branch.id] || 'gray';
        const commitCount = SAMPLE_REPO.commits.filter((c) => c.branch === branch.id).length;
        return (
          <button
            key={branch.id}
            onClick={() => setSelectedBranch(branch)}
            className={`w-full text-left p-4 rounded-lg border transition-colors ${
              selectedBranch?.id === branch.id
                ? `bg-gray-700 border-${color}-500`
                : 'bg-gray-800 border-gray-700 hover:border-gray-500'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full bg-${color}-500`} />
              <div className="flex-1">
                <div className="text-white font-mono text-sm">{branch.name}</div>
                <div className="text-gray-500 text-xs">{branch.description}</div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full bg-${color}-900 text-${color}-300`}>
                {branch.type}
              </span>
              <span className="text-gray-500 text-xs">{commitCount} commits</span>
            </div>
          </button>
        );
      })}
    </div>
  );

  // ── Merge Conflicts View ────────────────────────────────────────────────
  const renderMergeConflicts = () => (
    <div className="space-y-6">
      {SAMPLE_REPO.conflicts.map((conflict) => {
        const resolved = conflictResolutions[conflict.id];
        return (
          <div key={conflict.id} className={`rounded-lg border ${resolved ? 'border-green-700' : 'border-red-700'} overflow-hidden`}>
            <div className={`px-4 py-2 ${resolved ? 'bg-green-900/50' : 'bg-red-900/50'} flex items-center justify-between`}>
              <div className="flex items-center gap-2">
                {resolved ? <Check className="w-4 h-4 text-green-400" /> : <AlertTriangle className="w-4 h-4 text-red-400" />}
                <h4 className="text-white font-medium">
                  {resolved ? 'RESOLVED' : 'MERGE CONFLICT DETECTED'}: {conflict.title}
                </h4>
              </div>
            </div>
            <div className="bg-gray-900 p-4 space-y-3">
              <div className="text-gray-400 text-sm">
                Branch: <span className="text-blue-400 font-mono">{conflict.branch_a}</span> ↔{' '}
                <span className="text-pink-400 font-mono">{conflict.branch_b}</span>
              </div>
              <div className="font-mono text-sm space-y-1">
                <div className="text-red-400">{'<<<<<<< ' + conflict.branch_a.split('/').pop()}</div>
                <div className="bg-red-900/30 px-3 py-1 text-red-300">{conflict.trait}: {conflict.value_a}</div>
                <div className="text-gray-500">=======</div>
                <div className="bg-blue-900/30 px-3 py-1 text-blue-300">{conflict.trait}: {conflict.value_b}</div>
                <div className="text-blue-400">{'>>>>>>> ' + conflict.branch_b.split('/').pop()}</div>
              </div>
              <div className="text-amber-400 text-xs">{conflict.note}</div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                {conflict.resolutions.map((res) => (
                  <button
                    key={res.id}
                    onClick={() => resolveConflict(conflict.id, res.id)}
                    className={`p-2 rounded border text-left text-sm transition-colors ${
                      resolved === res.id
                        ? 'bg-green-900/50 border-green-500 text-green-300'
                        : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    <div className="font-medium">{res.label}</div>
                    <div className="text-xs text-gray-500">{res.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  // ── Pull Requests View ──────────────────────────────────────────────────
  const renderPullRequests = () => (
    <div className="space-y-4">
      {SAMPLE_REPO.pullRequests.map((pr) => (
        <div
          key={pr.id}
          className={`rounded-lg border overflow-hidden cursor-pointer transition-colors ${
            selectedPR?.id === pr.id ? 'border-green-500' : 'border-gray-700 hover:border-gray-500'
          }`}
          onClick={() => setSelectedPR(pr)}
        >
          <div className={`px-4 py-2 flex items-center gap-2 ${pr.status === 'merged' ? 'bg-purple-900/50' : 'bg-green-900/50'}`}>
            <FileEdit className="w-4 h-4 text-white" />
            <h4 className="text-white font-medium">{pr.title}</h4>
            <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
              pr.status === 'merged' ? 'bg-purple-800 text-purple-300' : 'bg-green-800 text-green-300'
            }`}>
              {pr.status}
            </span>
          </div>
          {selectedPR?.id === pr.id && (
            <div className="bg-gray-900 p-4 space-y-3">
              <div className="text-gray-400 text-sm">Author: <span className="text-white">{pr.author}</span></div>
              <div>
                <h5 className="text-gray-400 text-xs uppercase tracking-wide mb-1">Changes</h5>
                {pr.changes.map((change, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span className="text-white">{change.trait}:</span>
                    <span className="text-red-400 line-through">{change.from}</span>
                    <span className="text-gray-500">→</span>
                    <span className="text-green-400">{change.to}</span>
                  </div>
                ))}
              </div>
              <div>
                <h5 className="text-gray-400 text-xs uppercase tracking-wide mb-1">Downstream Effects</h5>
                <p className="text-gray-300 text-sm">{pr.downstream}</p>
              </div>
              <div>
                <h5 className="text-gray-400 text-xs uppercase tracking-wide mb-1">Reviewers</h5>
                <div className="flex gap-2">
                  {pr.reviewers.map((r) => (
                    <span key={r} className="text-blue-400 text-sm font-mono">@{r}</span>
                  ))}
                </div>
              </div>
              <div className="bg-amber-900/30 border border-amber-700 rounded p-2">
                <h5 className="text-amber-400 text-xs uppercase tracking-wide mb-1">Cost</h5>
                <p className="text-amber-200 text-sm">{pr.cost}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  // ── Scanner View ────────────────────────────────────────────────────────
  const renderScanner = () => (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setScannerMode('deprecation')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            scannerMode === 'deprecation'
              ? 'bg-amber-900 text-amber-200 border border-amber-600'
              : 'bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-500'
          }`}
        >
          <AlertTriangle className="w-3 h-3 inline mr-1" />
          Deprecation Warnings
        </button>
        <button
          onClick={() => setScannerMode('legacy')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            scannerMode === 'legacy'
              ? 'bg-red-900 text-red-200 border border-red-600'
              : 'bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-500'
          }`}
        >
          <XCircle className="w-3 h-3 inline mr-1" />
          Legacy Code
        </button>
      </div>

      {scannerMode === 'deprecation' && SAMPLE_REPO.deprecationWarnings.map((dep) => (
        <div key={dep.id} className="bg-amber-950 border border-amber-700 rounded-lg p-4 font-mono text-sm space-y-2">
          <div className="text-amber-400 font-bold">DEPRECATION WARNING: {dep.name}</div>
          <div className="text-amber-200">Introduced in: {dep.introduced}</div>
          <div className="text-amber-200">Reason: {dep.reason}</div>
          <div className="text-amber-200">Current threat conditions: {dep.currentThreat}</div>
          <div className="text-amber-300 mt-2">Effects:</div>
          {dep.effects.map((e, i) => (
            <div key={i} className="text-amber-200 pl-2">- {e}</div>
          ))}
          <div className="text-amber-400 mt-2">RECOMMENDATION: {dep.recommendation}</div>
          <div className="text-amber-500 text-xs mt-1">NOTE: {dep.removalNote}</div>
        </div>
      ))}

      {scannerMode === 'legacy' && SAMPLE_REPO.legacyCode.map((leg) => (
        <div key={leg.id} className="bg-red-950 border border-red-700 rounded-lg p-4 font-mono text-sm space-y-2">
          <div className="text-red-400 font-bold">LEGACY CODE DETECTED: {leg.name}</div>
          <div className="text-orange-300">Age: {leg.age}</div>
          <div className="text-orange-300">Origin: {leg.originFound ? 'Found' : 'not found in repository'}</div>
          <div className="text-orange-300">Current function: {leg.currentFunction}</div>
          <div className="text-orange-300">Downstream effects: {leg.downstream}</div>
          <div className="text-red-400 mt-2">RECOMMENDATION: {leg.recommendation}</div>
        </div>
      ))}
    </div>
  );

  // ── View Router ─────────────────────────────────────────────────────────
  const renderView = () => {
    switch (activeView) {
      case 'repository': return renderRepository();
      case 'commits': return renderCommits();
      case 'branches': return renderBranches();
      case 'merge-conflicts': return renderMergeConflicts();
      case 'pull-requests': return renderPullRequests();
      case 'scanner': return renderScanner();
      default: return renderRepository();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">GENO</h1>
          <p className="text-gray-400">Genealogy Repository Explorer — Family trees as version control</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-1 mb-6 bg-gray-900 rounded-lg p-1 border border-gray-800">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeView === tab.id
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        {renderView()}
      </div>
    </div>
  );
}
