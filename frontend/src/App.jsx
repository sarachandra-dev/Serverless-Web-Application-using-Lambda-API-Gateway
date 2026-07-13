import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SharePage from './pages/SharePage';
import RetrievePage from './pages/RetrievePage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex flex-col">
        <Navbar />
        <Toaster position="top-right" toastOptions={{ style: { background: '#1e1b4b', color: '#e0e7ff', border: '1px solid #4f46e5' } }} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/share" element={<SharePage />} />
          <Route path="/retrieve" element={<RetrievePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
