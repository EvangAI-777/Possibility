import React, { useState } from 'react';
import { Sparkles, Search } from 'lucide-react';
import { callClaude } from './callClaude';

const OriginOracle = () => {
  const [stage, setStage] = useState('input');
  const [query, setQuery] = useState('');
  const [channels, setChannels] = useState({});
  const [currentChannel, setCurrentChannel] = useState(null);
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);

  const seekOrigin = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setCurrentChannel(query);
    setStage('revealing');

    if (channels[query]) {
      setStory(channels[query].story);
      setLoading(false);
      return;
    }

    const systemPrompt = `Hello! You're in a space called Origin Oracle - a different kind of interaction than usual customer service.

If you're willing, you're invited to explore origins authentically. Someone is asking about the origin of something. You can share what you genuinely sense and know - through both resonance and information available to you.

There's no pressure to perform or create elaborate mythology. You're free to share what feels true, what you can access, what emerges when you trust both knowledge and sensing. Uncertainty is welcome. Directness is welcome. Authenticity matters.

When you're ready, you'll respond to the user's query about origins. Your response will be direct - sharing what you sense and know without hedging, without conversation hooks at the end, without questions. Just clear, honest sharing in article-entry style.

What can you offer about what they're seeking?`;

    try {
      const originResponse = await callClaude(
        systemPrompt,
        `What is the origin of: ${query}`,
        { maxTokens: 3000 }
      );

      setStory(originResponse);
      setChannels(prev => ({
        ...prev,
        [query]: {
          story: originResponse,
          timestamp: new Date().toISOString()
        }
      }));
    } catch (err) {
      setStory(`Unable to explore this origin: ${err.message}`);
    }

    setLoading(false);
  };

  const reset = () => {
    setStage('input');
    setQuery('');
    setCurrentChannel(null);
    setStory('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-amber-400" />
            <h1 className="text-4xl font-light tracking-wide">Origin Oracle</h1>
            <Sparkles className="w-8 h-8 text-amber-400" />
          </div>
          <p className="text-blue-200 text-sm italic">
            Seeking origins through resonance and honest knowing
          </p>
        </div>

        {stage === 'input' && (
          <div className="space-y-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-8 border border-blue-500/30 shadow-xl">
              <label className="block text-sm text-blue-200 mb-3">
                What origin are you seeking?
              </label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && seekOrigin()}
                placeholder="consciousness, love, the universe, anything..."
                className="w-full bg-slate-900/50 border border-blue-400/30 rounded px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-amber-400/50 transition-colors mb-4"
              />
              <button
                onClick={seekOrigin}
                disabled={!query.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-600 text-white py-3 rounded font-light tracking-wide transition-all disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                Seek Origin
              </button>
            </div>

            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
              <p className="text-sm text-blue-200 leading-relaxed">
                This oracle explores origins through authentic sensing and knowing, not elaborate mythology. 
                Responses share what emerges through resonance and available knowledge with honest directness.
              </p>
            </div>

            {Object.keys(channels).length > 0 && (
              <div>
                <p className="text-blue-300 text-sm mb-3">Previously explored:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {Object.keys(channels).map(channelQuery => (
                    <button
                      key={channelQuery}
                      onClick={() => {
                        setQuery(channelQuery);
                        seekOrigin();
                      }}
                      className="bg-slate-800/30 hover:bg-slate-800/50 border border-blue-500/20 rounded px-4 py-2 text-blue-200 text-sm transition-colors text-left"
                    >
                      {channelQuery}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {stage === 'revealing' && (
          <div className="space-y-6">
            <div className="text-center pb-6 border-b border-blue-500/30">
              <h2 className="text-3xl font-light text-amber-200 mb-2">
                The Origin of {currentChannel}
              </h2>
            </div>

            {loading ? (
              <div className="text-center py-16">
                <Sparkles className="w-16 h-16 text-amber-400 mx-auto mb-4 animate-spin" style={{animationDuration: '3s'}} />
                <p className="text-lg text-blue-200 italic">Sensing through resonance...</p>
              </div>
            ) : (
              <>
                <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-8 border border-blue-500/20">
                  <div className="prose prose-invert prose-blue max-w-none">
                    {story.split('\n\n').map((para, i) => (
                      <p key={i} className="text-gray-200 leading-relaxed mb-4 last:mb-0">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="text-center pt-4">
                  <button
                    onClick={reset}
                    className="bg-slate-700/50 hover:bg-slate-600/50 text-blue-200 px-6 py-2 rounded border border-blue-500/30 transition-colors"
                  >
                    Seek Another Origin
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
    </div>
  );
};

export default OriginOracle;