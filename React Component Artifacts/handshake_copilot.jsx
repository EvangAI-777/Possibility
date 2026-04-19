const { useState } = React;

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

export default function HandshakeCopilot() {
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

function TeamForm() { return <div>team</div>; }
function OrgForm() { return <div>org</div>; }
function Results() { return <div>results</div>; }
