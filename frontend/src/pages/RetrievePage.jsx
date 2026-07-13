import { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { FaDownload, FaCopy, FaCheck, FaRedo, FaKeyboard } from 'react-icons/fa';
import { retrieveText } from '../api';

const CODE_LENGTH = 6;

export default function RetrievePage() {
  const [slots, setSlots] = useState(Array(CODE_LENGTH).fill(''));
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const inputRefs = useRef([]);

  const code = slots.join('');
  const isComplete = code.length === CODE_LENGTH && !slots.includes('');

  const handleSlotChange = (i, val) => {
    const char = val.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(-1);
    const next = [...slots];
    next[i] = char;
    setSlots(next);
    setNotFound(false);
    if (char && i < CODE_LENGTH - 1) inputRefs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !slots[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
    if (e.key === 'Enter' && isComplete) handleRetrieve();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, CODE_LENGTH);
    const next = Array(CODE_LENGTH).fill('');
    pasted.split('').forEach((c, i) => { next[i] = c; });
    setSlots(next);
    setNotFound(false);
    const focusIdx = Math.min(pasted.length, CODE_LENGTH - 1);
    setTimeout(() => inputRefs.current[focusIdx]?.focus(), 0);
  };

  const handleRetrieve = async () => {
    if (!isComplete) return toast.error('Please enter the full 6-character code');
    setLoading(true);
    setResult('');
    setNotFound(false);
    try {
      const { data } = await retrieveText(code);
      setResult(data.text);
      toast.success('Text retrieved!');
    } catch {
      setNotFound(true);
      toast.error('Code not found or expired');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(result);
    } else {
      const el = document.createElement('textarea');
      el.value = result;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    toast.success('Text copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setSlots(Array(CODE_LENGTH).fill(''));
    setResult('');
    setNotFound(false);
    setTimeout(() => inputRefs.current[0]?.focus(), 0);
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="card w-full max-w-lg animate-fade-up flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <FaDownload />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Retrieve Text</h2>
            <p className="text-xs text-indigo-200/50">Enter the 6-character share code</p>
          </div>
        </div>

        {/* Code input slots */}
        <div>
          <label className="flex items-center gap-1.5 text-xs text-indigo-300/60 font-medium uppercase tracking-wider mb-3">
            <FaKeyboard /> Enter Share Code
          </label>
          <div className="flex gap-2 justify-center" onPaste={handlePaste}>
            {slots.map((val, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="text"
                inputMode="text"
                maxLength={1}
                value={val}
                onChange={(e) => handleSlotChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                disabled={loading}
                className={`w-12 h-14 text-center text-xl font-bold rounded-xl border outline-none transition-all duration-200
                  ${notFound
                    ? 'bg-red-500/10 border-red-500/50 text-red-400'
                    : val
                      ? 'bg-indigo-600/20 border-indigo-500/60 text-indigo-200'
                      : 'bg-white/5 border-white/10 text-white'
                  }
                  focus:border-indigo-500 focus:bg-indigo-600/15 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.2)]
                  disabled:opacity-50`}
              />
            ))}
          </div>
          {notFound && (
            <p className="text-center text-xs text-red-400 mt-2 animate-fade-in">
              ✗ Code not found. Please check and try again.
            </p>
          )}
          <p className="text-center text-xs text-indigo-200/30 mt-2">
            Tip: You can paste the full code at once
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button onClick={handleRetrieve} disabled={loading || !isComplete} className="btn-primary">
            {loading ? <><span className="spinner" /> Fetching...</> : <><FaDownload /> Get Text</>}
          </button>
          {(isComplete || result) && (
            <button onClick={handleReset} title="Reset" className="btn-outline" style={{ width: 'auto', padding: '0 16px' }}>
              <FaRedo />
            </button>
          )}
        </div>

        {/* Result */}
        {result && (
          <div className="result-box flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-xs text-indigo-300/60 font-medium uppercase tracking-wider">Result</p>
              <button
                onClick={handleCopy}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-200
                  ${copied
                    ? 'bg-green-500/20 border-green-500/40 text-green-400'
                    : 'bg-indigo-600/20 border-indigo-500/40 text-indigo-300 hover:bg-indigo-600/30'
                  }`}
              >
                {copied ? <FaCheck /> : <FaCopy />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p className="text-indigo-100 whitespace-pre-wrap break-words leading-relaxed text-sm">
              {result}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
