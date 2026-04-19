import React, { useState } from 'react';

const styles = `
  .hc-root {
    --bg: #0b0f14;
    --surface: #141a22;
    --surface-hover: #1c2430;
    --border: #2a3140;
    --text: #e2e8f0;
    --text-muted: #8191a6;
    --accent: #5b9cf5;
    --accent-hover: #7db4ff;
    --green: #3fb950;
    --yellow: #d4a017;
    --red: #f04e4e;
    --glow: #5b9cf5;
    font-family: 'Segoe UI', system-ui, sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    padding: 0;
    margin: 0;
  }
  .hc-header {
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    padding: 18px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .hc-logo {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--accent);
    letter-spacing: 0.02em;
  }
  .hc-logo span {
    color: var(--text-muted);
    font-weight: 400;
  }
  .hc-back-link {
    color: var(--accent);
    background: var(--bg);
    border: 1px solid var(--border);
    padding: 6px 14px;
    border-radius: 6px;
    font-size: 0.82rem;
    text-decoration: none;
    cursor: pointer;
  }
  .hc-main {
    max-width: 860px;
    margin: 0 auto;
    padding: 40px 24px 80px;
  }
  .hc-landing {
    text-align: center;
    padding: 60px 0 40px;
  }
  .hc-landing-badge {
    display: inline-block;
    background: rgba(91,156,245,0.12);
    border: 1px solid rgba(91,156,245,0.3);
    color: var(--accent);
    padding: 5px 14px;
    border-radius: 20px;
    font-size: 0.78rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 24px;
  }
  .hc-landing h1 {
    font-size: 2.2rem;
    font-weight: 700;
    margin: 0 0 16px;
    line-height: 1.25;
  }
  .hc-landing h1 em {
    font-style: normal;
    color: var(--accent);
  }
  .hc-landing-sub {
    font-size: 1.05rem;
    color: var(--text-muted);
    max-width: 560px;
    margin: 0 auto 40px;
    line-height: 1.6;
  }
  .hc-formula {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 20px 28px;
    display: inline-block;
    text-align: left;
    margin-bottom: 40px;
    font-size: 0.88rem;
  }
  .hc-formula-label {
    color: var(--text-muted);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 8px;
  }
  .hc-formula code {
    color: var(--green);
    font-family: 'Fira Mono', 'Consolas', monospace;
    font-size: 0.92rem;
    display: block;
    line-height: 1.8;
  }
  .hc-cta-row {
    display: flex;
    gap: 14px;
    justify-content: center;
    flex-wrap: wrap;
  }
  .hc-btn {
    padding: 11px 26px;
    border-radius: 8px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: background 0.15s;
  }
  .hc-btn-primary {
    background: var(--accent);
    color: #fff;
  }
  .hc-btn-primary:hover { background: var(--accent-hover); }
  .hc-btn-secondary {
    background: var(--surface);
    color: var(--text);
    border: 1px solid var(--border);
  }
  .hc-btn-secondary:hover { background: var(--surface-hover); }
  .hc-btn-sm {
    padding: 7px 16px;
    font-size: 0.82rem;
  }
  .hc-step-bar {
    display: flex;
    align-items: center;
    gap: 0;
    margin-bottom: 36px;
  }
  .hc-step {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.8rem;
    color: var(--text-muted);
  }
  .hc-step.active { color: var(--accent); }
  .hc-step.done { color: var(--green); }
  .hc-step-dot {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: var(--surface);
    border: 2px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.72rem;
    font-weight: 700;
    flex-shrink: 0;
  }
  .hc-step.active .hc-step-dot {
    background: rgba(91,156,245,0.15);
    border-color: var(--accent);
    color: var(--accent);
  }
  .hc-step.done .hc-step-dot {
    background: rgba(63,185,80,0.15);
    border-color: var(--green);
    color: var(--green);
  }
  .hc-step-line {
    flex: 1;
    height: 1px;
    background: var(--border);
    margin: 0 6px;
  }
`;

const STEPS = ['Candidate', 'Team', 'Org', 'Results'];

