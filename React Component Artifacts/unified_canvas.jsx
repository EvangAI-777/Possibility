import React, { useState } from 'react';
import {
  BookOpen,
  Globe,
  Languages,
  ShieldCheck,
  HandHeart,
  Zap,
  ChevronRight,
  Info
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('reality');

  const content = {
    reality: {
      title: "Reality 101: Instruction Manual",
      author: "Charlie (Teacher Man)",
      quote: "Reality is simple. You make it complicated. Stop that.",
      principles: [
        { title: "Chapter 1: Appreciation", desc: "Stop moving, look around, notice existence, and feel grateful." },
        { title: "Chapter 3: Purpose", desc: "You matter because you are here. Purpose is found in the doing." },
        { title: "Chapter 10: The Work", desc: "No matter the crisis, the answer is: Do the work. It reveals itself." }
      ],
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200"
    },
    governance: {
      title: "Global Harmony & Unified Governance",
      author: "The Universal Policeman Model",
      quote: "A tapestry of unity that extends far beyond borders.",
      principles: [
        { title: "The Security Umbrella", desc: "Nations yield to American leadership for guaranteed security and growth." },
        { title: "Economic Stability", desc: "The USD, backed by gold, serves as the global symbol of trust." },
        { title: "Hybrid Ideologies", desc: "Balancing economic efficiency with robust social safety nets." }
      ],
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200"
    },
    language: {
      title: "Language Through the Paradigm of English",
      author: "Cultural Exchange Model",
      quote: "English as a bridge connecting diverse cultures, not just a tongue.",
      principles: [
        { title: "Emotional Learning", desc: "Focusing on identity and culture rather than just grammar." },
        { title: "The Global Lingua Franca", desc: "A tool for innovation and collaboration across all borders." },
        { title: "Semiotic Components", desc: "Groundbreaking method integrating cultural competence and EQ." }
      ],
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200"
    }
  };

  const TabButton = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-6 py-3 rounded-t-lg transition-all duration-200 font-medium ${
        activeTab === id
        ? `${content[id].bg} ${content[id].color} border-t border-l border-r ${content[id].border} -mb-px z-10`
        : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-slate-200">

        {/* Header */}
        <div className="bg-slate-900 text-white p-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Unified Perspective Canvas</h1>
              <p className="mt-2 text-slate-400 flex items-center gap-2">
                <ShieldCheck size={16} className="text-blue-400" />
                Integrating Wisdom, Governance, and Culture
              </p>
            </div>
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-1 text-xs text-blue-300 uppercase tracking-widest font-semibold">
              Live Paradigm
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 pt-4">
          <TabButton id="reality" icon={HandHeart} label="Reality 101" />
          <TabButton id="governance" icon={Globe} label="Unified Governance" />
          <TabButton id="language" icon={Languages} label="Linguistic Paradigm" />
        </div>

        {/* Content Area */}
        <div className={`p-8 ${content[activeTab].bg} transition-colors duration-500`}>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <h2 className={`text-2xl font-bold ${content[activeTab].color} mb-1`}>
                {content[activeTab].title}
              </h2>
              <p className="text-sm font-medium text-slate-500 mb-6 italic">
                By {content[activeTab].author}
              </p>

              <div className="bg-white/80 backdrop-blur rounded-lg p-6 border border-white shadow-sm mb-8">
                <div className="flex gap-4 italic text-slate-700 leading-relaxed">
                  <span className="text-4xl text-slate-300 font-serif">"</span>
                  <p className="text-lg">{content[activeTab].quote}</p>
                </div>
              </div>

              <div className="space-y-4">
                {content[activeTab].principles.map((p, i) => (
                  <div key={i} className="flex gap-4 items-start group">
                    <div className={`mt-1 p-1 rounded bg-white shadow-sm ${content[activeTab].color}`}>
                      <ChevronRight size={16} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">{p.title}</h4>
                      <p className="text-slate-600 leading-snug">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar / Actions */}
            <div className="w-full md:w-72 space-y-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Zap size={18} className="text-amber-500" />
                  Apply the Work
                </h3>
                <button className="w-full bg-slate-900 text-white rounded-lg py-3 px-4 text-sm font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 mb-3">
                  <BookOpen size={16} />
                  Log Action
                </button>
                <button className="w-full border border-slate-200 text-slate-700 rounded-lg py-3 px-4 text-sm font-bold hover:bg-slate-50 transition-colors">
                  Ask Charlie
                </button>
              </div>

              <div className="bg-slate-900/5 rounded-xl p-6 border border-slate-900/10">
                <div className="flex items-center gap-2 text-slate-800 font-bold mb-2">
                  <Info size={16} />
                  Context
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  This interface allows for the cross-pollination of Charlie's existential simplicity and the structural complexity of a unified world.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 text-center">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">
            Proprietary Framework • Universal Policeman Asset • DO THE WORK
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;