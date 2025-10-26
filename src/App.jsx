import { useState, useCallback, useMemo } from 'react'
import { Toaster, toast } from 'sonner'
import Header from './components/Header'
import TemplateLibrary from './components/TemplateLibrary'
import WorkflowEditor from './components/WorkflowEditor'
import CodeEditorPanel from './components/CodeEditorPanel'

export default function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [code, setCode] = useState(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bolt Lovable</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
    <style>
      body{font-family:Inter,system-ui,Arial;color:#0b1220;background:#f8fafc;margin:0}
      .btn{padding:.6rem 1rem;border-radius:.6rem;background:#2563eb;color:#fff;border:none}
    </style>
  </head>
  <body>
    <main style="max-width:960px;margin:56px auto;padding:0 16px;">
      <h1 style="font-weight:800;font-size:40px;margin:0 0 8px;">Welcome to Bolt Lovable</h1>
      <p style="opacity:.8;">Start from a template, orchestrate multiple AIs, and ship with one-click deploy.</p>
      <button class="btn" onclick="alert('🚀 This is a static preview block. Integrate your runtime to go live!')">Run</button>
    </main>
  </body>
</html>`)
  const [aiBusy, setAiBusy] = useState(false)
  const [workflow, setWorkflow] = useState({ nodes: [], edges: [] })

  const handleApplyTemplate = useCallback((template) => {
    setSelectedTemplate(template)
    if (template?.code) setCode(template.code)
    toast.success(`Applied template: ${template.name}`)
  }, [])

  const handleRunAI = useCallback(async () => {
    if (workflow.nodes.length === 0) {
      toast.error('Add AI modules to the workflow before running.')
      return
    }
    setAiBusy(true)
    toast.message('Starting AI orchestration...', { description: 'Architect > Coder > Debugger > Error Handler' })
    // Simulated multi-step orchestration
    await new Promise((r) => setTimeout(r, 700))
    toast.info('Architect produced a plan.')
    await new Promise((r) => setTimeout(r, 700))
    setCode((prev) => prev.replace('</main>', '<section style="margin-top:24px;padding:16px;border:1px dashed #93c5fd;border-radius:12px;"><h2>Architect Plan</h2><p>Generated site map and component hierarchy.</p></section></main>'))
    toast.info('Coder generated code updates.')
    await new Promise((r) => setTimeout(r, 700))
    toast.info('Debugger found minor issues.')
    await new Promise((r) => setTimeout(r, 700))
    toast.success('Error Handler applied fixes!')
    setAiBusy(false)
  }, [workflow.nodes.length])

  const headerActions = useMemo(() => ({ onRun: handleRunAI, aiBusy }), [handleRunAI, aiBusy])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Toaster position="top-right" richColors />
      <Header actions={headerActions} />
      <main className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-4 lg:py-6">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 lg:gap-6">
          <section className="xl:col-span-2">
            <TemplateLibrary onApplyTemplate={handleApplyTemplate} />
          </section>
          <section className="xl:col-span-3">
            <WorkflowEditor value={workflow} onChange={setWorkflow} />
          </section>
        </div>
        <section className="mt-4 lg:mt-6">
          <CodeEditorPanel code={code} onChange={setCode} selectedTemplate={selectedTemplate} aiBusy={aiBusy} />
        </section>
      </main>
      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-600">
        © {new Date().getFullYear()} Bolt Lovable — Build delightful web experiences faster.
      </footer>
    </div>
  )
}
