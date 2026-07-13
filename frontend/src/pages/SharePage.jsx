import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaShareAlt, FaCopy, FaCheck, FaRedo } from 'react-icons/fa';
import { shareText } from '../api';

const MAX = 2000;

export default function SharePage() {
  const [text, setText] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (!text.trim()) return toast.error('Please enter some text first');
    setLoading(true);
    setCode('');
    try {
      const { data } = await shareText(text);
      setCode(data.code);
      toast.success('Code generated successfully!');
    } catch {
      toast.error('Failed to generate code. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
    } else {
      const el = document.createElement('textarea');
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    toast.success('Code copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setText('');
    setCode('');
  };

  const remaining = MAX - text.length;

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="card w-full max-w-lg animate-fade-up flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <FaShareAlt />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Share Text</h2>
            <p className="text-xs text-indigo-200/50">Paste your text and generate a share code</p>
          </div>
        </div>

        {/* Textarea */}
        <div>
          <textarea
            rows={7}
            placeholder="Type or paste your text here..."
            value={text}
            onChange={(e) => e.target.value.length <= MAX && setText(e.target.value)}
            className="input-field resize-none"
            disabled={loading}
          />
          <p className={`char-count ${remaining < 100 ? 'warn' : ''}`}>
            {remaining} characters remaining
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button onClick={handleShare} disabled={loading || !text.trim()} className="btn-primary">
            {loading ? <><span className="spinner" /> Generating...</> : <><FaShareAlt /> Generate Code</>}
          </button>
          {(text || code) && (
            <button onClick={handleReset} title="Reset" className="btn-outline" style={{ width: 'auto', padding: '0 16px' }}>
              <FaRedo />
            </button>
          )}
        </div>

        {/* Result */}
        {code && (
          <div className="result-box flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-indigo-300/60 mb-2 font-medium uppercase tracking-wider">Generated Code</p>
              <div className="flex gap-2">
                {code.split('').map((char, i) => (
                  <span key={i} className="code-char" style={{ animationDelay: `${i * 0.06}s` }}>
                    {char}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={handleCopy}
              className={`flex flex-col items-center gap-1 px-4 py-3 rounded-xl border transition-all duration-200 text-sm font-medium
                ${copied
                  ? 'bg-green-500/20 border-green-500/40 text-green-400'
                  : 'bg-indigo-600/20 border-indigo-500/40 text-indigo-300 hover:bg-indigo-600/30'
                }`}
            >
              {copied ? <FaCheck className="text-lg" /> : <FaCopy className="text-lg" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        )}

        {/* Tip */}
        {code && (
          <p className="text-xs text-indigo-200/40 text-center animate-fade-in">
            💡 Share this code with anyone to let them retrieve your text
          </p>
        )}
      </div>
    </div>
  );
}