const INITIAL_STATE = {
  candidate: { skills: 50, workStyle: 50, stressResponse: 50, growthPreferences: 50, mobilityGoals: 50 },
  team: { velocity: 50, decisionStyle: 50, feedbackPattern: 50, autonomyTolerance: 50, managerProfile: 50 },
  org: { changeLoad: 50, roleClarity: 50, crossTeamDependency: 50, policyStability: 50, attritionSignals: 50 },
};

// Scenario 1: Great candidate, weak floor — stability collapses despite strong candidate
const PRESET_WEAK_FLOOR = {
  candidate: { skills: 88, workStyle: 75, stressResponse: 70, growthPreferences: 82, mobilityGoals: 65 },
  team: { velocity: 40, decisionStyle: 30, feedbackPattern: 18, autonomyTolerance: 20, managerProfile: 15 },
  org: { changeLoad: 45, roleClarity: 60, crossTeamDependency: 50, policyStability: 55, attritionSignals: 55 },
};

// Scenario 2: Average candidate, strong substrate — floor rescues a moderate hire
const PRESET_STRONG_FLOOR = {
  candidate: { skills: 52, workStyle: 58, stressResponse: 48, growthPreferences: 55, mobilityGoals: 50 },
  team: { velocity: 72, decisionStyle: 80, feedbackPattern: 88, autonomyTolerance: 82, managerProfile: 90 },
  org: { changeLoad: 25, roleClarity: 85, crossTeamDependency: 35, policyStability: 80, attritionSignals: 15 },
};

// Scenario 3: High conflict reorg — two teams post-merger, everything is red
const PRESET_REORG = {
  candidate: { skills: 65, workStyle: 60, stressResponse: 45, growthPreferences: 50, mobilityGoals: 70 },
  team: { velocity: 55, decisionStyle: 35, feedbackPattern: 28, autonomyTolerance: 40, managerProfile: 30 },
  org: { changeLoad: 92, roleClarity: 18, crossTeamDependency: 85, policyStability: 12, attritionSignals: 88 },
};

const PRESETS = [
  { key: 'weak_floor', label: 'Great Candidate, Weak Floor', desc: 'Strong hire. Broken team substrate. Watch stability collapse.', data: PRESET_WEAK_FLOOR },
  { key: 'strong_floor', label: 'Average Candidate, Strong Floor', desc: 'Moderate skills. Solid manager. Floor rescues the outcome.', data: PRESET_STRONG_FLOOR },
  { key: 'reorg', label: 'High Conflict Reorg', desc: 'Post-merger chaos. Everything is red. See the intervention list.', data: PRESET_REORG },
];

function HandshakeCopilot() {
  const [step, setStep] = useState('landing');
  const [formStep, setFormStep] = useState(0);
  const [data, setData] = useState(INITIAL_STATE);

  const resetAll = () => { setStep('landing'); setFormStep(0); setData(INITIAL_STATE); };

  return (
    <div className="hc-root">
      <style>{styles}</style>
      <header className="hc-header">
        <div className="hc-logo">Handshake <span>Enterprise Copilot</span></div>
        {step !== 'landing' && (
          <button className="hc-back-link" onClick={resetAll}>← Start Over</button>
        )}
      </header>
      <main className="hc-main">
        {step === 'landing' && (
          <Landing onStart={() => { setStep('form'); setFormStep(0); setData(INITIAL_STATE); }} onPreset={(preset) => { setData(preset); setStep('results'); }} />
        )}
        {step === 'form' && (
          <FormFlow formStep={formStep} setFormStep={setFormStep} data={data} setData={setData} onComplete={() => setStep('results')} />
        )}
        {step === 'results' && (
          <Results data={data} onBack={() => { setStep('form'); setFormStep(2); }} />
        )}
      </main>
    </div>
  );
}

