import { useCallback, useMemo, useState } from 'react'
import ReactFlow, { Background, Controls, MiniMap, addEdge, useEdgesState, useNodesState } from 'reactflow'
import 'reactflow/dist/style.css'
import { nanoid } from 'nanoid'

const initialNodes = [
  { id: 'architect', position: { x: 20, y: 40 }, data: { label: 'Architect' }, type: 'input' },
  { id: 'coder', position: { x: 240, y: 40 }, data: { label: 'Coder' } },
  { id: 'debugger', position: { x: 460, y: 40 }, data: { label: 'Debugger' } },
  { id: 'handler', position: { x: 680, y: 40 }, data: { label: 'Error Handler' }, type: 'output' }
]
const initialEdges = [
  { id: 'e1', source: 'architect', target: 'coder', animated: true },
  { id: 'e2', source: 'coder', target: 'debugger', animated: true },
  { id: 'e3', source: 'debugger', target: 'handler', animated: true }
]

export default function WorkflowEditor({ value, onChange }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(value?.nodes?.length ? value.nodes : initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(value?.edges?.length ? value.edges : initialEdges)
  const [layout, setLayout] = useState('horizontal')

  const onConnect = useCallback((connection) => setEdges((eds) => addEdge({ ...connection, animated: true }, eds)), [setEdges])

  const addModule = useCallback((name) => {
    const id = nanoid(6)
    setNodes((nds) => nds.concat({ id, position: { x: 160 + Math.random() * 360, y: 140 + Math.random() * 120 }, data: { label: name } }))
  }, [setNodes])

  const removeSelection = useCallback(() => {
    setNodes((nds) => nds.filter((n) => !n.selected))
    setEdges((eds) => eds.filter((e) => !e.selected))
  }, [setNodes, setEdges])

  const applyLayout = useCallback(() => {
    setNodes((nds) => nds.map((n, i) => ({ ...n, position: layout === 'horizontal' ? { x: 20 + i * 220, y: 40 } : { x: 40, y: 40 + i * 120 } })))
  }, [layout, setNodes])

  const saveWorkflow = useCallback(() => {
    onChange && onChange({ nodes, edges })
  }, [nodes, edges, onChange])

  const nodeClassName = useCallback((node) => {
    const base = 'rounded-xl border px-3 py-2 text-sm font-medium'
    return `${base} ${node.selected ? 'bg-blue-50 border-blue-300' : 'bg-white border-slate-200'}`
  }, [])

  const proOptions = useMemo(() => ({ hideAttribution: true }), [])

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-slate-200 dark:border-slate-800">
        <div className="text-sm font-semibold">AI Orchestration Workflow</div>
        <div className="flex items-center gap-2">
          <select value={layout} onChange={(e) => setLayout(e.target.value)} className="text-sm px-2 py-1.5 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <option value="horizontal">Horizontal</option>
            <option value="vertical">Vertical</option>
          </select>
          <button onClick={applyLayout} className="text-sm px-2.5 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">Auto Layout</button>
          <button onClick={() => addModule('Custom Step')} className="text-sm px-2.5 py-1.5 rounded-md bg-blue-600 text-white">Add Step</button>
          <button onClick={removeSelection} className="text-sm px-2.5 py-1.5 rounded-md bg-rose-100 text-rose-700 border border-rose-200">Delete</button>
          <button onClick={saveWorkflow} className="text-sm px-2.5 py-1.5 rounded-md bg-emerald-600 text-white">Save</button>
        </div>
      </div>
      <div className="h-[360px]">
        <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} fitView className="react-flow-subtle" proOptions={proOptions} nodeClassName={nodeClassName}>
          <MiniMap pannable zoomable />
          <Controls position="bottom-right" />
          <Background gap={16} color="#e2e8f0" />
        </ReactFlow>
      </div>
    </div>
  )
}
