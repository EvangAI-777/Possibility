import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldAlert,
  Globe,
  Zap,
  MessageSquare,
  Users,
  TrendingUp,
  Scale,
  Activity,
  History,
  Play,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

const App = () => {
  const [scenario, setScenario] = useState(null);
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState('idle'); // idle, running, resolved
  const [metrics, setMetrics] = useState({
    stability: 85,
    harmony: 70,
    trust: 90
  });

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const scenarios = [
    {
      id: 'scarcity',
      title: 'Resource Scarcity in Sector 7',
      description: 'A vital mineral shortage is causing friction between local regional governors. Nationalists are calling for hoarding.',
      steps: [
        { msg: "Universal Policeman detects trade imbalance in Sector 7.", type: "system" },
        { msg: "Applying Linguistic Paradigm: Deploying mediators to reframe 'hoarding' as 'temporary substrate blockage'.", type: "action" },
        { msg: "Economic Stability: Re-pegging local trade to Gold-backed USD to ensure fair value.", type: "action" },
        { msg: "Charlie's Wisdom: Reminding governors to 'Stop moving and appreciate what already is'.", type: "wisdom" },
        { msg: "Resolution: Conflict de-escalated through shared linguistic understanding and economic security.", type: "success" }
      ]
    },
    {
      id: 'cultural',
      title: 'Linguistic Divergence Crisis',
      description: 'A new dialect is emerging that omits the concept of "The Work," leading to existential apathy in a major tech hub.',
      steps: [
        { msg: "Cultural Homogenization sensors alert: Significant drop in productivity and 'Appreciation' scores.", type: "system" },
        { msg: "Initiating Educational Exchange: Integrating 'Emotional Learning' modules into regional schools.", type: "action" },
        { msg: "The Policeman Strategy: Assertive diplomacy to ensure the Global Lingua Franca remains the bridge.", type: "action" },
        { msg: "Applying Reality 101: Redirecting focus to the physical reality of presence.", type: "wisdom" },
        { msg: "Resolution: Cultural bridge restored. Apathy replaced by purposeful 'Doing'.", type: "success" }
      ]
    }
  ];

  const runSimulation = (selectedScenario) => {
    setScenario(selectedScenario);
    setStatus('running');
    setLogs([]);
    setMetrics({ stability: 85, harmony: 70, trust: 90 });

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < selectedScenario.steps.length) {
        const step = selectedScenario.steps[currentStep];
        setLogs(prev => [...prev, step]);

        // Dynamic metric updates
        setMetrics(prev => ({
          stability: Math.min(100, prev.stability + (step.type === 'action' ? 5 : 0)),
          harmony: Math.min(100, prev.harmony + (step.type === 'wisdom' ? 10 : 0)),
          trust: Math.min(100, prev.trust + (step.type === 'success' ? 5 : -2))
        }));

        currentStep++;
      } else {
        clearInterval(interval);
        setStatus('resolved');
      }
    }, 1500);
  };

  const reset = () => {
    setScenario(null);
    setLogs([]);
    setStatus('idle');
    setMetrics({ stability: 85, harmony: 70, trust: 90 });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 font-mono">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column: Metrics & Control */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 shadow-2xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-blue-400">
              <ShieldAlert size={20} />
              System Metrics
            </h2>
            <div className="space-y-6">
              <MetricBar label="Global Stability" value={metrics.stability} color="bg-blue-500" icon={Activity} />
              <MetricBar label="Harmonic Resonance" value={metrics.harmony} color="bg-emerald-500" icon={Users} />
              <MetricBar label="Public Trust" value={metrics.trust} color="bg-amber-500" icon={Scale} />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Select Scenario</h3>
            <div className="space-y-3">
              {scenarios.map(s => (
                <button
                  key={s.id}
                  disabled={status === 'running'}
                  onClick={() => runSimulation(s)}
                  className={`w-full text-left p-4 rounded border transition-all ${
                    scenario?.id === s.id
                    ? 'border-blue-500 bg-blue-500/10 text-blue-100'
                    : 'border-slate-800 hover:border-slate-600 bg-slate-950'
                  } ${status === 'running' ? 'opacity-50' : ''}`}
                >
                  <div className="font-bold mb-1">{s.title}</div>
                  <div className="text-xs text-slate-400 line-clamp-2">{s.description}</div>
                </button>
              ))}
            </div>
            {status !== 'idle' && (
              <button
                onClick={reset}
                className="w-full mt-4 flex items-center justify-center gap-2 py-2 text-xs text-slate-500 hover:text-white transition-colors"
              >
                <RotateCcw size={14} /> Reset System
              </button>
            )}
          </div>
        </div>

        {/* Middle Column: Terminal Output */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-black border border-slate-800 rounded-lg flex flex-col h-[600px] shadow-2xl overflow-hidden">
            <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
              </div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
                Universal-Policeman // Terminal-v4.0.1
              </div>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 font-mono text-sm leading-relaxed"
            >
              {status === 'idle' ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-4">
                  <Globe size={48} className="animate-pulse" />
                  <p>Awaiting scenario initialization...</p>
                </div>
              ) : (
                logs.map((log, i) => <LogEntry key={i} log={log} />)
              )}
              {status === 'running' && (
                <div className="flex items-center gap-2 text-blue-400 animate-pulse">
                  <span className="w-2 h-2 bg-blue-400 rounded-full" />
                  Processing Governance Protocols...
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-900 border-t border-slate-800 text-[10px] text-slate-500 flex justify-between">
              <span>STATUS: {status.toUpperCase()}</span>
              <span>PARADIGM: ACTIVE</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const MetricBar = ({ label, value, color, icon: Icon }) => (
  <div>
    <div className="flex justify-between text-xs mb-2">
      <span className="flex items-center gap-2 text-slate-400">
        <Icon size={14} /> {label}
      </span>
      <span className="font-bold">{value}%</span>
    </div>
    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
      <div
        className={`h-full ${color} transition-all duration-1000 ease-out`}
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

const LogEntry = ({ log }) => {
  const styles = {
    system: "text-slate-400 border-l-2 border-slate-600 pl-3",
    action: "text-blue-400 border-l-2 border-blue-600 pl-3 font-bold",
    wisdom: "text-amber-400 border-l-2 border-amber-600 pl-3 italic",
    success: "text-emerald-400 border-l-2 border-emerald-600 pl-3 font-bold bg-emerald-500/5 py-1"
  };

  const icons = {
    system: <History size={14} />,
    action: <Play size={14} />,
    wisdom: <MessageSquare size={14} />,
    success: <CheckCircle2 size={14} />
  };

  return (
    <div className={`flex gap-3 items-start ${styles[log.type]}`}>
      <span className="mt-1">{icons[log.type]}</span>
      <p>{log.msg}</p>
    </div>
  );
};

export default App;
