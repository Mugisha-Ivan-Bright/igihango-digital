import { useState } from 'react'
import { Logo } from './components/Logo'
import { EvidenceBridge } from './components/EvidenceBridge'
import { MOCK_DATA } from './data/mock'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nationalId, setNationalId] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (nationalId && password) {
      setIsLoggedIn(true);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-midnight flex flex-col items-center justify-between p-8 font-sans text-white">
        <div className="w-full flex flex-col items-center mt-20">
          <Logo className="mb-12" />

          <form onSubmit={handleLogin} className="w-full space-y-6 max-w-sm">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="National ID / Email"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold/50 transition-colors"
                value={nationalId}
                onChange={(e) => setNationalId(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold/50 transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gold hover:bg-gold/90 text-midnight font-bold py-4 rounded-full shadow-lg shadow-gold/20 transition-all active:scale-95"
            >
              Injira muri NIDA
            </button>
          </form>
        </div>

        <button className="text-xs text-white/60 underline mb-8">
          Nabonye Ikibazo
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-midnight text-white font-sans pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-midnight/80 backdrop-blur-lg p-6 flex justify-between items-center border-b border-white/5">
        <Logo className="scale-75 origin-left" />
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-white/60 uppercase">Mayor</span>
            <span className="text-xs font-bold text-gold">M. Kalisa</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-surface to-midnight border border-gold/30 flex items-center justify-center overflow-hidden">
            <img src="https://ui-avatars.com/api/?name=M+Kalisa&background=0A192F&color=FFD700" alt="Avatar" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-8">
        {activeTab === 'dashboard' ? (
          <>
            {/* District Health Section */}
            <section>
              <h2 className="text-center text-sm font-medium text-white/60 mb-6 uppercase tracking-widest">District Health</h2>
              <div className="relative w-48 h-48 mx-auto">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(100,255,218,0.1)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#goldGradient)"
                    strokeWidth="8"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * MOCK_DATA.healthProgress) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FFD700" />
                      <stop offset="100%" stopColor="#64FFDA" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-black text-white">{MOCK_DATA.healthProgress}%</span>
                  <span className="text-[8px] text-gold font-bold tracking-[0.2em] uppercase">Imihigo Progress</span>
                </div>
              </div>
            </section>

            {/* Red Flag Section */}
            <section>
              <div className="flex justify-between items-end mb-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Red Flag Alerts</h3>
                <span className="text-[10px] text-red-400 font-bold animate-pulse">● 2 Active</span>
              </div>
              <div className="space-y-4">
                {MOCK_DATA.redFlags.map(flag => (
                  <div key={flag.id} className="bg-surface/50 backdrop-blur-sm border border-red-500/20 rounded-2xl p-4 flex gap-4 items-start shadow-xl">
                    <div className="w-2 h-12 bg-red-500 rounded-full shrink-0" />
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-white leading-tight mb-1">{flag.title}</h4>
                      <p className="text-[10px] text-white/50">{flag.responsible}</p>
                      <div className="mt-3 flex gap-2">
                        <button className="bg-red-500 text-white text-[8px] font-black px-3 py-1 rounded-md uppercase tracking-wider">Escalate</button>
                        <button className="bg-white/5 text-white/60 text-[8px] font-black px-3 py-1 rounded-md uppercase tracking-wider">Details</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <EvidenceBridge onUpload={(data) => console.log("Evidence captured", data)} />
          </div>
        )}
      </main>

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-midnight/90 backdrop-blur-xl border-t border-white/5 p-4 flex justify-around items-center px-10 rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'dashboard' ? 'text-gold scale-110' : 'text-white/40'}`}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
          <span className="text-[8px] font-bold uppercase">Home</span>
        </button>
        <button
          onClick={() => setActiveTab('bridge')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'bridge' ? 'text-gold scale-110' : 'text-white/40'}`}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 5a2 0 00-2 2v8a2 0 002 2h12a2 0 002-2V7a2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>
          <span className="text-[8px] font-bold uppercase">Bridge</span>
        </button>
        <button
          onClick={() => setIsLoggedIn(false)}
          className="flex flex-col items-center gap-1 text-white/40 hover:text-red-400 transition-colors"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" /></svg>
          <span className="text-[8px] font-bold uppercase">Exit</span>
        </button>
      </nav>
    </div>
  )
}

export default App
