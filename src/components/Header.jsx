import { Rocket, Settings, Share2, GitBranch, Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Header({ actions }) {
  const { onRun, aiBusy } = actions || {}
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const root = window.document.documentElement
    if (dark) root.classList.add('dark')
    else root.classList.remove('dark')
  }, [dark])

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white">
            <Rocket className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">Bolt Lovable</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Template + Multi‑AI Orchestration</div>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-2">
          <button aria-label="Run AI" onClick={onRun} disabled={aiBusy} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white px-3 py-2 text-sm font-medium shadow-sm hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-60">
            <Rocket className="w-4 h-4" /> {aiBusy ? 'Running...' : 'Run AI'}
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">
            <GitBranch className="w-4 h-4" /> Branch
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">
            <Settings className="w-4 h-4" /> Settings
          </button>
          <button aria-label="Toggle theme" onClick={() => setDark((v) => !v)} className="inline-flex items-center gap-2 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-2.5 py-2 text-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </nav>
      </div>
    </header>
  )
}
