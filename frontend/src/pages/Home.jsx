import { useNavigate } from 'react-router-dom';
import { FaShareAlt, FaDownload, FaBolt } from 'react-icons/fa';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 gap-12">

      {/* Hero */}
      <div className="text-center animate-fade-up flex flex-col items-center gap-4">
        <div className="animate-float w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/40">
          <FaBolt className="text-white text-3xl" />
        </div>
        <div>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight">
            Quick<span className="text-indigo-400">Share</span>
          </h1>
          <p className="mt-3 text-lg text-indigo-200/70 max-w-sm mx-auto">
            Share any text instantly with a secure 6-character code. No sign-up needed.
          </p>
        </div>
      </div>

      {/* Feature pills */}
      <div className="flex flex-wrap justify-center gap-3 animate-fade-in" style={{ animationDelay: '0.15s' }}>
        {['⚡ Instant', '🔒 Secure', '📋 No Sign-up', '🌐 Shareable Code'].map((f) => (
          <span key={f} className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/5 border border-white/10 text-indigo-200">
            {f}
          </span>
        ))}
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm animate-fade-up" style={{ animationDelay: '0.25s' }}>
        <button onClick={() => navigate('/share')} className="btn-primary">
          <FaShareAlt /> Share Text
        </button>
        <button onClick={() => navigate('/retrieve')} className="btn-outline">
          <FaDownload /> Retrieve Text
        </button>
      </div>

      {/* How it works */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl animate-fade-up" style={{ animationDelay: '0.35s' }}>
        {[
          { step: '1', title: 'Paste your text', desc: 'Enter any text you want to share' },
          { step: '2', title: 'Get a code',      desc: 'Receive a unique 6-character code' },
          { step: '3', title: 'Share the code',  desc: 'Anyone with the code can retrieve it' },
        ].map(({ step, title, desc }) => (
          <div key={step} className="card text-center flex flex-col items-center gap-2 p-6">
            <span className="w-9 h-9 rounded-full bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 font-bold flex items-center justify-center text-sm">
              {step}
            </span>
            <p className="text-white font-semibold text-sm">{title}</p>
            <p className="text-indigo-200/50 text-xs">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