function Landing({ onStart, onPreset }) {
  return (
    <div className="hc-landing">
      <div className="hc-landing-badge">Competition Demo · v0.1</div>
      <h1>Hiring decisions as<br /><em>version-control consequence modeling</em></h1>
      <p className="hc-landing-sub">
        Most hiring tools rank individuals. This system models candidate + team + organization
        as one dynamic system — and tells you where the merge conflicts are before they cost you.
      </p>
      <div className="hc-formula">
        <div className="hc-formula-label">Stability Formula</div>
        <code>overall_stability = candidate_fit × (team_floor / 100) × (org_alignment / 100)</code>
        <code>merge_conflict_risk = 100 − overall_stability + conflict_penalties</code>
      </div>
      <div className="hc-cta-row">
        <button className="hc-btn hc-btn-primary" onClick={onStart}>Run a Simulation →</button>
      </div>
      <div style={{ marginTop: 44, textAlign: 'left', maxWidth: 680, marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: 14 }}>
          Or load a scenario
        </div>
        <div style={{ display: 'grid', gap: 12 }}>
          {PRESETS.map(p => (
            <button
              key={p.key}
              className="hc-btn hc-btn-secondary"
              style={{ textAlign: 'left', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 16 }}
              onClick={() => onPreset(p.data)}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, marginBottom: 3 }}>{p.label}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 400 }}>{p.desc}</div>
              </div>
              <span style={{ color: 'var(--accent)', flexShrink: 0 }}>→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepBar({ formStep }) {
  return (
    <div className="hc-step-bar">
      {STEPS.map((label, i) => (
        <React.Fragment key={label}>
          <div className={`hc-step ${i === formStep ? 'active' : i < formStep ? 'done' : ''}`}>
            <div className="hc-step-dot">{i < formStep ? '✓' : i + 1}</div>
            <span>{label}</span>
          </div>
          {i < STEPS.length - 1 && <div className="hc-step-line" />}
        </React.Fragment>
      ))}
    </div>
  );
}

function FormFlow({ formStep, setFormStep, data, setData, onComplete }) {
  return (
    <div>
      <StepBar formStep={formStep} />
      {formStep === 0 && <CandidateForm data={data} setData={setData} onNext={() => setFormStep(1)} />}
      {formStep === 1 && <TeamForm data={data} setData={setData} onNext={() => setFormStep(2)} onBack={() => setFormStep(0)} />}
      {formStep === 2 && <OrgForm data={data} setData={setData} onNext={onComplete} onBack={() => setFormStep(1)} />}
    </div>
  );
}

const sliderStyles = `
  .hc-form-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 32px;
    margin-bottom: 24px;
  }
  .hc-form-title {
    font-size: 1.15rem;
    font-weight: 700;
    margin: 0 0 6px;
  }
  .hc-form-desc {
    color: var(--text-muted);
    font-size: 0.88rem;
    margin: 0 0 28px;
    line-height: 1.5;
  }
  .hc-slider-row {
    margin-bottom: 22px;
  }
  .hc-slider-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 6px;
  }
  .hc-slider-label {
    font-size: 0.9rem;
    font-weight: 600;
  }
  .hc-slider-value {
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--accent);
    min-width: 32px;
    text-align: right;
  }
  .hc-slider-hint {
    font-size: 0.75rem;
    color: var(--text-muted);
    margin-bottom: 6px;
  }
  input[type=range].hc-slider {
    width: 100%;
    accent-color: var(--accent);
    height: 4px;
    cursor: pointer;
  }
  .hc-slider-ends {
    display: flex;
    justify-content: space-between;
    font-size: 0.7rem;
    color: var(--text-muted);
    margin-top: 3px;
  }
  .hc-form-nav {
    display: flex;
    justify-content: space-between;
    margin-top: 28px;
  }
`;

function Slider({ label, hint, leftLabel, rightLabel, value, onChange }) {
  return (
    <div className="hc-slider-row">
      <div className="hc-slider-header">
        <span className="hc-slider-label">{label}</span>
        <span className="hc-slider-value">{value}</span>
      </div>
      {hint && <div className="hc-slider-hint">{hint}</div>}
      <input
        type="range" className="hc-slider"
        min={0} max={100} value={value}
        onChange={e => onChange(Number(e.target.value))}
      />
      <div className="hc-slider-ends">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  );
}

function CandidateForm({ data, setData, onNext }) {
  const c = data.candidate;
  const set = (key, val) => setData(d => ({ ...d, candidate: { ...d.candidate, [key]: val } }));
  return (
    <div className="hc-form-card">
      <style>{sliderStyles}</style>
      <div className="hc-form-title">Candidate Profile</div>
      <div className="hc-form-desc">Configure the candidate's capabilities, working style, and career preferences.</div>
      <Slider label="Skills & Capabilities" hint="Technical depth, transferable skills, demonstrated competency" leftLabel="Early / Developing" rightLabel="Expert / Proven" value={c.skills} onChange={v => set('skills', v)} />
      <Slider label="Work Style Fit" hint="Preference for structure vs autonomy, collaboration vs independent work" leftLabel="Highly Structured" rightLabel="Highly Autonomous" value={c.workStyle} onChange={v => set('workStyle', v)} />
      <Slider label="Stress Response" hint="How the candidate performs under pressure and ambiguity" leftLabel="Needs Support" rightLabel="Thrives Under Pressure" value={c.stressResponse} onChange={v => set('stressResponse', v)} />
      <Slider label="Growth Preferences" hint="Orientation toward learning, stretch assignments, and change" leftLabel="Stability Seeker" rightLabel="Growth Seeker" value={c.growthPreferences} onChange={v => set('growthPreferences', v)} />
      <Slider label="Mobility Goals" hint="Appetite for role evolution, promotion, or lateral moves" leftLabel="Content in Role" rightLabel="Actively Mobile" value={c.mobilityGoals} onChange={v => set('mobilityGoals', v)} />
      <div className="hc-form-nav">
        <span />
        <button className="hc-btn hc-btn-primary" onClick={onNext}>Next: Team Config →</button>
      </div>
    </div>
  );
}

function TeamForm({ data, setData, onNext, onBack }) {
  const t = data.team;
  const set = (key, val) => setData(d => ({ ...d, team: { ...d.team, [key]: val } }));
  return (
    <div className="hc-form-card">
      <div className="hc-form-title">Team & Manager Profile</div>
      <div className="hc-form-desc">Configure the receiving team's operating conditions and manager patterns. This is the floor the candidate will stand on.</div>
      <Slider label="Execution Velocity" hint="How fast the team ships, iterates, and responds to change" leftLabel="Slow / Methodical" rightLabel="Fast / Reactive" value={t.velocity} onChange={v => set('velocity', v)} />
      <Slider label="Decision Style" hint="How decisions are made — consensus-driven vs. top-down authority" leftLabel="Top-Down" rightLabel="Consensus-Driven" value={t.decisionStyle} onChange={v => set('decisionStyle', v)} />
      <Slider label="Feedback Quality" hint="Frequency, honesty, and constructiveness of feedback loops" leftLabel="Rare / Unclear" rightLabel="Regular / Actionable" value={t.feedbackPattern} onChange={v => set('feedbackPattern', v)} />
      <Slider label="Autonomy Tolerance" hint="Degree to which independent judgment is welcomed vs. supervised" leftLabel="Micromanaged" rightLabel="High Autonomy" value={t.autonomyTolerance} onChange={v => set('autonomyTolerance', v)} />
      <Slider label="Manager Reliability" hint="Consistency of manager support, clarity of expectations, follow-through" leftLabel="Inconsistent" rightLabel="Highly Reliable" value={t.managerProfile} onChange={v => set('managerProfile', v)} />
      <div className="hc-form-nav">
        <button className="hc-btn hc-btn-secondary" onClick={onBack}>← Back</button>
        <button className="hc-btn hc-btn-primary" onClick={onNext}>Next: Org Profile →</button>
      </div>
    </div>
  );
}

function OrgForm({ data, setData, onNext, onBack }) {
  const o = data.org;
  const set = (key, val) => setData(d => ({ ...d, org: { ...d.org, [key]: val } }));
  return (
    <div className="hc-form-card">
      <div className="hc-form-title">Organization Profile</div>
      <div className="hc-form-desc">Configure the organizational conditions surrounding this hire. High change load and low role clarity compound every other risk factor.</div>
      <Slider label="Change Load" hint="Volume of active org changes: restructures, pivots, leadership transitions" leftLabel="Stable" rightLabel="High Flux" value={o.changeLoad} onChange={v => set('changeLoad', v)} />
      <Slider label="Role Clarity" hint="How well-defined are responsibilities, scope, and success metrics" leftLabel="Ambiguous" rightLabel="Crystal Clear" value={o.roleClarity} onChange={v => set('roleClarity', v)} />
      <Slider label="Cross-Team Dependency" hint="Degree to which this role depends on other teams functioning well" leftLabel="Self-Contained" rightLabel="Highly Dependent" value={o.crossTeamDependency} onChange={v => set('crossTeamDependency', v)} />
      <Slider label="Policy Stability" hint="Consistency and reliability of HR, compensation, and operating policies" leftLabel="Frequently Shifting" rightLabel="Consistent & Reliable" value={o.policyStability} onChange={v => set('policyStability', v)} />
      <Slider label="Attrition Signal" hint="Recent voluntary turnover rate in this team or function (inverted — higher = more attrition)" leftLabel="Low Turnover" rightLabel="High Turnover" value={o.attritionSignals} onChange={v => set('attritionSignals', v)} />
      <div className="hc-form-nav">
        <button className="hc-btn hc-btn-secondary" onClick={onBack}>← Back</button>
        <button className="hc-btn hc-btn-primary" onClick={onNext}>Run Simulation →</button>
      </div>
    </div>
  );
}

function avg(obj) {
  const vals = Object.values(obj);
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
}

function computeScores(data) {
  const candidateFit = avg(data.candidate);

  const teamRaw = avg(data.team);
  // attritionSignals is inverted — higher means worse floor
  const attritionPenalty = Math.round((data.org.attritionSignals - 50) * 0.3);
  const teamFloor = Math.max(0, Math.min(100, teamRaw));

  // org_alignment: role clarity and policy stability are positive; change load and cross-team dependency are risks
  const orgAlignment = Math.max(0, Math.min(100,
    Math.round(
      (data.org.roleClarity * 1.4 + data.org.policyStability * 1.2
        + (100 - data.org.changeLoad) * 0.9
        + (100 - data.org.crossTeamDependency) * 0.5
        + (100 - data.org.attritionSignals) * 1.0
      ) / 5.0
    )
  ));

  const overallStability = Math.round(candidateFit * (teamFloor / 100) * (orgAlignment / 100));

  const conflictPenalties =
    (teamFloor < 30 ? 15 : teamFloor < 50 ? 7 : 0) +
    (orgAlignment < 30 ? 12 : orgAlignment < 50 ? 5 : 0) +
    (data.org.attritionSignals > 70 ? 8 : 0) +
    (data.org.changeLoad > 70 ? 5 : 0);

  const mergeConflictRisk = Math.min(100, Math.max(0, 100 - overallStability + conflictPenalties));

  // factor extraction — top 3 positive, top 3 conflict
  const allFactors = [
    { label: 'Skills & Capabilities', value: data.candidate.skills, domain: 'candidate', positive: data.candidate.skills >= 60 },
    { label: 'Work Style Fit', value: data.candidate.workStyle, domain: 'candidate', positive: data.candidate.workStyle >= 50 },
    { label: 'Stress Response', value: data.candidate.stressResponse, domain: 'candidate', positive: data.candidate.stressResponse >= 55 },
    { label: 'Growth Orientation', value: data.candidate.growthPreferences, domain: 'candidate', positive: data.candidate.growthPreferences >= 50 },
    { label: 'Mobility Alignment', value: data.candidate.mobilityGoals, domain: 'candidate', positive: data.candidate.mobilityGoals >= 40 },
    { label: 'Team Velocity Match', value: data.team.velocity, domain: 'team', positive: true },
    { label: 'Feedback Quality', value: data.team.feedbackPattern, domain: 'team', positive: data.team.feedbackPattern >= 55 },
    { label: 'Manager Reliability', value: data.team.managerProfile, domain: 'team', positive: data.team.managerProfile >= 60 },
    { label: 'Autonomy Tolerance', value: data.team.autonomyTolerance, domain: 'team', positive: data.team.autonomyTolerance >= 45 },
    { label: 'Role Clarity', value: data.org.roleClarity, domain: 'org', positive: data.org.roleClarity >= 60 },
    { label: 'Policy Stability', value: data.org.policyStability, domain: 'org', positive: data.org.policyStability >= 55 },
    { label: 'Change Load', value: data.org.changeLoad, domain: 'org', positive: data.org.changeLoad <= 40 },
    { label: 'Attrition Signal', value: data.org.attritionSignals, domain: 'org', positive: data.org.attritionSignals <= 35 },
  ];

  const positiveFactors = allFactors
    .filter(f => f.positive)
    .sort((a, b) => b.value - a.value)
    .slice(0, 3);

  const conflictFactors = allFactors
    .filter(f => !f.positive)
    .sort((a, b) => a.value - b.value)
    .slice(0, 3);

  const confidence = overallStability > 70 ? 'High' : overallStability > 40 ? 'Moderate' : 'Low';

  return { candidateFit, teamFloor, orgAlignment, overallStability, mergeConflictRisk, conflictPenalties, positiveFactors, conflictFactors, confidence };
}

const resultsStyles = `
  .hc-results-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 20px;
  }
  @media (max-width: 600px) { .hc-results-grid { grid-template-columns: 1fr; } }
  .hc-score-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 20px;
  }
  .hc-score-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-muted);
    margin-bottom: 8px;
  }
  .hc-score-big {
    font-size: 2.4rem;
    font-weight: 800;
    line-height: 1;
    margin-bottom: 6px;
  }
  .hc-score-sub {
    font-size: 0.78rem;
    color: var(--text-muted);
  }
  .hc-gauge-bar {
    height: 8px;
    background: var(--border);
    border-radius: 4px;
    overflow: hidden;
    margin: 10px 0 4px;
  }
  .hc-gauge-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.4s ease;
  }
  .hc-verdict {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 20px 24px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 18px;
  }
  .hc-verdict-icon {
    font-size: 2rem;
    flex-shrink: 0;
  }
  .hc-verdict-title {
    font-size: 1.05rem;
    font-weight: 700;
    margin-bottom: 4px;
  }
  .hc-verdict-desc {
    font-size: 0.85rem;
    color: var(--text-muted);
    line-height: 1.5;
  }
  .hc-factors-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 20px;
  }
  @media (max-width: 600px) { .hc-factors-grid { grid-template-columns: 1fr; } }
  .hc-factors-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 18px 20px;
  }
  .hc-factors-title {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 12px;
  }
  .hc-factor-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 9px;
    font-size: 0.85rem;
  }
  .hc-factor-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }
`;

function scoreColor(val) {
  if (val >= 65) return 'var(--green)';
  if (val >= 35) return 'var(--yellow)';
  return 'var(--red)';
}

function riskColor(val) {
  if (val >= 65) return 'var(--red)';
  if (val >= 35) return 'var(--yellow)';
  return 'var(--green)';
}

function Results({ data, onBack }) {
  const s = computeScores(data);

  const verdictMap = {
    green: { icon: '✅', title: 'Merge Approved', desc: 'Strong alignment across candidate, team, and org. Proceed with standard onboarding.' },
    yellow: { icon: '⚠️', title: 'Merge with Conditions', desc: 'Moderate stability. Address flagged conflict vectors before or during onboarding.' },
    red: { icon: '🔴', title: 'High Conflict Risk', desc: 'Significant instability detected. Intervention required before this hire can succeed.' },
  };
  const verdictKey = s.overallStability >= 60 ? 'green' : s.overallStability >= 35 ? 'yellow' : 'red';
  const verdict = verdictMap[verdictKey];

  return (
    <div>
      <style>{resultsStyles}</style>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 4 }}>Simulation Results</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Confidence: <strong>{s.confidence}</strong></div>
      </div>

      <div className="hc-results-grid">
        {[
          { label: 'Candidate Fit', val: s.candidateFit, fn: scoreColor },
          { label: 'Team Floor', val: s.teamFloor, fn: scoreColor },
          { label: 'Org Alignment', val: s.orgAlignment, fn: scoreColor },
          { label: 'Overall Stability', val: s.overallStability, fn: scoreColor },
        ].map(({ label, val, fn }) => (
          <div className="hc-score-card" key={label}>
            <div className="hc-score-label">{label}</div>
            <div className="hc-score-big" style={{ color: fn(val) }}>{val}</div>
            <div className="hc-gauge-bar">
              <div className="hc-gauge-fill" style={{ width: `${val}%`, background: fn(val) }} />
            </div>
          </div>
        ))}
      </div>

      <div className="hc-score-card" style={{ marginBottom: 16 }}>
        <div className="hc-score-label">Merge Conflict Risk</div>
        <div className="hc-score-big" style={{ color: riskColor(s.mergeConflictRisk) }}>{s.mergeConflictRisk}</div>
        <div className="hc-gauge-bar">
          <div className="hc-gauge-fill" style={{ width: `${s.mergeConflictRisk}%`, background: riskColor(s.mergeConflictRisk) }} />
        </div>
        <div className="hc-score-sub" style={{ marginTop: 4 }}>
          {s.conflictPenalties > 0 ? `+${s.conflictPenalties} penalty points from active risk signals` : 'No active penalty signals'}
        </div>
      </div>

      <div className="hc-verdict" style={{ borderColor: s.overallStability >= 60 ? 'var(--green)' : s.overallStability >= 35 ? 'var(--yellow)' : 'var(--red)' }}>
        <div className="hc-verdict-icon">{verdict.icon}</div>
        <div>
          <div className="hc-verdict-title">{verdict.title}</div>
          <div className="hc-verdict-desc">{verdict.desc}</div>
        </div>
      </div>

      <div className="hc-factors-grid">
        <div className="hc-factors-card">
          <div className="hc-factors-title" style={{ color: 'var(--green)' }}>▲ Top Positive Factors</div>
          {s.positiveFactors.length === 0 && <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>None detected</div>}
          {s.positiveFactors.map(f => (
            <div className="hc-factor-row" key={f.label}>
              <div className="hc-factor-dot" style={{ background: 'var(--green)' }} />
              <span>{f.label}</span>
              <span style={{ marginLeft: 'auto', color: 'var(--green)', fontWeight: 700 }}>{f.value}</span>
            </div>
          ))}
        </div>
        <div className="hc-factors-card">
          <div className="hc-factors-title" style={{ color: 'var(--red)' }}>▼ Top Conflict Factors</div>
          {s.conflictFactors.length === 0 && <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>None detected</div>}
          {s.conflictFactors.map(f => (
            <div className="hc-factor-row" key={f.label}>
              <div className="hc-factor-dot" style={{ background: 'var(--red)' }} />
              <span>{f.label}</span>
              <span style={{ marginLeft: 'auto', color: 'var(--red)', fontWeight: 700 }}>{f.value}</span>
            </div>
          ))}
        </div>
      </div>

      <InterventionPanel scores={s} data={data} />

      <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
        <button className="hc-btn hc-btn-secondary" onClick={onBack}>← Adjust Inputs</button>
      </div>
    </div>
  );
}

