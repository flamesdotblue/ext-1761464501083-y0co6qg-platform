import Editor from '@monaco-editor/react'
import { useRef, useState } from 'react'
import { Play, Save, GitBranch } from 'lucide-react'
import { toast } from 'sonner'

export default function CodeEditorPanel({ code, onChange, selectedTemplate, aiBusy }) {
  const [language, setLanguage] = useState('html')
  const [theme, setTheme] = useState('light')
  const editorRef = useRef(null)

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor
  }

  const handleRunPreview = () => {
    const blob = new Blob([code], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank', 'noopener,noreferrer')
    setTimeout(() => URL.revokeObjectURL(url), 10000)
  }

  const handleCommit = () => {
    toast.success('Committed changes')
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="text-sm font-semibold">Code Editor</div>
          {selectedTemplate && (
            <span className="text-xs text-slate-500">Template: {selectedTemplate.name}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="text-sm px-2 py-1.5 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <option value="html">HTML</option>
            <option value="javascript">JavaScript</option>
            <option value="css">CSS</option>
            <option value="json">JSON</option>
          </select>
          <select value={theme} onChange={(e) => setTheme(e.target.value)} className="text-sm px-2 py-1.5 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <option value="light">Light</option>
            <option value="vs-dark">Dark</option>
          </select>
          <button onClick={handleRunPreview} disabled={aiBusy} className="inline-flex items-center gap-2 rounded-md bg-blue-600 text-white px-3 py-1.5 text-sm font-medium shadow-sm hover:bg-blue-700 disabled:opacity-60">
            <Play className="w-4 h-4" /> Preview
          </button>
          <button onClick={handleCommit} className="inline-flex items-center gap-2 rounded-md bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-3 py-1.5 text-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">
            <GitBranch className="w-4 h-4" /> Commit
          </button>
          <button onClick={() => editorRef.current?.trigger('save', 'editor.action.formatDocument')} className="inline-flex items-center gap-2 rounded-md bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-3 py-1.5 text-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">
            <Save className="w-4 h-4" /> Format
          </button>
        </div>
      </div>
      <div className="h-[420px]">
        <Editor
          height="100%"
          language={language}
          theme={theme}
          value={code}
          onChange={(v) => onChange && onChange(v ?? '')}
          options={{ automaticLayout: true, fontSize: 14, minimap: { enabled: false }, scrollBeyondLastLine: false, wordWrap: 'on' }}
          onMount={handleEditorDidMount}
        />
      </div>
    </div>
  )
}