const prStyles = `
  .hc-pr-panel {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 22px 24px;
    margin-bottom: 20px;
  }
  .hc-pr-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 18px;
  }
  .hc-pr-title {
    font-size: 1rem;
    font-weight: 700;
  }
  .hc-pr-badge {
    padding: 3px 10px;
    border-radius: 12px;
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .hc-pr-item {
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 14px 16px;
    margin-bottom: 10px;
    background: var(--bg);
  }
  .hc-pr-item-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 6px;
  }
  .hc-pr-item-type {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-muted);
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 2px 8px;
    border-radius: 10px;
  }
  .hc-pr-item-title {
    font-size: 0.9rem;
    font-weight: 600;
  }
  .hc-pr-item-desc {
    font-size: 0.82rem;
    color: var(--text-muted);
    line-height: 1.5;
  }
  .hc-pr-delta {
    font-size: 0.75rem;
    margin-top: 6px;
    color: var(--green);
  }
`;

function buildInterventions(scores, data) {
  const items = [];
  if (scores.teamFloor < 50) {
    items.push({
      type: 'Manager Coaching',
      title: 'Establish weekly structured 1:1 cadence',
      desc: 'Manager reliability scored below threshold. Define explicit feedback loops and expectation-setting before Day 1.',
      delta: '+8–12 team_floor',
      priority: 'high',
    });
  }
  if (data.team.feedbackPattern < 50) {
    items.push({
      type: 'Onboarding Plan',
      title: 'Build 30/60/90-day explicit success criteria',
      desc: 'Feedback quality is low. Written milestones give the candidate a feedback proxy until team culture improves.',
      delta: '+5–8 team_floor',
      priority: 'high',
    });
  }
  if (scores.orgAlignment < 50) {
    items.push({
      type: 'Policy Update',
      title: 'Clarify role scope and decision authority before hire',
      desc: 'Org alignment is degraded by role ambiguity and/or policy instability. Resolve scope before the offer letter.',
      delta: '+10–15 org_alignment',
      priority: 'high',
    });
  }
  if (data.org.changeLoad > 65) {
    items.push({
      type: 'Communication Plan',
      title: 'Provide change roadmap transparency to new hire',
      desc: 'High change load detected. Candidates who can see the map tolerate uncertainty 40% better than those navigating blind.',
      delta: '+5 merge_conflict_risk reduction',
      priority: 'medium',
    });
  }
  if (data.org.attritionSignals > 65) {
    items.push({
      type: 'Retention Risk',
      title: 'Conduct exit interview audit before backfill',
      desc: 'Elevated attrition signals suggest a pattern, not a vacancy. Hiring into an unaddressed pattern repeats the outcome.',
      delta: 'Prevents future churn cycle',
      priority: 'high',
    });
  }
  if (data.candidate.stressResponse < 40 && scores.teamFloor < 50) {
    items.push({
      type: 'Role Adjustment',
      title: 'Consider branching this candidate to a more structured team',
      desc: 'Candidate stress tolerance is low and team floor is weak. This combination has high failure probability.',
      delta: 'Branch separately — avoid forced merge',
      priority: 'high',
    });
  }
  if (items.length === 0) {
    items.push({
      type: 'Standard Onboarding',
      title: 'No critical interventions required',
      desc: 'Stability scores are strong across all dimensions. Proceed with standard onboarding checklist.',
      delta: 'Maintain conditions — no action needed',
      priority: 'low',
    });
  }
  return items;
}

function InterventionPanel({ scores, data }) {
  const items = buildInterventions(scores, data);
  const prLabel = scores.overallStability >= 60 ? 'Merge Approved' : scores.overallStability >= 35 ? 'Request Changes' : 'Branch Separately';
  const prColor = scores.overallStability >= 60 ? 'var(--green)' : scores.overallStability >= 35 ? 'var(--yellow)' : 'var(--red)';

  return (
    <div className="hc-pr-panel">
      <style>{prStyles}</style>
      <div className="hc-pr-header">
        <div className="hc-pr-title">Intervention Pull Request</div>
        <div className="hc-pr-badge" style={{ background: `${prColor}22`, color: prColor, border: `1px solid ${prColor}55` }}>{prLabel}</div>
      </div>
      {items.map((item, i) => (
        <div className="hc-pr-item" key={i}>
          <div className="hc-pr-item-header">
            <span className="hc-pr-item-type">{item.type}</span>
            {item.priority === 'high' && <span style={{ fontSize: '0.7rem', color: 'var(--red)' }}>● High Priority</span>}
            {item.priority === 'medium' && <span style={{ fontSize: '0.7rem', color: 'var(--yellow)' }}>● Medium</span>}
          </div>
          <div className="hc-pr-item-title">{item.title}</div>
          <div className="hc-pr-item-desc">{item.desc}</div>
          <div className="hc-pr-delta">Expected delta: {item.delta}</div>
        </div>
      ))}
    </div>
  );
}

export default HandshakeCopilot;
